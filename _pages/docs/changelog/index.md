---
title: 'Changelog'
description: 'Documented changes made to KittyCAD over time.'
---

## _14 July 2022_

### General

-   Billing has been turned on for all `non-beta` endpoints, specifically only for calls that actually do something (`POST`). (Why would we charge you for making an api call to check status on the api? That'd be insane.) Check out our [product page](https://kittycad.io/product) for more information.

### What's New (`Beta`)

> _I mean it's a first product launch, so technically everythings "new", but here's the low-down of what is actually "new new" around here._

-   Interactive [docs](https://docs.kittycad.io/api) && [tutorials](https://docs.kittycad.io/tutorials) in most of the available client libraries, so pick your poison - go ([docs](https://docs.kittycad.io/api/authentication?lang=go), [lib](https://github.com/KittyCAD/kittycad.go)), python ([docs](https://docs.kittycad.io/api/authentication?lang=python), [lib](https://github.com/KittyCAD/kittycad.py)), rust ([docs](https://docs.kittycad.io/api/authentication?lang=rust), [lib](https://github.com/KittyCAD/kittycad.rs)) - and peruse through them all ~ 🗒️.
-   [Metric unit conversions](https://docs.kittycad.io/api/convert-units). Small for now, but soon-to-be mighty 💪.
-   [Mass](https://docs.kittycad.io/api/get-cad-file-mass) endpoint calculation for if you really want to know how much it'll weigh on the moon 🌘.
-   [Volume](https://docs.kittycad.io/api/get-cad-file-volume) endpoint calculation, aka how much space would the thing take up if the thing could take up space (~ I mean if the thing could take up space, it obviously would take up as much space as it should, but this is more to tell if it could take up space, this is how much space it would 🪵).
-   [Density](https://docs.kittycad.io/api/get-cad-file-density) endpoint calculation, so if you got a file, we can tell ya if it might float 🌊.

### (`Beta`) to Stable

-   [File conversions](https://docs.kittycad.io/api/convert-cad-file) have been moved out of `beta`. More formats coming soon ~ 👀.
