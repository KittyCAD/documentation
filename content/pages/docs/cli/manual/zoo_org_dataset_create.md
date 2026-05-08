---
title: "zoo org dataset create"
excerpt: "Create an organization dataset."
layout: manual
---

Create an organization dataset.

### Options

<dl class="flags">
   <dt><code>--name</code></dt>
   <dd>Display name for the dataset</dd>

   <dt><code>--provider</code></dt>
   <dd>Storage provider for the dataset<br/>Possible values: <code>s3 | zoo-managed</code><br/>Default value: <code>zoo-managed</code></dd>

   <dt><code>--uri</code></dt>
   <dd>Fully-qualified dataset URI, required for S3 datasets</dd>

   <dt><code>--access-role-arn</code></dt>
   <dd>Role ARN Zoo should assume when reading an S3 dataset</dd>

   <dt><code>--upload</code></dt>
   <dd>Files or directories to upload after creating a Zoo-managed dataset</dd>

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