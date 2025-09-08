---
title: "zoo start-session"
excerpt: "Starts a modeling session."
layout: manual
---

Starts a modeling session.

### Options

<dl class="flags">
   <dt><code>listen_on</code></dt>
   <dd>What host/port to accept KCL programs on<br/>Default value: <code>0.0.0.0:3333</code></dd>

   <dt><code>num_engine_connections</code></dt>
   <dd>How many engine connections to use in the connection pool<br/>Default value: <code>1</code></dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>--host</code></dt>
   <dd>Zoo API host to use for all commands (e.g., "api.zoo.dev" or "http://localhost:8888"). Overrides the configured default host</dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

This command starts a server on localhost (on the configurable interface), and
waits to receive KCL programs over that server. It also connects to the KittyCAD
API and keeps the connection alive until this process is stopped. When it receives
a KCL program over the local server, it executes it using the long-lived KittyCAD
connection.

This subcommand is designed to be used with `zoo kcl snapshot --session localhost:3333`,
which will reuse the existing connection started by `zoo start-session localhost:3333`.