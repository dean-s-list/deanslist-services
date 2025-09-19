import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
       <div className="privacy-policy-container" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
  <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

  <p>Last updated: 19 Sept 2025</p>
  <p>IslandDAO (“we”, “our”, or “us”) respects your privacy. This Privacy Policy explains what information our website and mobile application (“the App”) collect, how we use it, and the choices available to you.</p>

  <h2 className="text-2xl font-bold mt-6 mb-2">Scope</h2>
  <p>This Privacy Policy covers both our website and our mobile application:</p>
  <ul className="list-disc pl-6">
    <li><strong>Website:</strong> The IslandDAO website is primarily informational. We do not actively collect, store, or process personal information from visitors, other than basic technical logs or analytics if enabled.</li>
    <li><strong>Mobile Application:</strong> The IslandDAO app collects certain information (such as wallet address, device ID, event check-ins, diagnostics, and payment information) in order to provide event functionality, blockchain interactions, and app performance monitoring.</li>
  </ul>

  <h2 className="text-2xl font-bold mt-6 mb-2">1. Information We Collect</h2>
  <ul className="list-disc pl-6">
    <li><strong>Contact Info:</strong> Name, and other user contact info (e.g., email, if provided).</li>
    <li><strong>Identifiers:</strong> User ID (wallet address) and Device ID.</li>
    <li><strong>Financial Info:</strong> Payment information related to blockchain transactions. We do not collect credit card or bank details.</li>
    <li><strong>Usage Data:</strong> Product interactions, such as event check-ins and in-app actions.</li>
    <li><strong>Diagnostics:</strong> Crash data, other diagnostic data, and performance data.</li>
  </ul>

  <h2 className="text-2xl font-bold mt-6 mb-2">2. How We Use Information</h2>
  <ul className="list-disc pl-6">
    <li><strong>App Functionality:</strong> Enabling wallet login, event check-ins, and NFT interactions.</li>
    <li><strong>Analytics:</strong> Evaluating app performance and reliability.</li>
    <li><strong>Product Personalization:</strong> Improving the user experience within the app.</li>
    <li><strong>Security:</strong> Preventing fraud and validating device or wallet activity.</li>
  </ul>

  <h2 className="text-2xl font-bold mt-6 mb-2">3. Data Storage and Retention</h2>
  <p>Some information is permanently stored on the Solana blockchain (e.g., event check-ins, NFT activity) and cannot be modified or deleted. Other data (such as device IDs, usage, and diagnostics) may be stored in secure databases and retained only as long as needed for functionality and compliance.</p>

  <h2 className="text-2xl font-bold mt-6 mb-2">4. Sharing of Information</h2>
  <p>We may share limited information with:</p>
  <ul className="list-disc pl-6">
    <li>Service providers (analytics, hosting, crash reporting).</li>
    <li>Blockchain networks (your wallet activity is publicly viewable on-chain).</li>
    <li>Legal authorities, if required by law.</li>
  </ul>
  <p>We do not sell your personal data to advertisers.</p>

  <h2 className="text-2xl font-bold mt-6 mb-2">5. Your Choices</h2>
  <ul className="list-disc pl-6">
    <li>You may choose not to provide optional details such as your name or email.</li>
    <li>You may request deletion of off-chain profile or check-in data by contacting us.</li>
    <li>On-chain data cannot be deleted once recorded.</li>
  </ul>

  <h2 className="text-2xl font-bold mt-6 mb-2">6. Security</h2>
  <p>We use industry-standard safeguards to protect your information. However, no system is completely secure. Blockchain transactions are inherently public.</p>

  <h2 className="text-2xl font-bold mt-6 mb-2">7. Children’s Privacy</h2>
  <p>The App is not intended for children under 13 (or the minimum legal age in your country). We do not knowingly collect data from children.</p>

  <h2 className="text-2xl font-bold mt-6 mb-2">8. Changes to This Policy</h2>
  <p>We may update this Privacy Policy from time to time. Updates will be posted within the App and on our website.</p>

  <h2 className="text-2xl font-bold mt-6 mb-2">9. Contact Us</h2>
  <p>If you have questions or requests about this Privacy Policy, contact us at:</p>
  <p><strong>Email:</strong> contact@islanddao.org<br />
     <strong>Website:</strong> https://islanddao.org</p>
</div>


    );
}

export default PrivacyPolicy;
