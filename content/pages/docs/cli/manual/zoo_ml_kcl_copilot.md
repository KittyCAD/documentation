---
title: "zoo ml kcl copilot"
excerpt: "Start an interactive Copilot chat for KCL in the current project directory."
layout: manual
---

Start an interactive Copilot chat for KCL in the current project directory.

### Options

<dl class="flags">
   <dt><code>--project-name</code></dt>
   <dd>Optional project name to associate with messages</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

Requires the current directory to contain a `main.kcl` file.

```
$ zoo ml kcl copilot
```

### See also

* [zoo ml](./zoo_ml)
* [zoo ml kcl](./zoo_ml_kcl)