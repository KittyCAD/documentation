---
title: "zoo open"
excerpt: "Shortcut to open the Zoo documentation or Account in your browser."
layout: manual
---

Shortcut to open the Zoo documentation or Account in your browser.

### Options

<dl class="flags">
   <dt><code>shortcut</code></dt>
   <dd><br/>Possible values: <code>docs | api-ref | cli-ref | account | discord | store | blog | repo | changelog</code><br/>Default value: <code>docs</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

If no arguments are given, the default is to open the Zoo documentation.

```
# open the Zoo docs in your browser
$ zoo open docs

# open your Zoo account in your browser
$ zoo open account
```