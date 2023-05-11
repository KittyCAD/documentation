---
title: 'kittycad'
excerpt: 'Work seamlessly with KittyCAD from the command line'
---

Work seamlessly with KittyCAD from the command line

### Subcommands

-   [kittycad alias](./kittycad_alias)
-   [kittycad api](./kittycad_api)
-   [kittycad api-call](./kittycad_api-call)
-   [kittycad auth](./kittycad_auth)
-   [kittycad completion](./kittycad_completion)
-   [kittycad config](./kittycad_config)
-   [kittycad drake](./kittycad_drake)
-   [kittycad file](./kittycad_file)
-   [kittycad generate](./kittycad_generate)
-   [kittycad open](./kittycad_open)
-   [kittycad update](./kittycad_update)
-   [kittycad user](./kittycad_user)
-   [kittycad version](./kittycad_version)
-   [kittycad help](./kittycad_help)

### Options

<dl class="flags">
   <dt><code>-h/--help</code></dt>
   <dd>Print help information</dd>

   <dt><code>-V/--version</code></dt>
   <dd>Print version information</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info</dd>
</dl>

### About

You've never CAD it so good.

Environment variables that can be used with `kittycad`.

KITTYCAD_TOKEN: an authentication token for KittyCAD API requests. Setting this avoids being prompted to authenticate and takes precedence over previously stored credentials.

KITTYCAD_HOST: specify the KittyCAD hostname for commands that would otherwise assume the "api.kittycad.io" host.

KITTYCAD_BROWSER, BROWSER (in order of precedence): the web browser to use for opening links.

DEBUG: set to any value to enable verbose output to standard error.

KITTYCAD_PAGER, PAGER (in order of precedence): a terminal paging program to send standard output to, e.g. "less".

NO_COLOR: set to any value to avoid printing ANSI escape sequences for color output.

CLICOLOR: set to "0" to disable printing ANSI colors in output.

CLICOLOR_FORCE: set to a value other than "0" to keep ANSI colors in output even when the output is piped.

KITTYCAD_FORCE_TTY: set to any value to force terminal-style output even when the output is redirected. When the value is a number, it is interpreted as the number of columns available in the viewport. When the value is a percentage, it will be applied against the number of columns available in the current viewport.

KITTYCAD_NO_UPDATE_NOTIFIER: set to any value to disable update notifications. By default, `kittycad` checks for new releases once every 24 hours and displays an upgrade notice on standard error if a newer version was found.

KITTYCAD_CONFIG_DIR: the directory where `kittycad` will store configuration files. Default: `$XDG_CONFIG_HOME/kittycad` or `$HOME/.config/kittycad`.
