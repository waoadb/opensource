---
title: Stock Availability
description: How to use the Stock Availability API with Different Breed ®.
---

# Stock Availability

> This API will be released soon.

## Overview

Different Breed ® handles stock availability in real-time, with a 1-minute cache to optimize experiences during peak times. To achieve this, we have split the [Performance Stock](https://waoadb-opensource.stoplight.io/docs/open-source/x8ntsp0jhehgf-cache-performance) and Stock Availability (Coming Soon!) into separate APIs. This allows us to cache the performance stock for a long period while keeping the availability of that stock readily available.

To display the stock performance to the end-user, simply make two API calls:

- Call 1: Retrieve the [performance stock data](https://waoadb-opensource.stoplight.io/docs/open-source/280390d94dbdb-retrieve-event-performance).
- Call 2: Retrieve the performance stock availability.

Both of these calls can be run in parallel to speed up loading times for the end-user.

## Availability Conditions

<img src="/stock/availability.png" alt="Availability process diagram" data-image-zoom width="100%" height="auto"/>

When calling the Availability API, our platform takes the following factors into account to provide the most accurate available stock:

- Cart Items: References any active cart entries and counts the tickets as reserved.
- Sold Items: References the number of sold tickets per performance.
- Calculations: Takes into consideration the accessibility engine rules to ensure accurate accessibility information is returned for each ticket.

We then respond with an Availability entry which you can pair with the stock entry you already have based on the `ticket_id` for tickets and `addon_id` for add-ons.
