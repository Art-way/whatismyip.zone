// app/[lang]/tools/ip-blacklist-check/page.tsx
"use client";

import { useState } from 'react';
import type { BlacklistCheckResult } from '@/api/blacklist-check/route';
import toolsContent from '../../../../content/tools.json';
import { usePathname } from 'next/navigation';

// --- أيقونات احترافية ---
const CheckCircleIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const ExclamationCircleIcon = () => (
  <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default function BlacklistCheckPage() {
  const lang = usePathname().split('/')[1] === 'ar' ? 'ar' : 'en';
  const pageText = toolsContent['ip-blacklist-check'][lang] || toolsContent['ip-blacklist-check'].en;

  const [ip, setIp] = useState('');
  const [results, setResults] = useState<BlacklistCheckResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/blacklist-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      setResults(data);
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
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="e.g., 8.8.8.8"
              required
              className="flex-grow px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <SpinnerIcon /> : pageText.button_text}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mt-8 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {results && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Results for {ip}</h2>
          <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {results.map((result) => (
                <li key={result.dnsbl} className="px-6 py-4 flex items-center justify-between">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{result.dnsbl}</span>
                  {result.listed ? (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <ExclamationCircleIcon />
                      <span className="font-semibold">Listed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircleIcon />
                      <span className="font-semibold">Not Listed</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* --- القسم الجديد: المحتوى الطويل والشروحات --- */}
      <div className="mt-16 bg-white dark:bg-zinc-950 p-8 rounded-lg shadow-lg">
        <div 
          className="article-content" // استخدام نفس الكلاس الخاص بتنسيق المقالات
          dangerouslySetInnerHTML={{ __html: pageText.body }} 
        />
      </div>
    </div>
  );
}