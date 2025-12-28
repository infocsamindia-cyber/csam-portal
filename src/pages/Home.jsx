import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPaperPlane, faHeadset, faLock, faArrowLeft, faGlobe, 
    faShieldAlt, faCircle, faInfoCircle, faStopCircle,
    faLink, faKey, faUserCheck
} from '@fortawesome/free-solid-svg-icons';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const FEMALE_AI_LOGO = "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"; 

const CSAMAssistAyanEdition = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hello! I am CSAM Assistant, developed by Ayan Ansari. How can I help you with Cyber Security today?" }
    ]);
    
    const [ipData, setIpData] = useState("Click to Scan");
    const [passStrength, setPassStrength] = useState({ text: "WAITING", color: "#94a3b8" });
    const [generatedPass, setGeneratedPass] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (isChatOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isChatOpen]);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const fetchIPInfo = async () => {
        setIpData("Scanning...");
        try {
            const res = await fetch("https://api.ipify.org?format=json");
            const data = await res.json();
            setIpData(data.ip);
        } catch (err) { setIpData("Scan Error"); }
    };

    const generateSecurePass = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let pass = "";
        for(let i=0; i<12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
        setGeneratedPass(pass);
        alert("Generated Password: " + pass);
    };

    const checkLinkSafety = () => {
        const link = prompt("Enter URL to scan:");
        if(!link) return;
        if(link.includes("http://") || link.includes("bit.ly")) {
            alert("⚠️ WARNING: This link looks suspicious (Unencrypted or Shortened).");
        } else {
            alert("✅ Secure: This link uses HTTPS and looks safe.");
        }
    };

    const handlePassCheck = (val) => {
        if (!val) return setPassStrength({ text: "WAITING", color: "#94a3b8" });
        if (val.length < 5) return setPassStrength({ text: "WEAK", color: "#ef4444" });
        if (val.length < 10) return setPassStrength({ text: "GOOD", color: "#f59e0b" });
        return setPassStrength({ text: "EXCELLENT", color: "#22c55e" });
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!inputValue.trim() || isLoading) return;
        const userMsg = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputValue("");
        setIsLoading(true);

        try {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    model: "llama-3.3-70b-versatile", 
                    messages: [
                        { role: "system", content: "Your name is CSAM Assistant. You are developed by Ayan Ansari, who is a BCA student and a passionate Ethical Hacker/Cyber Security enthusiast. When someone asks about you or your developer, always mention Ayan Ansari and his background in BCA and Cyber Security with pride. Your goal is to provide expert security advice while maintaining the identity of Ayan's creation." }, 
                        { role: "user", content: userMsg }
                    ] 
                })
            });
            const data = await res.json();
            const reply = data.choices[0].message.content;
            setMessages(prev => [...prev, { role: 'ai', text: reply }]);
            speak(reply);
        } catch (err) { 
            setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to server." }]); 
        } finally { setIsLoading(false); }
    };

    return (
        <div style={styles.container}>
            <style>{`
                @keyframes glow {
                    0% { box-shadow: 0 0 5px rgba(37, 99, 235, 0.2); }
                    50% { box-shadow: 0 0 15px rgba(37, 99, 235, 0.6); }
                    100% { box-shadow: 0 0 5px rgba(37, 99, 235, 0.2); }
                }
                .dev-badge-home {
                    animation: glow 2s infinite;
                    display: inline-flex;
                    align-items: center;
                    background: #0f172a;
                    color: #fff;
                    padding: 6px 15px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                    margin-bottom: 15px;
                    border: 1px solid #2563EB;
                }
            `}</style>

            <nav style={styles.nav}>
                <div style={styles.logoGroup}>
                    <FontAwesomeIcon icon={faShieldAlt} style={{color:'#2563EB', fontSize:'22px'}} />
                    <span style={styles.logoText}>AYAN<span style={{color:'#2563EB'}}>CORE</span></span>
                </div>
                <div style={styles.status}><FontAwesomeIcon icon={faCircle} style={{color:'#22c55e', fontSize:'8px'}} /> ONLINE</div>
            </nav>

            <div style={{padding: '20px', paddingBottom: '100px'}}>
                <header style={styles.hero}>
                    {/* Yahan par Header wala badge shift kar diya hai */}
                    <div className="dev-badge-home">
                        <FontAwesomeIcon icon={faUserCheck} style={{marginRight:'8px', color:'#3b82f6'}} />
                        DEVELOPED BY AYAN ANSARI
                    </div>
                    <h1 style={styles.heroTitle}>Security Portal</h1>
                    <p style={styles.heroSub}>BCA Cyber Security Professional Project</p>
                </header>

                <div style={styles.helpBox}>
                    <h3 style={styles.helpTitle}><FontAwesomeIcon icon={faInfoCircle} /> Active Security Tools</h3>
                    <p style={styles.helpText}>Workable tools to audit your digital safety instantly.</p>
                </div>

                <div style={styles.grid}>
                    <div style={styles.card} onClick={fetchIPInfo}>
                        <div style={styles.iconWrapper}><FontAwesomeIcon icon={faGlobe} /></div>
                        <div style={{flex: 1}}>
                            <div style={styles.label}>NETWORK AUDIT</div>
                            <div style={styles.value}>{ipData}</div>
                        </div>
                    </div>

                    <div style={styles.card}>
                        <div style={{...styles.iconWrapper, background:'#fff1f2', color:'#e11d48'}}><FontAwesomeIcon icon={faLock} /></div>
                        <div style={{flex: 1}}>
                            <div style={styles.label}>STRENGTH CHECKER</div>
                            <input type="password" placeholder="Type password..." style={styles.input} onChange={(e) => handlePassCheck(e.target.value)} />
                        </div>
                        <div style={{...styles.strengthText, color: passStrength.color}}>{passStrength.text}</div>
                    </div>

                    <div style={styles.card} onClick={generateSecurePass}>
                        <div style={{...styles.iconWrapper, background:'#f0fdf4', color:'#16a34a'}}><FontAwesomeIcon icon={faKey} /></div>
                        <div style={{flex: 1}}>
                            <div style={styles.label}>KEY GENERATOR</div>
                            <div style={styles.value}>GET SECURE PASSWORD</div>
                        </div>
                    </div>

                    <div style={styles.card} onClick={checkLinkSafety}>
                        <div style={{...styles.iconWrapper, background:'#faf5ff', color:'#9333ea'}}><FontAwesomeIcon icon={faLink} /></div>
                        <div style={{flex: 1}}>
                            <div style={styles.label}>PHISHING SHIELD</div>
                            <div style={styles.value}>SCAN SUSPICIOUS URL</div>
                        </div>
                    </div>
                </div>
            </div>

            {isChatOpen && (
                <div style={styles.chatOverlay}>
                    <div style={styles.chatHeader}>
                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => setIsChatOpen(false)} style={{cursor:'pointer'}} />
                        <img src={FEMALE_AI_LOGO} style={styles.aiImg} alt="AI" />
                        <div style={{flex: 1}}>
                            <div style={{fontWeight: '800', fontSize: '15px'}}>CSAM ASSISTANT</div>
                            <div style={{fontSize: '10px', color: '#34d399'}}>Dev: Ayan Ansari</div>
                        </div>
                        {isSpeaking && <FontAwesomeIcon icon={faStopCircle} onClick={stopSpeaking} style={{color:'#ef4444', fontSize:'20px'}} />}
                    </div>

                    <div style={styles.chatBody}>
                        {messages.map((m, i) => (
                            <div key={i} style={m.role === 'user' ? styles.userRow : styles.aiRow}>
                                <div style={m.role === 'user' ? styles.userBubble : styles.aiBubble}>{m.text}</div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSend} style={styles.inputArea}>
                        <input style={styles.field} placeholder="Message Ayan's AI..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        <button type="submit" style={styles.sendBtn}><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </form>
                </div>
            )}

            {!isChatOpen && (
                <div style={styles.fab} onClick={() => setIsChatOpen(true)}>
                    <FontAwesomeIcon icon={faHeadset} />
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { background: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' },
    nav: { display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: '#fff', borderBottom: '1px solid #e2e8f0', position:'sticky', top:0, zIndex:100 },
    logoText: { fontWeight: '900', fontSize: '18px', marginLeft: '8px' },
    status: { fontSize: '10px', fontWeight: 'bold', color: '#64748b', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '10px' },
    hero: { textAlign: 'center', margin: '10px 0 30px 0' },
    heroTitle: { fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '5px 0' },
    heroSub: { fontSize: '14px', color: '#64748b', marginTop: '0' },
    helpBox: { background: '#eff6ff', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #bfdbfe' },
    helpTitle: { fontSize: '14px', fontWeight: 'bold', color: '#1e40af', margin: '0 0 5px 0' },
    helpText: { fontSize: '12px', color: '#1e40af', margin: 0 },
    grid: { display: 'flex', flexDirection: 'column', gap: '12px' },
    card: { background: '#fff', padding: '18px', borderRadius: '15px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px', cursor:'pointer' },
    iconWrapper: { width: '40px', height: '40px', background: '#eff6ff', color: '#2563EB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    label: { fontSize: '10px', fontWeight: 'bold', color: '#94a3b8' },
    value: { fontSize: '14px', fontWeight: 'bold', color: '#1e293b' },
    input: { width: '100%', border: 'none', background: '#f8fafc', padding: '8px', borderRadius: '8px', outline: 'none', fontSize: '12px', marginTop: '5px' },
    strengthText: { fontSize: '10px', fontWeight: '900', minWidth: '70px', textAlign: 'right' },
    chatOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#fff', display: 'flex', flexDirection: 'column', zIndex: 2000, height: '100dvh' },
    chatHeader: { background: '#0f172a', color: '#fff', padding: '15px', display: 'flex', alignItems: 'center', gap: '12px' },
    aiImg: { width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #2563EB' },
    chatBody: { flex: 1, padding: '15px', overflowY: 'auto', background: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: '10px' },
    userRow: { alignSelf: 'flex-end', maxWidth: '80%' },
    aiRow: { alignSelf: 'flex-start', maxWidth: '80%' },
    userBubble: { background: '#2563EB', color: '#fff', padding: '10px 14px', borderRadius: '15px 15px 0 15px', fontSize: '14px' },
    aiBubble: { background: '#fff', color: '#1e293b', padding: '10px 14px', borderRadius: '15px 15px 15px 0', fontSize: '14px', border: '1px solid #e2e8f0' },
    inputArea: { padding: '10px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', paddingBottom: 'env(safe-area-inset-bottom, 10px)' },
    field: { flex: 1, padding: '12px', borderRadius: '10px', background: '#f1f5f9', border: 'none', outline: 'none' },
    sendBtn: { background: '#2563EB', color: '#fff', border: 'none', borderRadius: '10px', width: '50px' },
    fab: { position: 'fixed', bottom: '25px', right: '20px', width: '60px', height: '60px', background: '#2563EB', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 8px 20px rgba(37,99,235,0.4)' }
};

export default CSAMAssistAyanEdition;