// app/components/InternalLinkBox.tsx
import Link from 'next/link';

interface InternalLinkBoxProps {
  title: string;
  description: string;
  href: string;
  linkText: string;
}

// A simple icon for visual flair
const ArrowIcon = () => (
    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

export default function InternalLinkBox({ title, description, href, linkText }: InternalLinkBoxProps) {
  return (
    <div className="my-8 bg-green-50 dark:bg-slate-800/50 border-l-4 border-green-500 p-6 rounded-r-lg">
      <h3 className="text-lg font-bold text-slate-900 dark:text-green-300">{title}</h3>
      <p className="mt-2 text-base text-slate-700 dark:text-slate-300">{description}</p>
      <Link href={href} className="group inline-flex items-center mt-4 text-base font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
        {linkText}
        <ArrowIcon />
      </Link>
    </div>
  );
}