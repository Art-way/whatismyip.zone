// app/components/IpInfoCard.tsx
"use client";

import { useEffect, useState } from "react";
import type { IpInfo } from "@/types/ipinfo";
import dynamic from 'next/dynamic';

// Dynamically import the map component to prevent SSR issues
const IpMap = dynamic(() => import('@/components/IpMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
});

const QuestionMarkIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

export default function IpInfoCard() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://ipinfo.io/json");
        if (!response.ok) throw new Error("API request failed. Please try again later.");
        const data: IpInfo = await response.json();
        setIpInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchIpInfo();
  }, []);

  if (isLoading) {
    return <div className="w-full h-80 bg-slate-800 rounded-lg animate-pulse"></div>;
  }

  if (error) {
    return (
      <div className="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-2xl flex items-center justify-center min-h-80">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-400">An Error Occurred</h3>
          <p className="text-slate-400 mt-2">{error}</p>
        </div>
      </div>
    );
  }
  
  if (!ipInfo) {
    return <div className="text-center text-slate-400 font-semibold my-8">Could not load IP details.</div>;
  }
  
  const location: [number, number] = ipInfo.loc ? [parseFloat(ipInfo.loc.split(',')[0]), parseFloat(ipInfo.loc.split(',')[1])] : [0,0];

  return (
    <div className="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-slate-300 text-sm">My IP Address is:</h2>
            <div className="space-y-2 mt-2">
              <div className="bg-slate-900/50 p-4 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-300">IPv4:</span>
                  <QuestionMarkIcon />
                </div>
                <span className="font-mono text-xl text-cyan-400 tracking-wider">{ipInfo.ip}</span>
              </div>
            </div>
          </div>

          {/* My IP Information Box */}
          <div className="bg-slate-700/80 p-4 rounded-md">
            <h3 className="text-slate-300 text-sm mb-3">My IP Information:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <InfoRow label="ISP" value={ipInfo.org} />
              <InfoRow label="City" value={ipInfo.city} />
              <InfoRow label="Region" value={ipInfo.region} />
              <InfoRow label="Country" value={ipInfo.country} />
              <InfoRow label="Postal Code" value={ipInfo.postal || 'N/A'} />
<InfoRow label="Timezone" value={ipInfo.timezone || 'N/A'} />
            </div>
          </div>
        </div>
        
        {/* Right Side: Map */}
        <div className="lg:col-span-1 min-h-64 rounded-lg overflow-hidden border border-slate-700">
          <IpMap location={location} ipAddress={ipInfo.ip} city={ipInfo.city} />
          <div className="text-center mt-3">
             <a href="#" className="text-xs text-slate-400 hover:text-white">Location not accurate? Update My IP Location</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for consistent styling
const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between border-b border-slate-600/50 py-2">
    <span className="text-slate-400">{label}:</span>
    <span className="font-semibold text-slate-100 text-right">{value}</span>
  </div>
);