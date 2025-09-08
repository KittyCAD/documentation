---
title: "zoo ml text-to-cad view"
excerpt: "View a render of a Text-to-CAD prompt in your terminal."
layout: manual
---

View a render of a Text-to-CAD prompt in your terminal.

### Options

<dl class="flags">
   <dt><code>prompt</code></dt>
   <dd>Your prompt</dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>--no-reasoning</code></dt>
   <dd>Disable streaming reasoning messages (prints by default)<br/>Default value: <code>false</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
$ zoo ml text-to-cad view A 2x4 lego brick
```

### See also

* [zoo ml](./zoo_ml)
* [zoo ml text-to-cad](./zoo_ml_text-to-cad)