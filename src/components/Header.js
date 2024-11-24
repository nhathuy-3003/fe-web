import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHotel, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css'; // Import CSS module
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom

const Header = () => {
  const location = useLocation(); // Get current path
  const [selectedNav, setSelectedNav] = useState('Home'); // State to track selected nav item
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    // Update selectedNav based on the current path
    switch (location.pathname) {
      case '/':
        setSelectedNav('Home');
        break;
      case '/hotels':
        setSelectedNav('Hotels');
        break;
      case '/blog':
        setSelectedNav('Blog');
        break;
      case '/other':
        setSelectedNav('Other Page');
        break;
      case '/about':
        setSelectedNav('About');
        break;
      case '/contact':
        setSelectedNav('Contact');
        break;
      default:
        setSelectedNav('Home'); // Default to Home if no match
    }
  }, [location.pathname]); // Update when the path changes

  const handleNavClick = (navItem) => {
    setSelectedNav(navItem); // Update selected nav item
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const handleDropdownItemClick = (navItem) => {
    handleNavClick(navItem); // Update selected nav item
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTransparent}>
        <div className={styles.headerContent}>
          <div className={styles.headerLogo} />
          <div className={styles.headerNavigation}>
            <Link 
              to="/" 
              className={`${styles.headerNavItem} ${selectedNav === 'Home' ? styles.selected : ''}`}
              onClick={() => handleNavClick('Home')}
            >
              <FontAwesomeIcon icon={faHome} />
              <span className={styles.home}>Trang Chủ</span>
            </Link>
            
            <Link 
              to="/hotels" 
              className={`${styles.headerNavItem} ${selectedNav === 'Hotels' ? styles.selected : ''}`}
              onClick={() => handleNavClick('Hotels')}
            >
              <FontAwesomeIcon icon={faHotel} />
              <span>Khách Sạn</span>
            </Link>
            
          
            
            <Link 
              to="/blog" 
              className={`${styles.headerNavItem} ${selectedNav === 'Blog' ? styles.selected : ''}`}
              onClick={() => handleNavClick('Blog')}
            >
              <FontAwesomeIcon icon={faNewspaper} />
              <span>Blog</span>
            </Link>
            
            <div className={styles.dropdownContainer}>
              <div 
                className={`${styles.headerNavItem} ${selectedNav === 'Other Page' ? styles.selected : ''}`} 
                onClick={toggleDropdown} // Toggle dropdown on click
              >
                Trang Khác
              </div>
              
              {isDropdownOpen && (
  <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ''}`}>
    <Link 
      to="/about" 
      className={styles.dropdownItem} 
      onClick={() => handleDropdownItemClick('About')}
    >
      Về Chúng Tôi
    </Link>
    <Link 
      to="/contact" 
      className={styles.dropdownItem} 
      onClick={() => handleDropdownItemClick('Contact')}
    >
      Liên Hệ
    </Link>
  </div>
)}
            </div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <Link to="/login">
            <button className={styles.btnSignUp}>
              <span className="header-sign-up-btn">Sign up</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
