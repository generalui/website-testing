import { baseE2eTest } from '../utils';

describe('Homepage', () => {
  baseE2eTest({
    urlPath: '/',
    seo: {
      metaTags: {
        title: '^GenUI$',
        xUaCompatible: '',
        referrer: '',
        viewport: '',
      },
      openGraphTags: false,
      structuredData: false,
      images: false,
    },
  });
});
