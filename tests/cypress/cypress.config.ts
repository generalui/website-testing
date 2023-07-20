import { defineConfig } from 'cypress';

const config = defineConfig({
  e2e: {
    downloadsFolder: 'tests/cypress/downloads',
    fixturesFolder: 'tests/cypress/fixtures',
    screenshotsFolder: 'tests/cypress/screenshots',
    videosFolder: 'tests/cypress/videos',
    supportFile: 'tests/cypress/support/e2e.js',
    specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    baseUrl: 'https://www.genui.com',
    defaultOptions: {
      seo: {
        metaTags: {
          xUaCompatible: 'IE=edge',
          referrer: 'no-referrer-when-downgrade',
          viewport:
            'width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes',
          favicon: {
            svg: 'https://www.genui.com/hubfs/guifavicon.png',
            png: '',
            maskIcon: '',
            appleTouchIcon: '',
          },
        },
      },
    },
  },
});

export default config;
