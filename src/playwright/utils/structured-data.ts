import { test, expect, Page } from '@playwright/test';
import { SeoConfig, seoConfig } from '../configs';

export const getStructuredDataByType = async (page, type) => {
  const sources = await page
    .locator('script[type="application/ld+json"]')
    .all();

  if (sources.length < 1) {
    return [];
  }

  let items = [];

  for (const source of sources) {
    const raw = await source.textContent();
    const json = await JSON.parse(raw);

    if (json['@graph']) {
      for (const item of json['@graph']) {
        if (
          Array.isArray(item['@type'])
            ? item['@type'].includes(type)
            : item['@type'] === type
        ) {
          items.push(item);
        }
      }
    } else if (
      Array.isArray(json['@type'])
        ? json['@type'].includes(type)
        : json['@type'] === type
    ) {
      items.push(json);
    }
  }

  return items;
};

export const testJSON = async (json: object, properties: object) => {
  for (const key in properties) {
    expect.soft(json).toHaveProperty(key);

    if (typeof properties[key] === 'object') {
      expect.soft(json[key]).toMatchObject(properties[key]);
    } else if (properties[key] !== true) {
      expect.soft(json[key]).toMatch(properties[key]);
    }
  }
};

export const testStructuredDataOrganization = async (
  page: Page,
  config: SeoConfig['structuredData']['organization']
) => {
  const data = await getStructuredDataByType(page, 'Organization');
  expect(data.length).toBeGreaterThan(0);

  await testJSON(data[0], {
    '@id': true,
    name: true,
    description: true,
    url: true,
    legalName: true,
    slogan: true,
    logo: true,
    sameAs: true,
    foundingDate: true,
  });

  if (data.length > 1) {
    await testJSON(data[1], {
      name: true,
      url: true,
      logo: true,
    });
  }
};

export const testStructuredDataWebsite = async (page: Page) => {
  const data = await getStructuredDataByType(page, 'WebSite');
  expect(data.length).toEqual(1);

  await testJSON(data[0], {
    '@id': true,
    name: true,
    description: true,
    url: true,
    publisher: true,
    potentialAction: true,
    copyrightHolder: true,
  });
};

export const testStructuredDataBreadcrumb = async (page: Page) => {
  const data = await getStructuredDataByType(page, 'BreadcrumbList');
  expect(data.length).toEqual(1);

  await testJSON(data[0], {
    '@id': true,
    itemListElement: true,
  });

  // expect(
  //   breadcrumb.itemListElement,
  //   'itemListElement'
  // ).to.have.length.of.at.least(2);
};

export const testStructuredDataProduct = async (page: Page) => {
  const data = await getStructuredDataByType(page, 'Product');
  expect(data.length).toEqual(1);

  await testJSON(data[0], {
    '@id': true,
    name: true,
    description: true,
    url: true,
    sku: true,
    image: true,
    offers: true,
  });
};

export const testStructuredDataProductCollection = async (page: Page) => {
  const collectionPageData = await getStructuredDataByType(
    page,
    'CollectionPage'
  );
  expect(collectionPageData.length).toEqual(1);

  const itemListData = await getStructuredDataByType(page, 'ItemList');
  expect(itemListData.length).toEqual(1);
  expect(itemListData[0].itemListElement.length).toBeGreaterThan(0);

  const collectionPage = collectionPageData[0];
  const itemList = itemListData[0];

  for (const item of itemList.itemListElement) {
    await testJSON(item, {
      '@type': 'ListItem',
      position: true,
      name: true,
      url: true,
      sku: true,
      image: true,
      offers: true,
    });

    const collectionPageIndex = collectionPage.mainEntity.findIndex(
      (item) => item['@id'] === itemList['@id']
    );

    expect.soft(collectionPageIndex).toBeGreaterThan(-1);
  }
};

export const testStructuredDataFAQ = async (page: Page) => {
  const faqPageData = await getStructuredDataByType(page, 'FAQPage');
  expect(faqPageData.length).toEqual(1);

  const questionsData = await getStructuredDataByType(page, 'Question');
  expect(questionsData.length).toEqual(1);

  const faqPage = faqPageData[0];
  const questions = questionsData[0];

  for (const question of questions) {
    await testJSON(question, {
      '@type': 'ListItem',
      position: true,
      name: true,
      url: true,
      sku: true,
      image: true,
      offers: true,
    });

    const faqPageIndex = faqPage.mainEntity.findIndex(
      (item) => item['@id'] === question['@id']
    );

    expect.soft(faqPageIndex).toBeGreaterThan(-1);
  }
};

export const testStructuredData = async (
  page: Page,
  {
    organization,
    website,
    breadcrumb,
    product,
    productCollection,
    faq,
  }: SeoConfig['structuredData']
) => {
  if (organization) {
    await test.step('Organization', async () => {
      await testStructuredDataOrganization(page, organization);
    });
  }

  if (website) {
    await test.step('Website', async () => {
      await testStructuredDataWebsite(page);
    });
  }

  if (breadcrumb) {
    await test.step('Breadcrumb', async () => {
      await testStructuredDataBreadcrumb(page);
    });
  }

  if (product) {
    await test.step('Product', async () => {
      await testStructuredDataProduct(page);
    });
  }

  if (productCollection) {
    await test.step('Product Collection', async () => {
      await testStructuredDataProductCollection(page);
    });
  }

  if (faq) {
    await test.step('FAQ', async () => {
      await testStructuredDataFAQ(page);
    });
  }
};
