---
title: "Introducing delouse"
excerpt: |
  Introduction post on our internal rust tokio async debugging tool, delouse!
coverImage: "documentation-assets/introducing-delouse.jpg"
date: "2024-02-12T15:00:00Z"
author:
  name: Paul Tagliamonte
  picture: "/documentation-assets/paultag.jpg"
ogImage:
  url: "documentation-assets/introducing-delouse.jpg"
---

At Zoo, most of our user-facing stack is written in Rust, where we’ve
wholeheartedly adopted the [tokio](https://tokio.rs/) async ecosystem of
libraries - a huge win in terms of library ecosystem and server performance.
With that comes a bit of overhead, especially around the still nascent async
Rust tooling and developer experience. We’ve found debugging async Rust
services can be tricky, since a lot of the Rust ecosystem is split along the
async/sync boundary, and loads of async specific tools are still experimental.

A few months ago, we fixed an issue with the
[Design API](https://zoo.dev/design-api)
where we would notice an intermittent crash due to file descriptor exhaustion
after enough load. On a hunch, I exported `tokio` task counts via our metrics
stack using part of the
[unstable API surface](https://docs.rs/tokio/latest/tokio/runtime/struct.Handle.html#method.metrics),
and determined there was an async task leak. Tasks would spawn, but never shut
down on their own after the WebSocket closed because they collectively
maintained ownership of enough objects to not drop their peer’s channel
handles. This issue went unnoticed for months because async tasks (like many
other green threads) are inexpensive in terms of CPU – they don’t wake up all
that often and in our case, we didn't see excessive RAM usage due to
implementation specifics of how we structured our handlers.

Where to go from there? That is a bit more complicated. As a first step,
there’s [tokio-console](https://github.com/tokio-rs/console), which is great
(full stop) and specifically also for seeing what is running and narrowing down
where the problem may lie in your program –- this allowed us to figure out that
this was due to code we had written (and not a third party library), but
quickly hit a dead-end when trying to generate a stack trace for all the
spawned `tokio` tasks.

Rust has robust internals for generating a stacktrace of all Rust system
threads (or, even easier – use `gdb` to attach to the process, and run
`thread apply all bt` to generate a stack trace for all the threads from outside
the process) -- but this same level of support for `tokio` async tasks via `gdb`
does not currently exist, and is incredibly tricky to add -- I don’t think it’s
something we’ll see for a very long time due to the herculean effort it’d take
to happen, nevermind the work to continually maintain it along with the `tokio`
runtime. It’s almost easier to just start from scratch with the debugger – writing
custom debugging infrastructure that is aware of the specifics of your runtime
(like Go’s [dlv](https://github.com/go-delve/delve)) tends to be the path of
least resistance for language developers.

In a stroke of luck while digging through the tokio docs, I found that
someone had
[landed exactly what I was looking for](https://docs.rs/tokio/latest/tokio/runtime/struct.Handle.html#method.dump)
very recently – the ability to generate a stack trace of `tokio` tasks, from
inside the process.

Enter [delouse](https://github.com/KittyCAD/delouse) – our internal framework
that we use in conjunction with `tokio-console` to help with debugging services
inside Zoo that we’ve open sourced this week. The `tokio` "taskdump" API surface
is very fragile due to the incredibly cool party trick it’s able to pull off
for us – unfortunately, that also means it may crash the process when an
endpoint is called (which results in the stacktrace going to stderr and
`panic`-ing the process). We generally only run `delouse` when specifically
debugging one of our services (gated behind the crate feature "`debug`")
and not by default, and I’d encourage you to do the same for now.

Enough talking -- let’s take it out for a spin!

```rust
use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    delouse::init().unwrap();

    let handle = tokio::spawn(async move {
        loop {
            tokio::time::sleep(std::time::Duration::from_secs(1)).await;
            eprintln!("heartbeat");
        }
    });
    handle.await?;
    Ok(())
}
```

Fairly straightforward so far -- we’ll spawn a task which will loop forever
printing out "`heartbeat`" once a second, and wait on that task to finish –
never exiting. We called `delouse::init()`, which starts up a
[dropshot](https://crates.io/crates/dropshot) server serving requests for
`localhost` on port `7132` (not currently configurable, but will be eventually),
which has a few endpoints for debugging a misbehaving process.

There are currently four `HTTP` endpoints -- an endpoint to pull information
from our own `ELF` (more to come here once I have some time to pull more info
from our own binary), an endpoint to crash the process and generate a
`coredump`, an endpoint to request a Rust stacktrace, and finally an endpoint
to request for a `tokio` stacktrace. Let’s try out the `tokio` stacktrace
endpoint and take a look at our heartbeat task above.

```
$ curl http://localhost:7132/stacktrace/tokio | jq -r .stacktrace
Tokio Task ID 0:
╼ <hyper::server::shutdown::Graceful<I,S,F,E> as core::future::future::Future>::poll at /home/paultag/.cargo/registry/src/index.crates.io-6f17d22bba15001f/hyper-0.14.28/src/server/shutdown.rs:78:32
    (omitted due to length)

Tokio Task ID 1:
╼ <dropshot::server::HttpServer<C> as core::future::future::Future>::poll at /home/paultag/.cargo/registry/src/index.crates.io-6f17d22bba15001f/dropshot-0.10.0/src/server.rs:747:9
    (omitted due to length)

Tokio Task ID 2:
╼ heartbeat::main::{{closure}}::{{closure}} at /home/paultag/dev/kittycad/delouse/examples/heartbeat.rs:9:67
  └╼ <tokio::time::sleep::Sleep as core::future::future::Future>::poll at /home/paultag/.cargo/registry/src/index.crates.io-6f17d22bba15001f/tokio-1.36.0/src/time/sleep.rs:448:22
     └╼ tokio::time::sleep::Sleep::poll_elapsed at /home/paultag/.cargo/registry/src/index.crates.io-6f17d22bba15001f/tokio-1.36.0/src/time/sleep.rs:404:16


Tokio Task ID 3:
╼ <hyper::server::server::new_svc::NewSvcTask<I,N,S,E,W> as core::future::future::Future>::poll at /home/paultag/.cargo/registry/src/index.crates.io-6f17d22bba15001f/hyper-0.14.28/src/server/server.rs:777:36
    (omitted due to length)

Tokio Task ID 4:
╼ dropshot::server::http_request_handle::{{closure}}::{{closure}} at /home/paultag/.cargo/registry/src/index.crates.io-6f17d22bba15001f/dropshot-0.10.0/src/server.rs:918:69
    (omitted due to length)
```

We can see that we’ve got 4 tasks running, including our heartbeat task running
in Task 2. We can see it’s currently sleeping, and on what line it’s sleeping
(`heartbeat.rs:9`). Running this against our Design API quickly narrowed the
problem down to our WebRTC handlers reading from the same shared messaging
channel -- allowing us to push a small fix to explicitly close the shared
resource, which resulted in spinning down any tasks spawned from a closed
WebSocket connection. Our metrics looked completely fixed the next day – and
we’ve not seen any issues in the following weeks.

The `delouse` endpoints will gracefully degrade when system support is not
possible or configured. For example, the `tokio` stacktrace support is only
implemented upstream for Linux on `aarch64`, `x86` and `x86_64`. In addition to
OS support, the `tokio` stacktrace endpoint requires that the `tokio_unstable`
and `tokio_taskdump` config options are set -- which means adding some flags to
your project’s `.cargo/config.toml` -- the `README` has some examples. More
than anything, though, the `delouse` hooks are designed to be helpful when
you’re having a bad day, and fail in a way that still attempts to be as helpful
as possible, but we’d love to find ways to make it even more helpful! Feel free
to file issues, discuss possible features or send in fixes. We’re excited to
help save everyone some debugging time and contribute back to the ecosystem
that we've wholeheartedly adopted within Zoo!

If you’ve found this post interesting, you would fit right in at Zoo!
[Come join us](https://zoo.dev/careers), or build something great using any of
the [Zoo APIs](https://zoo.dev/docs/developer-tools/api) – we’re building the future of hardware
design by tackling the hardest infrastructure problems facing the industry
today so hardware teams can focus on designing the next big thing – not
fighting with their tools.
