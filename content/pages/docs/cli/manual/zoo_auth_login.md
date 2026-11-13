---
title: "zoo auth login"
excerpt: "Authenticate with an Zoo host."
layout: manual
---

Authenticate with an Zoo host.

### Options

<dl class="flags">
   <dt><code>--with-token</code></dt>
   <dd>Read token from standard input<br/>Default value: <code>false</code></dd>

   <dt><code>-w/--web</code></dt>
   <dd>Open a browser to authenticate<br/>Default value: <code>false</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

Alternatively, pass in a token on standard input by using `--with-token`.

```shell
# start interactive setup
zoo auth login
```

```shell
# authenticate against a specific Zoo instance by reading the token from a file
zoo --host api.zoo.dev auth login --with-token < mytoken.txt
```

```shell
# authenticate with a specific Zoo instance
zoo --host api.zoo.dev auth login
```

```shell
# authenticate with an insecure Zoo instance (not recommended)
zoo --host http://api.zoo.dev auth login
```

### See also

* [zoo auth](./zoo_auth)