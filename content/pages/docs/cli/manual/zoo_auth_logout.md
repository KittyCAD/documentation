---
title: "zoo auth logout"
excerpt: "Log out of an Zoo host."
layout: manual
---

Log out of an Zoo host.

### Options

<dl class="flags">
   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

This command removes the authentication configuration for a host either specified
interactively or via the global `--host` passed to `zoo`.

```
$ zoo auth logout
# => select what host to log out of via a prompt

$ zoo --host zoo.internal auth logout
# => log out of specified host
```

### See also

* [zoo auth](./zoo_auth)