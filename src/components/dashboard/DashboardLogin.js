import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardLogin.module.css';
import { login } from '../../api'; // Hàm login từ API.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Đừng quên import style của react-toastify

const DashboardLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
  
      if (response && response.token) {
        // Lưu token vào localStorage để dùng cho các yêu cầu sau
        localStorage.setItem('authToken', response.token);
  
        // Thông báo đăng nhập thành công
        toast.success('Đăng nhập thành công! Đang chuyển hướng...');
  
        // Chuyển hướng tới trang dashboard sau khi đăng nhập thành công
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500); // Chờ 1.5s để người dùng đọc thông báo
      } else {
        setError('Thông tin đăng nhập không đúng.');
        toast.error('Thông tin đăng nhập không đúng.');
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi đăng nhập.');
      toast.error(err.message || 'Có lỗi xảy ra khi đăng nhập.');
      console.error('Error during login:', err);
    }
  };
  

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Đăng Nhập Dashboard</h2>
        
        {/* Hiển thị lỗi nếu có */}
        {error && <p className={styles.error}>{error}</p>}
        
        <div className={styles.inputGroup}>
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            placeholder="Nhập tên đăng nhập"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Mật khẩu:</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} className={styles.loginButton}>Đăng Nhập</button>
        <button onClick={handleGoHome} className={styles.homeButton}>Về Trang Chủ</button>
      </div>
      {/* Thêm ToastContainer vào để hiển thị các thông báo */}
      <ToastContainer />
    </div>
  );
};

export default DashboardLogin;
