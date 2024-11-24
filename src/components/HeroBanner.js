import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Hero.module.css';

const images = {
  banner: require('../assets/images/banner.png'),
  banner1: require('../assets/images/banner1.png'),
  banner2: require('../assets/images/banner2.png'),
};

export default function HeroBanner() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.frame}>
        <div className={styles.heroText}>
          <span className={styles.hotelTourExperiences}>
            Khách sạn, tour <br />& trải nghiệm
          </span>
          <span className={styles.dongHanhCungChungToi}>
            Đồng hành cùng chúng tôi, bạn sẽ có một chuyến đi đầy trải nghiệm.
            Với Ikizawa, đặt phòng nghỉ, biệt thự nghỉ dưỡng, khách sạn
          </span>
          <button className={styles.button}>
            <div className={styles.search}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
            <span className={styles.textTimKiemKhachSan}>Tìm Kiếm Khách Sạn</span>
          </button>
        </div>
        <div className={styles.group}>
          <div className={styles.flexColumnEa}>
            <div
              className={styles.rectangle}
              style={{ backgroundImage: `url(${images.banner})` }}
            />
            <div
              className={styles.rectangle1}
              style={{ backgroundImage: `url(${images.banner1})` }}
            />
          </div>
          <div
            className={styles.rectangle2}
            style={{ backgroundImage: `url(${images.banner2})` }}
          />
        </div>
      </div>
    </div>
  );
}
