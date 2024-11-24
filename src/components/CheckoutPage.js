import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CheckoutPage.module.css';

const CheckoutDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch booking info from the previous page (using default values if not passed)
  const {
    hotelName,
    roomName,
    roomImage,
    price = 0, // Fallback to 0 if price is undefined
    checkInDate,
    checkOutDate,
    adults = 1,
    children = 0,
    roomId,
    roomAmenities = [],
  } = location.state || {}; // Use fallback values in case location.state is undefined
  
  const orderDate = new Date().toLocaleDateString('vi-VN'); // Current date for the booking

  // Format check-in and check-out date
  const formattedCheckInDate = checkInDate
    ? new Date(checkInDate).toLocaleDateString('vi-VN')
    : 'Chưa chọn';
  const formattedCheckOutDate = checkOutDate
    ? new Date(checkOutDate).toLocaleDateString('vi-VN')
    : 'Chưa chọn';

  const handleExplore = () => {
    // Navigate back to homepage
    navigate('/');
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.header}>
        <span className={styles.congratulationsText}>Chúc mừng 🎉</span>
      </div>
      <div className={styles.separator} />

      <div className={styles.bookingInfo}>
        <span className={styles.bookingTitle}>Thông Tin Đặt Phòng</span>

        <div className={styles.hotelCard}>
          <div className={styles.hotelImage}>
            <img
              src={roomImage || 'default-room.jpg'}
              alt={roomName}
              className={styles.hotelImage}
            />
          </div>
          <div className={styles.hotelDetails}>
            <div className={styles.hotelDescription}>
              <span className={styles.hotelName}>{hotelName}</span>
              <div className={styles.hotelGroup}>
                <span className={styles.roomName}>Phòng: {roomName}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dateGuestInfo}>
          <div className={styles.calendarInfo}>
            <div className={`fa fa-calendar ${styles.calendarIcon}`} />
            <div className={styles.dateInfo}>
              <span className={styles.dateLabel}>Ngày nhận - trả phòng</span>
              <br />
              <span className={styles.dateRange}>
                {formattedCheckInDate} - {formattedCheckOutDate}
              </span>
            </div>
          </div>
          <div className={styles.guestInfo}>
            <div className={`fa fa-user ${styles.guestIcon}`} />
            <div className={styles.guestDetails}>
              <span className={styles.guestsLabel}>Số khách</span>
              <br />
              <span className={styles.guestCount}>
                {`${adults} Người lớn, ${children} Trẻ em`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bookingSummary}>
        <span className={styles.summaryTitle}>Chi Tiết Đặt Phòng</span>

        <div className={styles.bookingCodeContainer}>
          <span className={styles.bookingCodeLabel}>Mã Đặt Phòng</span>
          <span className={styles.bookingCode}>#{roomId}</span>
        </div>

        <div className={styles.customerInfoContainer}>
        </div>

        <div className={styles.bookingDateContainer}>
          <span className={styles.dateLabel}>Ngày Đặt</span>
          <span className={styles.bookingDate}>{orderDate}</span>
        </div>

        <div className={styles.totalAmountContainer}>
          <span className={styles.totalLabel}>Tổng Cộng</span>
          <span className={styles.totalAmount}>
            {price ? price.toLocaleString() : 'N/A'} VND
          </span>
        </div>

        <div className={styles.paymentMethodContainer}>
          <span className={styles.paymentMethodLabel}>Phương Thức Thanh Toán</span>
          <span className={styles.paymentMethodValue}>Momo</span>
        </div>

        {/* Hide Hotel ID */}
        {/* <div className={styles.bookingInfoContainer}>
          <span className={styles.bookingInfoLabel}>ID Khách Sạn</span>
          <span className={styles.bookingInfo}>{hotelId}</span>
        </div> */}

        {/* Displaying Room Amenities */}
        <div className={styles.roomAmenitiesContainer}>
          <span className={styles.roomAmenitiesLabel}>Tiện Nghi Phòng</span>
          <ul className={styles.amenitiesList}>
            {roomAmenities.length > 0 ? (
              roomAmenities.map((amenity, index) => (
                <li key={index} className={styles.amenityItem}>
                  {amenity.AmenityIcon && (
                    <img
                      src={`http://127.0.0.1:8000/storage/${amenity.AmenityIcon}`}  // Assuming it's a URL
                      alt={amenity.AmenityName}
                      className={styles.amenityIcon}
                    />
                  )}
                  {amenity.AmenityName}
                </li>
              ))
            ) : (
              <p>Không có tiện nghi</p>
            )}
          </ul>
        </div>
      </div>

      <button className={styles.paymentButton} onClick={handleExplore}>
        <span className={styles.buttonText}>Khám Phá</span>
      </button>
    </div>
  );
};

export default CheckoutDetail;
