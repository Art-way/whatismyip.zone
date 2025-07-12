// app/[lang]/contact/page.tsx
import type { Metadata } from 'next';
import siteContent from '../../../content/site.json';

export async function generateMetadata({ params }: { params: { lang: 'en' | 'ar' } }): Promise<Metadata> {
  const pageText = siteContent.contact_page[params.lang] || siteContent.contact_page.en;
  return {
    title: pageText.title,
    description: pageText.meta_description,
  };
}

export default function ContactPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const pageText = siteContent.contact_page[params.lang] || siteContent.contact_page.en;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
        {pageText.title}
      </h1>
      <p className="mt-6 text-xl text-slate-600 dark:text-slate-400">
        {pageText.subtitle}
      </p>
      
      <div className="mt-12 p-8 bg-white dark:bg-zinc-950 rounded-lg shadow-lg border border-slate-200 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
            {pageText.email_heading}
        </h2>
        <a 
            href={`mailto:${pageText.email}`} 
            className="mt-4 inline-block text-2xl font-mono text-blue-600 dark:text-blue-400 hover:underline"
        >
            {pageText.email}
        </a>
      </div>
    </div>
  );
}