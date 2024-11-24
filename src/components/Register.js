import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from './loginForm.module.css'; // Import CSS module

const RegisterForm = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.frame1}>
        <span className={styles.login}>Đăng Ký</span>
        <br />
        <span className={styles.welcomeMessage}>
          Welcome to our blog magazine Community
        </span>
      </div>
      <div className={styles.frame2}>
        <div className={styles.socialButtons}>
          <button className={styles.button}>
            <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
            <span className={styles.buttonText}>Continue with Facebook</span>
          </button>
          <button className={styles.button}>
            <FontAwesomeIcon icon={faGoogle} className={styles.socialIcon} />
            <span className={styles.buttonText}>Continue with Google</span>
          </button>
          <button className={styles.button}>
            <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
            <span className={styles.buttonText}>Continue with Twitter</span>
          </button>
        </div>
        <div className={styles.groupC}>
          <div className={styles.line} />
          <div className={styles.buttonD}>
            <span className={styles.buttonOr}>OR</span>
          </div>
          <div className={styles.line} />
        </div>
        <div className={styles.frameE}>
          <div className={styles.inputGroup}>
            <span className={styles.emailLabel}>Email</span>
            <input className={styles.input} placeholder="you@example.com" />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.passwordLabel}>Password</span>
            <input className={styles.input} placeholder="****" type="password" />
          </div>
          <button className={styles.button12}>
            <span className={styles.buttonText}>Continue</span>
          </button>
          <div className={styles.button14}>
            <div className={styles.button15}>
              <span className={styles.newUser}>New user? </span>
              <Link to="/login" className={styles.createAnAccount}>Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;
