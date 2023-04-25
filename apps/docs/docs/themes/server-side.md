---
title: Server Side Rendering
description: How to use server side generation with Different Breed ® Open Source.
---

# Server Side Generation

## Our Preferred Choice

All Different Breed ® themes utilise Server Side Rendering by default. This decision was made to decrease the amount of build minutes required to operate our self service offering, and to allow us to scale without the deployment system becoming a bottleneck. However, we use Static Site Generation for any custom themes we develop for customers outside of the self-service offering.

## How to implement

All of our themes use the standard Next.JS [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) method. For more details on how this works, please refer to the [Next.js documentation](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

## Notes On Performance

If you are worried about performance with server side rendering content from our API’s, You can be rest assured that all of the content we serve comes through a caching layer that will respond between 100ms - 400ms depending on the size of the requested assets, Generally 90% of our API’s respond in < 200ms.

When using server side rendering we recommend running requests in parallel to ensure a quick experience for your end user, You can do this by using `Promise.all` within Javascript.

Here’s an example based on retrieving a profile and event through the SDK:

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
      differentBreedClient.events.retrieveEvents({
        limit: 7,
        skip: 0,
        date_from: dayjs().format('YYYY-MM-DD'),
      }),
    ]).catch((error) => {
      throw error;
    });

    // Extract responses
    const [profileResponse, eventsResponse] = response;

    // Return the props
    return {
      props: {
        events: eventsResponse.payload,
        profile: profileResponse.payload,
      },
    };
  } catch (error) {
    // Return 404
    return {
      notFound: true,
    };
  }
};
```

## Notes On Request Limits

As a platform, we have implemented rate limiting to prevent misuse of our APIs. When implementing solutions, please ensure that you do not exceed the limit of 250 requests per 10 seconds that we have imposed.

If you require more than the default limit of requests, please contact [Different Breed ®](https://differentbreed.events/) directly to discuss our more advanced API offerings.
