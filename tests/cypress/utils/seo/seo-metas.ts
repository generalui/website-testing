const defaultOptions = Cypress.config('defaultOptions');
import { getTestOption } from '../helpers';

type TestMetaTagsOptions = {
  xUaCompatible: String;
  referrer: String;
  viewport: String;
  title: String;
  description: String;
};
export const testMetaTags = (options: TestMetaTagsOptions) => {
  it('Meta Tags', () => {
    // -------------------------------------------------------------------- //
    // User Agent
    // -------------------------------------------------------------------- //

    // charset
    cy.get('meta[charset="utf-8"]').should('exist');

    // http-equiv
    const xUaCompatible = getTestOption(
      options,
      'xUaCompatible',
      'seo.metaTags.xUaCompatible'
    );
    if (xUaCompatible) {
      cy.get('meta[http-equiv="x-ua-compatible"]').should((meta) => {
        expect(meta, '\n TEST' + xUaCompatible).to.have.attr(
          'content',
          xUaCompatible
        );
      });
    }

    // referrer
    const referrer = getTestOption(
      options,
      'referrer',
      'seo.metaTags.referrer'
    );
    if (referrer) {
      cy.get('meta[name="referrer"]').should((meta) => {
        expect(meta, '\n' + 'referrer').to.have.attr('content', referrer);
      });
    }

    // theme-color
    const themeColor = getTestOption(
      options,
      'themeColor',
      'seo.metaTags.themeColor'
    );
    if (referrer) {
      cy.get('meta[name="theme-color"]').should((meta) => {
        expect(meta, '\n' + 'theme-color').to.have.attr('content', themeColor);
      });
    }

    // viewport
    const viewport = getTestOption(
      options,
      'viewport',
      'seo.metaTags.viewport'
    );
    if (viewport) {
      cy.get('meta[name="viewport"]').should((meta) => {
        expect(meta, '\n' + 'viewport').to.have.attr('content', viewport);
      });
    }

    // -------------------------------------------------------------------- //
    // SEO
    // -------------------------------------------------------------------- //
    // Title
    cy.title().should((title) => {
      expect(title, '\n' + 'title').not.to.be.empty;

      const expectedValue = getTestOption(
        options,
        'title',
        'seo.metaTags.title'
      );
      if (expectedValue) {
        expect(title, '\n' + 'title').to.match(new RegExp(expectedValue, 'g'));
      } else {
        expect(title, '\n' + 'title');
      }
    });

    // Description
    cy.get('meta[name="description"]').should((description) => {
      expect(description, '\n' + 'description').to.have.attr('content').and.not
        .to.be.empty;

      const expectedValue = getTestOption(
        options,
        'description',
        'seo.metaTags.description'
      );
      if (expectedValue) {
        expect(description, '\n' + 'description').to.match(
          new RegExp(expectedValue, 'g')
        );
      }
    });

    // Canonical
    const canonical = getTestOption(
      options,
      'canonical',
      'seo.metaTags.canonical'
    );
    if (canonical !== false) {
      if (typeof canonical === 'string') {
        cy.get('link[rel="canonical"]').should((link) => {
          expect(link, '\n' + 'canonical').to.have.attr('href', canonical);
        });
      } else {
        cy.url().then((url) => {
          cy.get('link[rel="canonical"]').should((link) => {
            expect(link, '\n' + 'canonical')
              .attr('href')
              .to.match(new RegExp(`^${url.replace(/\/$/g, '')}(\/)?$`, 'g'));
          });
        });
      }
    }

    // -------------------------------------------------------------------- //
    // Favicon
    // -------------------------------------------------------------------- //
    const favicon = getTestOption(options, 'favicon', 'seo.metaTags.favicon');
    if (favicon) {
      if (favicon.ico) {
        cy.get(`link[rel="icon"][href="${favicon.ico}"]`).should((link) => {
          expect(link, '\n' + 'favicon:ico').to.have.attr('sizes', 'any');
        });
      }

      if (favicon.png) {
        cy.get(`link[rel="icon"][href="${favicon.png}"]`).should((link) => {
          expect(link, '\n' + 'favicon:png').to.have.attr('sizes', 'any');
        });
      }

      if (favicon.svg) {
        cy.get(`link[rel="icon"][href="${favicon.svg}"]`).should((link) => {
          expect(link, '\n' + 'favicon:svg').to.have.attr(
            'type',
            'image/svg+xml'
          );
        });
      }

      // mask icon
      if (favicon.maskIcon) {
        cy.get('link[rel="mask-icon"]').should((link) => {
          expect(link, '\n' + 'favicon:mask-icon').to.have.attr(
            'href',
            favicon.maskIcon
          );
        });
      }

      // apple-touch-icon
      if (favicon.appleTouchIcon) {
        cy.get('link[rel="apple-touch-icon"]').should((link) => {
          expect(link, '\n' + 'favicon:apple-touch-icon').to.have.attr(
            'href',
            favicon.appleTouchIcon
          );
        });
      }
    }
  });
};

