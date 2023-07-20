import * as seo from './seo';

export const baseE2eTest = (options, callback = undefined) => {
  const url = Cypress.config('baseUrl') + options.urlPath;

  beforeEach(() => {
    //cy.passwordProtection();
    cy.visit(options.urlPath);
  });

  it('Visit ' + url, () => {
    cy.url().should('eq', url);
  });

  context('SEO', () => {
    if (options?.seo?.metaTags !== false) {
      seo.testMetaTags(options?.seo?.metaTags || {});
    }
    if (options?.seo?.openGraphTags !== false) {
      seo.testOpenGraphTags();
    }
    if (options?.seo?.structuredData !== false) {
      seo.testStructuredData();
    }
    if (options?.seo?.images !== false) {
      seo.testImages();
    }
  });

  if (typeof callback == 'function') {
    callback(options);
  }
};
