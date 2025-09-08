---
title: "zoo file snapshot"
excerpt: "Snapshot a render of a CAD file as any supported image format."
layout: manual
---

Snapshot a render of a CAD file as any supported image format.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file to snapshot. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-s/--src-format</code></dt>
   <dd>A valid source file format<br/>Possible values: <code>fbx | gltf | obj | ply | sldprt | step | stl</code></dd>

   <dt><code>output-file</code></dt>
   <dd>The path to a file to output the image</dd>

   <dt><code>-t/--output-format</code></dt>
   <dd>A valid output image format<br/>Possible values: <code>png | jpeg</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# snapshot as png
$ zoo file snapshot my-file.obj my-file.png

# pass a file to snapshot from stdin
$ cat my-obj.obj | zoo file snapshot --output-format=png - my-file.png
```

### See also

* [zoo file](./zoo_file)