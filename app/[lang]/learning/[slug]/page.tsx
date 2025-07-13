// app/[lang]/learning/[slug]/page.tsx

import type { Metadata } from 'next';
import KeyTakeawayBox from '@/components/KeyTakeawayBox';
import Breadcrumbs from '@/components/Breadcrumbs';
import InternalLinkBox from '@/components/InternalLinkBox';
import content from '../../../../content/learning.json';

// --- Type Definitions (Enriched) ---
type Breadcrumb = { name: string; href: string };
type Heading = { level: number; text: string; slug: string };
type RelatedLink = { title: string; description: string; href: string; linkText: string };
type PageContent = {
  category: string;
  title: string;
  subtitle: string;
  meta_description: string;
  breadcrumbs: Breadcrumb[];
  schema: { datePublished: string; dateModified: string; authorName: string; };
  headings: Heading[];
  body: string;
  key_takeaway?: string;
  related_links?: RelatedLink[];
};

// This is the content object with a proper type assertion
const typedContent: { [key: string]: { [key: string]: PageContent } } = content;

// This function now correctly iterates over the valid content object
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const slug in typedContent) {
    for (const lang in typedContent[slug]) {
      if (lang === 'en' || lang === 'ar') {
        params.push({ lang, slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: 'en' | 'ar'; slug: keyof typeof typedContent } }): Promise<Metadata> {
  const pageContent = typedContent[params.slug]?.[params.lang];
  if (!pageContent) return {};
  return {
    title: pageContent.title,
    description: pageContent.meta_description,
  };
}

// --- The New Professional Page Component ---
export default async function PillarPage({ params }: { params: { lang: 'en' | 'ar'; slug: keyof typeof typedContent } }) {
  const pageContent = typedContent[params.slug]?.[params.lang];

  if (!pageContent) {
    // In a real app, you would use the notFound() function from Next.js
    return <div>Page not found.</div>;
  }
  
  const breadcrumbLinks = pageContent.breadcrumbs.map(link => ({
    ...link,
    href: params.lang === 'en' ? link.href : `/${params.lang}${link.href}`
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': pageContent.title,
    'description': pageContent.meta_description,
    'image': 'https://www.whatismyip.zone/images/og-image.png',
    'datePublished': pageContent.schema.datePublished,
    'dateModified': pageContent.schema.dateModified,
    'author': [{ '@type': 'Person', 'name': pageContent.schema.authorName }],
    'publisher': {
        '@type': 'Organization',
        'name': 'whatismyip.zone',
        'logo': { '@type': 'ImageObject', 'url': 'https://www.whatismyip.zone/images/logo.png' }
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <article className="bg-white dark:bg-zinc-950 p-4 md:p-8 rounded-lg shadow-lg">
        <div className="max-w-4xl mx-auto">
          
          <header className="mb-8">
            <Breadcrumbs links={breadcrumbLinks} />
            <p className="mt-6 text-base font-semibold text-blue-600 dark:text-blue-400">
              {pageContent.category}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              {pageContent.title}
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-400">
              {pageContent.subtitle}
            </p>
            <div className="mt-6 flex items-center gap-x-6 text-sm text-slate-500 dark:text-slate-400 border-t border-b border-slate-200 dark:border-slate-800 py-4">
                <span>By <strong>{pageContent.schema.authorName}</strong></span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span>Last updated on {new Date(pageContent.schema.dateModified).toLocaleDateString(params.lang, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>

          <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Table of Contents</h2>
            <ul className="space-y-2">
              {pageContent.headings.map(heading => (
                <li key={heading.slug}>
                  <a href={`#${heading.slug}`} className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div 
             className="prose prose-lg dark:prose-invert max-w-none rtl:prose-rtl"
            dangerouslySetInnerHTML={{ __html: pageContent.body }} 
          />
          
          {pageContent.key_takeaway && (
            <KeyTakeawayBox>
              <div dangerouslySetInnerHTML={{ __html: pageContent.key_takeaway }} />
            </KeyTakeawayBox>
          )}

          {pageContent.related_links && pageContent.related_links.length > 0 && (
            <div className="mt-12 pt-8 border-t dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Related Reading</h2>
                <div className="space-y-6">
                    {pageContent.related_links.map(link => (
                        <InternalLinkBox
                            key={link.href}
                            title={link.title}
                            description={link.description}
                            href={params.lang === 'en' ? link.href : `/${params.lang}${link.href}`}
                            linkText={link.linkText}
                        />
                    ))}
                </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}