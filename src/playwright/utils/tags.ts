import { test, expect, Page } from '@playwright/test';

export interface testTagProps {
  selector: string;
  attributes: { [key: string]: string | RegExp };
  content: string | RegExp;
  isOptional?: boolean;
}
export const testTag = async (
  page: Page,
  { selector, attributes, content, isOptional }: testTagProps
) => {
  const element = await page.locator(selector);
  const elementCount = await element.count();

  if (!isOptional) {
    await expect.soft(element).toHaveCount(1);
  }

  if (elementCount > 0) {
    if (attributes) {
      for (const attributeName in attributes) {
        await expect
          .soft(element)
          .toHaveAttribute(attributeName, attributes[attributeName]);
      }
    }

    if (content) {
      if (selector === 'title') {
        await expect.soft(page).toHaveTitle(content);
      } else {
        await expect.soft(element).toHaveText(content);
      }
    }
  }
};

export const testTags = async (
  page: Page,
  tags: { [key: string]: testTagProps } = {}
) => {
  for (const key in tags) {
    if (tags[key]) {
      await test.step(tags[key].selector, async () => {
        await testTag(page, tags[key]);
      });
    }
  }
};
