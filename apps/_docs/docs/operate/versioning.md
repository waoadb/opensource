# Versioning

All stable builds of Different Breed ® Open Source undergo a high level of testing and follow semantic versioning (semver). We also offer unstable release channels to encourage early feedback on experimental features. This page describes what you can expect from releases.

## **Stable releases**

Stable releases, also known as the "Latest" release channel, follow the principles of [semantic versioning (semver)](https://semver.org/).

This means that with a version number of **x.y.z**:

- When we release critical bug fixes, we make a patch release by changing the **z** number (for example, 1.1.1 to 1.1.2).
- When we release new features or non-critical fixes, we make a minor release by changing the **y** number (for example, 1.1.2 to 1.2.0).
- When we release breaking changes, we make a major release by changing the **x** number (for example, 1.2.0 to 2.0.0).

Major releases can also include new features, and any release can include bug fixes.

Minor releases are the most common type of release.

> This versioning policy does not apply to prerelease builds in the Next or Experimental channels. Learn more about prereleases.

## Breaking Changes

Breaking changes are inconvenient for everyone. To minimise the number of major releases, we introduce new features in minor versions. Despite their unassuming name, minor releases are often more interesting and compelling than major ones.

## Commitment to Stability

As we evolve Different Breed ® Open Source over time, we strive to minimise the effort required to take advantage of new features. Whenever possible, we will maintain backwards compatibility with older APIs, even if it means putting them in a separate package to enable legacy and stable code to continue running.

Different Breed ® Open Source modules are used both internally and by the community, so we need to make upgrading to new versions as easy as possible. If we make significant changes without a migration path, people will be stuck on old versions. We test upgrade paths on Different Breed itself. If our team of fewer than five people can update components alone, we anticipate the upgrade will be manageable for anyone using Different Breed.

## Gradual Upgrades via Warnings

Development builds of Different Breed ® Open Source include many helpful warnings. Whenever possible, we add warnings in preparation for future breaking changes. If your app has no warnings in the latest release, it will be compatible with the next major release. This allows you to upgrade your apps one component at a time.

Development warnings won't affect the runtime behavior of your app. Thus, you can feel confident that your app will behave the same way between the development and production builds. The only differences are that the production build won't log the warnings and that it is more efficient. If you ever notice otherwise, please file an issue.

## What Counts as a Breaking Change?

In general, we do not bump the major version number for changes to:

- Development warnings: Since these do not affect production behavior, we may add new warnings or modify existing ones between major versions. This allows us to reliably warn about upcoming breaking changes.
- APIs starting with `unstable_`: These are provided as experimental features whose APIs we are not yet confident in. By releasing them with an `unstable_` prefix, we can iterate faster and get to a stable API sooner.
- Alpha and canary versions: We provide alpha versions as a way to test new features early, but we need the flexibility to make changes based on what we learn during the alpha period. If you use these versions, note that APIs may change before the stable release.

This policy is designed to be pragmatic. We do not want to cause headaches for our users. If we bumped the major version for all of these changes, we would end up releasing more major versions and causing more versioning pain for the community. It would also mean that we cannot make progress as quickly as we would like.

That being said, if we expect that a change on this list will cause broad problems in the community, we will still provide a gradual migration path to ease the transition.

## If a Minor Release Includes No New Features, Why Isn’t It a Patch?

According to [semver](https://semver.org/#spec-item-7), it is possible for a minor release to not include new features. In such cases, a minor version "MAY be incremented if substantial new functionality or improvements are introduced within the private code. It MAY include patch level changes."

However, this raises the question of why these releases aren't versioned as patches instead.

The answer is that any change to Different Breed ® Open Source (or other software) carries some risk of breaking in unexpected ways. For instance, a patch release that fixes one bug may accidentally introduce a different bug. This would not only be disruptive to developers but also harm their confidence in future patch releases. It's especially regrettable if the original fix is for a bug that rarely occurs in practice.

Our track record for keeping releases free of bugs is strong, but patch releases have an even higher bar for reliability because most developers assume they can be adopted without adverse consequences. For these reasons, we reserve patch releases only for the most critical bugs and security vulnerabilities.

If a release includes non-essential changes, such as internal refactors, changes to implementation details, performance improvements, or minor bug fixes, we will bump the minor version even if there are no new features.

---

Our versioning policy is based on the Meta versioning policy for React, which is available at [https://react.dev/community/versioning-policy](https://react.dev/community/versioning-policy).
