---
title: "kittycad file volume"
excerpt: "Get the volume of an object in a CAD file."
layout: manual
---

Get the volume of an object in a CAD file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-s/--src-format</code></dt>
   <dd>A valid source file format<br/>Possible values: <code>gltf | obj | ply | step | stl</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-u/--output-unit</code></dt>
   <dd>Output unit<br/>Possible values: <code>cm3 | ft3 | in3 | m3 | yd3 | usfloz | usgal | l | ml</code></dd>

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
# get the volume of a file
$ kittycad file volume my-file.step

# pass a file from stdin, the original file type is required
$ cat my-obj.obj | kittycad file volume - --src-format=obj
```

### See also

* [kittycad file](./kittycad_file)