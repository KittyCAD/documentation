---
title: "zoo kcl center-of-mass"
excerpt: "Get the center of mass of objects in a kcl file."
layout: manual
---

Get the center of mass of objects in a kcl file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. This can also be the path to a directory containing a main.kcl file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-s/--src-unit</code></dt>
   <dd>The source unit to use for the kcl file. This defaults to millimeters, if not set and there is no project.toml. If there is a project.toml file, the default unit will be the one set in the project.toml file<br/>Possible values: <code>cm | ft | in | m | mm | yd</code></dd>

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
$ zoo kcl center-of-mass --src-unit=m my-file.kcl

# pass a file from stdin
$ cat my-file.kcl | zoo kcl center-of-mass --src-unit=m
```

By default, this will search the input path for a `project.toml` file to determine the source
unit and any specific execution settings. If no `project.toml` file is found, in the directory
of the input path OR any parent directories above that, the default
source unit will be millimeters. You can also specify the source unit with the
`--src-unit`/`-s` command line flag.

### See also

* [zoo kcl](./zoo_kcl)