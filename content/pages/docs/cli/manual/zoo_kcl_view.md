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

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

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
$ zoo kcl view my-file.kcl

# pass a file to view from stdin
$ cat my-obj.kcl | zoo kcl view -
```

By default, this will search the input path for a `project.toml` file to determine any specific execution settings.

### See also

* [zoo kcl](./zoo_kcl)