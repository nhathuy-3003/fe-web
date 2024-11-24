import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DiaDiem from '../components/DiaDiem';
import KhachSan from '../components/KhachSan';
import ImgDetails from '../components/ImgDetails';
import DesDetails from '../components/DesDetail';
import './ChiTiet.css';

const ChiTietKhachSan = () => {
  const { id: hotelId } = useParams(); // Lấy hotelId từ URL
  const location = useLocation();
  const { checkInDate, checkOutDate, adults, children } = location.state || {};

  return (
    <div>
      {/* Truyền hotelId vào ImgDetails */}
      <ImgDetails hotelId={hotelId} />
      {/* Truyền thông tin state xuống DesDetails */}
      <DesDetails
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        adults={adults}
        children={children}
      />
      <DiaDiem className="component-spacing" />
      <KhachSan className="component-spacing" />
    </div>
  );
};

export default ChiTietKhachSan;
