---
title: "zoo org dataset conversions"
excerpt: "List or search conversions for an organization dataset."
layout: manual
---

List or search conversions for an organization dataset.

### Subcommands

* [zoo org dataset conversions list](./zoo_org_dataset_conversions_list)
* [zoo org dataset conversions search](./zoo_org_dataset_conversions_search)

### Options

<dl class="flags">
   <dt><code>dataset-id</code></dt>
   <dd>Dataset ID. If no subcommand is provided, conversions are listed</dd>

   <dt><code>--status</code></dt>
   <dd>Filter by conversion status when listing</dd>

   <dt><code>--limit</code></dt>
   <dd>Maximum number of items returned by one API call</dd>

   <dt><code>--page-token</code></dt>
   <dd>Token returned by a previous list call</dd>

   <dt><code>--sort-by</code></dt>
   <dd>Sort order<br/>Possible values: <code>created-at-ascending | created-at-descending | status-ascending | status-descending | updated-at-ascending | updated-at-descending</code></dd>

   <dt><code>--paginate</code></dt>
   <dd>Follow pagination until every conversion is returned<br/>Default value: <code>false</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### See also

* [zoo org](./zoo_org)
* [zoo org dataset](./zoo_org_dataset)