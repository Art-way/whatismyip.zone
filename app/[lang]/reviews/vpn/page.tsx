// app/[lang]/reviews/vpn/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Best VPN Reviews (2025)",
  description: "Independent, hands-on reviews of the best VPN services. We test for speed, security, and privacy to help you choose the right VPN.",
};

// بيانات وهمية للمراجعات - يمكنك استبدالها ببيانات حقيقية لاحقاً
const vpnReviews = [
  { id: 1, name: 'ExampleVPN', rating: 4.8, description: 'Excellent speed and top-tier security features.' },
  { id: 2, name: 'SecureNet VPN', rating: 4.6, description: 'Great for streaming and very user-friendly.' },
  { id: 3, name: 'PrivacyOne VPN', rating: 4.5, description: 'A solid choice with a strict no-logs policy.' },
];

export default function VpnReviewsPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const isArabic = params.lang === 'ar';

  return (
    <div className="max-w-5xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isArabic ? 'مراجعات أفضل خدمات VPN لعام 2025' : 'Best VPN Reviews (2025)'}
        </h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">
          {isArabic ? 'مراجعاتنا المستقلة تساعدك على اختيار الخدمة الأنسب لك.' : 'Our independent reviews help you choose the right service.'}
        </p>
      </header>
      
      <div className="space-y-8">
        {vpnReviews.map((vpn) => (
          <div key={vpn.id} className="p-6 bg-white dark:bg-zinc-950 rounded-lg shadow-lg border border-slate-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{vpn.name}</h2>
            <p className="text-lg font-semibold mt-1">{isArabic ? 'التقييم:' : 'Rating:'} {vpn.rating} / 5</p>
            <p className="mt-2 text-slate-700 dark:text-slate-300">{vpn.description}</p>
            <a href="#" className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              {isArabic ? 'اقرأ المراجعة الكاملة' : 'Read Full Review'}
            </a>
          </div>
        ))}
        <div className="text-center pt-8">
            <p className="text-slate-500">{isArabic ? 'قريباً: المزيد من المراجعات التفصيلية ومعايير الاختبار.' : 'Coming Soon: More in-depth reviews and testing criteria.'}</p>
        </div>
      </div>
    </div>
  );
}
