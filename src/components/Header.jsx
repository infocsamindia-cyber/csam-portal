import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faShieldAlt, faBug, faLock, faInfoCircle, 
    faPhoneAlt, faFolderOpen, faHome, faUserCheck, faBars, faTimes 
} from '@fortawesome/free-solid-svg-icons';
import logoImage from '../assets/logo.jpg'; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <style>
        {`
          .nav-list {
            display: flex;
            list-style: none;
            gap: 15px;
            margin: 0;
            padding: 0;
          }

          .hamburger {
            display: none;
            cursor: pointer;
            font-size: 24px;
            color: #2563EB;
          }

          @media (max-width: 992px) {
            .nav-list {
              display: ${isMenuOpen ? 'flex' : 'none'};
              flex-direction: column;
              position: absolute;
              top: 70px;
              left: 0;
              width: 100%;
              background: white;
              padding: 20px;
              box-shadow: 0 10px 15px rgba(0,0,0,0.1);
              z-index: 999;
            }
            .hamburger {
              display: block;
            }
            .dev-badge-desktop {
              display: none;
            }
          }
        `}
      </style>

      <header style={styles.header}>
        <nav style={styles.navbar}>
          <div style={styles.logoGroup}>
            <Link to="/" style={styles.logoLink}>
              <div style={styles.logoWrapper}>
                <img src={logoImage} alt="CSAM Logo" style={styles.logoImg} />
                <div style={styles.logoGlow}></div>
              </div>
              <div style={styles.brandText}>
                <h2 style={styles.mainTitle}>CSAM <span style={styles.accent}>PORTAL</span></h2>
                <span style={styles.subTitle}>Cyber Safety Awareness Movement</span>
              </div>
            </Link>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="hamburger" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>

          <ul className="nav-list">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)} style={styles.link}><FontAwesomeIcon icon={faHome} style={styles.icon}/> Home</Link></li>
            <li><Link to="/frauds" onClick={() => setIsMenuOpen(false)} style={styles.link}><FontAwesomeIcon icon={faBug} style={styles.icon}/> Frauds</Link></li>
            <li><Link to="/safety" onClick={() => setIsMenuOpen(false)} style={styles.link}><FontAwesomeIcon icon={faLock} style={styles.icon}/> Safety</Link></li>
            <li><Link to="/resources" onClick={() => setIsMenuOpen(false)} style={styles.link}><FontAwesomeIcon icon={faFolderOpen} style={styles.icon}/> Resources</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)} style={styles.link}><FontAwesomeIcon icon={faPhoneAlt} style={styles.icon}/> Contact Us</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)} style={styles.link}><FontAwesomeIcon icon={faInfoCircle} style={styles.icon}/> About</Link></li>
            {/* Mobile par Dev Badge menu ke andar dikhega */}
            <li className="dev-badge-mobile" style={{marginTop: '10px', display: 'none'}}>
               <div style={styles.devBadge}>Dev: Ayan Ansari</div>
            </li>
          </ul>

          <div className="dev-badge-desktop" style={styles.devBadge}>
             <FontAwesomeIcon icon={faUserCheck} style={{marginRight: '8px'}} />
             <span>Dev: Ayan Ansari</span>
          </div>
        </nav>
      </header>
    </>
  );
}

const styles = {
  header: { 
    position: 'sticky', top: 0, zIndex: 1000, 
    background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(15px)', 
    borderBottom: '1px solid rgba(37, 99, 235, 0.1)', padding: '10px 20px', 
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)' 
  },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' },
  logoLink: { textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' },
  logoWrapper: { position: 'relative', width: '40px', height: '40px' },
  logoImg: { width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #2563EB', objectFit: 'cover', zIndex: 2, position: 'relative' },
  logoGlow: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#2563EB', borderRadius: '50%', filter: 'blur(10px)', opacity: 0.3 },
  brandText: { display: 'flex', flexDirection: 'column' },
  mainTitle: { margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a' },
  accent: { color: '#2563EB' },
  subTitle: { fontSize: '8px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' },
  link: { textDecoration: 'none', color: '#475569', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px' },
  icon: { color: '#2563EB' },
  devBadge: { background: '#0f172a', color: '#fff', padding: '8px 15px', borderRadius: '30px', fontSize: '10px', fontWeight: '700', border: '1px solid #2563EB', display: 'flex', alignItems: 'center' }
};

export default Header;