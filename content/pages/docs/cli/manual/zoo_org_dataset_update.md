---
title: "zoo org dataset update"
excerpt: "Update organization dataset metadata or storage credentials."
layout: manual
---

Update organization dataset metadata or storage credentials.

### Options

<dl class="flags">
   <dt><code>dataset-id</code></dt>
   <dd>Dataset ID</dd>

   <dt><code>--name</code></dt>
   <dd>New display name</dd>

   <dt><code>--provider</code></dt>
   <dd>Updated storage provider<br/>Possible values: <code>s3 | zoo-managed</code></dd>

   <dt><code>--uri</code></dt>
   <dd>Updated fully-qualified dataset URI</dd>

   <dt><code>--access-role-arn</code></dt>
   <dd>Updated role ARN Zoo should assume when reading the dataset</dd>

   <dt><code>--confirm-source-change</code></dt>
   <dd>Confirm that you are intentionally changing storage connection details<br/>Default value: <code>false</code></dd>

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