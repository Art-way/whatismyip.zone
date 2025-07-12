// app/components/OpenSpeedTestWidget.tsx
"use client";

// This is the direct embed URL for OpenSpeedTest.
const OPENSPEEDTEST_EMBED_URL = "//openspeedtest.com/speedtest";

export default function OpenSpeedTestWidget() {
  return (
    // This outer container sets the maximum width and adds styling.
    <div className="mx-auto max-w-5xl rounded-lg overflow-hidden shadow-2xl border-2 border-slate-700">
      
      {/* This div uses the aspect-ratio trick for responsive embedding. */}
      <div className="relative w-full" style={{ paddingTop: '60%' }}>

        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={OPENSPEEDTEST_EMBED_URL}
          frameBorder="0"
          allowFullScreen
          title="Internet Speed Test by OpenSpeedTest.com"
          // --- SEO & PERFORMANCE BEST PRACTICES ---
          rel="nofollow" // Explicitly tells crawlers not to follow this source link.
          loading="lazy" // Prevents the iframe from loading until it's near the viewport.
        ></iframe>
      </div>
    </div>
  );
}