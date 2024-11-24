import React, { useState, useEffect } from 'react';
import { createRoom, fetchAmenities, fetchHotels } from '../../api'; // fetchHotels to get the list of hotels
import styles from './RoomInfoForm.module.css';

const RoomInfoForm = ({ hotelId, onRoomCreated }) => {
  const [formValues, setFormValues] = useState({
    hotelId: hotelId || '', // Use hotelId from props if available
    roomName: '',
    roomType: '',
    roomStatus: '',
    maxCustomer: 1,
    price: '',
    description: '',
    amenities: [],
  });

  const [hotels, setHotels] = useState([]); // List of hotels
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Declare the state variable for selectedHotelName
  const [selectedHotelName, setSelectedHotelName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const amenityData = await fetchAmenities();
        setAmenities(amenityData);

        const hotelData = await fetchHotels();
        setHotels(hotelData);

        // If hotelId is provided, find and save the hotel name
        if (hotelId) {
          const selectedHotel = hotelData.find(
            (hotel) => hotel.id.toString() === hotelId.toString()
          );
          if (selectedHotel) {
            setSelectedHotelName(selectedHotel['tên khách sạn']);
          } else {
            console.warn(`Không tìm thấy khách sạn với ID: ${hotelId}`);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [hotelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAmenityChange = (amenityId) => {
    setFormValues((prevState) => {
      const updatedAmenities = prevState.amenities.includes(amenityId)
        ? prevState.amenities.filter((id) => id !== amenityId)
        : [...prevState.amenities, amenityId];
      return { ...prevState, amenities: updatedAmenities };
    });
  };

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      hotelId: hotelId || '',
    }));
  }, [hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.hotelId && !hotelId) {
      alert('Vui lòng chọn khách sạn.');
      return;
    }

    setLoading(true);

    try {
      const roomData = {
        HotelId: hotelId || formValues.hotelId,
        RoomName: formValues.roomName,
        RoomType: formValues.roomType,
        RoomStatus: formValues.roomStatus,
        MaxCustomer: formValues.maxCustomer,
        Price: formValues.price,
        Description: formValues.description,
        amenities: formValues.amenities,
      };

      const response = await createRoom(roomData);
      alert('Phòng được tạo thành công!');
      onRoomCreated(response.data.RoomId);
    } catch (error) {
      if (error.response) {
        console.error('Lỗi từ server:', error.response.data);
        alert('Lỗi: ' + (error.response.data.message || 'Không xác định'));
      } else {
        console.error('Lỗi không xác định:', error.message);
        alert('Lỗi không xác định');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {hotelId ? (
        <div className={styles.formGroup}>
          <label>Khách Sạn:</label>
          <p>{selectedHotelName}</p>
        </div>
      ) : (
        <div className={styles.formGroup}>
          <label>Chọn Khách Sạn</label>
          <select
            name="hotelId"
            value={formValues.hotelId}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Chọn khách sạn --</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel['tên khách sạn']}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.formGroup}>
        <label>Tên Phòng</label>
        <input
          type="text"
          name="roomName"
          value={formValues.roomName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Kiểu Phòng</label>
        <input
          type="text"
          name="roomType"
          value={formValues.roomType}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Trạng Thái</label>
        <input
          type="text"
          name="roomStatus"
          value={formValues.roomStatus}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Số Khách Tối Đa</label>
        <input
          type="number"
          name="maxCustomer"
          value={formValues.maxCustomer}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Giá</label>
        <input
          type="number"
          name="price"
          value={formValues.price}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Mô Tả</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      <div className={styles.formGroup}>
        <label>Tiện Nghi</label>
        <div>
          {amenities.map((amenity) => (
            <div key={amenity.AmenityId}>
              <input
                type="checkbox"
                id={`amenity-${amenity.AmenityId}`}
                checked={formValues.amenities.includes(amenity.AmenityId)}
                onChange={() => handleAmenityChange(amenity.AmenityId)}
              />
              <label htmlFor={`amenity-${amenity.AmenityId}`}>
                {amenity.AmenityName}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Tạo Phòng'}
      </button>
    </form>
  );
};

export default RoomInfoForm;
