import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBiohazard, faBug, faTerminal, faExclamationTriangle,
    faSearch, faPhoneSlash, faLink, faBrain, faLifeRing,
    faChartLine, faBriefcase, faCircleCheck
} from '@fortawesome/free-solid-svg-icons';

const Frauds = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const threats = [
        {
            id: "TR-01",
            icon: faBrain,
            title: "AI Deepfake & Voice Mimic",
            level: "CRITICAL",
            color: "#ef4444",
            desc: "AI ka upyog karke aapke kisi jaan-pehchan wale ki nakli awaaz ya video banayi jati hai.",
            tactic: "Social Engineering + AI Voice Cloning",
            defense: "Known number par wapas call karein ya family code word use karein."
        },
        {
            id: "TR-02",
            icon: faChartLine,
            title: "Investment & Stock Scams",
            level: "CRITICAL",
            color: "#ef4444",
            desc: "WhatsApp groups par bade profits ka lalach dekar fake trading apps install karwayi jati hain.",
            tactic: "Pump & Dump + Fake Trading Portals",
            defense: "Sirf SEBI registered brokers aur apps ka hi istemal karein."
        },
        {
            id: "TR-03",
            icon: faBug,
            title: "Remote Access Malware",
            level: "CRITICAL",
            color: "#ef4444",
            desc: "Scammers AnyDesk ya TeamViewer jaisi apps download karwake mobile ka control le lete hain.",
            tactic: "Screen Mirroring exploitation",
            defense: "Anjaan person ke kehne par kabhi remote support app install na karein."
        },
        {
            id: "TR-04",
            icon: faBriefcase,
            title: "Task-Based Job Fraud",
            level: "HIGH",
            color: "#f59e0b",
            desc: "Like/Subscribe ke badle paise dene ka vaada karke aapse hi investment karwayi jati hai.",
            tactic: "Sunk-Cost Fallacy & Fake Salary Credits",
            defense: "Asli naukri shuruat mein aapse paise ki maang nahi karti."
        },
        {
            id: "TR-05",
            icon: faLink,
            title: "Phishing 2.0 (Smart Links)",
            level: "HIGH",
            color: "#f59e0b",
            desc: "Electricity bill ya Bank KYC ke naam par SMS aate hain jo aapka data/OTP churate hain.",
            tactic: "URL Masking & Domain Spoofing",
            defense: "Hamesha official website ya app par jakar hi KYC check karein."
        },
        {
            id: "TR-06",
            icon: faPhoneSlash,
            title: "SIM Swap Extortion",
            level: "HIGH",
            color: "#f59e0b",
            desc: "Aapka signal block karke naya SIM nikalwa liya jata hai taaki OTP hacker ko mile.",
            tactic: "Identity Theft & Carrier Engineering",
            defense: "Signal achanak gayab ho toh turant bank aur operator ko inform karein."
        }
    ];

    return (
        <div style={styles.appContainer}>
            {/* 📱 MOBILE RESPONSIVE CSS INJECTOR */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
                
                @media (max-width: 768px) {
                    .hero-header { padding: 40px 15px !important; }
                    .hero-title { font-size: 1.8rem !important; }
                    .hero-subtitle { font-size: 0.95rem !important; }
                    .grid-container { grid-template-columns: 1fr !important; padding: 15px !important; }
                    .action-plan-grid { grid-template-columns: 1fr !important; gap: 15px !important; }
                    .action-box { padding: 25px 15px !important; }
                }
            `}</style>

            {/* --- HEADER --- */}
            <header className="hero-header" style={styles.header}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={styles.badge}>
                        <FontAwesomeIcon icon={faExclamationTriangle} /> 06 CRITICAL THREATS
                    </div>
                    <h1 className="hero-title" style={styles.heroTitle}>
                        Cyber Threat <span style={{ color: '#ef4444' }}>Intelligence</span>
                    </h1>
                    <p className="hero-subtitle" style={styles.heroSubtitle}>
                        Ayan Ansari Cyber Security Research: Digital criminals se bachne ke liye unki tactics samajhna zaroori hai.
                    </p>

                    <div style={styles.searchContainer}>
                        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
                        <input 
                            type="text" 
                            placeholder="Threat search (AI, Job, SIM)..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>
            </header>

            {/* --- THREAT GRID --- */}
            <main className="grid-container" style={styles.mainGrid}>
                {threats.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())).map((threat, index) => (
                    <div key={index} style={{ ...styles.card, borderTop: `4px solid ${threat.color}` }}>
                        <div style={styles.cardHeader}>
                            <div style={{ ...styles.iconBox, background: `${threat.color}15`, color: threat.color }}>
                                <FontAwesomeIcon icon={threat.icon} size="lg" />
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: threat.color }}>{threat.level}</span>
                        </div>
                        <h3 style={styles.cardTitle}>{threat.title}</h3>
                        <p style={styles.cardDesc}>{threat.desc}</p>
                        
                        <div style={styles.tacticBox}>
                            <div style={{ marginBottom: '8px', fontSize: '0.75rem' }}>
                                <strong style={{ color: '#0f172a' }}>TACTIC:</strong> <span style={{ color: '#64748b' }}>{threat.tactic}</span>
                            </div>
                            <div style={{ fontSize: '0.75rem' }}>
                                <strong style={{ color: '#10b981' }}>PROTECTION:</strong> <span style={{ color: '#475569' }}>{threat.defense}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            {/* --- ACTION PLAN --- */}
            <section style={styles.actionSection}>
                <div className="action-box" style={styles.actionBox}>
                    <div style={styles.actionHeader}>
                        <FontAwesomeIcon icon={faLifeRing} size="2x" style={{ color: '#ef4444' }} />
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Emergency Action Plan</h2>
                    </div>
                    <div className="action-plan-grid" style={styles.actionPlanGrid}>
                        {[
                            { step: "01", t: "REPORT", d: "Dial 1930 immediately or visit cybercrime.gov.in" },
                            { step: "02", t: "BLOCK", d: "Freeze bank accounts and block UPI via apps." },
                            { step: "03", t: "SECURE", d: "Change passwords and enable 2-Factor Auth (2FA)." },
                            { step: "04", t: "EVIDENCE", d: "Save screenshots of chats and transaction IDs." }
                        ].map((s, i) => (
                            <div key={i} style={styles.stepCard}>
                                <div style={styles.stepLabel}>STEP {s.step}</div>
                                <div style={{ fontWeight: 'bold', margin: '5px 0' }}>{s.t}</div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{s.d}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer style={styles.footer}>
                <p>© 2025 National Cyber Defense Awareness | Developed by Ayan Ansari</p>
            </footer>
        </div>
    );
};

// --- STYLES OBJECT ---
const styles = {
    appContainer: { background: '#f8fafc', color: '#334155', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
    header: { background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '60px 20px', textAlign: 'center' },
    badge: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fee2e2', color: '#dc2626', padding: '6px 15px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '15px' },
    heroTitle: { fontSize: '2.5rem', color: '#0f172a', fontWeight: '850', marginBottom: '15px', lineHeight: '1.2' },
    heroSubtitle: { fontSize: '1.1rem', color: '#64748b', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' },
    searchContainer: { marginTop: '30px', position: 'relative', maxWidth: '500px', margin: '30px auto 0 auto' },
    searchIcon: { position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
    searchInput: { width: '100%', padding: '14px 14px 14px 50px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f1f5f9', outline: 'none', boxSizing: 'border-box' },
    mainGrid: { maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
    card: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
    iconBox: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    cardTitle: { margin: '0 0 10px 0', color: '#0f172a', fontSize: '1.2rem' },
    cardDesc: { fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 },
    tacticBox: { background: '#f8fafc', padding: '15px', borderRadius: '10px' },
    actionSection: { maxWidth: '1100px', margin: '40px auto 80px auto', padding: '0 20px' },
    actionBox: { background: '#0f172a', borderRadius: '24px', padding: '40px', color: '#fff' },
    actionHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' },
    actionPlanGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
    stepCard: { padding: '20px', borderLeft: '3px solid #ef4444', background: 'rgba(255,255,255,0.05)', borderRadius: '0 8px 8px 0' },
    stepLabel: { fontSize: '0.65rem', color: '#ef4444', fontWeight: 'bold', letterSpacing: '1px' },
    footer: { padding: '40px 0', textAlign: 'center', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '0.75rem' }
};

export default Frauds;