---
title: "kittycad file"
excerpt: "Perform operations on CAD files."
layout: manual
---

Perform operations on CAD files.

### Subcommands

* [kittycad file convert](./kittycad_file_convert)
* [kittycad file volume](./kittycad_file_volume)
* [kittycad file mass](./kittycad_file_mass)
* [kittycad file center-of-mass](./kittycad_file_center-of-mass)
* [kittycad file density](./kittycad_file_density)
* [kittycad file surface-area](./kittycad_file_surface-area)
* [kittycad file help](./kittycad_file_help)

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
$ kittycad file convert --output-format=obj ./input.step ./
```