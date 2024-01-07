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

   <dt><code>-H/--host</code></dt>
   <dd>The host of the Zoo instance to authenticate with. By default this is api.zoo.dev. This assumes the instance is an `https://` url, if not otherwise specified as `http://`</dd>

   <dt><code>-w/--web</code></dt>
   <dd>Open a browser to authenticate<br/>Default value: <code>false</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

Alternatively, pass in a token on standard input by using `--with-token`.

```
# start interactive setup
$ zoo auth login

# authenticate against a specific Zoo instance by reading the token from a file
$ zoo auth login --with-token --host zoo.internal < mytoken.txt

# authenticate with a specific Zoo instance
$ zoo auth login --host zoo.internal

# authenticate with an insecure Zoo instance (not recommended)
$ zoo auth login --host http://zoo.internal
```

### See also

* [zoo auth](./zoo_auth)