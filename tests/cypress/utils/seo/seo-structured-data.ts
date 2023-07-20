export const getStructuredDataByType = (type) => {
  let items = [];

  return cy
    .get('script[type="application/ld+json"]')
    .each((el) => {
      const raw = el.text();
      const json = JSON.parse(raw);

      if (json['@graph']) {
        for (let i = 0; i < json['@graph'].length; i++) {
          if (json['@graph'][i]['@type'] === type) {
            items.push(json['@graph'][i]);
          }
        }
      } else if (
        (Array.isArray(json['@type']) && json['@type'].includes(type)) ||
        json['@type'] === type
      ) {
        items.push(json);
      }
    })
    .then(() => {
      return items;
    });
};

export const testStructuredDataOrganization = function () {
  it('Organization', () => {
    getStructuredDataByType('Organization').then((organizations) => {
      expect(organizations, 'Organization').to.have.lengthOf(2);
      const organization = organizations[0];
      const organizationLight = organizations[1];

      expect(organization['@id'], '@id').not.to.be.empty;
      expect(organization.name, 'name').not.to.be.empty;
      expect(organization.description, 'description').not.to.be.empty;
      expect(organization.url, 'url').not.to.be.empty;
      expect(organization.legalName, 'legalName').not.to.be.empty;
      expect(organization.slogan, 'slogan').not.to.be.empty;
      expect(organization.logo, 'logo').not.to.be.empty;
      expect(organization.image, 'image').not.to.be.empty;
      expect(organization.sameAs, 'sameAs').not.to.be.empty;
      expect(organization.foundingDate, 'foundingDate').not.to.be.empty;

      expect(organizationLight.name, 'name').not.to.be.empty;
      expect(organizationLight.url, 'url').not.to.be.empty;
      expect(organizationLight.logo, 'logo').not.to.be.empty;
    });
  });
};

export const testStructuredDataWebsite = function () {
  it('Website', () => {
    getStructuredDataByType('WebSite').then((websites) => {
      expect(websites, 'WebSite').to.have.lengthOf(1);
      const website = websites[0];

      expect(website['@id'], '@id').not.to.be.empty;
      expect(website.name, 'name').not.to.be.empty;
      expect(website.description, 'description').not.to.be.empty;
      expect(website.url, 'url').not.to.be.empty;
      expect(website.publisher, 'publisher').not.to.be.empty;
      expect(website.potentialAction, 'potentialAction').not.to.be.empty;
      expect(website.copyrightHolder, 'copyrightHolder').not.to.be.empty;
    });
  });
};

export const testStructuredDataBreadcrumb = function () {
  it('Breadcrumb', () => {
    getStructuredDataByType('BreadcrumbList').then((breadcrumbs) => {
      expect(breadcrumbs, 'BreadcrumbList').to.have.lengthOf(1);
      const breadcrumb = breadcrumbs[0];

      expect(breadcrumb['@id'], '@id').not.to.be.empty;
      expect(
        breadcrumb.itemListElement,
        'itemListElement'
      ).to.have.length.of.at.least(2);
    });
  });
};

export const testStructuredDataProduct = function () {
  it('Product', () => {
    getStructuredDataByType('Product').then((products) => {
      expect(products, 'Product').to.have.lengthOf(1);
      const product = products[0];

      expect(product['@id'], '@id').not.to.be.empty;
      expect(product.name, 'name').not.to.be.empty;
      expect(product.description, 'description').not.to.be.empty;
      expect(product.url, 'url').not.to.be.empty;
      expect(product.sku, 'sku').not.to.be.empty;
      expect(product.image, 'image').not.to.be.empty;
      expect(product.offers, 'offers').not.to.be.empty;
    });
  });
};

export const testStructuredDataProductCollection = function (options = {}) {
  it('ProductCollection', () => {
    if (options.wait) {
      cy.wait(options.wait);
    }
    getStructuredDataByType('ItemList').then((lists) => {
      expect(lists, 'ItemList').to.have.lengthOf(1);
      const list = lists[0];

      expect(list.itemListElement).to.have.length.of.at.least(1);
      list.itemListElement.forEach((item, index) => {
        expect(item['@type'], '@type').to.eq('ListItem');
        expect(item.position, 'position').to.eq(index + 1);
        expect(item.name, 'name').not.to.be.empty;
        expect(item.url, 'url').not.to.be.empty;
      });

      getStructuredDataByType('CollectionPage').then((collectionPages) => {
        expect(collectionPages, 'CollectionPage').to.have.lengthOf(1);

        const found = collectionPages[0].mainEntity.find(
          (item) => item['@id'] === list['@id']
        );
        expect(found, 'Reference in CollectionPage').not.to.be.empty;
      });
    });
  });
};

export const testStructuredDataFAQ = function (options) {
  it('FAQ', () => {
    if (options.wait) {
      cy.wait(options.wait);
    }
    getStructuredDataByType('Question').then((questions) => {
      expect(questions, 'Questions').to.have.length.of.at.least(1);

      getStructuredDataByType('FAQPage').then((faqPages) => {
        expect(faqPages, 'FAQPage').to.have.lengthOf(1);

        questions.forEach((question) => {
          expect(question['@id'], '@id').not.to.be.empty;
          expect(question.name, 'name').not.to.be.empty;
          expect(question.acceptedAnswer['@type'], '@type').to.eq('Answer');
          expect(question.acceptedAnswer.text, 'acceptedAnswer.text').not.to.be
            .empty;

          const found = faqPages[0].mainEntity.find(
            (item) => item['@id'] === question['@id']
          );
          expect(found, 'Reference in FAQPage').not.to.be.empty;
        });
      });
    });
  });
};

export const testStructuredData = function (options = {}) {
  context('Structured Data', () => {
    testStructuredDataOrganization();
    testStructuredDataWebsite();

    if (options.breadcrumb) {
      testStructuredDataBreadcrumb();
    }

    if (options.product) {
      testStructuredDataProduct();
    }

    if (options.productCollection) {
      testStructuredDataProductCollection(
        typeof options.productCollection === 'object'
          ? options.productCollection
          : {}
      );
    }

    if (options.faq) {
      testStructuredDataFAQ(typeof options.faq === 'object' ? options.faq : {});
    }
  });
};
