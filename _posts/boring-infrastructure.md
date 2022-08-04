---
title: 'Boring Infrastructure'
excerpt: 'How we build infrastructure at KittyCAD.'
coverImage: '/kittycad-long.png'
date: '2022-05-21T15:35:07.322Z'
author:
    name: Jessie Frazelle
    picture: '/jessfraz.jpg'
ogImage:
    url: '/kittycad.png'
---

For the past six months, we have been building out KittyCAD's backend infrastructure.
All of this has been done in any "free" time I have, so it's a bit "here and
there" as to how things get done.
My goal when building out infrastructure is always to make it as "boring" as
possible. Let me expand on what I mean by boring:

-   Minimal complexity
-   Any third-party infrastructure we use should abide by the "do one thing and one
    thing only" rule (of course, in practice, this is a bit more nuanced than that
    but you get the idea).
-   Resilience: while third parties might claim certain guarantees, we should
    always act like the guarantee is false and account for it.
-   "Murphy's law of computering" [^1]: Anything that can happen will happen, and you
    should try to anticipate that and fix things once they arise so they never
    happen again.

At its heart, KittyCAD is an infrastructure company. But we are different than
any existing infrastructure company in that we build infrastructure for hardware
teams. In building the product, we started with a feature for file conversions.
This seemed ideal since it would allow us to test our back-end infrastructure for
the future, and file conversions will always be the input and output point for
our product. We knew our infrastructure had to scale, be consistent, fast, and
resilient so users would trust us. Let's dive in a bit into the story behind our
infrastructure.

### C++ <==> Rust

When we first launched the API for file conversions, the server powering the API
was written in C++. This was because most graphics engineers know
and use C++, and it would allow us to move the fastest. NVIDIA also has a full
SDK with C++ bindings, and while there are projects focused on wrapping those
bindings in other languages, they would likely be foreign to the folks we hire.
There's also not a good way of knowing if anyone is using said wrappers in
production or not.

This was my first C++ project other than fixing bugs in
existing projects, but I had an open mind and was excited to get the job done.

After scoping out the C++ server frameworks, I chose the most minimal one that
would be easy to patch if we ever needed to. We shipped the API and had
people start using it. However, I did not have peace of mind. As someone who has
built services in mainly Rust and Go for production, I just felt like I didn't
understand how things could fail in production for C++. These unknown unknowns were the primary source of my unease.

The way we deployed the service was with `terraform` creating auto-scaling
groups of VMs with GPUs and a load-balancer. This was _fine_, but I knew a lot
could go wrong on deployments of new versions, but at least the health
checks would catch it and not start routing traffic there.

The API worked, and there were minimal issues, but I still couldn't get over
the fact I knew I could have done this better in another language. I decided to
re-write the server in another C++ server framework that had better OpenAPI
support, improved JSON support for types, and seemed to solve some problems we
were facing. Sadly, this did not squash my qualms, but it worked great!

I couldn't help but yearn for the JSON operations of Golang or `serde` in Rust. Both
of them feel much more like first-class citizens. I also missed `diesel` in
Rust for its strong typing of objects in the database and queries. And I wanted
any error handling that did not involve `try catch`. Our current code base
seemed like any new dev hired would have to learn how _not to do things_ before they could _do things_.

### Splitting the monolith

