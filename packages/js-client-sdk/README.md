# Different Breed ® - Javascript Client SDK

> 💡 This package is intended to be installed and not edited directly. We simply offer the source code to provide transparency around what is happening under the hood. If you require changes or additional features please [raise an issue](https://github.com/waoadb/opensource/issues) within Github.

## Overview

The following package serves as a software development kit to speed up and simplify the integration of your javascript project with the Different Breed Client API’s.

---

## Quick Start

Install the application using your favourite package manager.

`npm install @waoadb/js-client-sdk`

or

`yarn add @waoadb/js-client-sdk`

---

## Documentation

All documentation for Open Source Different Breed ® packages can be found here: [Documentation](https://opensource.differentbreed.events). For this package, please see the following link: [Javascript Client SDK](https://opensource.differentbreed.events/docs/js-client-sdk).

---

## Local Development

> 💡 These instructions are intended for the Different Breed Team, If you require changes or additional features please raise an issue within Github.

### Linking

The parent repo housing this component is a Mono repo powered by Lerna. To use this package locally in a theme, simply add the following code to your `package.json` file and run `yarn` to link the package.

```jsx
"@waoadb/js-client-sdk": "*",
```

### Build

When running the plugin with our theme, We ideally do not want to run watch tasks for each package being used as this lead to additional RAM being used. For the purposes of editing packages we ideally want to use the storybook instance to test changes then initiate a build to pull those changes into the project we are working on.

To build a package, run the following command:

```jsx
yarn packages:build
```

### Publishing

Package publishing is powered by Lerna versions and can be run using the following command.

```jsx
yarn packages:publish
```

This will perform the following: Build the package, increase the version and then release the package to NPM. It is worth noting that only team accounts may publish to the NPM organisation. Please contact your team lead for these permissions.

---

## Contributing

The main purpose of this repository is to continue evolving Different Breed ®'s open source work, making it faster and easier to use. Development of Different Breed packages and themes happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Different Breed ® Open Source.

### [Code of Conduct](https://opensource.differentbreed.events/docs/contributing/code-of-conduct)

Different Breed has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](https://opensource.differentbreed.events/docs/contributing/code-of-conduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://opensource.differentbreed.events/docs/contributing/)

Read our [contributing guide](https://opensource.differentbreed.events/docs/contributing/) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

### [License](https://github.com/waoadb/open-source/blob/production/LICENSE)

Different Breed ® Open Source is [MIT licensed](https://github.com/waoadb/open-source/blob/production/LICENSE).
