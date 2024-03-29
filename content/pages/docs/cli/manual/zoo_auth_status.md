---
title: "zoo auth status"
excerpt: "Verifies and displays information about your authentication state."
layout: manual
---

Verifies and displays information about your authentication state.

### Options

<dl class="flags">
   <dt><code>-t/--show-token</code></dt>
   <dd>Display the auth token<br/>Default value: <code>false</code></dd>

   <dt><code>-H/--host</code></dt>
   <dd>Check a specific hostname's auth status</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

This command will test your authentication state for each Zoo host that `zoo`
knows about and report on any issues.

### See also

* [zoo auth](./zoo_auth)