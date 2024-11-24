// src/pages/dashboard/Bookings.js
import React from 'react';

const Bookings = () => {
  return (
    <div>
      <h2>Bookings Management</h2>
      {/* Implement table or list of bookings here */}
      {/* Example row: */}
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User</th>
            <th>Room</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>John Doe</td>
            <td>Room 101</td>
            <td>01/01/2024</td>
            <td>Confirmed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
