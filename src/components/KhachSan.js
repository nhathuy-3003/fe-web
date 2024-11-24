import React, { useState, useEffect } from 'react';
import styles from './KhachSan.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { fetchHotels } from '../api';

const KhachSan = () => {
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await fetchHotels();
        setHotels(response || []);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    getHotels();
  }, []);

  const toggleFavorite = (hotelId) => {
    setFavorites(prevFavorites => {
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
    <div className={styles.khachSanContainer}>
      <div className={styles.header}>
        <span className={styles.title}>Những Khách Sạn Nổi Bật</span>
        <span className={styles.desc}>Những khách sạn nổi tiếng mà Ikizawa giới thiệu cho bạn</span>
      </div>
      <div className={styles.khachSanList}>
        {hotels.map((hotel) => (
          <div key={hotel.id} className={styles.card}>
            <Link to={`/hotel/${hotel.id}`} className={styles.cardLink}>
              <div className={styles.discount}>{hotel.discount || '10%'} today</div>
              {/* Hiển thị hình ảnh đầu tiên nếu có */}
              {hotel.ảnh && hotel.ảnh.length > 0 ? (
                <img src={`http://127.0.0.1:8000/storage/${hotel.ảnh[0]["Url ảnh"]}`} alt={hotel["tên khách sạn"]} className={styles.image} />
              ) : (
                <div className={styles.imagePlaceholder}>No Image</div>
              )}
              <p className={styles.beds}>Entire cabin · {hotel.beds || 3} beds</p>
              <h2 className={styles.hotelName}>{hotel["tên khách sạn"]}</h2>
              <p className={styles.location}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.locationIcon} />
                {hotel["địa chỉ khách sạn"]}
              </p>
              <div className={styles.priceRatingContainer}>
                <p className={styles.price}>${hotel.price || 311} /night</p>
                <div className={styles.rating}>
                  <span>⭐ {hotel.rating || 4.9}</span>
                  <span>({Math.floor((hotel.rating || 4.9) * 25)})</span>
                </div>
              </div>
            </Link>
            <FontAwesomeIcon 
              icon={favorites.has(hotel.id) ? solidHeart : regularHeart} 
              className={styles.heartIcon} 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(hotel.id);
              }} 
            />
          </div>
        ))}
      </div>
      <button className={styles.showMoreButton}>Show me more</button>
    </div>
  );
};

export default KhachSan;
