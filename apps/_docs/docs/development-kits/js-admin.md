---
title: Javascript Admin SDK
description: How to use the Javascript Admin SDK with Different Breed ®.
---

# Javascript Admin SDK

The following package serves as a software development kit to speed up and simplify the integration of your javascript project with the Different Breed Admin API’s.

---

## Quick Start

Install the application using your favourite package manager.

```bash
npm install @waoadb/js-admin-sdk
```

or

```bash
yarn add @waoadb/js-admin-sdk
```

To use the Javascript client within your application, you need to create an instance of it. This can be done by creating a shared export within the project.

Typically, this is created within `src/services/differentBreedAdmin.ts`.

```tsx
/* Dependencies */
import { DifferentBreedAdmin } from '@waoadb/js-admin-sdk';

// Export client instance.
export const differentBreedAdmin = new DifferentBreedAdmin({
  profileId: process.env.NEXT_PUBLIC_DIFFERENT_BREED_PROFILE_ID as string,
  adminAPIKey: process.env.DIFFERENT_BREED_ADMIN_KEY as string,
});
```

This allows you to specify the credentials once and reuse the same client throughout your entire application.

## Methods

All methods attached to the JavaScript client are documented in the [API Reference](http://opensource.differentbreed.events/docs/api-reference/overview). Our JavaScript clients simply provide a ready-to-use wrapper for interacting with those APIs.

For example:

```tsx
/* Dependencies */
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

// Different Breed
import { differentBreedAdmin } from '@/services/differentBreedAdmin/differentBreedAdmin';

// Validation
const validationSchema = Yup.object().shape({
  cart_id: Yup.string().uuid().required('Cart ID is required'),
  attendees: Yup.array().required('Attendees are required'),
  delivery: Yup.array().required('Delivery is required'),
});

// Models
type Payload = Yup.InferType<typeof validationSchema>;

/**
 * Marks a cart as sold.
 * This will process the cart and create an order.
 * @param req - NextApiRequest
 * @param res - NextApiResponse
 * @returns
 */
const MarkCartSold = async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  try {
    // Validate the request body
    await validationSchema.validate(req.body, { abortEarly: false });
  } catch (error: any) {
    return res.status(400).send({
      message: 'Invalid request body',
      errors: error.errors,
    });
  }

  try {
    // Extract the payload
    const payload: Payload = req.body;

    // Mark the cart as pending sale
    // We rely on DB system to validate the attendees and delivery.
    // An error will be passed in the response if the attendees or delivery are invalid.
    await differentBreedAdmin.cart
      .markPendingSale(payload.cart_id, {
        attendees: payload.attendees,
        delivery: payload.delivery,
      })
      .catch((error) => {
        throw error;
      });

    // Mark the cart as sold
    const orderReferences = await differentBreedAdmin.cart
      .markAsSold(payload.cart_id, {
        paid: true,
      })
      .then((res) => res.payload)
      .catch((error) => {
        throw error;
      });

    // Respond with success
    return res.send({ success: true, payload: orderReferences });
  } catch (error: any) {
    return res.status(400).send({
      ...error,
    });
  }
};

// Exports
export default MarkCartSold;
```
