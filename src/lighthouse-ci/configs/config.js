const crypto = require('crypto');

const BASE_URL = process.env.LHCI_BASE_URL || 'http://127.0.0.1:9292';

// -------------------------------------------------------------------------- //

const currentDate = new Date();

if (process.env.LHCI_BUILD_CONTEXT__COMMIT_TIME === 'auto') {
  process.env.LHCI_BUILD_CONTEXT__COMMIT_TIME = currentDate.toISOString();
}

if (process.env.LHCI_BUILD_CONTEXT__CURRENT_HASH === 'auto') {
  process.env.LHCI_BUILD_CONTEXT__CURRENT_HASH = crypto
    .createHash('sha1', 'genui')
    .update(currentDate.toISOString())
    .digest('hex');
}

// -------------------------------------------------------------------------- //

let config = {
  baseUrl: BASE_URL,
  ci: {
    collect: {
      //puppeteerScript: './tests/lighthouse-ci/lighthouse-ci-puppeteer.js',
      settings: {
        disableStorageReset: true,
      },
      url: [],
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 100 }],
        'categories:seo': ['warn', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 0.8 }],
      },
    },
  },
};

// ------------------------------------------------------------------------ //

// if (process.env.LHCI_URL) {
//   if (process.env.LHCI_URL.endsWith('.json')) {
//     config.ci.collect.url = require(process.env.LHCI_URL);
//   } else {
//     config.ci.collect.url = process.env.LHCI_URL.split(',');
//   }
// } else {
//   config.ci.collect.url = require('./lighthouse-ci-urls.json');
// }

// if (typeof config.ci.collect.url === 'object') {
//   config.ci.collect.url = config.ci.collect.url.map((url) =>
//     !url.startsWith('http') ? BASE_URL + url : url
//   );
// }

// ------------------------------------------------------------------------ //

if (process.env.LHCI_DEVICE === 'desktop') {
  config.ci.collect.settings.preset = process.env.LHCI_DEVICE;
}

// ------------------------------------------------------------------------ //

if (!config.ci.upload) {
  config.ci.upload = {
    target: 'filesystem',
    outputDir: './tests/lighthouse-ci/reports',
  };

  if (process.env.LHCI_SERVER_BASE_URL && process.env.LHCI_TOKEN) {
    config.ci.upload = {
      target: 'lhci',
      serverBaseUrl: process.env.LHCI_SERVER_BASE_URL,
    };
  }
}

// ------------------------------------------------------------------------ //

module.exports = config;
