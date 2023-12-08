import { regExps } from '../constants';

export const metaTags = {
  /* ------------------------------------------------------------------------ */
  /* User Agent
  /* ------------------------------------------------------------------------ */
  charset: {
    selector: 'meta[charset="utf-8"]',
  },
  // referrer: {
  //   selector: 'meta[name="referrer"]',
  //   attributes: {
  //     content: regExps.notEmpty,
  //   }
  // },
  referrer: false,
  // themeColor: {
  //   selector: 'meta[name="theme-color"]',
  //   attributes: {
  //     content: regExps.hexColor,
  //   }
  // },
  themeColor: false,
  viewport: {
    selector: 'meta[name="viewport"]',
    attributes: {
      content: 'width=device-width, initial-scale=1',
    },
  },
  // xUaCompatible: {
  //   selector: 'meta[http-equiv="x-ua-compatible"]',
  //   attributes: {
  //     content: 'IE=edge',
  //   },
  // },
  xUaCompatible: false,
  /* ------------------------------------------------------------------------ */
  /* SEO
  /* ------------------------------------------------------------------------ */
  title: {
    selector: 'title',
    content: regExps.notEmpty,
  },
  description: {
    selector: 'meta[name="description"]',
    attributes: {
      content: regExps.notEmpty,
    },
  },
  canonical: {
    selector: 'link[rel="canonical"]',
    attributes: {
      href: regExps.notEmpty,
    },
  },
  /* ------------------------------------------------------------------------ */
  /* Favicon
  /* ------------------------------------------------------------------------ */
  // faviconICO: {
  //   selector: 'link[rel="icon"][href="URL"]',
  //   attributes: {
  //     sizes: 'any',
  //   },
  // },
  // faviconPNG: {
  //   selector: 'link[rel="icon"][href="URL"]',
  //   attributes: {
  //     sizes: 'any',
  //   },
  // },
  maskIcon: {
    selector: 'link[rel="mask-icon"]',
    attributes: {
      href: regExps.notEmpty,
    },
    isOptional: true,
  },
  appleTouchIcon: {
    selector: 'link[rel="apple-touch-icon"]',
    attributes: {
      href: regExps.notEmpty,
    },
  },
  /* ------------------------------------------------------------------------ */
  /* OpenGraph
  /* ------------------------------------------------------------------------ */
  ogType: {
    selector: 'meta[property="og:type"]',
    attributes: {
      content: 'website',
    },
  },
  ogTitle: {
    selector: 'meta[property="og:title"]',
    attributes: {
      content: regExps.notEmpty,
    },
  },
  ogDescription: {
    selector: 'meta[property="og:description"]',
    attributes: {
      content: regExps.notEmpty,
    },
  },
  ogUrl: {
    selector: 'meta[property="og:url"]',
    attributes: {
      content: regExps.notEmpty,
    },
  },
  ogImage: {
    selector: 'meta[property="og:image"]',
    attributes: {
      content: regExps.notEmpty,
    },
  },
  ogSitename: {
    selector: 'meta[property="og:site_name"]',
    attributes: {
      content: regExps.notEmpty,
    },
  },
  // ogSeeAlsoFacebook: {
  //   selector:
  //     'meta[property="og:see_also"][content="URL"]',
  // },
  ogSeeAlsoFacebook: false,
  ogSeeAlsoInstagram: false,
  ogSeeAlsoLinkedin: false,
  ogSeeAlsoTwitter: false,
  ogLocale: {
    selector: 'meta[property="og:locale"]',
    attributes: {
      content: regExps.notEmpty,
    },
  },
  twitterCard: {
    selector: 'meta[name="twitter:card"]',
    attributes: {
      content: 'summary_large_image',
    },
  },
  twitterSite: {
    selector: 'meta[name="twitter:site"]',
    attributes: {
      content: regExps.socialHandle,
    },
  },
};

const productMetaTags = {
  ogType: {
    selector: 'meta[property="og:type"]',
    attributes: {
      content: 'Product',
    },
  },
  ogAvailability: {
    selector: 'meta[property="og:availability"]',
    attributes: {
      content: /^(instock|out of stock)$/,
    },
  },
  ogPriceAmount: {
    selector: 'meta[property="og:price:amount"]',
    attributes: {
      content: regExps.notEmpty,
    },
  },
  ogPriceCurrency: {
    selector: 'meta[property="og:price:currency"]',
    attributes: {
      content: regExps.currency,
    },
  },
};
