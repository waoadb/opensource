---
title: Javascript Client SDK
description: How to use the Javascript Client SDK with Different Breed ®.
---

# Javascript Client SDK

## Overview

The following package serves as a software development kit to speed up and simplify the integration of your javascript project with the Different Breed Client API’s.

## Quick Start

Install the application using your favourite package manager.

```bash
npm install @waoadb/js-client-sdk
```

or

```bash
yarn add @waoadb/js-client-sdk
```

To use the Javascript client within your application, you need to create an instance of it. This can be done by creating a shared export within the project.

Typically, this is created within `src/services/differentBreedClient.ts`.

```tsx
/* Dependencies */
import { DifferentBreedClient } from '@waoadb/js-client-sdk';

// Export client instance.
export const differentBreedClient = new DifferentBreedClient({
  profileId: process.env.NEXT_PUBLIC_DIFFERENT_BREED_PROFILE_ID as string,
  clientAPIKey: process.env.NEXT_PUBLIC_DIFFERENT_BREED_CLIENT_KEY as string,
});
```

This allows you to specify the credentials once and reuse the same client throughout your entire application.

## Methods

All methods attached to the JavaScript client are documented in the [API Reference](http://opensource.differentbreed.events/docs/api-reference/overview). Our JavaScript clients simply provide a ready-to-use wrapper for interacting with those APIs.

For example:

```tsx
/**
 * Get the page props.
 * @param props - GetServerSideProps props.
 * @returns
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    // Get the profile and events
    const response = await Promise.all([
      differentBreedClient.profile.retrieveProfile(),
    ]).catch((error) => {
      throw error;
    });

    // Extract responses
    const [profileResponse] = response;

    // Return the props
    return {
      props: {
        profile: profileResponse.payload,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
```
