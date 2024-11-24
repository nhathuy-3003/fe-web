// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import DiaDiem from '../components/DiaDiem';
import KhachSan from '../components/KhachSan';
import LoiIch from '../components/LoiIch';
import './Home.css';
import BannerHotel from '../components/BannerHotel';


const Home = () => {
  return (
    <div className="home-container">
      <Hero className="component-spacing" />
      <BannerHotel className="component-spacing"/>
      <DiaDiem className="component-spacing" />
      <KhachSan className="component-spacing" />
      <LoiIch className="component-spacing" />
    </div>
  );
};

export default Home;
