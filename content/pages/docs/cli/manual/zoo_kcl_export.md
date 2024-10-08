---
title: "zoo kcl export"
excerpt: "Export a `kcl` file as any other supported CAD file format."
layout: manual
---

Export a `kcl` file as any other supported CAD file format.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input kcl file to export. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>output-dir</code></dt>
   <dd>The path to a directory to output the files</dd>

   <dt><code>-t/--output-format</code></dt>
   <dd>A valid output file format<br/>Possible values: <code>fbx | glb | gltf | obj | ply | step | stl</code></dd>

   <dt><code>-s/--src-unit</code></dt>
   <dd>The source unit to use for the kcl file. This defaults to millimeters, if not set and there is no project.toml. If there is a project.toml file, the default unit will be the one set in the project.toml file<br/>Possible values: <code>cm | ft | in | m | mm | yd</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>--show-trace</code></dt>
   <dd>If true, print a link to this request's tracing data<br/>Default value: <code>false</code></dd>

   <dt><code>--deterministic</code></dt>
   <dd>If true, the output file should be deterministic, meaning any date or time information will be replaced with a fixed value. This is useful for when pushing to version control<br/>Default value: <code>false</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# convert kcl to obj
$ zoo kcl export --output-format=obj my-file.kcl output_dir

# convert kcl to step
$ zoo kcl export --output-format=step my-obj.kcl .

# pass a file to convert from stdin
$ cat my-obj.kcl | zoo kcl export --output-format=step - output_dir
```

By default, this will search the input path for a `project.toml` file to determine the source
unit and any specific execution settings. If no `project.toml` file is found, in the directory
of the input path OR any parent directories above that, the default
source unit will be millimeters. You can also specify the source unit with the
`--src-unit`/`-s` command line flag.

### See also

* [zoo kcl](./zoo_kcl)