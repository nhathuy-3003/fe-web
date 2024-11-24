// src/components/Banner.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';  // Added Autoplay
import styles from './BannerHotel.module.css';

const images = [
  {
    title: "Hình ảnh 1",
    description: "Mô tả cho hình ảnh 1.",
    imageUrl: require('../assets/images/hue.jpg')
  },
  {
    title: "Hình ảnh 2",
    description: "Mô tả cho hình ảnh 2.",
    imageUrl: require('../assets/images/hue.jpg')
  },
  {
    title: "Hình ảnh 3",
    description: "Mô tả cho hình ảnh 3.",
    imageUrl: require('../assets/images/hue.jpg')
  },
  {
    title: "Hình ảnh 4",
    description: "Mô tả cho hình ảnh 4.",
    imageUrl: require('../assets/images/hue.jpg')
  },
  {
    title: "Hình ảnh 5",
    description: "Mô tả cho hình ảnh 5.",
    imageUrl: require('../assets/images/hue.jpg')
  },
  {
    title: "Hình ảnh 6",
    description: "Mô tả cho hình ảnh 6.",
    imageUrl: require('../assets/images/hue.jpg')
  },
];

const BannerHotel = () => {
  return (
    <section className={styles.banner}>
      <Swiper
        modules={[Pagination, Autoplay]}  // Added Autoplay module
        spaceBetween={20}
        slidesPerView={4}
        pagination={{ clickable: true, el: `.${styles.pagination}` }}
        loop
        autoplay={{ delay: 10000 }}  // Slide changes every 10 seconds (10000ms)
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.card}>
            <div className={styles.box}>
              <img src={image.imageUrl} alt={image.title} className={styles.image} />
              <h3 className={styles.title}>{image.title}</h3>
              <p className={styles.description}>{image.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.pagination}></div>  {/* Pagination container */}
    </section>
  );
};

export default BannerHotel;
