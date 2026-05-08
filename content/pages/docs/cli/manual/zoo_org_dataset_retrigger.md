---
title: "zoo org dataset retrigger"
excerpt: "Retrigger conversions for an organization dataset."
layout: manual
---

Retrigger conversions for an organization dataset.

### Options

<dl class="flags">
   <dt><code>dataset-id</code></dt>
   <dd>Dataset ID</dd>

   <dt><code>--status</code></dt>
   <dd>Statuses to retrigger. Repeat or pass comma-separated values</dd>

   <dt><code>--scope</code></dt>
   <dd>Predefined retrigger scope<br/>Possible values: <code>default-non-success | all-statuses | errors-and-canceled | canceled-only | in-progress-only | success-only | queued-only</code></dd>

   <dt><code>--confirm</code></dt>
   <dd>Skip the confirmation prompt<br/>Default value: <code>false</code></dd>

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