import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/images/logo.jpg'; // Make sure to update the path to your logo

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>Về chúng tôi</h4>
          <ul>
            <li>Giới thiệu</li>
            <li>Tin tức</li>
            <li>Liên hệ</li>
            <li>Tuyển dụng</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Hỗ trợ</h4>
          <ul>
            <li>Trung tâm trợ giúp</li>
            <li>Hướng dẫn đặt phòng</li>
            <li>Hướng dẫn thanh toán</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Dịch vụ</h4>
          <ul>
            <li>Đặt phòng khách sạn</li>
            <li>Đặt tour du lịch</li>
            <li>Thuê xe du lịch</li>
            <li>Vé tham quan</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Kết nối với chúng tôi</h4>
          <div className={styles.socialIcons}>
            <FontAwesomeIcon icon={faFacebookF} className={styles.icon} />
            <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
          </div>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
      </div>
      <div className={styles.bottomBar}>
        
        <p>&copy; 2024 Booking Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
