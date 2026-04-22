---
title: "zoo project delete"
excerpt: "Delete one of your uploaded projects."
layout: manual
---

Delete one of your uploaded projects.

### Options

<dl class="flags">
   <dt><code>id-or-path</code></dt>
   <dd>The project id, or a local project directory, `.kcl` file, or `project.toml`.

When a local path is provided, the persisted Zoo cloud project id will be removed from `project.toml` after the remote project is deleted.</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### See also

* [zoo project](./zoo_project)