import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'YouTube', url: 'https://youtube.com/@csamindia?si=VxE787JUAnC4pyIs', color: '#FF0000' },
    { name: 'Twitter (X)', url: 'https://x.com/me_hacker_79?t=O1K34TJeGjMo13JSxwUtYA&s=09', color: '#1DA1F2' },
    { name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbBNzabBPzjPA4PZPw3m', color: '#25D366' },
    { name: 'Instagram', url: 'https://www.instagram.com/cyber.safety.awarness.india?igsh=MWRqcnV4MG1jcWlyMw==', color: '#E1306C' }
  ];

  return (
    <footer style={{ 
      backgroundColor: '#0f172a', 
      color: '#cbd5e0', 
      padding: '60px 20px 30px 20px', 
      fontFamily: "'Inter', sans-serif",
      borderTop: '5px solid #007bff' 
    }}>
      
      {/* Responsive Style Tag */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            text-align: center; /* Mobile par sab center dikhega */
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-section {
            padding: 0 10px;
          }
          .social-list {
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="footer-grid">
        
        {/* Section 1: Brand Mission */}
        <div className="footer-section">
          <h2 style={{ color: '#ffffff', marginBottom: '15px', fontSize: '1.6rem', fontWeight: '800' }}>
            CSAM <span style={{ color: '#007bff' }}>INDIA</span>
          </h2>
          <p style={{ lineHeight: '1.7', fontSize: '0.95rem', color: '#94a3b8' }}>
            Cyber Safety Awareness Mission India (CSAM) ka uddeshya har nagrik ko digital duniya mein surakshit rakhna hai. Hum cyber awareness aur security education par kaam karte hain.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-section">
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Social Channels</h4>
          <ul className="social-list" style={{ listStyle: 'none', padding: 0 }}>
            {socialLinks.map((link) => (
              <li key={link.name} style={{ marginBottom: '12px' }}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: '#cbd5e0', textDecoration: 'none', fontSize: '0.95rem', transition: '0.3s' }}
                  onMouseOver={(e) => e.target.style.color = link.color}
                  onMouseOut={(e) => e.target.style.color = '#cbd5e0'}
                >
                  {link.name} Official
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Headquarter & Contact */}
        <div className="footer-section">
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Information</h4>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
            <p style={{ margin: '0 0 10px 0' }}>📍 <b>Pathri, Parbhani</b>, Maharashtra, India</p>
            <p style={{ margin: '0 0 5px 0' }}>📧 info.csam.india@gmail.com</p>
            <p style={{ margin: '0 0 5px 0' }}>📞 +91 9960232822</p>
            <p style={{ margin: '0 0 5px 0' }}>📞 +91 9970889890</p>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '50px auto 0 auto', 
        paddingTop: '25px', 
        borderTop: '1px solid #334155', 
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.85rem', margin: 0, color: '#64748b', lineHeight: '1.5' }}>
          © {currentYear} CSAM INDIA | Developed & Maintained by <br className="mobile-only" style={{ display: 'none' }} /> 
          <b style={{ color: '#007bff' }}>Ayan Ansari</b> (BCA Student)
        </p>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .mobile-only { display: block !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;