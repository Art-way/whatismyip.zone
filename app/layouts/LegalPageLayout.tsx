// app/layouts/LegalPageLayout.tsx
import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

// The 'export default' keywords make this component importable by other files.
export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="bg-white dark:bg-zinc-950 p-6 md:p-10 rounded-lg shadow-lg">
      <div className="max-w-4xl mx-auto">
        <header className="border-b dark:border-zinc-800 pb-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Last Updated: {lastUpdated}
          </p>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}