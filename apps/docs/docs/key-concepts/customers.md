---
title: Customers
description: Handling customers on the platform.
---

# Customers

## Overview

Different Breed® offers a completely headless customer management experience. We aim to provide you with full control over all customer data, allowing you to create the after-sales and offline experience that best suits your needs.

## The Recommended Flow

When integrating with an existing site or solution, our system is designed to work in tandem with your current customer registration flow. Like other popular providers, we require that you create a customer and store a customer ID (`cust_id`) to reference the customer via the API.

A potential implementation diagram would look like this:

<img src="/customers/customer-flow.png" alt="Customer flow diagram" data-image-zoom width="100%" height="auto"/>

## When To Update Customer

We store the customer's `email`, `forename`, and `surname`. These details are used for processing orders and sending out digital tickets and order confirmations to the customer. We recommend integrating the ability to [update a customer](https://waoadb-opensource.stoplight.io/docs/open-source/a864a73fb991f-update-customer) in your existing customer management system when their details change.

To delete a customer, call the [delete customer endpoint](https://waoadb-opensource.stoplight.io/docs/open-source/359f32572cb03-delete-customer). This will remove all customer data from our system. Please note that this action is permanent and cannot be undone.

## Accessing Customer Data

After creating a customer, you can use their ID and the profile's [admin API key](/docs/authentication#admin-key) to retrieve information from the customer API. The information available includes:

- [Orders](https://waoadb-opensource.stoplight.io/docs/open-source/51d278bdb4592-retrieve-orders): a paginated order history
- [Address](https://waoadb-opensource.stoplight.io/docs/open-source/49713ad2c8760-retrieve-address): saved customer addresses

We recommend setting up a background task to poll for recent orders and sync them with your CRM. In the near future, we hope to add a webhook system for after-sales that will automate this process and make it easier. Stay tuned!
