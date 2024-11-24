import React from 'react';
import styles from './About.module.css'; // Import CSS module

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.description}>
        Welcome to our hotel! We are dedicated to providing you with an exceptional experience during your stay. Our commitment to quality and service is reflected in everything we do.
      </p>
      <div className={styles.missionContainer}>
        <h2 className={styles.subTitle}>Our Mission</h2>
        <p className={styles.description}>
          Our mission is to create memorable experiences for our guests through top-notch hospitality and unparalleled service. We believe in making every stay a unique and personalized experience.
        </p>
      </div>
      <div className={styles.historyContainer}>
        <h2 className={styles.subTitle}>Our History</h2>
        <p className={styles.description}>
          Founded in 2020, our hotel has quickly become a favorite destination for travelers. With a blend of modern amenities and classic charm, we strive to offer the best of both worlds.
        </p>
      </div>
      <div className={styles.teamContainer}>
        <h2 className={styles.subTitle}>Meet Our Team</h2>
        <p className={styles.description}>
          Our dedicated team is here to ensure your stay is as comfortable as possible. From our front desk staff to our housekeeping team, everyone is committed to making your experience exceptional.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
