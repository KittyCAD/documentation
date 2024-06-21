---
title: "zoo kcl snapshot"
excerpt: "Snapshot a render of a `kcl` file as any supported image format."
layout: manual
---

Snapshot a render of a `kcl` file as any supported image format.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input kcl file to snapshot. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>output-file</code></dt>
   <dd>The path to a file to output the image</dd>

   <dt><code>-t/--output-format</code></dt>
   <dd>A valid output image format<br/>Possible values: <code>png | jpeg</code></dd>

   <dt><code>-s/--src-unit</code></dt>
   <dd>The source unit to use for the kcl file<br/>Possible values: <code>cm | ft | in | m | mm | yd</code><br/>Default value: <code>mm</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>--session</code></dt>
   <dd>If given, this command will reuse an existing KittyCAD modeling session. You can start the session via `zoo session-start --listen-on 0.0.0.0:3333` in this CLI</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# snapshot as png
$ zoo kcl snapshot my-file.kcl my-file.png

# pass a file to snapshot from stdin
$ cat my-obj.kcl | zoo kcl snapshot --output-format=png - my-file.png
```

### See also

* [zoo kcl](./zoo_kcl)