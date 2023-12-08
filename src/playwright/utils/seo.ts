import { test } from '@playwright/test';
import { testTags } from './tags';
import { testStructuredData } from './structured-data';
import { testImages } from './images';
import { SeoConfig, seoConfig } from '../configs';
import merge from 'lodash/merge';

export const testSEO = async ({
  urlPath,
  metaTags,
  structuredData,
  images,
}: SeoConfig) => {
  test.beforeEach(async ({ page }) => {
    await page.goto(seoConfig.baseUrl + urlPath);
  });

  if (metaTags !== false) {
    test('Meta Tags @seo', async ({ page }) => {
      await testTags(page, merge({}, seoConfig.metaTags, metaTags));
    });
  }

  if (structuredData !== false) {
    test('Structured Data @seo', async ({ page }) => {
      await testStructuredData(
        page,
        merge({}, seoConfig.structuredData, structuredData)
      );
    });
  }

  if (images !== false) {
    test('Images @seo', async ({ page }) => {
      await testImages(page, merge({}, seoConfig.images, images));
    });
  }
};
