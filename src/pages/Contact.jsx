import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faWhatsapp, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShieldAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('READY');
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', mobile: '', email: '', message: ''
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('SENDING');

    // EmailJS handles data via the 'name' attribute in inputs
    emailjs.sendForm(
      'service_h9ztoke', 
      'template_8lrb03b', 
      formRef.current,
      '-biSy8oTgoepoKft7'
    )
    .then(() => {
      setStatus('SUCCESS');
      alert("Cyber Incident Report Sent Successfully!");
      setFormData({ firstName: '', middleName: '', lastName: '', mobile: '', email: '', message: '' });
      setTimeout(() => setStatus('READY'), 3000);
    }, (error) => {
      alert("Error: " + error.text);
      setStatus('READY');
    });
  };

  return (
    <div className="contact-page-container" style={{ 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      padding: '40px 15px', 
      fontFamily: "'Plus Jakarta Sans', sans-serif" 
    }}>
      
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .form-row {
          display: flex;
          gap: 15px;
        }
        .contact-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
        }
        
        @media (max-width: 850px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { flex-direction: column; gap: 0; }
          .header-title { font-size: 2rem !important; }
          .contact-card { padding: 25px; }
        }
      `}</style>

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '8px', 
          backgroundColor: '#eff6ff', padding: '6px 18px', borderRadius: '100px', 
          color: '#2563eb', fontWeight: '700', fontSize: '0.85rem', marginBottom: '10px' 
        }}>
          <FontAwesomeIcon icon={faShieldAlt} /> CSAM OFFICIAL PORTAL
        </div>
        <h1 className="header-title" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', margin: '0' }}>
          Connect with Security
        </h1>
        <p style={{ color: '#64748b', marginTop: '10px' }}>Project Lead: Ayan Ansari • BCA Student</p>
      </div>

      <div className="contact-grid">
        {/* Left Side: Contact Details */}
        <div className="contact-card">
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '30px', color: '#1e293b' }}>Command Center</h2>
          
          {[
            { label: 'Official Email', val: 'info.csam.india@gmail.com' },
            { label: 'Helpline Number', val: '+91 9960232822' },
            { label: 'Headquarters', val: 'Pathri, Parbhani, MH' }
          ].map((item, idx) => (
            <div key={idx} style={{ marginBottom: '25px' }}>
              <p style={labelSmall}>{item.label}</p>
              <b style={{ fontSize: '16px', color: '#334155' }}>{item.val}</b>
            </div>
          ))}

          <p style={labelSmall}>SOCIAL NETWORKS</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SocialIcon href="https://youtube.com/@csamindia" color="#FF0000" icon={faYoutube} />
            <SocialIcon href="https://x.com/me_hacker_79" color="#000000" icon={faXTwitter} />
            <SocialIcon href="https://whatsapp.com/channel/0029VbBNzabBPzjPA4PZPw3m" color="#25D366" icon={faWhatsapp} />
            <SocialIcon href="https://instagram.com/cyber.safety.awarness.india" color="#E4405F" icon={faInstagram} />
          </div>
        </div>

        {/* Right Side: Form (No Attachment) */}
        <div className="contact-card" style={{ borderTop: '6px solid #2563eb' }}>
          <form ref={formRef} onSubmit={sendEmail}>
            <div className="form-row">
              <InputGroup label="First Name *" name="firstName" value={formData.firstName} onChange={handleInput} placeholder="Your Name" required />
              <InputGroup label="Middle Name" name="middleName" value={formData.middleName} onChange={handleInput} placeholder="Optional" />
            </div>

            <InputGroup label="Last Name (Surname) *" name="lastName" value={formData.lastName} onChange={handleInput} placeholder="Your Surname" required />

            <div className="form-row">
              {/* Added 'name' attributes for EmailJS template integration */}
              <InputGroup label="Mobile Number *" type="tel" name="mobile" value={formData.mobile} onChange={handleInput} placeholder="+91 xxxxxxxxxx" required />
              <InputGroup label="Email ID *" type="email" name="email" value={formData.email} onChange={handleInput} placeholder="exampleuser@mail.com" required />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Message / Issue Details *</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleInput} 
                style={inputStyle('120px')} 
                placeholder="Describe the incident or query..." 
                required 
              />
            </div>

            <button type="submit" disabled={status === 'SENDING'} style={{
              width: '100%', padding: '16px', borderRadius: '14px', border: 'none', 
              fontWeight: '800', cursor: 'pointer', fontSize: '1rem',
              background: status === 'SUCCESS' ? '#10b981' : '#2563eb', color: '#fff',
              transition: '0.3s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
            }}>
              {status === 'READY' ? <><FontAwesomeIcon icon={faUserShield} /> TRANSMIT REPORT</> : 
               status === 'SENDING' ? 'SENDING...' : 'REPORT SENT!'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const InputGroup = ({ label, ...props }) => (
  <div style={{ marginBottom: '18px', flex: 1, width: '100%' }}>
    <label style={labelStyle}>{label}</label>
    <input {...props} style={inputStyle()} />
  </div>
);

const SocialIcon = ({ href, color, icon }) => (
  <a href={href} target="_blank" rel="noreferrer" style={{
    width: '40px', height: '40px', borderRadius: '10px', display: 'flex', 
    alignItems: 'center', justifyContent: 'center', color: '#fff', 
    backgroundColor: color, textDecoration: 'none', fontSize: '1.1rem'
  }}><FontAwesomeIcon icon={icon} /></a>
);

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '6px' };
const labelSmall = { color: '#94a3b8', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', margin: '0 0 5px 0' };

const inputStyle = (height = 'auto') => ({
  width: '100%', padding: '14px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', 
  borderRadius: '12px', color: '#0f172a', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  height: height
});

export default Contact;