import React, { useState, useEffect } from "react";
import styles from "./ManageUsers.module.css";
import { fetchUsers, updateUser, fetchAllHotels } from "../../api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsers();
        const allHotels = await fetchAllHotels();

        const usersWithHotelName = usersData.map((user) => {
          const userHotel = allHotels.find(
            (hotel) => hotel.HotelId === user.HotelId
          );
          return {
            ...user,
            HotelName: userHotel ? userHotel.HotelName : "Không xác định",
          };
        });

        setUsers(usersWithHotelName);
        setHotels(allHotels);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleEditClick = (user) => {
    setIsEditing(true);
    setCurrentUser({
      ...user,
      HotelId: user.HotelId || "",
      Password: "", // Add a new field for changing the password
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ 
      ...currentUser, 
      [name]: name === 'UserStatus' ? parseInt(value) : value // Đảm bảo UserStatus là số
    });
  };
  
  const handleSave = async () => {
    try {
      // Không mã hóa mật khẩu tại frontend, gửi mật khẩu thô lên server
      const updatePayload = { ...currentUser };
      if (!currentUser.Password) {
        delete updatePayload.Password; // Xóa mật khẩu nếu không thay đổi
      }

      await updateUser(currentUser.UserId, updatePayload);

      const updatedHotel = hotels.find(
        (hotel) => hotel.HotelId === parseInt(currentUser.HotelId, 10)
      );

      setUsers(
        users.map((user) =>
          user.UserId === currentUser.UserId
            ? {
                ...currentUser,
                HotelName: updatedHotel
                  ? updatedHotel.HotelName
                  : "Không xác định",
              }
            : user
        )
      );

      setIsEditing(false);
      console.log("Cập nhật người dùng thành công.");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Quản Lý Người Dùng</h1>
      <p>Xem, chỉnh sửa và quản lý người dùng đã đăng ký.</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID Người Dùng</th>
            <th>Tên Nhân Viên</th>
            <th>Username</th>
            <th>Khách Sạn</th>
            <th>Trạng Thái</th>
            <th>Vai Trò</th>
            <th>Ngày Tạo</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserId}>
              <td>{user.UserId}</td>
              <td>{user.FullName}</td>
              <td>{user.UserName}</td>
              <td>{user.HotelName || "Không xác định"}</td>
              <td>{user.UserStatus === 1 ? "Đang làm việc" : "Nghỉ việc"}</td>
              <td>{user.Role}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleEditClick(user)}
                  className={styles.editButton}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Chỉnh sửa thông tin người dùng</h2>
              <button
                className={styles.modalClose}
                onClick={() => setIsEditing(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <label>Tên nhân viên:</label>
              <input
                type="text"
                name="FullName"
                value={currentUser.FullName}
                onChange={handleInputChange}
              />

              <label>Username:</label>
              <input
                type="text"
                name="UserName"
                value={currentUser.UserName}
                onChange={handleInputChange}
              />

              <label>Khách sạn:</label>
              <select
                name="HotelId"
                value={currentUser.HotelId || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Chọn khách sạn
                </option>
                {hotels.map((hotel) => (
                  <option key={hotel.HotelId} value={hotel.HotelId}>
                    {hotel.HotelName}
                  </option>
                ))}
              </select>

              <label>Vai trò:</label>
              <select
                name="Role"
                value={currentUser.Role || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Chọn vai trò
                </option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Quản lý">Quản lý</option>
              </select>

              <label>Trạng thái:</label>
<select
  name="UserStatus"
  value={currentUser.UserStatus === undefined ? 1 : currentUser.UserStatus}  // Đảm bảo giá trị hợp lệ
  onChange={handleInputChange}
>
  <option value={1}>Đang làm việc</option>
  <option value={0}>Nghỉ việc</option>
</select>

              <label>Đổi mật khẩu (nếu có):</label>
              <input
                type="password"
                name="Password"
                placeholder="Nhập mật khẩu mới"
                value={currentUser.Password}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.saveButton} onClick={handleSave}>
                Lưu
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
