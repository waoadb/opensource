---
title: Cart
description: How the Different Breed ® cart works.
---

# Cart

## Overview

Different Breed® offers a fully headless cart experience driven by APIs. This means that when building out your experience, you can choose the best way to display the cart and the items within it to your user.

In the simplest terms, we sit in the background and provide the information that you present to the user.

By using our [React SDK](https://opensource.differentbreed.events/docs/development-kits/react), you can present this information through a [context provider](https://opensource.differentbreed.events/docs/development-kits/react#using-the-cart-hook) and a [custom hook](https://opensource.differentbreed.events/docs/development-kits/react#using-the-cart-hook). Our [Default Theme](https://github.com/waoadb/opensource/tree/production/apps/themes-default) also serves as a great example of how to integrate.

## Cart Building Flow

When interacting with the cart, there are a few key concepts that you need to understand.

- Cart Expiry - A cart expiry time can be set by the user within their profile settings. This is the length of time that a cart can remain idle before being marked as expired.
- [Customer](https://opensource.differentbreed.events/docs/getting-started/customers) - Before a cart can be processed it must have a [customer attached](https://waoadb-opensource.stoplight.io/docs/open-source/f09db38afd55f-attach-customer) to it. For details on customers, please refer to our docs on [customer management].
- [Cart Entries](https://opensource.differentbreed.events/docs/getting-started/cart#cart-entries) - Entries within a cart are defined by the performance of the event and not the event itself. A more details overview is provided in the [section below].
- [Stock](https://opensource.differentbreed.events/docs/getting-started/cart#stock) - [Ticket’s](https://waoadb-opensource.stoplight.io/docs/open-source/d23028ddab6b4-add-ticket) and [Addons](https://waoadb-opensource.stoplight.io/docs/open-source/e6f2f086d3142-add-addon) can be added to a cart.
- [Fees](https://opensource.differentbreed.events/docs/getting-started/cart#fees--discounts) - [Fee’s](https://waoadb-opensource.stoplight.io/docs/open-source/a594fbb7469bf-add-fee) can be added at the cart entry level, Any fee’s should be handled by your backend system and the order total will update to reflect once applied.
- [Discounts](https://opensource.differentbreed.events/docs/getting-started/cart#fees--discounts) - [Discounts](https://waoadb-opensource.stoplight.io/docs/open-source/3dd62855dcc1d-add-discount) can be added at the cart entry level, Any discounts should be handled by your backend system and the order total will update to reflect once applied.

<img src="/cart/cart-building-flow.png" alt="Cart building flow diagram" data-image-zoom width="100%" height="auto"/>

From an API perspective, the process of creating and managing a cart can be broken down into the following steps:

- Create Cart - [Create the cart](https://waoadb-opensource.stoplight.io/docs/open-source/ba086fe212137-create-cart) for the user. This can be anonymous or assigned to a customer.
- Add Stock - Allow the user to add [Tickets](https://waoadb-opensource.stoplight.io/docs/open-source/d23028ddab6b4-add-ticket) and [Addons](https://waoadb-opensource.stoplight.io/docs/open-source/e6f2f086d3142-add-addon) to the cart.
- Apply Alterations - Attach relevant [Discounts](https://waoadb-opensource.stoplight.io/docs/open-source/3dd62855dcc1d-add-discount) & [Fees](https://waoadb-opensource.stoplight.io/docs/open-source/a594fbb7469bf-add-fee).
- Attach Customer - [Assign a customer](https://waoadb-opensource.stoplight.io/docs/open-source/f09db38afd55f-attach-customer) to the cart.
- Send user to checkout
- Pending Sale - Mark the order as [pending sale](https://waoadb-opensource.stoplight.io/docs/open-source/5b1637a8114fe-mark-cart-pending-sale) by sending the collected attendee and customer information.
- Take Payment - Process the payment using a payment processor of your choice.
- Mark Sold - Tell Different Breed ® that the cart has [been sold](https://waoadb-opensource.stoplight.io/docs/open-source/3d33499c47a1d-mark-cart-sold) and they will handle the rest!

And that's it! Once the order is complete, simply create a new cart and follow the same flow for the next purchase.

## Cart Entries

We handle the cart intelligently to simplify order management in our backend sales portal. Each [cart entry](https://waoadb-opensource.stoplight.io/docs/open-source/6osfc4e1snjj6-cart-entry) represents a performance on the platform, and each cart entry is processed as a separate order to simplify information provided to the end user.

For example, if a user books 2 performances for a single event, we treat this as a single cart with a single payment required. When the order is processed, we split the cart by performance and process it as 2 separate orders. This allows the box office to manage each performance individually and apply related actions, such as refunds, to each performance in isolation.

## Stock

Within the cart experience, users should be able to add [tickets](https://waoadb-opensource.stoplight.io/docs/open-source/d23028ddab6b4-add-ticket) and [addons](https://waoadb-opensource.stoplight.io/docs/open-source/e6f2f086d3142-add-addon). Stock data can be retrieved on a per-performance basis, alongside the availability, which can also be retrieved for each performance.

Each stock item will contain key properties to help shape the validation logic presented to users. This includes:

- Min Quantity: The minimum quantity allowed per performance.
- Max Quantity: The maximum quantity allowed per performance.

It is important to note that we have a single restriction within the system: an [addon](https://waoadb-opensource.stoplight.io/docs/open-source/e6f2f086d3142-add-addon) may only be purchased with a ticket. This means that if a user removes the tickets from the cart entry for a performance, you should notify the user that at least one ticket is required to purchase an addon for the desired [performance.](http://performance.You)

When you remove a ticket and its addons from the cart, our service will automatically remove any empty cart entries, making it easy to maintain your cart.

## Fees & Discounts

Both fees and discounts can be added to a cart using the admin level API. To ensure that a client-side user cannot manipulate the pricing of a cart, we require a backend service to make these requests. There are no limits on the number of fees and discounts that you can add to a cart entry. Once applied, the cart totals will update to reflect the alterations.
