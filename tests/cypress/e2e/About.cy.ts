import { baseE2eTest } from '../utils';

describe('About', () => {
  baseE2eTest({
    urlPath: '/about',
    metaTags: {
      title: ' - GenUI$',
    },
  });
});
