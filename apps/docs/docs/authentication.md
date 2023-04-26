---
title: Authentication
description: "How we approach authentication in Different Breed ® API's"
---

# Authentication

## Overview

Different Breed ® uses a combination of `Client` and `Admin` level API keys to authenticate requests. You can create these keys within your profile settings on the platform, and a unique set should be created for each application that you want to connect to our services.

API keys do not expire and will be valid until revoked within your profile settings. Once a key is revoked, the platform will immediately start denying requests from the revoked keys.

## Client Key

This key is intended for use with API endpoints designed to run on the client side of a website. As such, it is safe to expose to end users, as it does not provide access to any sensitive information.

## Admin Key

The Admin Key is intended for use with API endpoints that require access to sensitive information. It should be kept secret and not exposed to end users. It provides access to additional functionality not available with the Client Key.

## Rate Limits

As a platform, we have implemented rate limiting to prevent misuse of our APIs. When implementing solutions, please ensure that you do not exceed the limit of 250 requests per 10 seconds that we have imposed.

If you require more than the default limit of requests, please contact [Different Breed ®](https://differentbreed.events/) directly to discuss our more advanced API offerings.
