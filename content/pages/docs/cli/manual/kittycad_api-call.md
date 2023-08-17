---
title: "kittycad api-call"
excerpt: "Perform operations on CAD files."
layout: manual
---

Perform operations on CAD files.

### Subcommands

* [kittycad api-call status](./kittycad_api-call_status)
* [kittycad api-call help](./kittycad_api-call_help)

### Options

<dl class="flags">
   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# convert a step file to an obj file
$ kittycad file convert ./input.step ./output.obj
```