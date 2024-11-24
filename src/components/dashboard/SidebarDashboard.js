import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendarAlt,
  faHotel,
  faUser,
  faCog,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import styles from './SidebarDashboard.module.css';
import logo from '../../assets/images/logo1.png';

const SidebarDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Nút toggle bên ngoài */}
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
          {!isCollapsed && <h2 className={styles.logoText}>Bảng Điều Khiển</h2>}
        </div>

        <nav className={styles.nav}>
          <NavLink to="/dashboard/overview" className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <FontAwesomeIcon icon={faHome} className={styles.icon} />
            {!isCollapsed && <span>Tổng Quan</span>}
          </NavLink>
          <NavLink to="/dashboard/bookings" className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
            {!isCollapsed && <span>Quản Lý Đặt Phòng</span>}
          </NavLink>
          <NavLink to="/dashboard/rooms" className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <FontAwesomeIcon icon={faHotel} className={styles.icon} />
            {!isCollapsed && <span>Quản Lý Phòng</span>}
          </NavLink>
          <NavLink to="/dashboard/users" className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            {!isCollapsed && <span>Quản Lý Người Dùng</span>}
          </NavLink>
          <NavLink to="/dashboard/settings" className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <FontAwesomeIcon icon={faCog} className={styles.icon} />
            {!isCollapsed && <span>Cài Đặt</span>}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default SidebarDashboard;
