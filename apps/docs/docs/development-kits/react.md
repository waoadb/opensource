---
title: 'React SDK'
description: 'The Different Breed ® React SDK'
---

# React SDK

## Overview

The following package serves as a software development kit to speed up and simplify the integration of your React/Next.js project with the Different Breed Client API.

## Quick Start

Install the application using your favourite package manager.

`npm install @waoadb/react-sdk` or `yarn add @waoadb/react-sdk`

## Context Provider

The context provider is used to enable our React application to share state across components and pages. This state can be accessed from anywhere in the application using the `useDifferentBreedCart` custom hook.

To set up the context provider within our application, we must wrap the application render with the custom `DifferentBreedCartProvider` component.

In the context of Next.js, we would add this within the `_app.tsx` file, like so:

```tsx
/* Dependencies */
import { DifferentBreedCartProvider } from '@waoadb/react-sdk';

/**
 * App
 * @param props - Component props.
 * @returns
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <DifferentBreedCartProvider>
      <Component {...pageProps} />
    </DifferentBreedCartProvider>
  );
}
```

That's all that needs to be done. With this, all of our components and pages will have access to the cart context.

## Javascript Client

To utilise the core functionality of this package, we must also include the [Javascript Client SDK] in our solution. We pass the [Javascript Client SDK] to the React SDK instead of bundling it. Doing so separates functionality in a modular fashion and allows developers to define authentication once and use the same client for both React and standard Javascript operations.

To install the Client SDK, use the following command:

```bash
npm install @waoadb/js-client-sdk
```

or

```bash
yarn add @waoadb/js-client-sdk
```

Then, initiate an instance of the SDK for the React component to use.

```tsx
/* Dependencies */
import { DifferentBreedClient } from '@waoadb/js-client-sdk';

// Export client instance.
export const differentBreedClient = new DifferentBreedClient({
  profileId: process.env.NEXT_PUBLIC_DIFFERENT_BREED_PROFILE_ID as string,
  clientAPIKey: process.env.NEXT_PUBLIC_DIFFERENT_BREED_CLIENT_KEY as string,
});
```

## Cart Hooks

### Using The Cart Hook

We have a custom React hook that enables interactions with the cart service and updates the cart context that wraps our application. This simplifies core actions, such as adding and removing stock, and handles them for you.

To use the hook, import it into your application and pass it the JavaScript client to be used.

```tsx
/* Dependencies */
import { useDifferentBreedCart } from '@waoadb/react-sdk';

const Component = () => {
  // Reference hook.
  const {} = useDifferentBreedCart(differentBreedClient, {
    callbacks: { successUrl: '#', cancelUrl: '#' },
  });

  return <></>;
};
```

After defining the hook, we can access the related methods and context state that are associated with the cart.

### Types

For the related types referenced below, We have a [client contracts](https://www.npmjs.com/package/@waoadb/contracts-client) library to streamline the process of integrating with typescript.

### Available State & Methods

**State**

| Name      | Type                  | Description                              | API Reference        |
| --------- | --------------------- | ---------------------------------------- | -------------------- | ------------ |
| cart      | ClientCartModels.Cart | null                                     | The current cart.    | [Cart Model] |
| cart_id   | string                | null                                     | The current cart id. | [Cart Model] |
| itemCount | number                | The number of items in the current cart. | N/A                  |

**Methods**

| Name                 | Params                                       | Description                                                            | API Reference           |
| -------------------- | -------------------------------------------- | ---------------------------------------------------------------------- | ----------------------- |
| retrieveCart         | cust_id?                                     | Retrieves the current cart, If no cart is found, it creates a new one. | [Link to API Reference] |
| createCart           | cust_id?, callbackUrls                       | Creates a new cart with callback urls set. attached.                   | [Link to API Reference] |
| deleteCart           | N/A                                          | Deletes the active cart.                                               | [Link to API Reference] |
| addTicketToCart      | ClientCartModels.AddTicketToCartRequest      | Add’s the desired ticket to the cart.                                  | [Link to API Reference] |
| removeTicketFromCart | ClientCartModels.RemoveTicketFromCartRequest | Removes the desired ticket from the cart.                              | [Link to API Reference] |
| addAddonToCart       | ClientCartModels.AddAddonToCartRequest       | Add’s the desired addon to the cart.                                   | [Link to API Reference] |
| removeAddonFromCart  | ClientCartModels.RemoveAddonFromCartRequest  | Removes the desired addon from the cart.                               | [Link to API Reference] |

### Customise Styles

> This is coming in a near future release.

To ensure that the checkout form can be inserted without conflicting with your global styles, we ship the forms with a custom prefix (`db-`) wrapper on the Tailwind styles we use.

You can install the required base styles by referencing the stylesheet in the package.

```tsx
/* Dependencies */
// Styles
import '@waoadb/react-sdk/build/index.css';
```

We can now change the CSS4 variable references used by the package to control the look and feel of the forms. A full list of what can be changed is provided below:

```tsx
:root {
  // This is coming in the next release!
}
```

By using CSS4 variables, you can have more control over your styles without the need to implement custom class names. This approach keeps the implementation simple and easy to maintain over time.

## Notifications

We acknowledge that [toast notifications](https://ux.stackexchange.com/questions/11998/what-is-a-toast-notification) are a widely used UI feature when performing actions with the cart. To facilitate this, we have an instance of notifications that can be referenced to trigger your own Toast components.

To use the notifications instance, include the following code in your `_app.tsx` file or a desired layout file:

```tsx
// Hooks
const { notifications } = useDifferentBreedCart(differentBreedClient);

// Effects
useEffect(() => {
  // Listen for toast events
  const listener = (toast: NotificationItem) => {
    toastRef.current?.addItem(toast);
  };
  notifications.listen(listener);
  return () => {
    // Unlisten for toast events
    notifications.unlisten(listener);
  };
  // Runs once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

return <Toast ref={toastRef} />;
```

With an example toast component being found within one of our [open source themes](https://github.com/waoadb/opensource/blob/production/apps/themes-default/src/pages/_app.tsx).
