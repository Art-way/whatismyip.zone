// app/components/Header.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import siteContent from '@/../content/site.json';

// --- Professional Icons ---
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ltr:ml-1 rtl:mr-1"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
);
const LanguageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M7.75 2.75a.75.75 0 0 0-1.5 0v1.258a32.987 32.987 0 0 0-3.599.278.75.75 0 1 0 .337 1.456 31.487 31.487 0 0 1 3.262-.24v1.22a32.953 32.953 0 0 0-2.663.39.75.75 0 1 0 .414 1.442 31.402 31.402 0 0 1 2.25-.33v4.74a31.549 31.549 0 0 1-2.428.46.75.75 0 1 0 .33 1.458 32.85 32.85 0 0 0 2.098-.4v1.258a.75.75 0 0 0 1.5 0v-1.258a32.987 32.987 0 0 0 3.599-.278.75.75 0 1 0-.337-1.456 31.487 31.487 0 0 1-3.262.24v-1.22a32.953 32.953 0 0 0 2.663-.39.75.75 0 1 0-.414-1.442 31.402 31.402 0 0 1-2.25.33v-4.74a31.549 31.549 0 0 1 2.428-.46.75.75 0 1 0-.33-1.458 32.85 32.85 0 0 0-2.098.4V2.75Z" /><path d="M15.509 6.35a.75.75 0 0 0-1.018.533 22.46 22.46 0 0 1-1.22 4.412.75.75 0 1 0 1.456.337 20.961 20.961 0 0 0 1.136-4.22.75.75 0 0 0-.354-.662ZM17.02 10.97a.75.75 0 1 0-1.456.337 20.961 20.961 0 0 0 1.136-4.22.75.75 0 0 0-1.018-.533 22.46 22.46 0 0 1-1.22 4.412.75.75 0 1 0 1.456.337 20.961 20.961 0 0 0 1.136-4.22Z" /></svg>
);


export default function Header() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const lang = (pathname.split('/')[1] === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
    const headerText = siteContent.header[lang];
    
    // FIX: Explicitly type the 'path' parameter as a string to resolve the "implicit 'any'" error.
    const getLocalizedPath = (path: string) => (lang === 'en' || path === '/') ? path : `/${lang}${path}`;
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
                setOpenMenu(null);
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuContainerRef]);
    
    const handleLangChange = (newLangCode: string) => {
        const segments = pathname.split('/');
        const isPathLocalized = ['en', 'ar'].includes(segments[1]);
        const pathWithoutLocale = isPathLocalized ? `/${segments.slice(2).join('/')}` : pathname;
        const newPath = newLangCode === 'en' ? pathWithoutLocale : `/${newLangCode}${pathWithoutLocale}`;
        // Handle root path correctly to avoid double slashes or incorrect paths
        const finalPath = newPath === '/ar/' ? '/ar' : (newPath === '' ? '/' : newPath);
        window.location.href = finalPath;
    };

    return (
        <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center h-16" ref={menuContainerRef}>
                
                {/* --- Part 1: Logo --- */}
                <div className="flex-1 flex justify-start">
                    <Link href={getLocalizedPath("/")} className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
                        <Image src="/logo.svg" alt="whatismyip.zone logo" width={98} height={32} unoptimized />
                        whatismyip.zone
                    </Link>
                </div>
                
                {/* --- Part 2: Navigation Links --- */}
                <nav className="hidden lg:flex justify-center items-center h-full">
                    <div className="flex h-full">
                        {headerText.nav_items.map((item, index) => (
                            <div key={item.name} className="relative flex items-center">
                                {item.children ? (
                                    <button onClick={() => setOpenMenu(openMenu === item.name ? null : item.name)} className="h-full px-5 flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                                        {item.name}
                                        <ChevronDownIcon />
                                    </button>
                                ) : (
                                    <Link href={getLocalizedPath(item.href)} className="h-full px-5 flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                                        {item.name}
                                    </Link>
                                )}
                                {index < headerText.nav_items.length - 1 && <div className="h-6 w-px bg-slate-200 dark:bg-zinc-700"></div>}
                                {item.children && openMenu === item.name && (
                                    <div className="absolute top-full ltr:left-0 rtl:right-0 mt-1 w-56 bg-white dark:bg-zinc-900 rounded-md shadow-lg border dark:border-zinc-800 py-2">
                                        {item.children.map(child => (
                                            <Link key={child.name} href={getLocalizedPath(child.href)} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800" onClick={() => setOpenMenu(null)}>
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </nav>
                
                {/* --- Part 3: Language Switcher --- */}
                <div className="flex-1 flex justify-end">
                    <div className="relative">
                        <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="px-3 py-2 flex items-center gap-2 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                            <LanguageIcon />
                            <span className="hidden sm:inline text-sm font-medium">{lang === 'ar' ? 'العربية' : 'English'}</span>
                        </button>
                        {isLangMenuOpen && (
                            <div className="absolute top-full rtl:left-0 ltr:right-0 mt-2 w-36 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-800 py-1">
                                <button onClick={() => handleLangChange('en')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-zinc-800">English</button>
                                <button onClick={() => handleLangChange('ar')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-zinc-800">العربية</button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
}
