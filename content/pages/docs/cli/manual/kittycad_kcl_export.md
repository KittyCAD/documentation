---
title: "kittycad kcl export"
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

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# convert kcl to obj
$ kittycad kcl export --output-format=obj my-file.kcl output_dir

# convert kcl to step
$ kittycad kcl export --output-format=step my-obj.kcl .

# pass a file to convert from stdin
$ cat my-obj.kcl | kittycad kcl export --output-format=step - output_dir
```

### See also

* [kittycad kcl](./kittycad_kcl)