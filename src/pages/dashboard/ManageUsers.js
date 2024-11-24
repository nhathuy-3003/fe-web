// src/pages/dashboard/ManageUsers.js
import React from 'react';

const ManageUsers = () => {
  return (
    <div>
      <h2>Manage Users</h2>
      {/* Table or user list */}
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
