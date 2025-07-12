import { MetadataRoute } from 'next';
import learningContent from '../content/learning.json';
import clusterContent from '../content/cluster-articles.json';
import toolsContent from '../content/tools.json';

// Define a base type for our content files to satisfy TypeScript
type Content = {
  [key: string]: {
    en?: { schema: { dateModified: string } };
    ar?: { schema: { dateModified: string } };
  };
};

const typedLearningContent: Content = learningContent;
const typedClusterContent: Content = clusterContent;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.whatismyip.zone'; // <-- Replace with your actual domain
const languages: ('en' | 'ar')[] = ['en', 'ar'];
  // 1. Static Pages (Home, About, etc.)
  const staticPages = ['/', '/about', '/contact', '/press', '/reviews/vpn'];
  const staticUrls = staticPages.flatMap(page =>
    languages.map(lang => ({
      url: `${baseUrl}${lang === 'ar' ? '/ar' : ''}${page === '/' ? '' : page}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: page === '/' ? 1.0 : 0.7,
    }))
  );

  // 2. Tool Pages (IP Lookup, Breach Check, etc.)
  const toolUrls = Object.keys(toolsContent).flatMap(slug =>
    languages.map(lang => ({
      url: `${baseUrl}${lang === 'ar' ? '/ar' : ''}/tools/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  // 3. Learning Pillar Pages (VPN Guide, Privacy Guide, etc.)
  const pillarUrls = Object.keys(typedLearningContent).flatMap(slug =>
    languages.map(lang => ({
      url: `${baseUrl}${lang === 'ar' ? '/ar' : ''}/learning/${slug}`,
      lastModified: typedLearningContent[slug]?.[lang]?.schema.dateModified || new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  );

  // 4. Learning Cluster Pages (What is Malware?, How VPNs Work, etc.)
  const clusterUrls = Object.keys(typedClusterContent).flatMap(slug =>
    languages.map(lang => ({
      url: `${baseUrl}${lang === 'ar' ? '/ar' : ''}/learning/${slug}`,
      lastModified: typedClusterContent[slug]?.[lang]?.schema.dateModified || new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...staticUrls, ...toolUrls, ...pillarUrls, ...clusterUrls];
}