I decided to
split our monolith API server into two services. The external-facing API server
would be written in Rust. For any operations that required our "engine" (the
C++ code), the Rust server would call out to another service that would run on our
internal network.
This internal service would still use the C++ server code.
If we need to debug things on our internal network locally,
all VMs are hooked up to [Tailscale](https://tailscale.com). I often think
about how if we were using OpenVPN, I'd have murdered someone by now. Getting on the VPN is seamless for any new
person who joins the company.

The nice thing about this split is it had lots of wins:

1. We could host the external-facing API server on VMs without GPUs, which
   allows for much more economical scaling.
2. Any API calls outside the "engine" scope, like database
   calls for information about users and other operations, could be
   removed from the C++ code and only live in the Rust code.
3. Having the Rust server be the thing user's hit right off the bat honestly did
   make me have better peace of mind since I have more experience hosting Rust
   services. I know what to expect and can build for it.
4. I could deploy the external-facing API server to GCP's cloud-run. It was much
   less managed by me while still being able to scale and
   be deployed on pushes to `main` via `git`. I like to joke that what I love
   about cloud-run is that it's someone else's bash scripts behind the scenes
   (not mine).

At this point, the C++ server code was a lot smaller. Now, I was more content, but not
fully content.

### C++ Rust interop

I started
researching some C++ interops for Rust so that we could keep the GPU-oriented
code in C++ but have the server code in Rust. However, I worried any interop I found
would lead to me not having peace of mind at _the interop_ layer of the stack versus
the C++ server layer of the stack.

Eventually, I found David Tolnay's [`cxx`](https://github.com/dtolnay/cxx) for
Rust. It appeared to be the piece of the puzzle for which I was looking! If you are a Rust dev, you likely realize you already use so many of David Tolnay's libraries, so I know I could trust it!
(Thank you, David!) I set myself up for this being something that would be hard
to get working, but it worked right away (another great sign)! I was excited!
Finally, I might be able to go back to using derive macros, `serde`, AND `diesel`!

I decided to start by creating a Rust library that
wrapped the C++ code. Then I could import that library into a Rust service that would
replace the "engine" API server. This is the same model as `openssl-sys` and other Rust libraries that bind to C code.

Because of the C++ bindings, we were already
using a custom Rust build script for the Rust library, so I decided to remove `CMakeLists.txt` entirely
from our build and write a little package manager for our C++ dependencies in
Rust. We still need some hacks for replacing what we were getting from
`clang-tidy` and generating C++ docs with `doxygen`, but overall I am happy with
it. Much more comfortable than with `CMakeLists.txt`. We also get all the benefits of pinning
dependencies to specific versions and compiling from source, so we know
everything works the same way everywhere.

Now, any new dev to the project could run `cargo build` and `cargo test`
(since we ended up wrapping any C++ tests as well). This was much more developer-friendly than `cmake`.

Soon, this was running in production, and I could finally have peace of mind. This
was my definition of "boring" since I have much more experience in the "stack"
we were using. Now we had Rust services talking to Rust services, and I felt at home. I could,
finally, implement my plans for caching API responses and using a pub/sub service
to communicate various asynchronous tasks between services.

### Pub/Sub

For quite some time, I had been looking at [nats.io](https://nats.io/) for the pub/sub layer. I talked to several people who had used it in production and
I only heard good things. Additionally, most folks mentioned that what they loved the most is
`nats` is upfront about not guaranteeing anything. I also appreciate this
because even if I had used `kafka`, `rabbitmq`, or `criss-cross-applesauce`[^2],
I would have built my integration with the idea in mind that there was no
guarantee, because that's how you get "boring infrastructure" and some peace of
mind.

### Caching

For the cache, I chose Redis since it's a bit of an old faithful for me, but you
might feel otherwise. And at the end of the day, if there's a failure in the
cache, you just run whatever you'd have done without it.

It's worth mentioning that both Cache and Pub/Sub are implemented as traits in
Rust for our services. Such that, if we decide to replace Redis or nats.io with
something else in the future, we would just need to implement the trait for it.

### Infra v2

For the first iteration of deploying Redis and nats, I used `terraform` and
deployed them as containers on VMs. But I knew this would not last long.
I eventually wanted to have some way of running containers for various services
but I needed it to fulfill the following requirements (that we were already
fulfilling today):

1. Be as "boring" as possible.
2. We deploy changes to the services like our API servers via something that runs
   on pushes to the `main` branch in `git`.
3. I didn't want to manage a Kubernetes cluster (this is a much more nuanced
   conversation, but it relates to #1)
4. Whatever we used needed to understand the concept of "X workload requires GPUs"
   and "Y workload does not", so we could keep costs down to a minimum.
5. Have a concept of "Blue/Green deploys", "deploy rollouts", whatever you want
   to call it.
6. I can't spend all my time (or even 10% of it) fixing this thing. It needs to
   work and have very little maintenance. As little maintenance as cloud-run,
   which is 0.
7. Make it easier to use all our cloud credits across various cloud providers.

After scoping out lots of options, I chose
[`nomad`](https://github.com/hashicorp/nomad). I could also use
[`waypoint`](https://github.com/hashicorp/waypoint)
from Hashicorp for deploying on pushes to `main` with a GitHub action. I went
about setting all this up with `terraform` so we could easily re-create it if we
wanted to.

After getting the cluster stood up, I hooked up our GitHub actions for deploys,
and we were set! This felt much cleaner and would be less context for any new
devs that join to understand how things get deployed. Previously, as mentioned,
some services were in cloud-run, some were in VMs, and now everything went
through the same path.

While cloud-run can scale with you, it becomes less economical at a certain point. The new infrastructure positions us better for the future economically[^3]. Additionally, now all services run
in containers versus some installed on VMs directly. It ended up cleaning up
a lot about how we deploy services, and adding new services will be even easier now.

Technically speaking, we could deploy all our infrastructure to this cluster now. Except that's not
true. We have one Golang service that runs arbitrary code execution that we
will have another blog post about once the features are launched. This service is not connected to our internal network and is
heavily isolated from any other production infrastructure. This service spins up docker containers on the fly, so it runs on VMs
in an auto-scaling group. The VMs get updated on pushes to main (but only when
the health checks succeed).

I digress; the reasons for that separation will always make sense, and so we
will have additional infrastructure outside the scope of the central cluster.

That sums up our infrastructure; I am sure there is a lot I am
forgetting. If you found this interesting and agree with our methodology of
doing things [please apply](https://boards.greenhouse.io/kittycad). We are
looking to hire the first engineer (other than myself) to be working on this!
There's a lot to do, and we have a suitable base to build on top of!

Our infrastructure will probably evolve in various ways in the future, nothing is ever
perfect, so stay tuned for more posts!

[^1]:
    I made this up, but anyone who has been programming for a time knows it's
    true.

[^2]: I made this one up, just making sure you are paying attention. ;)
[^3]:
    It's also important to note we had turned off cold starts on cloud-run for
    various reasons and so the cost is much higher because of that. I still stand-by
    using cloud-run for bots or anything like that, since it's so easy and
    not managed by you.
