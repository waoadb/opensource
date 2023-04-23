/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Themes',
      items: [
        'themes/overview',
        'themes/getting-started',
        'themes/standards',
        'themes/accessibility',
        'themes/static-site',
        'themes/server-side',
      ],
    },
    {
      type: 'category',
      label: 'Development Kits',
      items: ['development-kits/react'],
    },
    {
      type: 'category',
      label: 'Operate',
      items: ['operate/overview', 'operate/support', 'operate/versioning'],
    },
    {
      type: 'category',
      label: 'Contribute',
      items: [
        'contribute/contributing',
        'contribute/code-of-conduct',
        'contribute/security',
      ],
    },
    'license',
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
