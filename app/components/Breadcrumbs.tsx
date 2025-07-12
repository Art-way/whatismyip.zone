// app/components/Breadcrumbs.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Breadcrumb {
  name: string;
  href: string;
}

// A simple icon for the home link
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

// This component will receive its links as a prop.
// In a real app, you might generate these automatically based on the URL.
export default function Breadcrumbs({ links }: { links: Breadcrumb[] }) {
  const pathname = usePathname();
  // We need to get the language prefix for the home link
  const lang = pathname.split('/')[1];
  const homeHref = (lang === 'en' || !lang) ? '/' : `/${lang}`;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href={homeHref} className="text-slate-500 dark:text-slate-400 hover:text-blue-600">
            <HomeIcon />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {links.map((link, index) => (
          <li key={link.name} className="flex items-center">
            <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
            </svg>
            <Link
              href={link.href}
              aria-current={index === links.length - 1 ? 'page' : undefined}
              className={`ml-2 ${index === links.length - 1 ? 'text-slate-700 dark:text-slate-200 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-blue-600'}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}