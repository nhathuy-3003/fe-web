import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './PaymentPage.module.css';

import { FaCcVisa, FaCcMastercard, FaUserFriends } from 'react-icons/fa';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    hotelName = '',
    roomName = '',
    roomImage = '',
    price = 0,
    checkInDate: checkInDateStr = null,
    checkOutDate: checkOutDateStr = null,
    adults = 1,
    children = 0,
    hotelId = null,
    roomId = null,
    roomAmenities = [],
  } = location.state || {};

  const checkInDate = checkInDateStr ? new Date(checkInDateStr) : null;
  const checkOutDate = checkOutDateStr ? new Date(checkOutDateStr) : null;
  const orderDate = new Date();

  const [paymentMethod, setPaymentMethod] = useState(''); // Giá trị mặc định là rỗng
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirmPayment = async () => {
    if (!fullName || !email || !phoneNumber || !paymentMethod) {
      alert('Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán!');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        HotelId: hotelId,
        RoomId: roomId,
        OrderDate: orderDate.toISOString().split('T')[0],
        DateIn: checkInDate ? checkInDate.toISOString().split('T')[0] : null,
        DateOut: checkOutDate ? checkOutDate.toISOString().split('T')[0] : null,
        BookingOrderType: 'Online',
        BookingPaymentMethod: paymentMethod,
        BookingTotalAmount: Number(price),
        CustomerName: fullName,
        CustomerPhone: phoneNumber,
        CustomerEmail: email,
        CustomerAddress: '',
      };

      console.log('Payload gửi đi:', payload);

      const response = await axios.post('http://127.0.0.1:8000/api/booking', payload);

      console.log('Đặt phòng thành công:', response.data);

      navigate('/checkoutpage', {
        state: {
          hotelName,
          roomName,
          roomImage,
          price,
          checkInDate,
          checkOutDate,
          adults,
          children,
          hotelId,
          roomId,
          roomAmenities,
          
        },
      });
      
    } catch (error) {
      console.error('Lỗi khi đặt phòng:', error);
      if (error.response?.data?.errors) {
        console.error('API Errors:', error.response.data.errors);
        alert(`Lỗi từ API: ${JSON.stringify(error.response.data.errors)}`);
      } else if (error.response?.data?.message) {
        alert(`Lỗi từ API: ${error.response.data.message}`);
      } else {
        alert('Đã xảy ra lỗi khi xử lý đặt phòng. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentLeft}>
        <h2>Xác nhận và thanh toán</h2>

        <div className={styles.customerInfo}>
          <h3>Thông tin khách hàng</h3>
          <label>Họ và tên</label>
          <input
            type="text"
            placeholder="Như trong Hộ chiếu/CMND/CCCD"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Số điện thoại</label>
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className={styles.paymentMethod}>
          <h3>Phương thức thanh toán</h3>
          <div className={styles.paymentOptions}>
  <button
    className={`${styles.paymentButton} ${paymentMethod === 'momo' ? styles.active : ''}`}
    onClick={() => setPaymentMethod('momo')}
  >
    Momo
  </button>
  <button
    className={`${styles.paymentButton} ${paymentMethod === 'credit' ? styles.active : ''}`}
    onClick={() => setPaymentMethod('credit')}
  >
    <FaCcVisa /> <FaCcMastercard /> Thẻ ngân hàng
  </button>
</div>

        </div>

        {loading ? (
          <p>Đang xử lý thanh toán...</p>
        ) : (
          <button className={styles.confirmBtn} onClick={handleConfirmPayment}>
            Xác nhận và thanh toán
          </button>
        )}
      </div>

      <div className={styles.paymentRight}>
        <div className={styles.hotelSummary}>
          <img src={roomImage} alt={roomName} className={styles.hotelImage} />
          <div className={styles.hotelDetails}>
            <h4>{hotelName}</h4>
            <p>
              <strong>Số phòng:</strong> {roomName}
            </p>
          </div>
        </div>

        <div className={styles.tripInfo}>
          <div className={styles.tripDate}>
            <span>Nhận phòng</span>
            <div>
              {checkInDate
                ? `${checkInDate.toLocaleDateString('vi-VN')} - Từ 14:00`
                : 'Chưa chọn'}
            </div>
          </div>
          <div className={styles.tripDate}>
            <span>Trả phòng</span>
            <div>
              {checkOutDate
                ? `${checkOutDate.toLocaleDateString('vi-VN')} - Trước 12:00`
                : 'Chưa chọn'}
            </div>
          </div>
        </div>
        <div className={styles.roomDetails}>
          <p>
            <FaUserFriends /> {adults} Người lớn, {children} Trẻ em
          </p>
          <h4>Tiện nghi phòng:</h4>
          {roomAmenities.length > 0 ? (
            <ul className={styles.amenitiesList}>
              {roomAmenities.map((amenity, index) => (
                <li key={index}>
                  <img
                    src={`http://127.0.0.1:8000/storage/${amenity.AmenityIcon}`}
                    alt={amenity.AmenityName}
                    className={styles.amenityIcon}
                  />
                  {amenity.AmenityName}
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có tiện nghi.</p>
          )}
        </div>
        <div className={styles.priceDetails}>
          <div className={styles.priceItem}>
            <span>Giá phòng</span>
            <span>{price.toLocaleString()} VND</span>
          </div>
          <div className={`${styles.priceItem} ${styles.total}`}>
            <span>Tổng cộng</span>
            <span>{price.toLocaleString()} VND</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
