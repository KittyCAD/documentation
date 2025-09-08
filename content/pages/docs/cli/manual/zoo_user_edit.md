---
title: "zoo user edit"
excerpt: "Edit user settings."
layout: manual
---

Edit user settings.

### Options

<dl class="flags">
   <dt><code>-c/--company</code></dt>
   <dd>The user's company</dd>

   <dt><code>--discord</code></dt>
   <dd>The user's Discord handle</dd>

   <dt><code>-f/--first-name</code></dt>
   <dd>The user's first name</dd>

   <dt><code>-g/--github</code></dt>
   <dd>The user's GitHub handle</dd>

   <dt><code>-i/--image</code></dt>
   <dd>The image URL for the user. NOTE: If the user uses an OAuth2 provider, this will be overwritten by the provider's image URL when the user logs in next</dd>

   <dt><code>-o/--is-onboarded</code></dt>
   <dd>If the user is now onboarded<br/>Possible values: <code>true | false</code></dd>

   <dt><code>-l/--last-name</code></dt>
   <dd>The user's last name</dd>

   <dt><code>-p/--phone</code></dt>
   <dd>The user's phone number<br/>Default value: <code></code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help</dd>
</dl>


### See also

* [zoo user](./zoo_user)