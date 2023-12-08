import { test, expect, Page, Locator } from '@playwright/test';
import { SeoConfig } from '../configs';

export const testImage = async (
  image: Locator,
  { exclude, lazyLoadingProperty }: SeoConfig['images']
) => {
  await test.step('Image', async () => {
    const html = await image.evaluate((node) => node.outerHTML);

    if (exclude.length) {
      for (const rule of exclude) {
        if (rule instanceof RegExp) {
          if (html.match(rule)) {
            return;
          }
        } else if (html.includes(rule)) {
          return;
        }
      }
    }

    const src =
      (await image.getAttribute('src')) ||
      (await image.getAttribute(lazyLoadingProperty)) ||
      '';

    if (!src) {
      console.warn(`Missing image src: ${html}`);
    }

    await expect(src).not.toBe('');
    await expect.soft(image).toHaveAttribute('alt');
    await expect.soft(image).toHaveAttribute('width');
    await expect.soft(image).toHaveAttribute('height');
  });
};

export const testImages = async (page: Page, config: SeoConfig['images']) => {
  const images = await page.locator('img').all();

  if (images.length < 1) {
    if (config.skipIfNoImagesFound) {
      test.skip();
    } else {
      await expect(images.length).toBeGreaterThan(0);
    }
    return;
  }

  for (const image of images) {
    await testImage(image, config);
  }
};
