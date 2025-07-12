// File: app/[lang]/terms-of-service/page.tsx

import type { Metadata } from 'next';
import LegalPageLayout from '@/layouts/LegalPageLayout';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Please read our Terms of Service carefully before using the whatismyip.zone website.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="July 12, 2025"
    >
      <h2>1. Agreement to Terms</h2>
      <p>By using our website, whatismyip.zone, you agree to be bound by these Terms of Service. If you do not agree, do not use the Site.</p>
      
      <h2>2. Use of Our Services</h2>
      <p>Our services, including the IP information tool, blacklist checker, and speed test, are provided for your personal, non-commercial use. You agree not to misuse the services or help anyone else to do so.</p>
      
      <h2>3. Disclaimers</h2>
      {/* FIX: Escape the double quotes */}
      <p>The services on the Site are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We do not warrant that the service will be uninterrupted, timely, secure, or error-free. The information provided, such as IP address location, is based on third-party data and may not always be accurate.</p>

      <h2>4. Limitation of Liability</h2>
      <p>In no event shall whatismyip.zone, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the Site.</p>

      <h2>5. Governing Law</h2>
      <p>These Terms shall be governed by the laws of United Stated, without regard to its conflict of law provisions.</p>
    </LegalPageLayout>
  );
}