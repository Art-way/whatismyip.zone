// File: app/[lang]/learning/[...slug]/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import content from '../../../../content/cluster-articles.json';
import pillarContent from '../../../../content/learning.json';

type Breadcrumb = { name: string; href: string };
type PageContent = {
  parent_pillar: string;
  category: string;
  title: string;
  meta_description: string;
  breadcrumbs: Breadcrumb[];
  schema: { datePublished: string; dateModified: string; authorName: string; };
  body: string;
};

const typedContent: { [key: string]: { [key: string]: PageContent } } = content;

// FIX: Disable the ESLint rule for this line to allow the 'any' type,
// which is a pragmatic way to handle complex, nested JSON imports.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typedPillarContent: { [key: string]: { [key: string]: any } } = pillarContent;

export async function generateStaticParams() {
  const params: { lang: string; slug: string[] }[] = [];
  for (const slugString in typedContent) {
    const slugArray = slugString.split('/');
    params.push({ lang: 'en', slug: slugArray });
    params.push({ lang: 'ar', slug: slugArray });
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: 'en' | 'ar'; slug: string[] } }): Promise<Metadata> {
  const slugString = params.slug.join('/');
  const pageContent = typedContent[slugString]?.[params.lang];
  if (!pageContent) return {};
  return {
    title: pageContent.title,
    description: pageContent.meta_description,
  };
}

export default async function ClusterArticlePage({ params }: { params: { lang: 'en' | 'ar'; slug: string[] } }) {
  const slugString = params.slug.join('/');
  const pageContent = typedContent[slugString]?.[params.lang];

  if (!pageContent) {
    return <div>Article not found.</div>;
  }

  const parentPillar = typedPillarContent[pageContent.parent_pillar]?.[params.lang];
  const parentPillarTitle = parentPillar?.title || 'Main Guide';
  const parentPillarHref = params.lang === 'en'
    ? `/learning/${pageContent.parent_pillar}`
    : `/${params.lang}/learning/${pageContent.parent_pillar}`;

  const breadcrumbLinks = pageContent.breadcrumbs.map(link => ({
    ...link,
    href: params.lang === 'en' ? link.href : `/${params.lang}${link.href}`
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': pageContent.title,
    'description': pageContent.meta_description,
    'image': `https://www.whatismyip.zone/images/og-image.png`,
    'datePublished': pageContent.schema.datePublished,
    'dateModified': pageContent.schema.dateModified,
    'author': [{ '@type': 'Person', 'name': pageContent.schema.authorName }],
    'publisher': {
        '@type': 'Organization',
        'name': 'whatismyip.zone',
        'logo': { '@type': 'ImageObject', 'url': `https://www.whatismyip.zone/images/logo.png` }
    },
   };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="bg-white dark:bg-zinc-950 p-6 md:p-10 rounded-lg shadow-lg">
        <div className="max-w-4xl mx-auto">
          <header>
            <Breadcrumbs links={breadcrumbLinks} />
            <p className="mt-6 text-base font-semibold text-blue-600 dark:text-blue-400">
              {pageContent.category}
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              {pageContent.title}
            </h1>
            <div className="mt-4 text-sm text-slate-500">
              <span>Published on {new Date(pageContent.schema.datePublished).toLocaleDateString(params.lang, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>

          <hr className="my-8 dark:border-zinc-800" />

          <div
            className="prose prose-lg dark:prose-invert max-w-none rtl:prose-rtl"
            dangerouslySetInnerHTML={{ __html: pageContent.body }}
          />

          <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
            <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100">Continue Your Learning</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">This was a deep dive. Return to the main guide to see how it fits into the bigger picture.</p>
            <Link href={parentPillarHref} className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Return to &quot;{parentPillarTitle}&quot;
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}