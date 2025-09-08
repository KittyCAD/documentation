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

```
# start interactive setup
$ zoo auth login

# authenticate against a specific Zoo instance by reading the token from a file
$ zoo --host zoo.internal auth login --with-token < mytoken.txt

# authenticate with a specific Zoo instance
$ zoo --host zoo.internal auth login

# authenticate with an insecure Zoo instance (not recommended)
$ zoo --host http://zoo.internal auth login
```

### See also

* [zoo auth](./zoo_auth)