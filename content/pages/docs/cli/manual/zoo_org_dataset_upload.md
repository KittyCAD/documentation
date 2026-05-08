---
title: "zoo org dataset upload"
excerpt: "Upload files into a Zoo-managed organization dataset."
layout: manual
---

Upload files into a Zoo-managed organization dataset.

### Options

<dl class="flags">
   <dt><code>dataset-id</code></dt>
   <dd>Dataset ID</dd>

   <dt><code>path</code></dt>
   <dd>Files or directories to upload</dd>

   <dt><code>--recursive</code></dt>
   <dd>Recurse into upload directories<br/>Default value: <code>false</code></dd>

   <dt><code>--base-dir</code></dt>
   <dd>Base directory used to derive relative upload paths</dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help</dd>
</dl>


### See also

* [zoo org](./zoo_org)
* [zoo org dataset](./zoo_org_dataset)