---
title: "zoo ml kcl copilot"
excerpt: "Start an interactive Copilot chat for KCL in the current project directory."
layout: manual
---

Start an interactive Copilot chat for KCL in the current project directory.

### Options

<dl class="flags">
   <dt><code>--project-name</code></dt>
   <dd>Optional project name to associate with messages</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

Requires the current directory to contain a `main.kcl` file.

```
$ zoo ml kcl copilot
```

### Slash Commands

* `/accept` Apply all pending edits to the checked-out files and clear the diff queue.
* `/bye` Send the `bye` system directive to the Copilot service.
* `/exit` Exit the Copilot session immediately (alias of /quit).
* `/new` Send the `new` system directive to the Copilot service.
* `/quit` Exit the Copilot session immediately (alias of /exit).
* `/reject` Discard the current set of pending edits without applying them.
* `/render` Render a side-by-side snapshot preview for the current edits.
* `/tool` Show which tools are currently required for the next prompt.
* `/tool clear` Clear all tool requirements before the next prompt is sent.
* `/tool edit_kcl_code` Toggle the `edit_kcl_code` tool requirement for upcoming prompts.
* `/tool mechanical_knowledge_base` Toggle the `mechanical_knowledge_base` tool requirement for upcoming prompts.
* `/tool text_to_cad` Toggle the `text_to_cad` tool requirement for upcoming prompts.
* `/tool web_search` Toggle the `web_search` tool requirement for upcoming prompts.

### See also

* [zoo ml](./zoo_ml)
* [zoo ml kcl](./zoo_ml_kcl)