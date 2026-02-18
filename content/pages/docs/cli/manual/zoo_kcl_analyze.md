---
title: "zoo kcl analyze"
excerpt: "Analyze multiple physical properties of objects in a kcl file."
layout: manual
---

Analyze multiple physical properties of objects in a kcl file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. This can also be the path to a directory containing a main.kcl file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>--material-density</code></dt>
   <dd>How dense is the material?<br/>Default value: <code>1</code></dd>

   <dt><code>--material-density-unit</code></dt>
   <dd>What units are `material-density` measured in?<br/>Possible values: <code>lb-ft3 | kg-m3</code><br/>Default value: <code>kg-m3</code></dd>

   <dt><code>--format</code></dt>
   <dd>How to present the data to stdout. Machine-friendly and human-friendly options<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>--volume-output-unit</code></dt>
   <dd>What units do you want volumes shown in?<br/>Possible values: <code>cm3 | ft3 | in3 | m3 | yd3 | usfloz | usgal | l | ml</code><br/>Default value: <code>m3</code></dd>

   <dt><code>--mass-output-unit</code></dt>
   <dd>What units do you want masses shown in?<br/>Possible values: <code>g | kg | lb</code><br/>Default value: <code>kg</code></dd>

   <dt><code>--density-output-unit</code></dt>
   <dd>What units do you want densities shown in?<br/>Possible values: <code>lb-ft3 | kg-m3</code><br/>Default value: <code>kg-m3</code></dd>

   <dt><code>--surface-area-output-unit</code></dt>
   <dd>What units do you want areas shown in?<br/>Possible values: <code>cm2 | dm2 | ft2 | in2 | km2 | m2 | mm2 | yd2</code><br/>Default value: <code>m2</code></dd>

   <dt><code>--center-of-mass-output-unit</code></dt>
   <dd>What units do you want lengths shown in?<br/>Possible values: <code>cm | ft | in | m | mm | yd</code><br/>Default value: <code>m</code></dd>

   <dt><code>--show-trace</code></dt>
   <dd>If true, print a link to this request's tracing data<br/>Default value: <code>false</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

This runs KCL once and then returns all requested analyses from the same scene.

```
# analyze a file and print a table
$ zoo kcl analyze my-file.kcl --material-density 1.0 --material-density-unit lb-ft3

# output for scripting
$ zoo kcl analyze my-file.kcl --format json --material-density 1.0 --material-density-unit lb-ft3
```

By default, this will search the input path for a `project.toml` file to determine any specific execution settings.

### See also

* [zoo kcl](./zoo_kcl)