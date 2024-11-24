import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from './DashboardOverview.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', role: '' });
  const [loading, setLoading] = useState(true);

  // Token Validation and User Information Fetching
  useEffect(() => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error("Token không hợp lệ hoặc chưa được lưu.");
      navigate('/dashboard-login');  // Điều hướng về trang login nếu không có token
      return;
    }
  
    // Gửi token đến API để xác thực và lấy thông tin người dùng
    fetch('http://127.0.0.1:8000/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log dữ liệu trả về từ API để kiểm tra
      if (data.data && data.data.length > 0) {
        setUser({
          name: data.data[0].FullName,  // Lấy tên người dùng từ dữ liệu trả về
          role: data.data[0].Role,      // Lấy vai trò người dùng từ dữ liệu trả về
        });
      } else {
        console.error("Không tìm thấy người dùng trong dữ liệu trả về");
        navigate('/dashboard-login');  // Nếu không có dữ liệu người dùng thì chuyển hướng về login
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
      setLoading(false);
      navigate('/dashboard-login');  // Chuyển hướng về login nếu xảy ra lỗi
    });
  }, [navigate]);
  

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  // Sample Data for Charts
  const barData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh Thu (USD)',
        data: [1200, 1900, 3000, 5000, 2300, 3400],
        backgroundColor: '#1abc9c',
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        enabled: true,
        backgroundColor: '#34495e',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 6000,
        ticks: { stepSize: 1000 },
      },
    },
  };

  const pieData = {
    labels: ['Đã Thanh Toán', 'Chờ Thanh Toán', 'Đã Trả Phòng'],
    datasets: [
      {
        data: [45, 25, 30],
        backgroundColor: ['#3498db', '#e74c3c', '#f39c12'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tổng Quan Bảng Điều Khiển</h1>
        <button className={styles.homeButton} onClick={() => navigate('/')}>Trang Chủ</button>
      </div>

      {/* Hiển thị thông tin người dùng */}
      <p>Xin chào, {user.name}! Vai trò của bạn là: {user.role}. Đây là các thống kê về hoạt động gần đây.</p>

      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <h3>Phòng Đang Đặt</h3>
          <p>20</p>
        </div>
        <div className={styles.card}>
          <h3>Phòng Đã Thanh Toán</h3>
          <p>15</p>
        </div>
        <div className={styles.card}>
          <h3>Tổng Doanh Thu Tháng</h3>
          <p>$10,500</p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.chartContainer}>
          <h3>Doanh Thu Hàng Tháng</h3>
          <div style={{ height: '350px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
        <div className={styles.chartContainer}>
          <h3>Trạng Thái Đặt Phòng</h3>
          <div style={{ height: '350px', width: '350px' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h3>Chi Tiết Đặt Phòng Gần Đây</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Khách Hàng</th>
              <th>Ngày Đặt</th>
              <th>Trạng Thái</th>
              <th>Số Tiền (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#001</td>
              <td>John Doe</td>
              <td>2024-12-01</td>
              <td>Đã Thanh Toán</td>
              <td>$300</td>
            </tr>
            <tr>
              <td>#002</td>
              <td>Jane Smith</td>
              <td>2024-12-02</td>
              <td>Chờ Thanh Toán</td>
              <td>$450</td>
            </tr>
            <tr>
              <td>#003</td>
              <td>David Brown</td>
              <td>2024-12-05</td>
              <td>Đã Trả Phòng</td>
              <td>$200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOverview;
