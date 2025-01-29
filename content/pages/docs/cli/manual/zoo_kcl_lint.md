---
title: "zoo kcl lint"
excerpt: "Lint a KCL file for style issues."
layout: manual
---

Lint a KCL file for style issues.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input file. This can also be the path to a directory containing a main.kcl file. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>--descriptions</code></dt>
   <dd>Print a long-form description of what the issue is, and the rational behind why<br/>Default value: <code>false</code></dd>

   <dt><code>-s/--show-code</code></dt>
   <dd>Show where the offending KCL source code is<br/>Default value: <code>false</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# check a file for issues
$ zoo kcl lint my-file.kcl

# pass a file from stdin
$ cat my-file.kcl | zoo kcl lint -
```

### See also

* [zoo kcl](./zoo_kcl)