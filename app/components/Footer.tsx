// app/components/Footer.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import siteContent from '@/../content/site.json';

export default function Footer() {
    const lang = usePathname().split('/')[1] === 'ar' ? 'ar' : 'en';
    const footerText = siteContent.footer[lang] || siteContent.footer.en;
    const getLocalizedPath = (path: string) => (lang === 'en' || path === '/') ? path : `/${lang}${path}`;

    return (
        <footer className="bg-black text-slate-300">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                    
                    <div className="col-span-2 lg:col-span-1">
                        <Link href={getLocalizedPath("/")} className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                            whatismyip.zone
                        </Link>
                        <p className="mt-4 text-sm text-slate-400">
                            {footerText.tagline}
                        </p>
                    </div>

                    {/* --- عرض الأعمدة بشكل ديناميكي من JSON --- */}
                    {footerText.columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-500">
                                {column.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={getLocalizedPath(link.href)} className="text-sm text-slate-300 hover:text-white transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} whatismyip.zone. {footerText.copyright}
                    </p>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        <Link href={getLocalizedPath("/privacy-policy")} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                            {footerText.privacy_policy}
                        </Link>
                        <Link href={getLocalizedPath("/terms-of-service")} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                            {footerText.terms_of_service}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}