---
title: "zoo"
excerpt: "Work seamlessly with Zoo from the command line"
layout: manual
---

Work seamlessly with Zoo from the command line

### Subcommands

* [zoo alias](./zoo_alias)
* [zoo api](./zoo_api)
* [zoo api-call](./zoo_api-call)
* [zoo app](./zoo_app)
* [zoo auth](./zoo_auth)
* [zoo completion](./zoo_completion)
* [zoo config](./zoo_config)
* [zoo drake](./zoo_drake)
* [zoo file](./zoo_file)
* [zoo generate](./zoo_generate)
* [zoo kcl](./zoo_kcl)
* [zoo ml](./zoo_ml)
* [zoo say](./zoo_say)
* [zoo start-session](./zoo_start-session)
* [zoo open](./zoo_open)
* [zoo update](./zoo_update)
* [zoo user](./zoo_user)
* [zoo version](./zoo_version)

### Options

<dl class="flags">
   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>

   <dt><code>-V/--version</code></dt>
   <dd>Print version</dd>
</dl>


### About

You've never CAD it so good.

Environment variables that can be used with `zoo`.

ZOO_API_TOKEN: an authentication token for Zoo API requests. Setting this avoids being prompted to authenticate and takes precedence over previously stored credentials.

ZOO_HOST: specify the Zoo hostname for commands that would otherwise assume the "api.zoo.dev" host.

ZOO_BROWSER, BROWSER (in order of precedence): the web browser to use for opening links.

DEBUG: set to any value to enable verbose output to standard error.

ZOO_PAGER, PAGER (in order of precedence): a terminal paging program to send standard output to, e.g. "less".

NO_COLOR: set to any value to avoid printing ANSI escape sequences for color output.

CLICOLOR: set to "0" to disable printing ANSI colors in output.

CLICOLOR_FORCE: set to a value other than "0" to keep ANSI colors in output even when the output is piped.

ZOO_FORCE_TTY: set to any value to force terminal-style output even when the output is redirected. When the value is a number, it is interpreted as the number of columns available in the viewport. When the value is a percentage, it will be applied against the number of columns available in the current viewport.

ZOO_NO_UPDATE_NOTIFIER: set to any value to disable update notifications. By default, `zoo` checks for new releases once every 24 hours and displays an upgrade notice on standard error if a newer version was found.

ZOO_CONFIG_DIR: the directory where `zoo` will store configuration files. Default: `$XDG_CONFIG_HOME/zoo` or `$HOME/.config/zoo`.
