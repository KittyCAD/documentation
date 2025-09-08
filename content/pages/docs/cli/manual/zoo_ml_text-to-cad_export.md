---
title: "zoo ml text-to-cad export"
excerpt: "Run a Text-to-CAD prompt and export it as any other supported CAD file format."
layout: manual
---

Run a Text-to-CAD prompt and export it as any other supported CAD file format.

### Options

<dl class="flags">
   <dt><code>prompt</code></dt>
   <dd>Your prompt</dd>

   <dt><code>--output-dir</code></dt>
   <dd>The path to a directory to output the files. If not set this will be the current directory</dd>

   <dt><code>-t/--output-format</code></dt>
   <dd>A valid output file format or 'kcl' to write KCL code</dd>

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
$ zoo ml text-to-cad export --output-format=obj A 2x4 lego brick
```

### See also

* [zoo ml](./zoo_ml)
* [zoo ml text-to-cad](./zoo_ml_text-to-cad)