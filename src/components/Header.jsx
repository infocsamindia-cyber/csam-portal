import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBug, faLock, faInfoCircle, faPhoneAlt, faFolderOpen, 
    faHome, faBars, faTimes, faSignInAlt, faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import logoImage from '../assets/logo.jpg'; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
      navigate('/auth');
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <style>
        {`
          .nav-list { display: flex; list-style: none; gap: 10px; align-items: center; margin: 0; padding: 0; }
          .hamburger { display: none; cursor: pointer; font-size: 24px; color: #2563EB; z-index: 1001; }

          @media (max-width: 992px) {
            .hamburger { display: block; }
            .nav-list {
              display: ${isMenuOpen ? 'flex' : 'none'};
              flex-direction: column; position: absolute; top: 100%; left: 0;
              width: 100%; background: #ffffff; padding: 20px 0;
              box-shadow: 0 10px 20px rgba(0,0,0,0.1); z-index: 1000;
            }
            .nav-item { width: 90%; border-bottom: 1px solid #f1f5f9; }
          }
        `}
      </style>

      <header style={styles.header}>
        <nav style={styles.navbar}>
          <Link to="/" style={styles.logoLink} onClick={closeMenu}>
            <div style={styles.logoWrapper}>
              <img src={logoImage} alt="Logo" style={styles.logoImg} />
            </div>
            <div style={styles.brandText}>
              <h2 style={styles.mainTitle}>CSAM <span style={styles.accent}>PORTAL</span></h2>
              <span style={styles.subTitle}>Cyber Awareness</span>
            </div>
          </Link>

          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>

          <ul className="nav-list">
            <li className="nav-item"><Link to="/" style={styles.link} onClick={closeMenu}><FontAwesomeIcon icon={faHome} style={styles.icon}/> Home</Link></li>
            <li className="nav-item"><Link to="/frauds" style={styles.link} onClick={closeMenu}><FontAwesomeIcon icon={faBug} style={styles.icon}/> Frauds</Link></li>
            <li className="nav-item"><Link to="/safety" style={styles.link} onClick={closeMenu}><FontAwesomeIcon icon={faLock} style={styles.icon}/> Safety</Link></li>
            <li className="nav-item"><Link to="/resources" style={styles.link} onClick={closeMenu}><FontAwesomeIcon icon={faFolderOpen} style={styles.icon}/> Resources</Link></li>
            <li className="nav-item"><Link to="/about" style={styles.link} onClick={closeMenu}><FontAwesomeIcon icon={faInfoCircle} style={styles.icon}/> About</Link></li>
            <li className="nav-item"><Link to="/contact" style={styles.link} onClick={closeMenu}><FontAwesomeIcon icon={faPhoneAlt} style={styles.icon}/> Contact</Link></li>
            <li>
              {user ? (
                <button onClick={handleLogout} style={styles.logoutBtn}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
              ) : (
                <Link to="/auth" style={styles.authBtn} onClick={closeMenu}><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

const styles = {
  header: { position: 'sticky', top: 0, zIndex: 2000, background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '10px 15px' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  logoLink: { textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' },
  logoWrapper: { width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #2563EB' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  brandText: { display: 'flex', flexDirection: 'column' },
  mainTitle: { margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a', lineHeight: 1.2 },
  accent: { color: '#2563EB' },
  subTitle: { fontSize: '9px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' },
  link: { textDecoration: 'none', color: '#334155', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' },
  icon: { color: '#2563EB', width: '16px' },
  authBtn: { textDecoration: 'none', background: '#2563EB', color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' },
  logoutBtn: { background: '#dc2626', color: '#fff', padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }
};

export default Header;