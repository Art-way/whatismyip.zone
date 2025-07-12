import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.whatismyip.zone'; // <-- Replace with your actual domain

  return {
    rules: [
      {
        userAgent: '*', // Applies to all search engine bots
        allow: '/',      // Allow crawling of all pages
        disallow: [
          '/api/',      // Disallow crawling of API routes
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // Location of your sitemap
  };
}
