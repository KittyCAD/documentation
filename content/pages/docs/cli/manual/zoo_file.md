---
title: "zoo file"
excerpt: "Perform operations on CAD files."
layout: manual
---

Perform operations on CAD files.

### Subcommands

* [zoo file convert](./zoo_file_convert)
* [zoo file snapshot](./zoo_file_snapshot)
* [zoo file volume](./zoo_file_volume)
* [zoo file mass](./zoo_file_mass)
* [zoo file center-of-mass](./zoo_file_center-of-mass)
* [zoo file density](./zoo_file_density)
* [zoo file surface-area](./zoo_file_surface-area)
* [zoo file help](./zoo_file_help)

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
$ zoo file convert --output-format=obj ./input.step ./
```