---
title: "LinearPattern2dData"
excerpt: "Data for a linear pattern on a 2D sketch."
layout: manual
---

Data for a linear pattern on a 2D sketch.

**Type:** `object`





## Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `repetitions` |[`Uint`](/docs/kcl/types/Uint)| The number of repetitions. Must be greater than 0. This excludes the original entity. For example, if `repetitions` is 1, the original entity will be copied once. | No |
| `distance` |`number`| The distance between each repetition. This can also be referred to as spacing. | No |
| `axis` |`[number, number]`| The axis of the pattern. This is a 2D vector. | No |


