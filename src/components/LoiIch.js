import React from 'react';
import styles from './LoiIch.module.css';

const LoiIch = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lợi Ích Khi Đặt Vé</h2>
      <p className={styles.subtitle}>Những lợi ích mà bạn nhận được khi đặt vé với chúng tôi:</p>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <img src={`${process.env.PUBLIC_URL}/img/travle.png`} alt="Đặt vé" className={styles.cardImage} />
          <p className={styles.cardText}>Đặt vé</p>
          <p className={styles.cardDescription}>Tiết kiệm thời gian và dễ dàng đặt phòng nhanh chóng chỉ với vài bước đơn giản.</p>
        </div>
        <div className={styles.card}>
          <img src={`${process.env.PUBLIC_URL}/img/travle2.png`} alt="Danh sách cần chuẩn bị" className={styles.cardImage} />
          <p className={styles.cardText}>Danh sách cần chuẩn bị</p>
          <p className={styles.cardDescription}>Luôn chuẩn bị sẵn sàng với những thứ cần thiết cho chuyến đi của bạn.</p>
        </div>
        <div className={styles.card}>
          <img src={`${process.env.PUBLIC_URL}/img/travle3.png`} alt="Chia sẻ ảnh" className={styles.cardImage} />
          <p className={styles.cardText}>Chia sẻ ảnh</p>
          <p className={styles.cardDescription}>Lưu giữ và chia sẻ khoảnh khắc đáng nhớ với bạn bè và gia đình.</p>
        </div>
      </div>
    </div>
  );
};

export default LoiIch;
