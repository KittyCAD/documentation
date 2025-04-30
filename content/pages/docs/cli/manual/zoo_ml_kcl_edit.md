---
title: "zoo ml kcl edit"
excerpt: "Edit `kcl` file(s) with a prompt."
layout: manual
---

Edit `kcl` file(s) with a prompt.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file or directory containing a main.kcl file. We will read in the contents of all the project's `kcl` files. If you pass `-` as the path, the file will be read from stdin</dd>

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

This command outputs the edited `kcl` files back to the same location.
We do not output to stdout, because for projects with multiple files,
it would be difficult to know which file the output corresponds to.

### See also

* [zoo ml](./zoo_ml)
* [zoo ml kcl](./zoo_ml_kcl)