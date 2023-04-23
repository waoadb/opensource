---
title: Getting Started
description: Steps to starting development with a Different Breed ® theme.
---

# Getting Started

To begin [select the theme you wish](https://github.com/waoadb/opensource/tree/production/apps), then we need to remove it from the Different Breed ® Open Source repository and place it into its own folder. To do this, simply copy the `themes-default` folder from the repository and place it where you like (this would usually be your own repository).

Once you have a copy of the theme ready, we then need to change a few of the dependencies to reference the latest released versions of each package. This will allow us to run the theme outside of the mono-repo.

Inside of the `package.json`, remove the following lines:

```jsx
"@waoadb/js-admin-sdk": "*",
"@waoadb/js-client-sdk": "*",
"@waoadb/react-sdk": "*",
```

We then want to install the packages at their latest versions. We can do this by running the following command in the root of the project.

```bash
yarn add @waoadb/js-admin-sdk @waoadb/js-client-sdk @waoadb/react-sdk
```

This will install the latest version of each package and complete the setup for this theme.

Next, we need to set some environment variables within the `.env.local` file. To do this, we can make a copy of the `.env.sample` file located in the root of the theme.

```bash
cp .env.sample .env.local;
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
