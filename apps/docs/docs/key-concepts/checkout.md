---
title: Checkout
description: How to checkout with Different Breed ®.
---

# Checkout

## Overview

Different Breed ® offers a flexible and fully customisable checkout experience. We provide easy-to-use [APIs](https://waoadb-opensource.stoplight.io/docs/open-source/tw0dfszlkili2-cart-and-checkout) and a [React SDK](/docs/development-kits/react#checkout-forms) that can solve complex areas such as [forms](/docs/development-kits/react#checkout-forms). You can focus on creating any checkout experience you desire, with full control over the design and implementation.

## Collected Details

At checkout, we require the user to provide certain data. The fields to be collected can be configured in the Different Breed ® backend on an event basis by the event coordinator.

<img src="/checkout/checkout-forms.png" alt="Checkout forms diagram" data-image-zoom width="100%" height="auto"/>

When a cart is ready for checkout, you can call the [checkout config](https://waoadb-opensource.stoplight.io/docs/open-source/11223af820471-retrieve-checkout-config) endpoint to retrieve the fields that need to be collected for each [entry](https://waoadb-opensource.stoplight.io/docs/open-source/6osfc4e1snjj6-cart-entry) in the cart.

This part of the system can be complex. To simplify integration, we have developed a [Checkout Form](/docs/development-kits/react#checkout-forms) that can be easily customised visually.

We strongly advise using our packages to handle the checkout data collection. If you choose to implement the forms manually, the following fields can be applied:

### Core Fields

Core Fields are data collection fields that are defined by the system. They can be enabled and set as required in the event configuration on Different Breed ®.

| Field            | Field Type |
| ---------------- | ---------- |
| title            | string     |
| first_name       | string     |
| surname          | string     |
| email            | string     |
| mobile_phone     | string     |
| work_phone       | string     |
| billing_address  | object     |
| shipping_address | object     |
| job_title        | string     |
| company_name     | string     |
| gender           | string     |
| website_url      | string     |

Both Billing & Shipping address fields are:

| Field          | Field Type |
| -------------- | ---------- |
| name           | string     |
| address_line_1 | string     |
| address_line_2 | string     |
| address_line_3 | string     |
| postcode       | string     |
| city           | string     |
| country        | string     |

The fields returned from the API will be in the format of `{FIELD NAME}_required` and `{FIELD_NAME}_enabled`, which identify the enabled and required fields for validation.

### Custom Fields

We also support the ability to define custom fields that will be collected during checkout. Custom fields can be defined as `text` or `textarea`, and the object will be presented like so within the [checkout config](https://waoadb-opensource.stoplight.io/docs/open-source/11223af820471-retrieve-checkout-config).

```tsx
{
  "field_id": "e68e30b1-d177-4632-b748-463bcd0eedc6",
  "field_name": "Order Notes",
  "field_type": "text",
  "field_enabled": true,
  "field_required": true
}
```

## Collection Method

When collecting information during checkout, we have two possible methods for data collection. Each method defines the amount of data we collect from the customer for each event. The two types of collection methods are defined as follows:

### Attendee

Data must be collected for each ticket purchased for a performance at the attendee level. Therefore, a form must be displayed for each ticket within a cart entry when checking out to collect details about the attendee.

The form would be displayed as follows:

```tsx
EVENT NAME
PERFORMANCE_DATE

General Admission
Title:
First Name:
Surname:

General Admission
Title:
First Name:
Surname:

General Admission
Title:
First Name:
Surname:
```

### Customer

Data must be collected for a single customer. This data will be applied to all attendees, and all tickets will show the same name. This is the simplest collection method and may only require a single form to be shown in order to collect the necessary details from the person placing the order.

The form should be displayed as follows:

```tsx
EVENT NAME
PERFORMANCE_DATE

Title:
First Name:
Surname:
```

## Payment Provider

As as a platform we do not provide a payment provider, We instead we provide an API to mark a cart as [pending sale](https://waoadb-opensource.stoplight.io/docs/open-source/5b1637a8114fe-mark-cart-pending-sale) and to also [mark the cart as sold](https://waoadb-opensource.stoplight.io/docs/open-source/3d33499c47a1d-mark-cart-sold). This allows you to integrate the payment provider that best suits your client and provides the freedom to form partnerships with providers that can offer the best solution for your business.

## Completing The Order

To complete an order, mark the cart as [pending sale](https://waoadb-opensource.stoplight.io/docs/open-source/5b1637a8114fe-mark-cart-pending-sale) before taking payment. This notifies our backend that the order is about to be processed, and allows us to format and store attendee information.

After taking payment, send the `cart_id` and payment status to our backend so we can [mark the cart as sold](https://waoadb-opensource.stoplight.io/docs/open-source/3d33499c47a1d-mark-cart-sold), process the order, and send out the tickets. If payment fails, prompt the user to retry. If they abandon checkout, the cart will expire after a period of time, and the tickets will become available for sale again.
