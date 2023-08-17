---
title: "kittycad file surface-area"
excerpt: "Get the surface area of an object in a CAD file."
layout: manual
---

Get the surface area of an object in a CAD file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-s/--src-format</code></dt>
   <dd>A valid source file format<br/>Possible values: <code>gltf | obj | ply | step | stl</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-u/--output-unit</code></dt>
   <dd>Output unit<br/>Possible values: <code>cm2 | dm2 | ft2 | in2 | km2 | m2 | mm2 | yd2</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

If the input file is larger than a certain size it will be
performed asynchronously, you can then check the status with the
`kittycad api-call status <id_of_your_operation>` command.

```
# get the surface-area of a file
$ kittycad file surface-area my-file.step

# pass a file from stdin, the original file type is required
$ cat my-obj.obj | kittycad file surface-area - --src-format=obj
```

### See also

* [kittycad file](./kittycad_file)