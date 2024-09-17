---
title: "zoo kcl density"
excerpt: "Get the density of objects in a kcl file."
layout: manual
---

Get the density of objects in a kcl file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-s/--src-unit</code></dt>
   <dd>The source unit to use for the kcl file. This defaults to millimeters, if not set and there is no project.toml file in the same directory as the input file. If there is a project.toml file, the default unit will be the one set in the project.toml file<br/>Possible values: <code>cm | ft | in | m | mm | yd</code></dd>

   <dt><code>-m/--material-mass</code></dt>
   <dd>Material mass</dd>

   <dt><code>--material-mass-unit</code></dt>
   <dd>The unit of the material mass<br/>Possible values: <code>g | kg | lb</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-u/--output-unit</code></dt>
   <dd>Output unit<br/>Possible values: <code>lb-ft3 | kg-m3</code></dd>

   <dt><code>--show-trace</code></dt>
   <dd>If true, print a link to this request's tracing data<br/>Default value: <code>false</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# get the density of a file
$ zoo kcl density --src_unit=m my-file.kcl

# pass a file from stdin
$ cat my-file.kcl | zoo kcl density --src_unit=m
```

### See also

* [zoo kcl](./zoo_kcl)