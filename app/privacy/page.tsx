import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="privacy-policy-container" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
    
            <p>At DeansListDAO, we respect your privacy. This Privacy Policy outlines the types of information we collect, how we use it, and how we protect it.</p>

            <h2 className="text-2xl font-bold">Information We Collect:</h2>
            <p>We do not collect any personal information from users. Our website only provides static content and does not actively collect, store, or process any personal data.</p>

            <h2 className="text-2xl font-bold">Cookies:</h2>
            <p>We do not use cookies to collect personal data. We may use session cookies for functionality (e.g., remembering user preferences during the session), but these do not store any personal information.</p>

            <h2 className="text-2xl font-bold">Third-Party Links:</h2>
            <p>Our site may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. Please review their privacy policies before interacting with them.</p>

            <h2 className="text-2xl font-bold">Data Security:</h2>
            <p>Since we do not collect personal data, no data security measures are required to protect user information. However, we take general security precautions to protect our website from unauthorized access or modifications.</p>

            <h2 className="text-2xl font-bold">Changes to This Policy:</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will take effect immediately upon posting.</p>
        </div>
    );
}

export default PrivacyPolicy;
