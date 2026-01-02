---
title: "Axis2d"
subtitle: "Type in std::types"
excerpt: "An abstract and infinite line in 2d space."
layout: manual
---

An abstract and infinite line in 2d space.

An axis is defined by its origin and direction. An axis is abstract
in the sense that it is not part of the objects being drawn.

An axis can be created in several ways:
- you can use one of the default axes, e.g., [`X`](/docs/kcl-std/consts/std-X).
- you can define an entirely custom axis, e.g.,

```js
myX = {
  origin = [0, 0],
  direction = [1, 0],
}
```




