---
title: 'Contributing'
description: 'Guide for contributing to our open soruce work.'
---

# How To Contribute

This is one of Different Breed's first open source projects that is both under very active development and is also being used to ship code to everybody on waoadb.com. We’re still working out the kinks to make contributing to this project as easy and transparent as possible, but we’re not quite there yet. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

## Code of Conduct

Different Breed ® Open Source has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its [Code of Conduct](/docs/contribute/code-of-conduct), and we expect project participants to adhere to it. Please [read the full text](/docs/contribute/code-of-conduct) so that you can understand what actions will and will not be tolerated.

## Open Development

All work on Different Breed ® Open Source happens directly on [GitHub](https://github.com/waoadb/opensource). Both core team members and external contributors send pull requests which go through the same review process.

## Semantic Versioning

Different Breed ® Open Source follows [semantic versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance. Learn more about our commitment to stability and incremental migration in (/docs/versioning)[our versioning policy.]

Every significant change is documented in the [changelog file].

## Branch Organization

Submit all changes directly to the `production branch`. We don’t use separate branches for development or for upcoming releases. We do our best to keep `production` in good shape, with all tests passing.

Code that lands in `production` must be compatible with the latest stable release. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of `production` at any time.

## Bugs

### Where to Find Known Issues

We are using [GitHub Issues](https://github.com/waoadb/opensource/issues) for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide an example of the issue using a service such as [jsfiddle.net](https://jsfiddle.net/). This will allow our team to easily spot and debug the issue.

If you are unable to provide an example, please provide as much information as possible about your environment and what you were doing when the issue occurred. If possible, please provide the exact error message that you received.

### Security Bugs

Different Breed ® Open Source has a [security policy] for the safe disclosure of security bugs. With that in mind, please do not file public issues; go through the process outlined on that page.

## How to Get in Touch

- Questions - Use our [Discussions](https://github.com/waoadb/opensource/discussions) section within the repo to ask any questions about Different Breed ® Open Source.
- Issues / Bugs - To report issues or bugs, please [open an issue](https://github.com/waoadb/opensource/issues) on our repo with an example showing the issue.
- Feature Requests - Use our [Discussions](https://github.com/waoadb/opensource/discussions) section within the repo to make any suggestions for features to be introduced within Different Breed ® Open Source.

For anything else please contact [opensource@differentbreed.events](mailto:opensource@differentbreed.events).

## Proposing a Change

If you intend to change the public API, or make any non-trivial changes to the implementation, we recommend [filing an issue]. This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

### Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

**[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-opensource-project-on-github)**

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take it over but you should still leave a comment.

### Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. For API changes we may need to fix our internal uses at Different Breed, which could cause some delay. We’ll do our best to provide updates and feedback throughout the process.

**Before submitting a pull request,** please make sure the project builds and prettier has been run on your files. You can run `yarn prettier` in the root of the project to achieve this. To test if the project builds, please run `yarn build:all` , this will build all associated packages and themes to ensure that nothing has broke.

Our CI will also run the full build to ensure that the project succeeds as expected before the code change can be merged.

## Contributor License Agreement (CLA)

In order to accept your pull request, we need you to submit a CLA. You only need to do this once, so if you’ve done this for another Different Breed ® Open Source project, you’re good to go. If you are submitting a pull request for the first time, just let us know that you have completed the CLA and we can cross-check with your GitHub username.

[Complete your CLA here](https://forms.office.com/e/hBVfBsYNj7)

## Contribution Prerequisites

- You have [Node](https://nodejs.org/) installed at LTS and [Yarn](https://yarnpkg.com/en/) at v1.2.0+.
- You are familiar with Git.

## Development Workflow

Check the related package or theme folder for information on the best way to work locally for development.

## Request for Comments (RFC)

Many changes, including bug fixes and documentation improvements can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are “substantial”, and we ask that these be put through a bit of a design process and produce a consensus among the React core team.

The “RFC” (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project. You can contribute by opening an issue tagged as an RFC, This will allow ourselves and the community to feedback before the work is started.

## License

By contributing to React, you agree that your contributions will be licensed under its MIT license.
