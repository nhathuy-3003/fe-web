import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { fetchHotels } from '../api';
import styles from './HotelList.module.css';

const HotelList = ({ searchFilters }) => {
  const [hotels, setHotels] = useState([]); // State to store hotel list
  const [favorites, setFavorites] = useState(new Set()); // State for favorite hotels
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa chọn";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };
  
  // Destructure search filters
  const { city, district, checkIn, checkOut, adults, children } = searchFilters;

  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await fetchHotels(searchFilters);
        setHotels(response || []); // Cập nhật danh sách khách sạn
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };
  
    getHotels();
  }, [searchFilters]); // Tự động re-fetch khi searchFilters thay đổi
  

  // Toggle favorite status
  const toggleFavorite = (hotelId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(hotelId)) {
        newFavorites.delete(hotelId);
      } else {
        newFavorites.add(hotelId);
      }
      return newFavorites;
    });
  };

  return (
    <div className={styles.hotelListContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <h3>Địa điểm tìm kiếm</h3>
          <p>{city || 'Tỉnh/Thành phố chưa chọn'}</p>
          {district && <p>{district}</p>}
        </div>
        
        <div className={styles.sidebarSection}>
  <h3>Thông tin đặt phòng</h3>
  <p>Ngày nhận phòng: {formatDate(checkIn)}</p>
  <p>Ngày trả phòng: {formatDate(checkOut)}</p>
  <p>Số khách: {adults || 0} Người lớn, {children || 0} Trẻ em</p>
</div>


        <div className={styles.sidebarSection}>
          <h3>Khoảng giá</h3>
          <input type="range" min="0" max="24000000" />
          <div className={styles.priceRange}>
            <span>VND 0</span>
            <span>VND 24,000,000</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.khachSanList}>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className={styles.card}>
              <Link
  to={`/hotel/${hotel.id}`}
  state={{
    checkInDate: checkIn,
    checkOutDate: checkOut,
    adults,
    children,
  }}
  className={styles.cardLink}
>
                <img
                  src={hotel.ảnh && hotel.ảnh.length > 0 ? `http://127.0.0.1:8000/storage/${hotel.ảnh[0]["Url ảnh"]}` : 'default.jpg'}
                  alt={hotel["tên khách sạn"]}
                  className={styles.image}
                />
                <div className={styles.cardContent}>
                  <h2 className={styles.hotelName}>{hotel["tên khách sạn"]}</h2>
                  <p className={styles.location}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.locationIcon} />
                    {hotel["địa chỉ khách sạn"]}
                  </p>
                  <div className={styles.rating}>
                    <span>⭐ {hotel.rating || 4.9}</span>
                    <span>({hotel.reviews || '285'} đánh giá)</span>
                  </div>
                  <p className={styles.paymentOption}>Không thanh toán ngay</p>
                  <div className={styles.discountTag}>Nhập mã HOTELGIAM để giảm đến 300k!</div>
                </div>
              </Link>
              <button className={styles.selectRoomButton}>Chọn phòng</button>
              <FontAwesomeIcon
                icon={favorites.has(hotel.id) ? solidHeart : regularHeart}
                className={styles.heartIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(hotel.id);
                }}
              />
            </div>
          ))
        ) : (
          <p>Không tìm thấy khách sạn nào phù hợp với yêu cầu của bạn.</p>
        )}
      </div>
    </div>
  );
};

export default HotelList;
