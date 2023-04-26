---
title: Different Breed ® Platform
description: How does Different Breed ® fit into my solution?
---

# Different Breed ® Platform

## Overview

Different Breed ® is a fully API-driven event management and ticketing solution that prioritizes composability. We follow the MACH architecture standard, which enables businesses to choose the technical solutions that work best for them and connect them together.

<img src="/getting-started/where-we-fit.png" alt="Where different breed fits example" data-image-zoom width="100%" height="auto"/>

Put simply, we believe that technology providers should offer a Lego-type experience where the base solution is the Lego board and the providers are the bricks used to bring your vision to life.

With this in mind, Different Breed ® focuses on essential features and doesn't try to be more than it needs to be. We handle event management, ticketing, after-sales and check-in, while allowing our customers full control over checkout and payment providers.

## Headless & Composable

At its core, Different Breed ® is designed to be completely headless. We have no influence over the technology stack you use or the way you wish to integrate with us. We do provide development kits for popular languages to assist with the more complex parts, but the experience is otherwise completely under your control.

Our platform is also designed to easily integrate with other providers. Think of it this way: Different Breed ® handles the ticketing and events, while the rest is up to you! You can bring in the CMS and CRM of your choice and connect them via our API.

As a business and platform, we aim to be a solution that fits into and empowers your technical vision, rather than limiting it.

## How does Different Breed fit into my solution?

Our composable core is designed to work best with other providers, such as CMS and CRM systems. However, it is also strong enough to stand on its own for simpler experiences.

As a platform, we should be integrated for the following aspects of your experience:

- [Event Information](https://waoadb-opensource.stoplight.io/docs/open-source/6nf3wkiybtq0n-events) - We provide event details, including SEO, refund policy, and much more.
- [Venue Information](https://waoadb-opensource.stoplight.io/docs/open-source/x1ctkaabyubfm-venues) - We provide venue details.
- [Profile Information](https://waoadb-opensource.stoplight.io/docs/open-source/1t6o7hc011676-profiles) - We provide profile details, including support details.
- [Performance Information](https://waoadb-opensource.stoplight.io/docs/open-source/uxqtt87xy8ge2-performances-and-stock) - We provide performance details.
- [Tickets & Addons](https://waoadb-opensource.stoplight.io/docs/open-source/d23028ddab6b4-add-ticket) - We provide stock information for an event performance.
- [Cart Provider](https://waoadb-opensource.stoplight.io/docs/open-source/tw0dfszlkili2-cart-and-checkout) - We provide an API-driven cart for you to use.
- [Checkout Forms](https://opensource.differentbreed.events/docs/getting-started/checkout) - We handle the forms to enable the collected data to be controlled within the Different Breed ® Platform.

Refer to the [Cart](https://opensource.differentbreed.events/docs/getting-started/cart) & [Checkout](https://opensource.differentbreed.events/docs/getting-started/checkout) pages for more details on how these features should be integrated.

Below are some high-level examples of how Different Breed ® can fit into your next project.

### Standalone

<img src="/getting-started/stand-alone.png" alt="Stand alone solution example" data-image-zoom width="100%" height="auto"/>

In a standalone experience, we act as the source of truth for all data that is sent to the end user. You can then build a micro-service or lambda layer to orchestrate your CRM and payment provider of choice.

### Composable

<img src="/getting-started/composable.png" alt="Composable solution example" data-image-zoom width="100%" height="auto"/>

In a composable experience, we serve as the source of truth for event and stock data that is sent to the end user. This can be combined with, or served alongside, a CMS page to provide a more customised experience for the user.

Additionally, you can build a micro-service or lambda layer to orchestrate your preferred CRM and payment provider.
