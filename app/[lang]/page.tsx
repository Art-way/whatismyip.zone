// File: app/[lang]/page.tsx

// FIX: Remove the unused Image import
import IpInfoCard from '@/components/IpInfoCard';
import Link from 'next/link';
import siteContent from '@/../content/site.json';

type Concern = {
  name: string;
  description: string;
  cta: string;
  
};

type Tool = {
  name: string;
  href: string;
  description: string;
};

type Faq = {
  question: string;
  answer: string;
};

const ToolIcon = ({ icon }: { icon: string }) => (
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
        <span className="text-2xl">{icon}</span>
    </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => (
    <details className="py-4 border-b border-slate-200 dark:border-slate-800">
        <summary className="font-semibold text-lg cursor-pointer text-slate-800 dark:text-slate-200">{question}</summary>
        <div className="mt-2 text-slate-600 dark:text-slate-400">
            <p>{answer}</p>
        </div>
    </details>
);

export default async function HomePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const homeText = siteContent.homepage[lang];

  const getLocalizedPath = (path: string) => (lang === 'en' ? path : `/${lang}${path}`);

  const logos = ['CNN', 'USA Today', 'FOX Business', 'The Guardian', 'PC World'];

  return (
    <div className="space-y-20 md:space-y-24">
      
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {homeText.hero_title}
        </h1>
        <div className="max-w-4xl mx-auto mt-6">
          <IpInfoCard />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">{homeText.concerns_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {homeText.concerns.map((concern) => (
            <div key={concern.name} className="p-8 text-center bg-slate-50 dark:bg-zinc-900 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">{concern.name}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400 h-16">{concern.description}</p>
              <Link 
  href={getLocalizedPath(concern.href)}
  className="mt-6 block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
>
  {concern.cta}
</Link>
            </div>
          ))}
        </div>
      </section>
      
      <section className="text-center">
        <h3 className="text-lg font-semibold text-slate-500 uppercase tracking-widest">{homeText.as_seen_on}</h3>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
          {logos.map(logo => (
            <span key={logo} className="text-2xl font-bold text-slate-400">{logo}</span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">{homeText.tools_title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {homeText.tools.map((tool: Tool) => (
            <Link href={getLocalizedPath(tool.href)} key={tool.name} className="p-6 bg-white dark:bg-zinc-950 rounded-lg shadow-lg border border-slate-200 dark:border-zinc-800 text-center hover:border-blue-500 transition-colors">
              <ToolIcon icon="🔧" />
              <h3 className="text-xl font-bold">{tool.name}</h3>
              <p className="mt-2 text-slate-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">{homeText.faq_title}</h2>
        <div className="max-w-4xl mx-auto">
          {homeText.faqs.map((faq: Faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

    </div>
  );
}