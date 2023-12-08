import { setSEOConfig } from '../../src/playwright/configs';

const customConfig = {
  baseUrl: process.env.E2E_BASE_URL || 'http://localhost',
  metaTags: {
    title: {
      content: /Yoast$/,
    },
    // themeColor: {
    //   selector: 'meta[name="theme-color"]',
    //   attributes: {
    //     content: '#FFFFFF',
    //   },
    // },
    // ogSeeAlsoFacebook: {
    //   selector: 'meta[property="og:see_also"][content="URL"]',
    // },
    // ogSeeAlsoInstagram: {
    //   selector: 'meta[property="og:see_also"][content="URL"]',
    // },
    // ogSeeAlsoLinkedin: {
    //   selector: 'meta[property="og:see_also"][content="URL"]',
    // },
    // ogSeeAlsoTwitter: {
    //   selector: 'meta[property="og:see_also"][content="URL"]',
    // },
  },
  // structuredData: {
  //   organization:
  // }
  images: {
    exclude: [
      '//analytics.twitter.com',
      '//t.co',
      '//embed-ssl.wistia.com',
      '//i.ytimg.com',
    ],
  },
};

setSEOConfig(customConfig);

export const pages = [
  {
    name: 'Homepage',
    urlPath: '/',
    images: {
      exclude: [
        ...customConfig.images.exclude,
        ...[
          'https://yoast.com/app/uploads/2023/02/forums_bubble_white_lg.png',
          'https://yoast.com/app/uploads/2023/02/help_center_white_lg.png',
          'https://yoast.com/app/uploads/2023/02/seo_academy_bubble_white_lg.png',
          'https://yoast.com/app/uploads/2023/02/support2_bubble_white_lg.png',
          'https://yoast.com/app/uploads/2023/03/content_usp_optm.svg',
          'https://yoast.com/app/uploads/2023/03/results_usp_optm.svg',
          'https://yoast.com/app/uploads/2023/03/support_usp_optm.svg',
          'https://yoast.com/app/uploads/2023/03/technical_usp_optm.svg',
        ],
      ],
    },
  },
  {
    name: 'About',
    urlPath: '/about',
    metaTags: {
      ogType: {
        attributes: {
          content: 'article',
        },
      },
    },
  },
  {
    name: 'Seo Plugin',
    urlPath: '/wordpress/plugins/seo/',
    metaTags: {
      ogType: {
        attributes: {
          content: 'og:product',
        },
      },
    },
  },
];
