# Open Source

[Documentation](https://opensource.differentbreed.events)

## What is Different Breed ® - Open Source?

Different Breed ® Open Source is a collection of themes and packages designed to enhance a developer's experience when integrating with our platform.

The following project types are currently available:

- Themes: We offer a suite of self-service themes on the platform, all located within the `apps/` directory of this repository. These themes enable existing Different Breed ® customers to move to a custom solution without requiring a full rebuild of the experience. They also provide developers with a solid foundation to start with or build upon.
- Packages: The `/packages` directory contains the code that powers the SDKs offered by Different Breed ®. We recommend installing these packages via NPM, and the code is available in this repository to show what happens under the hood.

---

## Our Motivations

As a business, Different Breed ® exists with the mission to create experiences that tear down barriers. We believe that to achieve this mission, we must first remove the barriers that prevent people from offering accessible and inclusive experiences.

By open-sourcing our platform's themes and packages, we hope to remove the barriers to getting up and running with Different Breed ®, allowing developers and customers to get started quickly while still retaining full control over the experience they deliver.

Our goal is simple: we wish to reduce the setup time on projects and empower agencies and developers to use more of the budget to create experiences that make an impact on the end-user.

All of our open-source themes aim to meet AA levels of compliance in reference to [WCAG2.1](https://www.w3.org/TR/WCAG21/) spec for accessibility, and we are committed to ensuring that whoever chooses our open-source work is set up from the beginning with solid foundations to continue that level of standard.

Whether you choose to use Different Breed ® or wish to use our components elsewhere, we wish you all the best and can't wait to see the wonderful work you create.

---

## Our Standards

Within the active development of Different Breed ® Open Source we use the same industry standards that our core team use to create and maintain features on the core platforms.

### Atomic Design

We use the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology for creating each component within our theme’s. This allows for rapid prototyping and delivery of new features while also bringing the fundamentals of a living design system to life. With this in mind, each theme comes bundled with storybook that can be used to easily update and maintain components without the need to run the theme directly.

### Typescript & Eslint

We use Typescript and Eslint to ensure code quality and consistency. Typescript helps catch errors before they occur, while Eslint enforces code style guidelines and best practices. This leads to more maintainable and scalable code.

### Browser Support

Different Breed ® Open Source supports evergreen browsers, which include the latest versions of Chrome, Firefox, Edge, and Safari. This means that the themes and packages are designed to work with the most up-to-date browser versions, ensuring the best possible experience for end-users.

---

## Local Development

This repo is powered by Lerna with NX enabled under the hood. To run this repo locally first install it’s dependencies by running `yarn` within the root folder.

Once installed, please consult the relevant package / theme README for the instructions on how best to work locally.

---

## Contributing

The main purpose of this repository is to continue evolving Different Breed ®'s open source work, making it faster and easier to use. Development of Different Breed packages and themes happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Different Breed ® Open Source.

### [Code of Conduct](https://opensource.differentbreed.events/docs/contribute/code-of-conduct)

Different Breed has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](https://opensource.differentbreed.events/docs/contributing/code-of-conduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://opensource.differentbreed.events/docs/contribute/contributing)

Read our [contributing guide](https://opensource.differentbreed.events/docs/contribute/contributing) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to.

### [License](https://github.com/waoadb/open-source/blob/production/LICENSE)

Different Breed ® Open Source is [MIT licensed](https://github.com/waoadb/open-source/blob/production/LICENSE).
