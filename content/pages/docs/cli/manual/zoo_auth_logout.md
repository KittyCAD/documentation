---
title: "zoo auth logout"
excerpt: "Log out of an Zoo host."
layout: manual
---

Log out of an Zoo host.

### Options

<dl class="flags">
   <dt><code>-H/--host</code></dt>
   <dd>The hostname of the Zoo instance to log out of</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

This command removes the authentication configuration for a host either specified
interactively or via `--host`.

```
$ zoo auth logout
# => select what host to log out of via a prompt

$ zoo auth logout --host zoo.internal
# => log out of specified host
```

### See also

* [zoo auth](./zoo_auth)