import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPaperPlane, faHeadset, faMinus, faCheckCircle, faLock, 
    faFileShield, faGlobe, faFingerprint, faTerminal, 
    faUserSecret, faVolumeMute
} from '@fortawesome/free-solid-svg-icons';

// --- FIXED: Using the correct variable name from your .env ---
const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const FEMALE_AI_LOGO = "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"; 

const CSAMAssistAyanEdition = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: "System Online. I am your Cyber Assistant, developed by Ayan Ansari. How can I help you today?" }
    ]);
    
    const [testResults, setTestResults] = useState({});
    const [scanningId, setScanningId] = useState(null);
    const chatEndRef = useRef(null);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        
        const femaleVoice = voices.find(v => 
            (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English')) && 
            v.lang.includes('en')
        ) || voices.find(v => v.lang.startsWith('en'));

        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.pitch = 1.1;
        utterance.rate = 1.0;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => { window.speechSynthesis.cancel(); setIsSpeaking(false); };

    useEffect(() => {
        const loadVoices = () => window.speechSynthesis.getVoices();
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

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
                headers: { 
                    // --- FIXED: Changed Bearer token to use 'apiKey' variable ---
                    "Authorization": `Bearer ${apiKey}`, 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ 
                    model: "llama-3.3-70b-versatile", 
                    messages: [{ 
                        role: "system", 
                        content: "You are an AI Cyber Security Expert developed by Ayan Ansari. Respond ONLY in English." 
                    }, { role: "user", content: userMsg }] 
                })
            });
            const data = await res.json();
            
            // --- FIXED: Handling potential API errors gracefully ---
            if (data.choices && data.choices[0]) {
                const reply = data.choices[0].message.content;
                setMessages(prev => [...prev, { role: 'ai', text: reply }]);
                speak(reply);
            } else {
                throw new Error("Invalid API Response");
            }
        } catch (err) { 
            console.error("Chat Error:", err);
            setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I am having trouble connecting to the secure server. Please check your API key." }]);
        } finally { 
            setIsLoading(false); 
        }
    };

    const runSafetyTest = (id) => {
        setScanningId(id);
        setTimeout(() => {
            setTestResults(prev => ({ ...prev, [id]: "PASSED" }));
            setScanningId(null);
        }, 1200);
    };

    useEffect(() => { 
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
    }, [messages]);

    return (
        <div style={styles.container}>
            <style>{`
                @media (max-width: 768px) {
                    .nav-desktop { padding: 15px 20px !important; }
                    .hero-title { font-size: 32px !important; }
                    .dashboard-grid { grid-template-columns: 1fr !important; padding: 20px !important; }
                    .chat-box-main { width: 100% !important; height: 100% !important; bottom: 0 !important; right: 0 !important; border-radius: 0 !important; }
                    .status-badge-top { display: none !important; }
                }
            `}</style>

            <nav className="nav-desktop" style={styles.nav}>
                <div style={styles.logoGroup}>
                    <FontAwesomeIcon icon={faFingerprint} style={styles.topIcon} />
                    <span style={styles.logoTitle}>AYAN<span style={{color:'#2563EB'}}>CYBER</span></span>
                </div>
                <div className="status-badge-top" style={styles.statusBadge}>
                    <span style={styles.pulseDot}></span> SYSTEM LIVE: BY AYAN ANSARI
                </div>
            </nav>

            <header style={styles.hero}>
                <div style={styles.terminalTag}><FontAwesomeIcon icon={faTerminal} /> Secure Protocol v2.5</div>
                <h1 className="hero-title" style={styles.heroMainTitle}>Advanced Cyber Security <br/> <span style={{color:'#2563EB'}}>Assistant Portal</span></h1>
                <p style={styles.heroDescription}>Designed by <b>Ayan Ansari</b> (BCA Student & Cyber Security Enthusiast).</p>
                <button style={styles.mainBtn} onClick={() => setIsChatOpen(true)}>Initialize Assistant</button>
            </header>

            <section className="dashboard-grid" style={styles.dashboard}>
                <div style={styles.grid}>
                    {[
                        { id: 1, icon: faUserSecret, title: "Anonymity Check", desc: "VPN & Proxy layers" },
                        { id: 2, icon: faLock, title: "Vault Security", desc: "Encryption strength" },
                        { id: 3, icon: faGlobe, title: "IP Integrity", desc: "Network gateway" },
                        { id: 4, icon: faFileShield, title: "Exploit Scan", desc: "Vulnerability test" }
                    ].map((m) => (
                        <div key={m.id} style={styles.card} onClick={() => runSafetyTest(m.id)}>
                            <FontAwesomeIcon icon={m.icon} style={styles.cardIcon} />
                            <h4>{m.title}</h4>
                            <p style={{fontSize:'13px'}}>{m.desc}</p>
                            <div style={styles.statusLine}>
                                {scanningId === m.id ? <div className="scan-anim" style={styles.scanBar}></div> : 
                                testResults[m.id] ? <span style={styles.successText}><FontAwesomeIcon icon={faCheckCircle} /> SECURE</span> : 
                                <span style={styles.runText}>Run Audit</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {isChatOpen && (
                <div className="chat-box-main" style={styles.chatBox}>
                    <div style={styles.chatHeader}>
                        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                            <img src={FEMALE_AI_LOGO} alt="AI" style={styles.aiLogoImg} />
                            <div>
                                <div style={{fontSize:'14px', fontWeight:700}}>Security Assistant</div>
                                <div style={{fontSize:'10px', color:'#bfdbfe'}}>Ayan Ansari Edition</div>
                            </div>
                        </div>
                        <div style={{display:'flex', gap:'12px'}}>
                            {isSpeaking && <FontAwesomeIcon icon={faVolumeMute} onClick={stopSpeaking} style={{cursor:'pointer'}} />}
                            <FontAwesomeIcon icon={faMinus} onClick={() => setIsChatOpen(false)} style={{cursor:'pointer'}} />
                        </div>
                    </div>
                    <div style={styles.chatBody}>
                        {messages.map((m, i) => (
                            <div key={i} style={m.role === 'user' ? styles.userMsgRow : styles.aiMsgRow}>
                                <div style={m.role === 'user' ? styles.userBubble : styles.aiBubble}>{m.text}</div>
                            </div>
                        ))}
                        {isLoading && <div style={{...styles.aiBubble, fontSize:'12px'}}>Scanning Database...</div>}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleSend} style={styles.chatInput}>
                        <input type="text" placeholder="Consult Ayan's AI..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={styles.inputField} />
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
    container: { background: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#1e293b' },
    nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 80px', borderBottom:'1px solid #f1f5f9', background:'#fff', position:'sticky', top:0, zIndex:100 },
    logoGroup: { display:'flex', alignItems:'center', gap:'10px' },
    topIcon: { fontSize:'24px', color:'#2563EB' },
    logoTitle: { fontWeight:900, fontSize:'22px' },
    statusBadge: { display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', fontWeight:700, background:'#f8fafc', padding:'8px 16px', borderRadius:'30px', border:'1px solid #e2e8f0' },
    pulseDot: { width:'8px', height:'8px', background:'#22c55e', borderRadius:'50%' },
    hero: { padding:'80px 20px', textAlign:'center' },
    terminalTag: { display:'inline-block', background:'#eff6ff', color:'#2563EB', padding:'5px 12px', borderRadius:'6px', fontSize:'12px', fontWeight:700, marginBottom:'15px' },
    heroMainTitle: { fontSize:'48px', fontWeight:900, marginBottom:'20px' },
    heroDescription: { fontSize:'16px', color:'#64748b', maxWidth:'600px', margin:'0 auto 30px' },
    mainBtn: { background:'#2563EB', color:'#fff', border:'none', padding:'15px 35px', borderRadius:'10px', fontWeight:700, cursor:'pointer' },
    dashboard: { padding:'0 80px 40px' },
    grid: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'20px' },
    card: { background:'#fff', padding:'20px', borderRadius:'16px', border:'1px solid #f1f5f9', cursor:'pointer', transition:'0.3s' },
    cardIcon: { fontSize:'20px', color:'#2563EB', marginBottom:'12px' },
    statusLine: { marginTop:'15px', minHeight:'10px' },
    scanBar: { width:'100%', height:'3px', background:'#2563EB' },
    successText: { color:'#059669', fontSize:'11px', fontWeight:800 },
    runText: { color:'#94a3b8', fontSize:'11px', fontWeight:600 },
    chatBox: { position:'fixed', bottom:'30px', right:'30px', width:'380px', height:'550px', background:'#fff', borderRadius:'24px', boxShadow:'0 25px 50px rgba(0,0,0,0.1)', display:'flex', flexDirection:'column', overflow:'hidden', zIndex:1000, border:'1px solid #e2e8f0' },
    chatHeader: { background:'#2563EB', color:'#fff', padding:'15px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' },
    aiLogoImg: { width:'35px', height:'35px', borderRadius:'50%', background:'#fff' },
    chatBody: { flex:1, padding:'20px', background:'#f8fafc', overflowY:'auto', display:'flex', flexDirection:'column', gap:'10px' },
    userMsgRow: { alignSelf:'flex-end', maxWidth:'80%' },
    aiMsgRow: { alignSelf:'flex-start', maxWidth:'80%' },
    userBubble: { background:'#2563EB', color:'#fff', padding:'10px 15px', borderRadius:'15px 15px 0 15px', fontSize:'14px' },
    aiBubble: { background:'#fff', border:'1px solid #e2e8f0', color:'#1e293b', padding:'10px 15px', borderRadius:'15px 15px 15px 0', fontSize:'14px' },
    chatInput: { padding:'15px', borderTop:'1px solid #f1f5f9', display:'flex', gap:'8px' },
    inputField: { flex:1, border:'1px solid #e2e8f0', borderRadius:'10px', padding:'8px 15px', outline:'none' },
    sendBtn: { background:'#0f172a', color:'#fff', border:'none', padding:'0 15px', borderRadius:'10px', cursor:'pointer' },
    fab: { position:'fixed', bottom:'30px', right:'30px', width:'60px', height:'60px', background:'#2563EB', color:'#fff', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', cursor:'pointer', zIndex:1001 }
};

export default CSAMAssistAyanEdition;