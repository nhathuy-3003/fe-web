// src/pages/dashboard/AddRoom.js
import React, { useState } from 'react';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    price: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div>
      <h2>Add New Room</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <textarea name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange}></textarea>
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
        <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
