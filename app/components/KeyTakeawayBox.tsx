// app/components/KeyTakeawayBox.tsx
import React from 'react';

interface KeyTakeawayBoxProps {
  children: React.ReactNode;
}

// A simple icon for visual flair
const BulbIcon = () => (
  <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 11-8.486-8.486A5 5 0 0112 3a5 5 0 015 4.901V16a5 5 0 01-10 0v-1.099h3.824" />
  </svg>
);


export default function KeyTakeawayBox({ children }: KeyTakeawayBoxProps) {
  return (
    <div className="my-8 bg-blue-50 dark:bg-slate-800/50 border-l-4 border-blue-500 p-6 rounded-r-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <BulbIcon />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-blue-300">Key Takeaway</h3>
          <div className="mt-2 text-base text-slate-700 dark:text-slate-300 prose prose-slate dark:prose-invert">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}