---
title: 'kittycad alias set'
excerpt: 'Create a shortcut for a `kittycad` command.'
layout: manual
---

Create a shortcut for a `kittycad` command.

### Options

<dl class="flags">
   <dt><code>alias</code></dt>
   <dd>The alias to set</dd>

   <dt><code>expansion</code></dt>
   <dd>The expansion of the alias</dd>

   <dt><code>-s/--shell</code></dt>
   <dd>Declare an alias to be passed through a shell interpreter</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help information</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info</dd>
</dl>

### About

Define a word that will expand to a full `kittycad` command when invoked.

The expansion may specify additional arguments and flags. If the expansion includes
positional placeholders such as "$1", extra arguments that follow the alias will be
inserted appropriately. Otherwise, extra arguments will be appended to the expanded
command.

Use "-" as expansion argument to read the expansion string from standard input. This
is useful to avoid quoting issues when defining expansions.

If the expansion starts with "!" or if "--shell" was given, the expansion is a shell
expression that will be evaluated through the "sh" interpreter when the alias is
invoked. This allows for chaining multiple commands via piping and redirection.

### See also

-   [kittycad alias](./kittycad_alias)
