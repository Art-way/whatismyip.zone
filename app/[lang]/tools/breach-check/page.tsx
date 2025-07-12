// app/[lang]/tools/breach-check/page.tsx
"use client";
import { useState } from 'react';
import toolsContent from '../../../../content/tools.json';
import { usePathname } from 'next/navigation';

// --- تعريف الأنواع ---
interface Breach {
  Name: string; Title: string; Domain: string; BreachDate: string; Description: string; DataClasses: string[];
}
interface ApiResponse {
  found: boolean; breaches: Breach[];
}

// --- الأيقونات والمكونات الفرعية ---
const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
);

const BreachResultItem = ({ breach }: { breach: Breach }) => (
    <div className="p-4 bg-red-100/50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <h3 className="font-bold text-lg text-red-800 dark:text-red-300">{breach.Title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Breached on: {breach.BreachDate}</p>
        <div className="mt-2 text-sm text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: breach.Description }} />
        <div className="mt-3">
            <p className="text-xs font-semibold">Compromised data:</p>
            <div className="flex flex-wrap gap-2 mt-1">
                {breach.DataClasses.map(dc => ( <span key={dc} className="px-2 py-1 text-xs bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full">{dc}</span> ))}
            </div>
        </div>
    </div>
);

// --- المكون الرئيسي للصفحة ---
export default function BreachCheckPage() {
  const lang = usePathname().split('/')[1] === 'ar' ? 'ar' : 'en';
  const pageText = toolsContent['breach-check'][lang] || toolsContent['breach-check'].en;

  const [email, setEmail] = useState('');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/api/breach-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong.');
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {pageText.title}
        </h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">
          {pageText.subtitle}
        </p>
      </header>

      <div className="bg-white dark:bg-zinc-950 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., yourname@example.com" required
              className="flex-grow px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button
              type="submit" disabled={isLoading}
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <SpinnerIcon /> : pageText.button_text}
            </button>
          </div>
        </form>
      </div>

      {error && ( <div className="mt-8 p-4 text-center bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg"><strong>Error:</strong> {error}</div> )}

      {result && (
        <div className="mt-8">
            {result.found === false ? (
                <div className="p-6 text-center bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-lg">
                    <h2 className="text-2xl font-bold">Good news!</h2>
                    <p className="mt-2">No breaches found for this email address in our database.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="p-6 text-center bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-lg">
                        <h2 className="text-2xl font-bold">Oh no — pwned!</h2>
                        <p className="mt-2">This email was found in {result.breaches.length} known data breaches. You should change your passwords immediately.</p>
                    </div>
                    {result.breaches.map(breach => <BreachResultItem key={breach.Name} breach={breach} />)}
                </div>
            )}
        </div>
      )}

      {/* --- القسم الجديد: المحتوى الطويل والشروحات --- */}
      <div className="mt-16 bg-white dark:bg-zinc-950 p-8 rounded-lg shadow-lg">
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: pageText.body }} 
        />
      </div>
    </div>
  );
}