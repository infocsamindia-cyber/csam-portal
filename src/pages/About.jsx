import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserShield, faEye, faShieldAlt, faMicrochip, 
    faUsers, faCircleCheck 
} from '@fortawesome/free-solid-svg-icons';
import { 
    faInstagram, faWhatsapp, faTwitter, faYoutube 
} from '@fortawesome/free-brands-svg-icons';

// --- MOBILE RESPONSIVE VALUE CARD ---
const ValueCard = ({ icon, title, description }) => (
    <div className="v-card" style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '30px 20px',
        textAlign: 'center',
        transition: '0.3s',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <div style={{ 
            fontSize: '1.8rem', color: '#3b82f6', marginBottom: '15px',
            background: '#eff6ff', width: '60px', height: '60px',
            lineHeight: '65px', borderRadius: '50%'
        }}>
            <FontAwesomeIcon icon={icon} />
        </div>
        <h3 style={{ color: '#0f172a', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '700' }}>{title}</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{description}</p>
    </div>
);

// --- MOBILE RESPONSIVE SOCIAL BADGE ---
const SocialBadge = ({ platform, link, icon, color }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="s-badge">
        <FontAwesomeIcon icon={icon} style={{ color: color }} />
        <span>{platform}</span>
    </a>
);

function About() {
    return (
        <div style={{ background: '#ffffff', color: '#334155', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            
            {/* CSS for Responsiveness */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
                
                .section-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 80px 20px;
                }
                .hero-title { font-size: 3.5rem; letter-spacing: -0.04em; font-weight: 850; }
                .mission-flex { display: flex; gap: 50px; align-items: center; }
                .architecture-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
                    gap: 20px; 
                }
                .s-badge {
                    display: flex; alignItems: center; gap: 10px;
                    background: #fff; border: 1px solid #e2e8f0;
                    padding: 12px 20px; borderRadius: '50px';
                    color: #1e293b; textDecoration: none; margin: 5px;
                    font-weight: 600; font-size: 0.9rem; min-width: 150px; justify-content: center;
                }

                /* MOBILE FIXES */
                @media (max-width: 768px) {
                    .hero-title { font-size: 2.2rem !important; }
                    .hero-desc { font-size: 1rem !important; }
                    .section-container { padding: 50px 20px !important; }
                    .mission-flex { flex-direction: column; text-align: center; gap: 30px; }
                    .architecture-grid { grid-template-columns: 1fr; }
                    .impact-grid { grid-template-columns: 1fr 1fr !important; }
                }
            `}</style>

            {/* HERO SECTION */}
            <section style={{ padding: '100px 20px 60px', textAlign: 'center', background: '#f8fafc' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ 
                        display: 'inline-block', padding: '6px 16px', borderRadius: '50px', 
                        background: '#dbeafe', color: '#1e40af', fontSize: '0.7rem', 
                        fontWeight: '800', marginBottom: '20px'
                    }}>
                        <FontAwesomeIcon icon={faShieldAlt} /> PROJECT_CSAM_v4.0
                    </div>
                    <h1 className="hero-title">Securing India's <span style={{ color: '#3b82f6' }}>Digital Future.</span></h1>
                    <p className="hero-desc" style={{ fontSize: '1.2rem', color: '#475569', lineHeight: '1.6' }}>
                        BCA expertise ko aam bhasha mein convert karke har nagrik ko cyber-safe banana hamara mission hai.
                    </p>
                </div>
            </section>

            {/* MISSION SECTION */}
            <section className="section-container">
                <div className="mission-flex">
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>Our Mission & Vision</h2>
                        <div style={{ marginBottom: '30px' }}>
                            <h4 style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase' }}>The Goal</h4>
                            <p>Cyber Safety ki jaankari ko har ghar tak pahunchana aur fraud rate kam karna.</p>
                        </div>
                        <div>
                            <h4 style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase' }}>The Vision</h4>
                            <p>Ek 'Fraud-Free' Digital India banana jahan sab aatmanirbhar hon.</p>
                        </div>
                    </div>
                    
                    {/* Impact Stats */}
                    <div style={{ flex: 0.8, background: '#f8fafc', padding: '30px', borderRadius: '25px', border: '1px solid #e2e8f0' }}>
                        <div className="impact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <Stat num="500+" text="PROTOCOLS" />
                            <Stat num="24/7" text="SUPPORT" />
                            <Stat num="100%" text="VERIFIED" />
                            <Stat num="BCA" text="POWERED" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE ARCHITECTURE (The Grid) */}
            <section style={{ background: '#f8fafc', padding: '80px 20px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Core Architecture</h2>
                        <p style={{ color: '#64748b' }}>Project Lead: Ayan Ansari</p>
                    </div>
                    <div className="architecture-grid">
                        <ValueCard icon={faUserShield} title="Empowerment" description="Online khatron se ladne ka confidence dena." />
                        <ValueCard icon={faEye} title="Transparency" description="Verified aur trusted sources ka upyog." />
                        <ValueCard icon={faUsers} title="Community" description="Students aur families ke liye safe environment." />
                        <ValueCard icon={faMicrochip} title="Literacy" description="Technical baaton ko saral bhasha mein samjhana." />
                    </div>
                </div>
            </section>

            {/* CONNECT SECTION */}
            <section className="section-container" style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>Stay Synced with CSAM</h2>
                <p style={{ color: '#64748b', marginBottom: '40px' }}>Emergency alerts ke liye follow karein.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <SocialBadge platform="Instagram" icon={faInstagram} color="#E1306C" link="https://www.instagram.com/cyber.safety.awarness.india" />
                    <SocialBadge platform="WhatsApp" icon={faWhatsapp} color="#25D366" link="https://whatsapp.com/channel/0029VbBNzabBPzjPA4PZPw3m" />
                    <SocialBadge platform="Twitter (X)" icon={faTwitter} color="#000000" link="https://x.com/me_hacker_79" />
                    <SocialBadge platform="YouTube" icon={faYoutube} color="#FF0000" link="https://youtube.com/@csamindia" />
                </div>
                <div style={{ marginTop: '50px', color: '#10b981', fontWeight: '700', fontSize: '0.8rem' }}>
                    <FontAwesomeIcon icon={faCircleCheck} /> VERIFIED EDUCATIONAL RESOURCE
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: '40px 20px', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600', letterSpacing: '1px' }}>
                    © 2025 PROJECT CSAM | DEVELOPED BY AYAN ANSARI
                </p>
            </footer>
        </div>
    );
}

// Small Helper for Stats
const Stat = ({ num, text }) => (
    <div>
        <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: '800' }}>{num}</div>
        <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#94a3b8' }}>{text}</div>
    </div>
);

export default About;