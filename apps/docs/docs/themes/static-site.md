---
title: Static Site Generation
description: How to use static site generation with Different Breed ® Open Source.
---

# Static Site Generation

## Why We Don’t Use It By Default

All Different Breed ® themes utilise Server Side Rendering by default. This decision was made to decrease the amount of build minutes required to operate our self service offering, and to allow us to scale without the deployment system becoming a bottleneck. However, we use Static Site Generation for any custom themes we develop for customers outside of the self-service offering.

## Why You Should Use It

We recommend using Static Site Generation when creating a custom theme for your client. This rendering method can provide instant results for end users, lower API usage, and maximise core web vitals scores for your customers.

## How to implement

For notes on how to best implement static site generation please refer to the [Next.js documentation](https://nextjs.org/docs/basic-features/data-fetching/overview) for [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths) and [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props).

As a platform we have a concept of `minimal` endpoints for the resource categories in our system such as [events] and [venues] to allow you to easily pull the required information for generating the static paths.

## Notes On Dynamic Elements

It's important to note that while static site generation can handle 80-90% of the integration with Different Breed®, you'll still need to use server-side rendering for specific areas like the Cart & Checkout. Our [React SDK] provides core functionality using the [Context API](https://react.dev/learn/passing-data-deeply-with-context), which handles this for you.

## Notes On Request Limits

As a platform, we have implemented rate limiting to prevent misuse of our APIs. When implementing solutions, please ensure that you do not exceed the limit of 250 requests per 10 seconds that we have imposed.

If you require more than the default limit of requests, please contact [Different Breed ®](https://differentbreed.events/) directly to discuss our more advanced API offerings.
