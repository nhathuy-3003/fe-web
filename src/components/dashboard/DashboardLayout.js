// src/components/dashboard/DashboardLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarDashboard from './SidebarDashboard';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <SidebarDashboard />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
