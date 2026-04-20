---
title: "zoo project upload"
excerpt: "Upload a local project."
layout: manual
---

Upload a local project.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The project directory, a `.kcl` file within it, or `project.toml`<br/>Default value: <code>.</code></dd>

   <dt><code>--new</code></dt>
   <dd>Always create a new remote project even if one is already persisted locally<br/>Default value: <code>false</code></dd>

   <dt><code>--id</code></dt>
   <dd>Override the persisted Zoo cloud project id from `project.toml`</dd>

   <dt><code>--title</code></dt>
   <dd>Title to use for the cloud project. Defaults to the local project directory name</dd>

   <dt><code>--description</code></dt>
   <dd>Description to use for the cloud project. Defaults to the existing remote description when updating</dd>

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

If the local `project.toml` already contains a Zoo cloud project id, this
will update that project unless `--new` is passed.

### See also

* [zoo project](./zoo_project)