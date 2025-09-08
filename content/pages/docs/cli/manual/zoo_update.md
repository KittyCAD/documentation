---
title: "zoo update"
excerpt: "Update the current running binary to the latest version."
layout: manual
---

Update the current running binary to the latest version.

### Options

<dl class="flags">
   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

This function will return an error if the current binary is under Homebrew or if
the running version is already the latest version.