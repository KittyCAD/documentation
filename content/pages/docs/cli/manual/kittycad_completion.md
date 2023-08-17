---
title: "kittycad completion"
excerpt: "Generate shell completion scripts."
layout: manual
---

Generate shell completion scripts.

### Options

<dl class="flags">
   <dt><code>-s/--shell</code></dt>
   <dd>The shell type<br/>Possible values: <code>bash | elvish | fish | powershell | zsh</code><br/>Default value: <code>bash</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

When installing `kittycad` CLI through a package manager, it's possible that
no additional shell configuration is necessary to gain completion support. For
Homebrew, see [https://docs.brew.sh/Shell-Completion](https://docs.brew.sh/Shell-Completion).

If you need to set up completions manually, follow the instructions below. The exact
config file locations might vary based on your system. Make sure to restart your
shell before testing whether completions are working.

### bash

First, ensure that you install `bash-completion` using your package manager.

After, add this to your `~/.bash_profile`:

```
eval "$(kittycad completion -s bash)"
```

### zsh

Generate a `_kittycad` completion script and put it somewhere in your `$fpath`:

```
kittycad completion -s zsh > /usr/local/share/zsh/site-functions/_kittycad
```

Ensure that the following is present in your `~/.zshrc`:

```
autoload -U compinit
compinit -i
```

Zsh version 5.7 or later is recommended.

### fish

Generate a `kittycad.fish` completion script:

```
kittycad completion -s fish > ~/.config/fish/completions/kittycad.fish
```

### PowerShell

Open your profile script with:

```
mkdir -Path (Split-Path -Parent $profile) -ErrorAction SilentlyContinue
notepad $profile
```

Add the line and save the file:

```
Invoke-Expression -Command $(kittycad completion -s powershell | Out-String)
```