---
title: "zoo kcl snapshot"
excerpt: "Snapshot a render of a `kcl` file as any supported image format."
layout: manual
---

Snapshot a render of a `kcl` file as any supported image format.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input kcl file to snapshot. This can also be the path to a directory containing a main.kcl file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>output-file</code></dt>
   <dd>The path to a file to output the image</dd>

   <dt><code>-t/--output-format</code></dt>
   <dd>A valid output image format<br/>Possible values: <code>png | jpeg</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>--session</code></dt>
   <dd>If given, this command will reuse an existing KittyCAD modeling session. You can start the session via `zoo session-start --listen-on 0.0.0.0:3333` in this CLI</dd>

   <dt><code>--show-trace</code></dt>
   <dd>If true, print a link to this request's tracing data<br/>Default value: <code>false</code></dd>

   <dt><code>--replay</code></dt>
   <dd>If true, tell engine to store a replay<br/>Default value: <code>false</code></dd>

   <dt><code>--angle</code></dt>
   <dd>Which angle to take the snapshot from. Defaults to "front"<br/>Possible values: <code>front | top | right-side | four-ways</code></dd>

   <dt><code>--camera-style</code></dt>
   <dd>Which style of camera to use for snapshots<br/>Possible values: <code>ortho | perspective</code><br/>Default value: <code>ortho</code></dd>

   <dt><code>--camera-padding</code></dt>
   <dd>How much padding to use when zooming before the screenshot. Positive padding will zoom out, negative padding will zoom in (and therefore crop). e.g. padding = 0.2 means the view will span 120% of the object(s) bounding box, and padding = -0.2 means the view will span 80% of the object(s) bounding box<br/>Default value: <code>0.1</code></dd>

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
$ zoo kcl snapshot my-file.kcl my-file.png

# pass a file to snapshot from stdin
$ cat my-obj.kcl | zoo kcl snapshot --output-format=png - my-file.png
```

By default, this will search the input path for a `project.toml` file to determine any specific execution settings.

### See also

* [zoo kcl](./zoo_kcl)