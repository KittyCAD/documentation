---
title: "zoo kcl mass"
excerpt: "Get the mass of objects in a kcl file."
layout: manual
---

Get the mass of objects in a kcl file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-m/--material-density</code></dt>
   <dd>Material density</dd>

   <dt><code>--material-density-unit</code></dt>
   <dd>Material density unit<br/>Possible values: <code>lb-ft3 | kg-m3</code></dd>

   <dt><code>-s/--src-unit</code></dt>
   <dd>The source unit to use for the kcl file<br/>Possible values: <code>cm | ft | in | m | mm | yd</code><br/>Default value: <code>mm</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-u/--output-unit</code></dt>
   <dd>Output unit<br/>Possible values: <code>g | kg | lb</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# get the mass of a file
$ zoo kcl mass --src_unit=m my-file.kcl

# pass a file from stdin
$ cat my-file.kcl | zoo kcl mass --src_unit=m
```

### See also

* [zoo kcl](./zoo_kcl)