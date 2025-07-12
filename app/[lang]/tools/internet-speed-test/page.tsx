// app/[lang]/tools/internet-speed-test/page.tsx
import type { Metadata } from 'next';
// --- CHANGE THIS IMPORT TO THE NEW WIDGET ---
import OpenSpeedTestWidget from '@/components/SpeedTestWidget';

export const metadata: Metadata = {
  title: "Free HTML5 Internet Speed Test",
  description: "Check your internet connection's ping, download, and upload speed with our free and accurate HTML5 speed test tool.",
};

export default function SpeedTestPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Internet Speed Test
        </h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">
          A free and reliable HTML5 broadband speed test.
        </p>
      </header>

      <div className="mb-12">
        {/* --- SWAP TO THE FINAL, WORKING COMPONENT --- */}
        <OpenSpeedTestWidget />
      </div>

      {/* The explanatory content remains valuable */}
      <div className="bg-white dark:bg-zinc-950 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Understanding Your Results</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="info-section"><h3 className="font-semibold text-xl text-blue-600 dark:text-blue-400">Ping (Latency)</h3><p className="mt-2 text-slate-600 dark:text-slate-400">Measures the reaction time of your connection in milliseconds (ms). A lower ping is better for gaming and real-time applications.</p></div>
          <div className="info-section"><h3 className="font-semibold text-xl text-green-600 dark:text-green-400">Download Speed</h3><p className="mt-2 text-slate-600 dark:text-slate-400">How quickly you can pull data from a server to your device (Mbps). Key for streaming, downloading, and browsing.</p></div>
          <div className="info-section"><h3 className="font-semibold text-xl text-purple-600 dark:text-purple-400">Upload Speed</h3><p className="mt-2 text-slate-600 dark:text-slate-400">How quickly you can send data from your device to a server (Mbps). Important for video calls and sending files.</p></div>
        </div>
      </div>
    </div>
  );
}