export const testOpenGraphTags = function (options = {}) {
  it('Open Graph Tags', () => {
    if (options.product) {
      // type
      cy.get('meta[property="og:type"]').should((meta) => {
        expect(meta, '\n' + 'og:type').to.have.attr('content', 'Product');
      });
      // availability
      cy.get('meta[property="og:availability"]').should((meta) => {
        expect(meta, '\n' + 'og:availability').to.have.attr('content').and.not
          .to.be.empty;
      });
      // price:amount
      cy.get('meta[property="og:price:amount"]').should((meta) => {
        expect(meta, '\n' + 'og:price:amount').to.have.attr('content').and.not
          .to.be.empty;
      });
      // price:currency
      cy.get('meta[property="og:price:currency"]').should((meta) => {
        expect(meta, '\n' + 'og:price:currency').to.have.attr('content').and.not
          .to.be.empty;
      });
    } else {
      // type
      cy.get('meta[property="og:type"]').should((meta) => {
        expect(meta, '\n' + 'og:type').to.have.attr('content', 'website');
      });
    }

    // og:title
    cy.get('meta[property="og:title"]').should((meta) => {
      expect(meta, '\n' + 'og:title').to.have.attr('content').not.to.be.empty;
      //.to.match(new RegExp(, 'g'));
    });
    // og:description
    cy.get('meta[property="og:description"]').should((meta) => {
      expect(meta, '\n' + 'og:description').to.have.attr('content').and.not.to
        .be.empty;
    });
    // og:url
    cy.get('meta[property="og:url"]').should((meta) => {
      expect(meta, '\n' + 'og:url').to.have.attr('content').and.not.to.be.empty;
    });
    // og:image
    cy.get('meta[property="og:image"]').should((meta) => {
      expect(meta, '\n' + 'og:image').to.have.attr('content').and.not.to.be
        .empty;
    });
    // og:site_name
    cy.get('meta[property="og:site_name"]').should((meta) => {
      expect(meta, '\n' + 'og:site_name').to.have.attr('content').and.not.to.be
        .empty;
    });
    // og:see_also
    cy.get('meta[property="og:see_also"]').should((meta) => {
      expect(meta, '\n' + 'og:see_also')
        .to.have.lengthOf(5)
        .and.to.have.attr('content').and.not.to.be.empty;
    });
    // og:locale
    cy.get('meta[property="og:locale"]').should((meta) => {
      expect(meta, '\n' + 'og:locale').to.have.attr('content').and.not.to.be
        .empty;
    });

    // twitter:card
    cy.get('meta[name="twitter:card"]').should((meta) => {
      expect(meta, '\n' + 'twitter:card').to.have.attr(
        'content',
        'summary_large_image'
      );
    });
    // twitter:site
    cy.get('meta[name="twitter:site"]').should((meta) => {
      expect(meta, '\n' + 'twitter:site').to.have.attr('content', '@genui');
    });
  });
};
