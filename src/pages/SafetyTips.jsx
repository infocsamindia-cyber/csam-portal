import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faShieldAlt, faSearch, faCheckCircle, faLock, 
    faBank, faGlobe, faMobileScreenButton, faUserShield,
    faFingerprint, faInfoCircle, faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';

const SafetyTips = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [activatedRules, setActivatedRules] = useState([]);

    // --- PROTOCOLS GENERATOR ---
    const protocols = useMemo(() => {
        const data = [];
        const categories = [
            { id: "AUTH", name: "Authentication" },
            { id: "BANK", name: "Banking" },
            { id: "SOCIAL", name: "Social" },
            { id: "WEB", name: "Web" },
            { id: "DEVICE", name: "Device" }
        ];

        categories.forEach(cat => {
            for (let i = 1; i <= 100; i++) {
                let title, desc, level;
                if (cat.id === "AUTH") {
                    title = `Auth Rule A-${i}`;
                    desc = i === 1 ? "Hamesha 12+ characters ka strong passphrase use karein." : `Identity Layer #${i}: Passwords update karte rahein.`;
                    level = i % 10 === 0 ? "CRITICAL" : "HIGH";
                } else if (cat.id === "BANK") {
                    title = `Finance B-${i}`;
                    desc = i === 1 ? "UPI PIN kabhi bhi paise receive karne ke liye na dalein." : `Banking Guard #${i}: Official bank apps hi use karein.`;
                    level = "CRITICAL";
                } else if (cat.id === "SOCIAL") {
                    title = `Privacy S-${i}`;
                    desc = i === 1 ? "Anjaan links par credentials share na karein." : `Social Guard #${i}: Profile private rakhna behtar hai.`;
                    level = "MEDIUM";
                } else if (cat.id === "WEB") {
                    title = `Web W-${i}`;
                    desc = i === 1 ? "URL bar mein HTTPS aur padlock check karein." : `Network Guard #${i}: Public Wi-Fi se bachein.`;
                    level = "HIGH";
                } else {
                    title = `System D-${i}`;
                    desc = i === 1 ? "Software updates ko turant install karein." : `Device Shield #${i}: Permissions revoke karein.`;
                    level = "MEDIUM";
                }
                data.push({ id: `${cat.id}-${i}`, cat: cat.id, title, desc, level });
            }
        });
        return data;
    }, []);

    const filteredProtocols = protocols.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.desc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = activeCategory === "ALL" || p.cat === activeCategory;
        return matchSearch && matchCat;
    });

    const toggleRule = (id) => {
        setActivatedRules(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const integrityScore = Math.round((activatedRules.length / 500) * 100);

    return (
        <div style={styles.appWrapper}>
            {/* 📱 RESPONSIVE CSS */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                
                /* Mobile specific adjustments */
                @media (max-width: 768px) {
                    .header-content { padding: 15px !important; }
                    .main-title { font-size: 1.2rem !important; }
                    .grid-container { 
                        grid-template-columns: 1fr !important; 
                        padding: 15px !important; 
                        gap: 12px !important; 
                    }
                    .category-tabs { 
                        padding: 10px 15px !important; 
                        gap: 10px !important; 
                    }
                    .score-text { font-size: 0.65rem !important; }
                    .score-bar-container { width: 100px !important; }
                }

                /* Hide scrollbar for Chrome/Safari/Opera */
                .category-tabs::-webkit-scrollbar { display: none; }
                .category-tabs { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* --- FIXED HEADER --- */}
            <header style={styles.header}>
                <div className="header-content" style={styles.headerContent}>
                    <div style={styles.topRow}>
                        <h1 className="main-title" style={styles.title}>
                            <FontAwesomeIcon icon={faShieldAlt} style={{ color: '#3b82f6' }} /> Security Hub 500
                        </h1>
                        <div style={styles.scoreBox}>
                            <div className="score-text" style={styles.scoreText}>INTEGRITY: {integrityScore}%</div>
                            <div className="score-bar-container" style={styles.scoreBarBg}>
                                <div style={{ ...styles.scoreBarFill, width: `${integrityScore}%` }} />
                            </div>
                        </div>
                    </div>

                    <div style={styles.searchBox}>
                        <FontAwesomeIcon icon={faSearch} style={{ color: '#94a3b8' }} />
                        <input 
                            type="text"
                            placeholder="Search (e.g. UPI, Lock)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>

                <div className="category-tabs" style={styles.tabsContainer}>
                    {["ALL", "AUTH", "BANK", "SOCIAL", "WEB", "DEVICE"].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                ...styles.tabBtn,
                                background: activeCategory === cat ? '#3b82f6' : '#f1f5f9',
                                color: activeCategory === cat ? '#fff' : '#64748b',
                                border: `1px solid ${activeCategory === cat ? '#3b82f6' : '#e2e8f0'}`,
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* --- CONTENT --- */}
            <main className="grid-container" style={styles.mainGrid}>
                <div style={styles.infoBanner}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span>Ayan Ansari's Protocol: Tap to enforce rules.</span>
                </div>

                {filteredProtocols.slice(0, 50).map(rule => (
                    <div 
                        key={rule.id}
                        onClick={() => toggleRule(rule.id)}
                        style={{
                            ...styles.card,
                            background: activatedRules.includes(rule.id) ? '#f0fdf4' : '#ffffff',
                            borderColor: activatedRules.includes(rule.id) ? '#10b981' : '#e2e8f0'
                        }}
                    >
                        <div style={styles.cardTop}>
                            <span style={styles.catBadge}>{rule.cat}</span>
                            <FontAwesomeIcon 
                                icon={activatedRules.includes(rule.id) ? faCheckCircle : faLock} 
                                style={{ color: activatedRules.includes(rule.id) ? '#10b981' : '#cbd5e1' }}
                            />
                        </div>
                        <h3 style={styles.cardTitle}>{rule.title}</h3>
                        <p style={styles.cardDesc}>{rule.desc}</p>
                        <div style={styles.cardFooter}>
                            <span style={{ 
                                ...styles.level, 
                                color: rule.level === 'CRITICAL' ? '#ef4444' : '#3b82f6' 
                            }}>
                                <FontAwesomeIcon icon={faCircleExclamation} size="xs" /> {rule.level}
                            </span>
                            <span style={styles.ruleId}>ID: {rule.id}</span>
                        </div>
                    </div>
                ))}

                {filteredProtocols.length === 0 && (
                    <div style={styles.noResult}>
                        <FontAwesomeIcon icon={faSearch} size="2x" style={{ opacity: 0.2, marginBottom: '10px' }} />
                        <p>No protocols found.</p>
                    </div>
                )}
            </main>

            <footer style={styles.footer}>
                <p>© 2025 CSAM PROTOCOL | DEVELOPED BY AYAN ANSARI</p>
            </footer>
        </div>
    );
};

// --- MOBILE-FIRST STYLES ---
const styles = {
    appWrapper: { background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
    header: { position: 'sticky', top: 0, zIndex: 1000, background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    headerContent: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
    topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    title: { margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' },
    scoreBox: { textAlign: 'right' },
    scoreText: { fontSize: '0.7rem', fontWeight: '700', color: '#64748b', marginBottom: '4px' },
    scoreBarBg: { width: '120px', height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' },
    scoreBarFill: { height: '100%', background: '#10b981', transition: 'width 0.4s ease' },
    searchBox: { display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '10px', padding: '0 12px', border: '1px solid #e2e8f0' },
    input: { width: '100%', padding: '10px', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem' },
    tabsContainer: { display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 20px 15px 20px', whiteSpace: 'nowrap' },
    tabBtn: { padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', transition: '0.2s' },
    mainGrid: { maxWidth: '1200px', margin: '0 auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' },
    infoBanner: { gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b', marginBottom: '10px' },
    card: { padding: '20px', borderRadius: '12px', border: '1px solid', cursor: 'pointer', transition: '0.2s' },
    cardTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' },
    catBadge: { fontSize: '0.6rem', padding: '3px 8px', background: '#f8fafc', borderRadius: '4px', fontWeight: '700', border: '1px solid #e2e8f0' },
    cardTitle: { margin: '0 0 8px 0', fontSize: '1rem', color: '#0f172a' },
    cardDesc: { fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', margin: 0 },
    cardFooter: { marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    level: { fontSize: '0.65rem', fontWeight: '700' },
    ruleId: { fontSize: '0.65rem', color: '#94a3b8' },
    noResult: { gridColumn: '1 / -1', textAlign: 'center', padding: '50px 0', color: '#94a3b8' },
    footer: { textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '0.7rem', fontWeight: '600' }
};

export default SafetyTips;