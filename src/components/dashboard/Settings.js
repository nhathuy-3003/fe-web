import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import { useNavigate } from 'react-router-dom';
import { updatePassword, fetchAllHotels, fetchUserSetting } from '../../api'; // Import từ api.js

const Settings = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    userStatus: 1,
    password: '',
    hotelName: '',
    currentPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get the logged-in user's data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError("Bạn chưa đăng nhập.");
        setLoading(false);
        return;
      }

      try {
        // Gọi API để lấy thông tin người dùng
        const userData = await fetchUserSetting(token);
        const allHotels = await fetchAllHotels();
        
        // Cập nhật thông tin người dùng
        setUser({
          name: userData.FullName || '',
          email: userData.UserName || '',
          role: userData.Role || '',
          userStatus: userData.UserStatus || 1,
          hotelName: allHotels.find(hotel => hotel.HotelId === userData.HotelId)?.HotelName || "Không xác định",
        });
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu người dùng.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Xóa token khi đăng xuất
    navigate('/dashboard-login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Bạn chưa đăng nhập.");
      return;
    }

    const updatedData = {
      currentPassword: user.currentPassword,
      newPassword: user.password,
    };

    try {
      // Kiểm tra mật khẩu cũ và thay đổi mật khẩu mới
      const data = await updatePassword(token, updatedData.currentPassword, updatedData.newPassword);
      if (data.success) {
        alert('Mật khẩu đã được thay đổi.');
      } else {
        alert(data.message || 'Có lỗi xảy ra.');
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi mật khẩu:', error);
      alert('Có lỗi xảy ra.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Cài Đặt</h1>
      <p>Chỉnh sửa thông tin cá nhân của bạn tại đây.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Tên:
          <input
            type="text"
            name="name"
            value={user.name || ''}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleInputChange}
            className={styles.input}
            readOnly
          />
        </label>

        <label>
          Vai trò:
          <input
            type="text"
            value={user.role || ''}
            className={styles.input}
            readOnly
          />
        </label>

        <label>
          Trạng thái:
          <input
            type="text"
            value={user.userStatus === 1 ? "Đang làm việc" : "Nghỉ việc"}
            className={styles.input}
            readOnly
          />
        </label>

        <label>
          Khách sạn đang làm việc:
          <input
            type="text"
            value={user.hotelName || ''}
            className={styles.input}
            readOnly
          />
        </label>

        <label>
          Mật khẩu cũ:
          <input
            type="password"
            name="currentPassword"
            placeholder="Nhập mật khẩu cũ"
            value={user.currentPassword || ''}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label>
          Mật khẩu mới:
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu mới"
            value={user.password || ''}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.saveButton}>Lưu Thay Đổi</button>
          <button type="button" onClick={handleLogout} className={styles.logoutButton}>Đăng Xuất</button>
          <button type="button" onClick={() => navigate('/')} className={styles.homeButton}>Trang Chủ</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
