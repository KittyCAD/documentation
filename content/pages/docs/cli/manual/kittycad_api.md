---
title: "kittycad api"
excerpt: "Makes an authenticated HTTP request to the KittyCAD API and prints the response."
layout: manual
---

Makes an authenticated HTTP request to the KittyCAD API and prints the response.

### Options

<dl class="flags">
   <dt><code>endpoint</code></dt>
   <dd>The endpoint to request</dd>

   <dt><code>-X/--method</code></dt>
   <dd>The HTTP method for the request</dd>

   <dt><code>--paginate</code></dt>
   <dd>Make additional HTTP requests to fetch all pages of results<br/>Default value: <code>false</code></dd>

   <dt><code>-F/--field</code></dt>
   <dd>Add a typed parameter in key=value format</dd>

   <dt><code>-f/--raw-field</code></dt>
   <dd>Add a string parameter in key=value format</dd>

   <dt><code>--input</code></dt>
   <dd>The file to use as body for the HTTP request (use "-" to read from standard input)<br/>Default value: <code></code></dd>

   <dt><code>-i/--include</code></dt>
   <dd>Include HTTP response headers in the output<br/>Default value: <code>false</code></dd>

   <dt><code>-H/--header</code></dt>
   <dd>Add a HTTP request header in `key:value` format</dd>

   <dt><code>-d/--debug</code></dt>
   <dd>Print debug info<br/>Default value: <code>false</code></dd>

   <dt><code>-h/--help</code></dt>
   <dd>Print help (see a summary with '-h')</dd>
</dl>


### About

The endpoint argument should be a path of a KittyCAD API endpoint.

The default HTTP request method is "GET" normally and "POST" if any parameters
were added. Override the method with `--method`.

Pass one or more `-f/--raw-field` values in "key=value" format to add static string
parameters to the request payload. To add non-string or otherwise dynamic values, see
`--field` below. Note that adding request parameters will automatically switch the
request method to POST. To send the parameters as a GET query string instead, use
`--method GET`.

The `-F/--field` flag has magic type conversion based on the format of the value:

* literal values "true", "false", "null", and integer/float numbers get converted to
  appropriate JSON types;
* if the value starts with "@", the rest of the value is interpreted as a
  filename to read the value from. Pass "-" to read from standard input.

Raw request body may be passed from the outside via a file specified by `--input`.
Pass "-" to read from standard input. In this mode, parameters specified via
`--field` flags are serialized into URL query parameters.

In `--paginate` mode, all pages of results will sequentially be requested until
there are no more pages of results.