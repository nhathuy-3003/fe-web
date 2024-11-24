import React from 'react';
import styles from './Forgot-ps.module.css'; // Import CSS module
import { Link } from 'react-router-dom'; // Import Link for navigation

const ForgotPassword = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.frame1}>
        <span className={styles.forgotPassword}>Quên Mật Khẩu</span>
        <br />
        <span className={styles.welcomeMessage}>
          Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu.
        </span>
      </div>
      <div className={styles.frame2}>
        <div className={styles.inputGroup}>
          <span className={styles.emailLabel}>Email</span>
          <input className={styles.input} placeholder="you@example.com" />
        </div>
        <button className={styles.button12}>
          <span className={styles.buttonText}>Gửi liên kết đặt lại</span>
        </button>
        <div className={styles.button14}>
          <div className={styles.button15}>
            <span className={styles.backToLogin}>
              Đã có tài khoản? 
              <Link to="/login" className={styles.createAnAccount}> Đăng Nhập</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
