import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://main.d2bn6vfwpt7dhb.amplifyapp.com/sitemap.xml',
  };
}