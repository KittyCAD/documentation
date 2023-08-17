---
title: "kittycad file density"
excerpt: "Get the density of an object in a CAD file."
layout: manual
---

Get the density of an object in a CAD file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-s/--src-format</code></dt>
   <dd>A valid source file format<br/>Possible values: <code>gltf | obj | ply | step | stl</code></dd>

   <dt><code>-m/--material-mass</code></dt>
   <dd>Material mass</dd>

   <dt><code>--material-mass-unit</code></dt>
   <dd>The unit of the material mass<br/>Possible values: <code>g | kg | lb</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-u/--output-unit</code></dt>
   <dd>Output unit<br/>Possible values: <code>lb-ft3 | kg-m3</code></dd>

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
# get the density of a file
$ kittycad file density my-file.step

# pass a file from stdin, the original file type is required
$ cat my-obj.obj | kittycad file density - --src-format=obj
```

### See also

* [kittycad file](./kittycad_file)