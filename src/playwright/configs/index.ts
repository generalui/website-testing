import { metaTags } from './meta-tags';
import { testTagProps } from '../utils/tags';
import merge from 'lodash/merge';

export * from './meta-tags';

export interface SeoConfig {
  baseUrl: string;
  metaTags: { [key: string]: testTagProps };
  structuredData: {
    organization: {} | boolean;
    website: {} | boolean;
    breadcrumb: {} | boolean;
    product: {} | boolean;
    productCollection: {} | boolean;
    faq: {} | boolean;
  };
  images: {
    exclude: (string | RegExp)[];
    lazyLoadingProperty: string;
    skipIfNoImagesFound: boolean;
  };
}

export let seoConfig: SeoConfig = {};

export const setSEOConfig = (custom) => {
  const defaultConfig: SeoConfig = {
    baseUrl: '',
    metaTags,
    structuredData: {},
    images: {
      exclude: [],
      lazyLoadingProperty: 'data-src',
      skipIfNoImagesFound: true,
    },
  };

  seoConfig = merge(defaultConfig, custom);

  return seoConfig;
};
