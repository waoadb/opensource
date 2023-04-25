# Different Breed ® - Default Theme

For the most up-to-date information about theme development on Different Breed ®, check out [our open-source documentation](http://opensource.differentbreed.events/docs/theme/).

## Overview

This is the first Different Breed ® theme developed for our platform. It features a complete end-to-end experience, including an example checkout flow. Use this theme to get up and running quickly with a frontend experience that is built for scale, is accessible, and is optimised for core web vitals.

## Getting Started

To begin editing this theme, we need to first remove it from the Different Breed ® Open Source repository and place it into its own folder. To do this, simply copy the `themes-default` folder from the repository and place it where you like (this would usually be your own repository).

Once you have a copy of the theme ready, we then need to change a few of the dependencies to reference the latest released versions of each package. This will allow us to run the theme outside of the mono-repo.

Inside of the `package.json`, remove the following lines:

```jsx
"@waoadb/js-admin-sdk": "*",
"@waoadb/js-client-sdk": "*",
"@waoadb/react-sdk": "*",
```

We then want to install the packages at their latest versions. We can do this by running the following command in the root of the project.

```bash
yarn add @waoadb/js-admin-sdk @waoadb/js-client-sdk @waoadb/react-sdk @waoadb/contracts-client
```

This will install the latest version of each package and complete the setup for this theme.

Next, we need to set some environment variables within the `.env.local` file. To do this, we can make a copy of the `.env.sample` file located in the root of the theme.

```bash
cp.env.sample.env.local;
```

Then, within your [profile settings](https://app.differentbreed.events/profile/) on the Different Breed ® platform, click into `Integrations -> API Keys` and create a pair of [client and admin](http://opensource.differentbreed.events/docs/authentication/client-and-admin-keys) keys to be used.

Tip: Your Profile ID is located as a UUID within the URL on the platform, i.e., `/profile/**YOUR_PROFILE_ID**/settings/integrations/api-keys`.

Using the information provided when you create the API Keys, update the `.env.local` file to reference the new values, i.e.,

```bash
NEXT_PUBLIC_SITE_URL = YOUR_SITE_URL;
NEXT_PUBLIC_DIFFERENT_BREED_PROFILE_ID = YOUR_PROFILE_ID;
NEXT_PUBLIC_DIFFERENT_BREED_CLIENT_KEY = YOUR_CLIENT_API_KEY;
DIFFERENT_BREED_ADMIN_KEY = YOUR_ADMIN_API_KEY;
```

Once this is complete, You can run `yarn dev` to launch the development version of the theme.

## Quick Start

This solution is built on top of a standard [Next.js](https://github.com/vercel/next.js) installation.

The following commands can be run:

- `yarn dev` - Runs `[next dev](<https://nextjs.org/docs/api-reference/cli#development>)` to start Next.js in development mode.
- `yarn build` - Runs `[next build](<https://nextjs.org/docs/api-reference/cli#build>)` to build the application for production usage.
- `yarn start` - Runs `[next start](<https://nextjs.org/docs/api-reference/cli#production>)` to start a Next.js production server.
- `yarn lint` - Runs `[next lint](<https://nextjs.org/docs/api-reference/cli#lint>)` to set up Next.js' built-in ESLint configuration.

For more details on the available commands and what they do, please refer to the [Next.js Documentation](https://nextjs.org/docs/getting-started).

## Deployments

Please refer to the [Next.js Deployments Documentation](https://nextjs.org/docs/deployment) for the most up-to-date advice on the best ways to deploy a Next.js app into production.

We personally ❤️ [Netlify](https://www.netlify.com/) and use it for all of our production websites.

## Contributing

The main purpose of this repository is to continue evolving Different Breed ®'s open source work, making it faster and easier to use. Development of Different Breed packages and themes happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Different Breed ® Open Source.

### [Code of Conduct](https://opensource.differentbreed.events/docs/contributing/code-of-conduct)

Different Breed has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](https://opensource.differentbreed.events/docs/contributing/code-of-conduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://opensource.differentbreed.events/docs/contributing/)

Read our [contributing guide](https://opensource.differentbreed.events/docs/contributing/) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to.

## [License](https://github.com/waoadb/open-source/blob/production/LICENSE)

Different Breed ® Open Source is [MIT licensed](https://github.com/waoadb/open-source/blob/production/LICENSE).
