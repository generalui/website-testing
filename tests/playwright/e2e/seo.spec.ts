import { test } from '@playwright/test';
import { testSEO } from '../../../src/playwright/utils/seo';
import { pages } from '../seo.config';

pages.forEach((page) => {
  test.describe(page.name, async () => {
    await testSEO(page);
  });
});
