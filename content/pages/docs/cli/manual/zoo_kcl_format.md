---
title: "zoo kcl format"
excerpt: "Format a `kcl` file."
layout: manual
---

Format a `kcl` file.

### Options

<dl class="flags">
   <dt><code>input</code></dt>
   <dd>The path to the input kcl file to format. If you pass `-` as the path, the file will be read from stdin</dd>

   <dt><code>-w/--write</code></dt>
   <dd>Write the output back to the original file. This will fail if the input is from stdin<br/>Default value: <code>false</code></dd>

   <dt><code>-t/--tab-size</code></dt>
   <dd>Size of a tab in spaces<br/>Default value: <code>2</code></dd>

   <dt><code>--use-tabs</code></dt>
   <dd>Prefer tabs over spaces<br/>Default value: <code>false</code></dd>

   <dt><code>--insert-final-newline</code></dt>
   <dd>How to handle the final newline in the file. If true, ensure file ends with a newline. If false, ensure file does not end with a newline<br/>Default value: <code>true</code></dd>

   <dt><code>-f/--format</code></dt>
   <dd>Command output format<br/>Possible values: <code>json | yaml | table</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

```
# Output to stdout by default
$ zoo kcl fmt my-file.kcl

# Overwrite the file
$ zoo kcl fmt -w my-file.kcl

# Pass a file to format from stdin
$ cat my-obj.kcl | zoo kcl fmt
```

### See also

* [zoo kcl](./zoo_kcl)