---
title: "zoo api-call status"
excerpt: "Perform operations for API calls."
layout: manual
---

Perform operations for API calls.

### Options

<dl class="flags">
   <dt><code>id</code></dt>
   <dd>The ID of the API call</dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# get the status of an async API call
$ zoo api-call status <id>
```

### See also

* [zoo api-call](./zoo_api-call)