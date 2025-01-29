---
title: "zoo kcl view"
excerpt: "View a render of a `kcl` file in your terminal."
layout: manual
---

View a render of a `kcl` file in your terminal.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input kcl file to view. This can also be the path to a directory containing a main.kcl file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-s/--src-unit</code></dt>
   <dd>The source unit to use for the kcl file. This defaults to millimeters, if not set and there is no project.toml. If there is a project.toml file, the default unit will be the one set in the project.toml file<br/>Possible values: <code>cm | ft | in | m | mm | yd</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
$ zoo kcl view my-file.kcl

# pass a file to view from stdin
$ cat my-obj.kcl | zoo kcl view -
```

By default, this will search the input path for a `project.toml` file to determine the source
unit and any specific execution settings. If no `project.toml` file is found, in the directory
of the input path OR any parent directories above that, the default
source unit will be millimeters. You can also specify the source unit with the
`--src-unit`/`-s` command line flag.

### See also

* [zoo kcl](./zoo_kcl)