import React, { useState, useEffect } from 'react';
import { fetchBookings, updateBookingById, deleteBookingById } from '../../api';
import styles from './ManageBookings.module.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    loadBookings();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.BookingId === id ? { ...booking, BookingStatus: newStatus } : booking
      )
    );
  };

  const handleSaveStatus = async (id) => {
    try {
      const booking = bookings.find((b) => b.BookingId === id);
      if (!booking) return;

      const payload = { BookingStatus: booking.BookingStatus };
      console.log("Payload sent to the server:", payload);

      await updateBookingById(id, payload);

      alert('Cập nhật trạng thái thành công!');

      const updatedBookings = await fetchBookings();
      setBookings(updatedBookings);
    } catch (error) {
      console.error('Failed to save booking status:', error);
      alert('Cập nhật trạng thái thất bại.');
    }
  };

  const handleDeleteBooking = (id) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa booking này không?',
      buttons: [
        {
          label: 'Có',
          onClick: async () => {
            try {
              await deleteBookingById(id);
              setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.BookingId !== id)
              );
              alert('Xóa booking thành công!');
            } catch (error) {
              console.error('Failed to delete booking:', error);
              alert('Xóa booking thất bại.');
            }
          },
        },
        {
          label: 'Không',
          onClick: () => {
            console.log('Xóa booking đã bị hủy.');
          },
        },
      ],
    });
  };
  

  const openModal = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div className={styles.container}>
      <h1>Quản Lý Đặt Phòng</h1>
      <p>Xem, chỉnh sửa và quản lý tất cả các đặt phòng khách sạn và homestay tại đây.</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Ngày Đặt</th>
            <th>Người Đặt</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.BookingId}>
              <td>{booking.BookingId}</td>
              <td>{booking.OrderDate}</td>
              <td>{booking.customer?.CustomerName || 'Không rõ'}</td>
              <td>
                <select
                  value={booking.BookingStatus}
                  onChange={(e) => handleStatusChange(booking.BookingId, e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="Pending">Chờ</option>
                  <option value="Confirmed">Đã Thanh Toán</option>
                  <option value="Cancelled">Đã Hủy Phòng</option>
                </select>
              </td>
              <td className={styles.actionButtons}>
                <button
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={() => openModal(booking)}
                >
                  Chi tiết
                </button>
                <button
                  className={`${styles.button} ${styles.dangerButton}`}
                  onClick={() => handleDeleteBooking(booking.BookingId)}
                >
                  Xóa
                </button>
                <button
                  className={`${styles.button} ${styles.saveButton}`}
                  onClick={() => handleSaveStatus(booking.BookingId)}
                >
                  Lưu
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBooking && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Chi Tiết Đặt Phòng</h2>
            <p><strong>Booking ID:</strong> {selectedBooking.BookingId}</p>
            <p><strong>Ngày Đặt:</strong> {selectedBooking.OrderDate}</p>
            <p><strong>Người Đặt:</strong> {selectedBooking.customer?.CustomerName}</p>
            <p><strong>Số Điện Thoại:</strong> {selectedBooking.customer?.CustomerPhone}</p>
            <p><strong>Email:</strong> {selectedBooking.customer?.CustomerEmail}</p>
            <p><strong>Khách Sạn:</strong> {selectedBooking.hotel?.HotelName || 'Không rõ'}</p>
            <p><strong>Phòng:</strong> {selectedBooking.room?.RoomName || `Mã Phòng: ${selectedBooking.RoomId}`}</p>
            <p><strong>Nhận Phòng:</strong> {selectedBooking.DateIn}</p>
            <p><strong>Trả Phòng:</strong> {selectedBooking.DateOut}</p>
            <p><strong>Trạng Thái:</strong> {selectedBooking.BookingStatus}</p>
            <button className={styles.closeButton} onClick={closeModal}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
