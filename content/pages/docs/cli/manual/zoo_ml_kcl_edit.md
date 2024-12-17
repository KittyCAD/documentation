---
title: "zoo ml kcl edit"
excerpt: "Edit a `kcl` file with a prompt."
layout: manual
---

Edit a `kcl` file with a prompt.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>prompt</code></dt>
   <dd>Your prompt</dd>

   <dt><code>-r/--source_range</code></dt>
   <dd>The source ranges to edit. This is optional. If you don't pass this, the entire file will be edited</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
$ zoo ml kcl edit --prompt "Make it blue"
```

This command outputs the edited `kcl` file to stdout.

### See also

* [zoo ml](./zoo_ml)
* [zoo ml kcl](./zoo_ml_kcl)