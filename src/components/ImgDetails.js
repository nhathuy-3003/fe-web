import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import styles from './ImgDetail.module.css';
import { fetchHotelImages } from '../api'; // Import hàm API

const ImgDetails = ({ hotelId }) => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadHotelImages = async () => {
      try {
        const data = await fetchHotelImages(hotelId);
        setImages(data);
      } catch (error) {
        console.error("Failed to load hotel images:", error);
      }
    };

    loadHotelImages();
  }, [hotelId]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.mainContainer}>
      {images.length > 0 ? (
        <>
          {/* Main Image */}
          <div
            className={styles.rectangle}
            style={{ backgroundImage: `url(${images[0].url})` }}
          >
            <button className={styles.button} onClick={handleOpenModal}>
              <div className={styles.photograph}>
                <FontAwesomeIcon icon={faImage} className={styles.icon} />
              </div>
              <span className={styles.showAllPhotos}>Tất cả hình ảnh</span>
            </button>
          </div>

          {/* Additional Images */}
          <div className={styles.frame1}>
            {images.slice(1, 3).map((image) => (
              <div
                key={image.id}
                className={styles.rectangle2}
                style={{ backgroundImage: `url(${image.url})` }}
              />
            ))}
          </div>
          <div className={styles.frame4}>
            {images.slice(3, 5).map((image) => (
              <div
                key={image.id}
                className={styles.rectangle5}
                style={{ backgroundImage: `url(${image.url})` }}
              />
            ))}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <button className={styles.close} onClick={handleCloseModal}>
                  &times;
                </button>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>Hình Ảnh Khách Sạn</h2>
                  <p className={styles.imageCount}>
                    {`Hình ${currentIndex + 1} / ${images.length}`}
                  </p>
                </div>
                <div className={styles.modalContent}>
                  <div className={styles.carousel}>
                    <button
                      className={`${styles.arrow} ${styles.arrowLeft}`}
                      onClick={handlePrev}
                    >
                      &#8249;
                    </button>
                    <div
                      className={styles.carouselImages}
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {images.map((image) => (
                        <img
                          key={image.id}
                          src={image.url}
                          alt={image.description}
                          className={styles.carouselImage}
                        />
                      ))}
                    </div>
                    <button
                      className={`${styles.arrow} ${styles.arrowRight}`}
                      onClick={handleNext}
                    >
                      &#8250;
                    </button>
                  </div>
                  <p className={styles.imageDescription}>
                    {images[currentIndex]?.description || 'No description available'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No images available for this hotel.</p>
      )}
    </div>
  );
};

export default ImgDetails;
