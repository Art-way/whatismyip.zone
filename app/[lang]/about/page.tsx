// app/[lang]/about/page.tsx
import type { Metadata } from 'next';
import siteContent from '../../../content/site.json';
import LegalPageLayout from '@/layouts/LegalPageLayout';

export async function generateMetadata(
  props: { params: { lang: 'en' | 'ar' } }
): Promise<Metadata> {
  const lang = props.params.lang === 'ar' ? 'ar' : 'en';
  const pageText = siteContent.about_page[lang];
  
  return {
    title: pageText.title,
    description: pageText.meta_description,
  };
}

export default function AboutPage(props: { params: { lang: 'en' | 'ar' } }) {
  const lang = props.params.lang === 'ar' ? 'ar' : 'en';
  const pageText = siteContent.about_page[lang];

  return (
    <LegalPageLayout
      title={pageText.title}
      lastUpdated="July 16, 2025"
    >
      <div dangerouslySetInnerHTML={{ __html: pageText.body }} />
    </LegalPageLayout>
  );
}