import React from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import HotelList from '../components/HotelList';
import LoiIch from '../components/LoiIch';

const Hotels = () => {
  const location = useLocation();
  const searchState = location.state || {};

  // Chuyển city và district từ tên sang ID
  const searchFilters = {
    ...searchState,
    city: searchState.city?.value || searchState.city, // Ưu tiên ID
    district: searchState.district?.value || searchState.district, // Ưu tiên ID
  };

  console.log("Processed searchFilters for HotelList:", searchFilters);

  return (
    <div className="home-container">
      <Hero initialFilters={searchFilters} className="component-spacing" />
      <HotelList searchFilters={searchFilters} className="component-spacing" />
      <LoiIch className="component-spacing" />
    </div>
  );
};



export default Hotels;
