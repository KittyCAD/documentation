---
title: "zoo kcl center-of-mass"
excerpt: "Get the center of mass of objects in a kcl file."
layout: manual
---

Get the center of mass of objects in a kcl file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-s/--src-unit</code></dt>
   <dd>The source unit to use for the kcl file<br/>Possible values: <code>cm | ft | in | m | mm | yd</code><br/>Default value: <code>mm</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-u/--output-unit</code></dt>
   <dd>Output unit<br/>Possible values: <code>cm | ft | in | m | mm | yd</code></dd>

   <dt><code>--show-trace</code></dt>
   <dd>If true, print a link to this request's tracing data<br/>Default value: <code>false</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# get the mass of a file
$ zoo kcl center-of-mass --src_unit=m my-file.kcl

# pass a file from stdin
$ cat my-file.kcl | zoo kcl center-of-mass --src_unit=m
```

### See also

* [zoo kcl](./zoo_kcl)