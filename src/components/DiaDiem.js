import React, { useState, useEffect, useCallback } from 'react';
import styles from './Diadiem.module.css'; // Import module CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const DiaDiem = () => {
  const cities = ['dalat', 'danang', 'nhatrang', 'vungtau', 'hue','halong','phuquoc','sapa','hoian']; // List of cities
  const itemsPerPage = 2; // Number of cards displayed per page
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const totalPages = Math.ceil(cities.length / itemsPerPage); // Total pages

  // Function to go to the next page
  const nextPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages); // Loop back to start
  }, [totalPages]);

  // Function to go to the previous page
  const prevPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages); // Loop back to end
  }, [totalPages]);

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextPage, 5000);
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [nextPage]);

  // Calculate the translation value for sliding effect
  const translateXValue = -(currentPage * (100 / totalPages));

  // Function to go to a specific page on bullet click
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Địa Điểm Nổi Bật</span>
        <br />
        <span className={styles.description}>
          Những địa điểm nổi tiếng mà Ikizawa giới thiệu cho bạn
        </span>
      </div>
      <div className={styles.cardContainer}>
        <div
          className={styles.cardsWrapper}
          style={{ transform: `translateX(${translateXValue}%)` }}
        >
          {cities.map((city, index) => (
            <div key={index} className={styles.card}>
              <img
                src={require(`../assets/images/${city}.jpg`)}
                alt={city}
                className={styles.image}
              />
              <div className={styles.cardContent}>
                <span className={styles.cityName}>
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </span>
                <span className={styles.propertyCount}>
                  188,288 properties
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.navigation}>
          <div className={styles.circleButtonContainer}>
            <div className={styles.circleButton}>
              <span className={styles.prevButton} onClick={prevPage}>
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </span>
            </div>
          </div>
          <div className={styles.circleButtonContainer}>
            <div className={styles.circleButton}>
              <span className={styles.nextButton} onClick={nextPage}>
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bullet indicators */}
      <div className={styles.bullets}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.bullet} ${
              currentPage === index ? styles.active : ''
            }`}
            onClick={() => goToPage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaDiem;
