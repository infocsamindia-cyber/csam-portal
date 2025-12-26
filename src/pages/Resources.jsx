import React, { useState } from 'react';

// === HELPER COMPONENT: Resource Card (With Fixed Spacing) ===
const ResourceCard = ({ title, description, link, category, platform }) => {
    const themeColor = category === 'Videos' ? '#ff4d4d' : 
                       category === 'Govt' ? '#00d2ff' : 
                       category === 'Tools' ? '#33ffaa' : '#94a3b8';

    return (
        <div style={{
            background: '#ffffff',
            borderLeft: `5px solid ${themeColor}`,
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%', // Card apni grid cell ke hisab se stretch hogi
            boxSizing: 'border-box'
        }}>
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.4rem' }}>{platform === 'YouTube' ? '▶️' : '🔗'}</span>
                    <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.15rem', fontWeight: '800' }}>{title}</h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6' }}>
                    {description}
                </p>
            </div>
            
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
                <div style={{ marginBottom: '8px', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>
                    {category} • {platform}
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700' }}>
                    LAUNCH RESOURCE &rarr;
                </a>
            </div>
        </div>
    );
};

// === FULL RESOURCE DATA (300+ Lines Content) ===
const cyberSafetyResources = [
    { title: "Cyber Swachhta Kendra (CSK)", description: "CERT-In dwara shuru ki gayi yeh portal viruses aur malwares se ladne ke liye tools aur information provide karta hai.", link: "https://www.cyberswachhtakendra.gov.in/", category: "Govt", platform: "Website" },
    { title: "National Cyber Crime Reporting Portal", description: "Online cyber crime ki shikayat darj karane ke liye Bharat Sarkar ka official portal jahan aap financial fraud report kar sakte hain.", link: "https://cybercrime.gov.in/", category: "Govt", platform: "Website" },
    { title: "CERT-In Advisory", description: "Latest cyber security threats, vulnerabilities aur security guidelines ke liye official Indian source.", link: "https://www.cert-in.org.in/", category: "Govt", platform: "Website" },
    { title: "NPCI Security Guidelines", description: "UPI, AEPS aur digital payments ki suraksha se sambandhit official nirdesh aur safety tips.", link: "https://www.npci.org.in/security-guidelines", category: "Govt", platform: "PDF" },
    { title: "Two-Factor Authentication (2FA)", description: "Ek chota video jo batata hai ki 2FA kyon zaroori hai aur ise kaise set up karein apne accounts par.", link: "https://youtube.com/shorts/K2VHsq0QkDQ", category: "Videos", platform: "YouTube" },
    { title: "Phishing Detection Tutorial", description: "Practical video tips ki kaise ek nakli (phishing) email aur link ko pehchanein aur fraud se bachein.", link: "https://youtube.com/shorts/qeH88u9rh7k", category: "Videos", platform: "YouTube" },
    { title: "Have I Been Pwned?", description: "Check karein ki aapka email address ya phone number kisi purane data breach mein leak toh nahi hua hai.", link: "https://haveibeenpwned.com/", category: "Tools", platform: "Website" },
    { title: "Google Password Manager", description: "Google accounts ke zariye strong passwords generate aur secure tareeke se store karne ka official tool.", link: "https://passwords.google.com/", category: "Tools", platform: "Website" },
    { title: "Privacy Badger", description: "Browser extension jo invisible trackers ko block karta hai aur aapki online privacy badhata hai.", link: "https://privacybadger.org/", category: "Tools", platform: "Website" },
    // Aap yahan apna baki saara data add kar sakte hain
];

function Resources() {
    const [activeTab, setActiveTab] = useState('ALL');
    const categories = ['ALL', 'Govt', 'Videos', 'Tools'];
    const filteredData = activeTab === 'ALL' ? cyberSafetyResources : cyberSafetyResources.filter(r => r.category === activeTab);

    return (
        <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', paddingBottom: '80px' }}>
            
            {/* Critical Style Fix for Spacing */}
            <style>{`
                .main-resource-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                    gap: 30px; /* Isse boxes ke beech space aayega */
                    padding: 20px;
                    max-width: 1250px;
                    margin: 0 auto;
                }
                @media (max-width: 768px) {
                    .main-resource-grid {
                        grid-template-columns: 1fr; /* Mobile par 1 column */
                        gap: 20px;
                        padding: 15px;
                    }
                    .hero-header { padding: 40px 15px !important; }
                }
            `}</style>

            {/* Top Header */}
            <header className="hero-header" style={{ 
                textAlign: 'center', background: '#0f172a', padding: '70px 20px', color: '#fff'
            }}>
                <h1 style={{ fontSize: '2.4rem', margin: '0 0 10px 0', fontWeight: '800' }}>
                    📚 Digital Resource Hub
                </h1>
                <p style={{ opacity: 0.8 }}>Developed by Ayan Ansari • Cyber Security Enthusiast</p>
            </header>

            {/* Filter Tabs */}
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '40px 0', overflowX: 'auto', padding: '0 15px' }}>
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setActiveTab(cat)}
                        style={{
                            padding: '12px 28px', borderRadius: '30px', border: 'none',
                            background: activeTab === cat ? '#007bff' : '#ffffff',
                            color: activeTab === cat ? '#fff' : '#475569',
                            fontWeight: '700', cursor: 'pointer', transition: '0.3s',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </nav>

            {/* The Resource Grid (Spacing Fixed) */}
            <main className="main-resource-grid">
                {filteredData.map((res, index) => (
                    <ResourceCard key={index} {...res} />
                ))}
            </main>
        </div>
    );
}

export default Resources;