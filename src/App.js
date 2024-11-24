// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import ChiTietKhachSan from './pages/ChiTiet';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/Register';
import ForgotPassword from './components/Forgot-ps';
import PaymentPage from './components/PaymentPage';
import CheckoutDetail from './components/CheckoutPage';
import Blog from './pages/Blog';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardLogin from './components/dashboard/DashboardLogin';
import useScrollToTop from './hooks/useScrollToTop';
// Import each dashboard page component
import DashboardOverview from './components/dashboard/DashboardOverview';
import ManageBookings from './components/dashboard/ManageBookings';
import ManageRooms from './components/dashboard/ManageRooms';
import ManageUsers from './components/dashboard/ManageUsers';
import Settings from './components/dashboard/Settings';

import Profile from './components/Profile';
import SearchBox from './components/SearchBox';

import AddHotelPage from './pages/dashboard/AddHotelPage';
import AddRoomPage from './pages/dashboard/AddRoomPage';
import EditHotel from './components/dashboard/EditHotel';



const App = () => { 
  useScrollToTop();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="app-container">
      {!isDashboardRoute && <Header />}
      <Routes>
        {/* Main application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/hotels" element={<Hotels />} />
        
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkoutpage" element={<CheckoutDetail />} />
        <Route path="/paymentpage" element={<PaymentPage />} />
        <Route path="/hotel/:id" element={<ChiTietKhachSan />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchBox />} />
      
       

        {/* Route for Dashboard Login */}
        <Route path="/dashboard-login" element={<DashboardLogin/>} />

        {/* Dashboard routes with nested routing */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="rooms" element={<ManageRooms />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-hotel" element={<AddHotelPage />} />
          <Route path="add-room/:hotelId" element={<AddRoomPage />} />
          <Route path="edit-hotel/:hotelId" element={<EditHotel />} />

        
        </Route>
      </Routes>
      {!isDashboardRoute && <Footer />}
      </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
