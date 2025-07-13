import type { Metadata } from 'next';
import LegalPageLayout from '@/layouts/LegalPageLayout';

// محتوى الصفحة باللغتين
const pageContent = {
  en: {
    title: "Press & Media",
    meta_description: "Information and resources for members of the press and media. For inquiries, please contact our media relations team.",
    body: `<h2>Media Inquiries</h2>
           <p>Welcome to the whatismyip.zone media center. We are happy to provide expert commentary, data insights, and interviews on topics related to IP addresses, cybersecurity, digital privacy, and VPN technology.</p>
           <p>Our team is dedicated to making complex technical subjects accessible to a broad audience. If you are a journalist, researcher, or content creator, please don't hesitate to reach out.</p>
           <h3>Contact Information</h3>
           <p>For all press and media inquiries, please contact us at:</p>
           <p><strong><a href="mailto:press@whatismyip.zone">press@whatismyip.zone</a></strong></p>
           <p>We aim to respond to all inquiries within one business day.</p>`
  },
  ar: {
    title: "للصحافة والإعلام",
    meta_description: "معلومات ومصادر لأعضاء الصحافة والإعلام. للاستفسارات، يرجى التواصل مع فريق العلاقات الإعلامية لدينا.",
    body: `<h2>للاستفسارات الإعلامية</h2>
           <p>مرحباً بك في المركز الإعلامي لموقع whatismyip.zone. يسعدنا تقديم تعليقات الخبراء، ورؤى البيانات، والمقابلات حول الموضوعات المتعلقة بعناوين IP، والأمن السيبراني، والخصوصية الرقمية، وتقنية VPN.</p>
           <p>فريقنا مكرس لجعل الموضوعات التقنية المعقدة في متناول جمهور واسع. إذا كنت صحفيًا أو باحثًا أو منشئ محتوى، فلا تتردد في التواصل معنا.</p>
           <h3>معلومات الاتصال</h3>
           <p>لجميع الاستفسارات الصحفية والإعلامية، يرجى التواصل معنا عبر:</p>
           <p><strong><a href="mailto:press@whatismyip.zone">press@whatismyip.zone</a></strong></p>
           <p>نهدف إلى الرد على جميع الاستفسارات في غضون يوم عمل واحد.</p>`
  }
};

export async function generateMetadata({ params }: { params: { lang: 'en' | 'ar' } }): Promise<Metadata> {
  const lang = params.lang || 'en';
  const content = pageContent[lang];
  return {
    title: content.title,
    description: content.meta_description,
  };
}

export default async function PressPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const lang = params.lang || 'en';
  const content = pageContent[lang];

  return (
    <LegalPageLayout
      title={content.title}
      lastUpdated="July 23, 2025"
    >
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </LegalPageLayout>
  );
}
