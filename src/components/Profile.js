// src/components/Profile.js
import React, { useState } from 'react';

import styles from './Profile.module.css';

const Profile = () => {
  const [name, setName] = useState('Người Dùng');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('0123456789');
  const [profileImage, setProfileImage] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Thông tin cá nhân đã được lưu!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert('Mật khẩu đã được đổi thành công!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Thông Tin Cá Nhân</h1>
      <div className={styles.profileContainer}>
        <form onSubmit={handleSaveProfile} className={styles.form}>
          <div className={styles.profileImageContainer}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" className={styles.profileImage} />
            ) : (
              <div className={styles.placeholderImage}>Chưa có hình ảnh</div>
            )}
            <label className={styles.imageUploadButton}>
              Chọn Hình
              <input type="file" onChange={handleImageChange} className={styles.fileInput} />
            </label>
          </div>

          <label>
            Tên:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </label>

          <label>
            Số Điện Thoại:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </label>

          <button type="submit" className={styles.saveButton}>Lưu Thông Tin</button>
        </form>

        <form onSubmit={handleChangePassword} className={styles.form}>
          <h2>Thay Đổi Mật Khẩu</h2>
          <label>
            Mật Khẩu Hiện Tại:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <label>
            Mật Khẩu Mới:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <label>
            Xác Nhận Mật Khẩu Mới:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <button type="submit" className={styles.changePasswordButton}>Đổi Mật Khẩu</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
