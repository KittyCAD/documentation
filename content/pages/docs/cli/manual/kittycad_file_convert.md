---
title: "kittycad file convert"
excerpt: "Convert a CAD file from one format to another."
layout: manual
---

Convert a CAD file from one format to another.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file to convert. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>output-dir</code></dt>
   <dd>The path to a directory to output the files</dd>

   <dt><code>-s/--src-format</code></dt>
   <dd>A valid source file format<br/>Possible values: <code>fbx | gltf | obj | ply | sldprt | step | stl</code></dd>

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

If the file being converted is larger than a certain size it will be
performed asynchronously, you can then check its status with the
`kittycad api-call status <id_of_your_operation>` command.

```
# convert step to obj
$ kittycad file convert --output-format=obj my-file.step output_dir

# convert obj to step
$ kittycad file convert --output-format=step my-obj.obj .

# pass a file to convert from stdin
# when converting from stdin, the original file type is required
$ cat my-obj.obj | kittycad file convert --output-format=step - output_dir
```

### See also

* [kittycad file](./kittycad_file)