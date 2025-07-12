// File: app/[lang]/privacy-policy/page.tsx

import type { Metadata } from 'next';
import LegalPageLayout from '@/layouts/LegalPageLayout';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how whatismyip.zone collects, uses, and protects your data. Your privacy and trust are important to us.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="July 12, 2025"
    >
      <h2>Introduction</h2>
      <p>Welcome to whatismyip.zone. We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Site and its services.</p>
      <p>This Privacy Policy is an agreement between you and whatismyip.zone. By using our Site, you consent to the data practices described in this statement. If you do not agree to the terms of this Privacy Policy, please do not use the Site.</p>
      {/* FIX: Escape the double quotes */}
      <p>We may update this policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post any changes on this page and update the &quot;Last Updated&quot; date. Your continued use of the Site after such changes constitutes your acceptance of the new policy.</p>
      
      <h2>1. Information We Collect</h2>
      {/* FIX: Escape the double quotes */}
      <p>We collect two types of information to provide and improve our services: &quot;Non-Personally Identifiable Information&quot; and &quot;Limited Personally Identifiable Information.&quot;</p>

      <h3>a. Information Processed to Provide Services</h3>
      <p>The core function of our Site is to provide you with information about your IP address. To do this, certain information is automatically processed:</p>
      <ul>
          <li><strong>IP Address:</strong> When you visit our Site, your web browser automatically sends your IP address. We process this IP address to display it to you and to provide related data (like your ISP and approximate location) by sending it to our third-party data provider, ipinfo.io. <strong>We do not log or store your IP address on our servers from general site visits.</strong></li>
          {/* FIX: Escape the double quotes */}
          <li><strong>IP Address for Tool Use:</strong> When you voluntarily enter an IP address into our &quot;IP Blacklist Check&quot; tool, we use that IP address to perform the requested check against DNSBL services. This data is used only to complete your request and is not stored.</li>
      </ul>

      <h3>b. Non-Personally Identifiable Information</h3>
      <p>We may collect information that your browser makes available whenever you visit our Site. This information may include:</p>
      <ul>
          <li>Your browser type and version (e.g., Chrome, Firefox).</li>
          <li>Your operating system (e.g., Windows, macOS).</li>
          <li>The referring website that led you to our Site.</li>
          <li>The date and time of your visit.</li>
      </ul>
      <p>This information is aggregated and used to better understand how visitors use our Site, helping us improve the service and troubleshoot issues.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we process for the following purposes:</p>
      <ul>
          <li><strong>To Operate Our Services:</strong> To display your IP address information, perform blacklist checks, and provide the speed test tool.</li>
          <li><strong>To Improve and Maintain the Site:</strong> To analyze usage trends, administer the website, and improve the user experience.</li>
          <li><strong>To Ensure Security:</strong> To monitor for potential security threats and protect against malicious activity.</li>
      </ul>

      <h2>3. Third-Party Services</h2>
      <p>Our Site relies on trusted third-party services to provide its core functionality. These services have their own privacy policies, and we encourage you to review them:</p>
      <ul>
          <li><strong>ipinfo.io:</strong> We send your IP address to ipinfo.io&apos;s API to retrieve geolocation and ISP data. We are a consumer of their data; you can review their privacy policy for details on how they handle requests.</li>
          <li><strong>OpenSpeedTest.com:</strong> The Internet Speed Test is provided by embedding a widget from OpenSpeedTest.com. When you use the speed test, you are interacting directly with their service within an iframe on our page.</li>
      </ul>

      <h2>4. Cookies and Tracking</h2>
      <p>whatismyip.zone is designed to be a privacy-respecting tool. We do not use our own tracking cookies to identify or follow you across the internet.</p>
      <p>However, embedded third-party services like the OpenSpeedTest widget may set their own cookies necessary for their functionality. These cookies are governed by the privacy policy of the third-party service and are not controlled by us. You can learn more about managing cookies at <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a>.</p>
      
      <h2>5. Data Security</h2>
      <p>We have implemented and maintain reasonable security procedures and practices appropriate to the nature of the information we process, in order to protect it from unauthorized access, destruction, use, modification, or disclosure. However, please be aware that no data transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>
      
      <h2>6. Links to Other Websites</h2>
      <p>Our Site may contain articles or links that lead to other websites. We are not responsible for the privacy practices or the content of such other sites. We encourage our users to be aware when they leave our Site and to read the privacy statements of any other site that collects personally identifiable information.</p>
      
      <h2>7. Children&apos;s Privacy</h2>
      <p>Our services are not directed to individuals under the age of 13. We comply with the Children&apos;s Online Privacy Protection Act (COPPA) and do not knowingly collect any personally identifiable information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.</p>

      <h2>8. Policy on Legal Requests</h2>
      <p>We are committed to user privacy, but we will comply with valid legal processes. If we receive a subpoena or other legal request for information, we will disclose data if we are legally required to do so. We will not disclose user information unless compelled by a formal legal process.</p>
      
      <h2>9. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us at: <strong>privacy@whatismyip.zone</strong>.</p>
    </LegalPageLayout>
  );
}