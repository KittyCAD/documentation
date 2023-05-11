---
title: 'kittycad auth login'
excerpt: 'Authenticate with an KittyCAD host.'
---

Authenticate with an KittyCAD host.

### Options

<dl class="flags">
   <dt><code>--with-token</code></dt>
   <dd>Read token from standard input</dd>

   <dt><code>-H/--host</code></dt>
   <dd>The host of the KittyCAD instance to authenticate with. By default this is api.kittycad.io. This assumes the instance is an `https://` url, if not otherwise specified as `http://`</dd>

   <dt><code>-w/--web</code></dt>
   <dd>Open a browser to authenticate</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help information</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info</dd>
</dl>

### About

Alternatively, pass in a token on standard input by using `--with-token`.

```
# start interactive setup
$ kittycad auth login

# authenticate against a specific KittyCAD instance by reading the token from a file
$ kittycad auth login --with-token --host kittycad.internal < mytoken.txt

# authenticate with a specific KittyCAD instance
$ kittycad auth login --host kittycad.internal

# authenticate with an insecure KittyCAD instance (not recommended)
$ kittycad auth login --host http://kittycad.internal
```

### See also

-   [kittycad auth](./kittycad_auth)
