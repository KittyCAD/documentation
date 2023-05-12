---
title: cookie
excerpt: A bit of data stored in your browser for a site to remember you by
synonyms:
    - tracker
    - session cookie
---

A cookie in the web development refers to a bit of data that a website or web service is allowed to save in your browser to remember who you are while you browse.

The term "tracker" usually refers to marketing analytics cookies—like those from Google and other ad companies—that identify your web identity and sell your trail of cookies across the web, because they are worth more as a whole than they are on their own. This is bad and we at KittyCAD don't love it.

We use cookies to validate sessions with the KittyCAD API. When you access certain services from our API, we send back a session cookie, and then ask for it back periodically to ensure it's still really you asking for our services. You as a developer have to keep our cookie around to send back to us and revalidate your session.
