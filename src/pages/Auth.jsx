import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase'; 
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged 
} from "firebase/auth";
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faMicrochip, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import logoImage from '../assets/logo.jpg';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [userOtp, setUserOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const checkRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) onLogin(); 
            } catch (error) {
                if (error.code !== 'auth/internal-error') console.error("Redirect Error:", error.message);
            }
        };
        checkRedirect();
    }, [onLogin]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) onLogin();
        });
        return () => unsubscribe();
    }, [onLogin]);

    useEffect(() => {
        let interval;
        if (timer > 0) interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                await signInWithRedirect(auth, googleProvider);
            } else {
                const result = await signInWithPopup(auth, googleProvider);
                if (result.user) onLogin();
            }
        } catch (error) {
            alert("Error: " + error.message);
        } finally { setLoading(false); }
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                onLogin();
            } else {
                if (!otpSent) {
                    const otp = Math.floor(100000 + Math.random() * 900000);
                    setGeneratedOtp(otp);
                    await emailjs.send('service_h9ztoke', 'template_6xl5bn5', { to_email: email, otp: otp }, '-biSy8oTgoepoKft7');
                    setOtpSent(true); setTimer(60);
                } else if (userOtp === generatedOtp?.toString()) {
                    await createUserWithEmailAndPassword(auth, email, password);
                    await signOut(auth);
                    alert("Account Created! Sign In now.");
                    setIsLogin(true); setOtpSent(false);
                } else { alert("Invalid OTP"); }
            }
        } catch (error) { alert(error.message); } finally { setLoading(false); }
    };

    return (
        <div className="auth-wrapper">
            <style>{`
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body, html { width: 100%; height: 100%; background: #030712; overflow: hidden; font-family: 'Inter', sans-serif; }
                .auth-wrapper { width: 100%; height: 100dvh; background: #030712; position: relative; }
                .auth-page { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; padding: 15px; z-index: 5; }
                
                .aurora-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; filter: blur(100px); opacity: 0.4; pointer-events: none; }
                .glow { position: absolute; border-radius: 50%; animation: drift 15s infinite alternate linear; }
                .glow-1 { width: 80vw; height: 80vw; background: #1d4ed8; top: -20%; left: -20%; }
                .glow-2 { width: 80vw; height: 80vw; background: #701a75; bottom: -20%; right: -20%; }
                @keyframes drift { from { transform: translate(0,0); } to { transform: translate(30px, 30px); } }
                
                /* Responsive Card: Mobile par width badhai aur height balance ki */
                .auth-card { 
                    z-index: 10; 
                    width: 100%; 
                    max-width: 520px; /* PC par wider look */
                    background: rgba(255,255,255,0.05); 
                    backdrop-filter: blur(30px); 
                    border: 1px solid rgba(255,255,255,0.1); 
                    border-radius: 28px; 
                    padding: 30px 25px; /* Kam height ke liye padding kam ki */
                    text-align: center; 
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); 
                }

                @media (max-width: 480px) {
                    .auth-card { 
                        max-width: 95%; /* Mobile par puri width use karega */
                        padding: 25px 20px; 
                    }
                    .auth-logo { width: 60px !important; height: 60px !important; margin-bottom: 12px !important; }
                    .form { gap: 12px !important; }
                    h2 { font-size: 22px !important; }
                }
                
                .auth-logo { width: 65px; height: 65px; border-radius: 18px; margin-bottom: 15px; border: 1.5px solid #3b82f6; object-fit: cover; }
                .form { display: flex; flex-direction: column; gap: 15px; }
                .input-field { position: relative; width: 100%; }
                .icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #3b82f6; font-size: 14px; }
                .toggle-eye { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); color: #6b7280; cursor: pointer; padding: 5px; }
                
                .input-field input { 
                    width: 100%; 
                    padding: 14px 45px 14px 50px; 
                    background: rgba(0, 0, 0, 0.3); 
                    border: 1px solid rgba(255, 255, 255, 0.08); 
                    border-radius: 14px; 
                    color: #fff; 
                    font-size: 15px; 
                    outline: none; 
                    transition: 0.2s;
                }
                .input-field input:focus { border-color: #3b82f6; background: rgba(0, 0, 0, 0.5); }
                
                .btn-main { padding: 14px; background: #3b82f6; color: white; border: none; border-radius: 14px; font-weight: 700; cursor: pointer; font-size: 15px; transition: 0.2s; }
                .btn-main:active { transform: scale(0.98); }
                
                .or-divider { margin: 18px 0; color: #4b5563; font-size: 12px; position: relative; display: flex; align-items: center; justify-content: center; }
                .or-divider::before { content: ""; position: absolute; width: 100%; height: 1px; background: rgba(255,255,255,0.1); }
                .or-divider span { position: relative; background: #030712; padding: 0 12px; }
                
                .btn-google { width: 100%; padding: 12px; background: #fff; color: #000; border: none; border-radius: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; }
                
                .toggle-text { margin-top: 20px; color: #9ca3af; font-size: 14px; }
                .toggle-text span { color: #3b82f6; font-weight: 700; cursor: pointer; }
                .timer { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); color: #10b981; font-size: 12px; font-weight: 700; }
            `}</style>

            <div className="auth-page">
                <div className="aurora-bg">
                    <div className="glow glow-1"></div>
                    <div className="glow glow-2"></div>
                </div>

                <div className="auth-card">
                    <img src={logoImage} alt="Logo" className="auth-logo" />
                    <h2 style={{color:'#fff', marginBottom: '5px'}}>{isLogin ? "Welcome Back" : "Join CSAM"}</h2>
                    <p style={{color:'#6b7280', marginBottom:'25px', fontSize: '13px', fontWeight: '500'}}>AyanCore Security Protocols</p>

                    <form onSubmit={handleAuth} className="form">
                        {!otpSent ? (
                            <>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                    <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faLock} className="icon" />
                                    <input type={showPass ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                                    <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className="toggle-eye" onClick={() => setShowPass(!showPass)} />
                                </div>
                            </>
                        ) : (
                            <div className="input-field">
                                <FontAwesomeIcon icon={faMicrochip} className="icon" />
                                <input type="text" placeholder="Enter Verification OTP" onChange={(e) => setUserOtp(e.target.value)} required />
                                {timer > 0 && <span className="timer">{timer}s</span>}
                            </div>
                        )}
                        <button type="submit" className="btn-main" disabled={loading}>
                            {loading ? "Verifying..." : (isLogin ? "Sign In" : (otpSent ? "Complete Registration" : "Send Secure OTP"))}
                        </button>
                    </form>

                    <div className="or-divider"><span>OR</span></div>

                    <button type="button" onClick={handleGoogleSignIn} className="btn-google" disabled={loading}>
                        <FontAwesomeIcon icon={faGoogle} /> {loading ? "Connecting..." : "Continue with Google"}
                    </button>

                    <p className="toggle-text">
                        {isLogin ? "New to CSAM?" : "Already have access?"} 
                        <span onClick={() => {setIsLogin(!isLogin); setOtpSent(false);}}>
                            {isLogin ? " Create Account" : " Login"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;