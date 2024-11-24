// src/pages/dashboard/ManageAdmins.js
import React from 'react';

const ManageAdmins = () => {
  return (
    <div>
      <h2>Manage Admins</h2>
      {/* Table or admin list */}
      <table>
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Admin Name</td>
            <td>admin@example.com</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdmins;
