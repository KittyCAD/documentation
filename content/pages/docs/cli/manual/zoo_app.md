---
title: "zoo app"
excerpt: "Open a directory or file in the Zoo Modeling App on your desktop."
layout: manual
---

Open a directory or file in the Zoo Modeling App on your desktop.

### Options

<dl class="flags">
   <dt><code>path</code></dt>
   <dd>The path to the file or directory to open in the app</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

If you do not have the app installed, you will be prompted to download it.

```
$ zoo app .

$ zoo app main.kcl

$ zoo app ../main.kcl
```