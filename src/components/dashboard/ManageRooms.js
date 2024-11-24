import React, { useState, useEffect } from 'react';
import {
  fetchHotels,
  fetchRoomsByHotelId,
  deleteRoomById,
  updateRoomById,
  fetchAmenities,
  fetchRoomImagesAmbule,
  deleteRoomImage,
  uploadRoomImages,
  updateRoomImageDescription,
  deleteHotelById
  
 
} from '../../api';
import { useNavigate } from 'react-router-dom'; // For navigation
import styles from './ManageRooms.module.css';
import { confirmAlert } from 'react-confirm-alert'; // For confirmation dialogs
import 'react-confirm-alert/src/react-confirm-alert.css'; // Styles for confirmation dialogs
const ManageRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [allAmenities, setAllAmenities] = useState([]);
  const [roomImages, setRoomImages] = useState([]);

   // State for hotel editing
  const navigate = useNavigate(); // For navigating to add hotel or add room pages
  // Fetch all hotels, rooms, and amenities
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hotelData = await fetchHotels();
        setHotels(hotelData);

        const roomsData = {};
        for (const hotel of hotelData) {
          const hotelRooms = await fetchRoomsByHotelId(hotel.id);
          roomsData[hotel.id] = hotelRooms || [];
        }
        setRooms(roomsData);

        const amenitiesData = await fetchAmenities();
        setAllAmenities(amenitiesData);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

   
  
  
   // Thêm hàm này vào ManageRooms.js
const handleEditHotelClick = (hotelId) => {
  navigate(`/dashboard/edit-hotel/${hotelId}`);
};


  // Open edit modal for a specific room
  const handleEditRoomClick = async (room) => {
    try {
      setEditingRoom({ ...room, selectedAmenities: room.amenities?.map((a) => a.AmenityId) || [] });
      const images = await fetchRoomImagesAmbule(room.RoomId);
      setRoomImages(images);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu phòng:', error);
    }
  };

  // Close edit modal
  const handleCloseModal = () => {
    setEditingRoom(null);
    setRoomImages([]);
  };

  // Save room details, amenities, and image descriptions
  const handleSaveRoom = async () => {
    try {
      const updatedRoom = {
        ...editingRoom,
        amenities: editingRoom.selectedAmenities,
      };

      await updateRoomById(editingRoom.RoomId, updatedRoom); // Save room details

      await handleImageUpload(); // Call the upload function for new images

      alert('Cập nhật phòng thành công!');
      handleCloseModal();

      const updatedRooms = await fetchRoomsByHotelId(editingRoom.HotelId);
      setRooms((prevRooms) => ({ ...prevRooms, [editingRoom.HotelId]: updatedRooms }));
    } catch (error) {
      console.error('Lỗi khi lưu phòng:', error);
      alert(`Cập nhật phòng thất bại! Lỗi: ${error.response?.data?.message || error.message}`);
    }
  };

  // Delete a room image
  const handleDeleteImage = async (imageId) => {
    try {
      await deleteRoomImage(imageId);
      setRoomImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
      alert('Xóa ảnh thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa ảnh:', error);
    }
  };

  // Delete a room
  const handleDeleteRoomClick = async (roomId, hotelId) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa phòng này không?',
      buttons: [
        {
          label: 'Có',
          onClick: async () => {
            try {
              await deleteRoomById(roomId); // Gọi API để xóa phòng
              alert('Xóa phòng thành công!');
              // Cập nhật danh sách phòng sau khi xóa thành công
              const updatedRooms = await fetchRoomsByHotelId(hotelId);
              setRooms((prevRooms) => ({ ...prevRooms, [hotelId]: updatedRooms }));
            } catch (error) {
              console.error('Lỗi khi xóa phòng:', error);
              alert('Xóa phòng thất bại!');
            }
          },
        },
        {
          label: 'Không',
          onClick: () => {
            console.log('Hủy xóa phòng');
          },
        },
      ],
    });
  };

  const handleDeleteHotelClick = (hotelId) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa khách sạn này không? Tất cả các phòng sẽ bị xóa.',
      buttons: [
        {
          label: 'Có',
          onClick: async () => {
            try {
              await deleteHotelById(hotelId);
              alert('Xóa khách sạn thành công!');
              setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== hotelId));
              setRooms((prevRooms) => {
                const updatedRooms = { ...prevRooms };
                delete updatedRooms[hotelId];
                return updatedRooms;
              });
            } catch (error) {
              console.error('Lỗi khi xóa khách sạn:', error);
              alert('Xóa khách sạn thất bại!');
            }
          },
        },
        { label: 'Không' },
      ],
    });
  };
  // Upload new images with descriptions
  const handleImageUpload = async () => {
    const formData = new FormData();

    const newImages = roomImages.filter((image) => image.file);

    if (newImages.length === 0) {
      alert('Không có ảnh mới để tải lên!');
      return;
    }

    newImages.forEach((image) => {
      formData.append('RoomImageUrl[]', image.file); // Add image file
      formData.append('RoomImageDescription[]', image.description || ''); // Add description
    });

    formData.append('RoomId', editingRoom.RoomId); // Add room ID

    try {
      const uploadedImages = await uploadRoomImages(formData);

      if (Array.isArray(uploadedImages)) {
        setRoomImages((prevImages) => [
          ...prevImages.filter((img) => !img.file), // Keep existing images
          ...uploadedImages.map((img, index) => ({
            ...img,
            description: newImages[index]?.description || '',
          })),
        ]);
        alert('Tải ảnh thành công!');
      } else {
        console.error('Định dạng phản hồi không mong đợi:', uploadedImages);
        alert('Tải ảnh thất bại. Vui lòng kiểm tra API.');
      }
    } catch (error) {
      console.error('Lỗi khi tải ảnh:', error);
      alert('Tải ảnh thất bại!');
    }
  };

  const handleUpdateImageDescription = async (image) => {
    try {
      if (!image.id) {
        console.warn('Thiếu ID ảnh, không thể cập nhật mô tả.');
        return;
      }

      await updateRoomImageDescription(image.id, {
        RoomImageDescription: image.description,
      });

      alert('Cập nhật mô tả thành công!');

      setRoomImages((prevImages) =>
        prevImages.map((img) =>
          img.id === image.id ? { ...img, description: image.description } : img
        )
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật mô tả ảnh:', error);
      alert('Cập nhật mô tả thất bại.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Quản lý Phòng & Khách sạn</h1>

      <div className={styles.actions}>
        
        <button
          className={styles.addHotelButton}
          onClick={() => navigate('/dashboard/add-hotel')}
        >
          Thêm Khách Sạn
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel.id} className={styles.hotelSection}>
            <h2>{hotel['tên khách sạn']}</h2>
            <p>Địa chỉ: {hotel['địa chỉ khách sạn']}</p>
            <button
  className={styles.editButton}
  onClick={() => handleEditHotelClick(hotel.id)}
>
  Sửa
</button>
<button
  className={styles.addRoomButton}
  onClick={() => navigate(`/dashboard/add-room/${hotel.id}`)}
>
  Thêm Phòng
</button>
<button
  className={styles.deleteButtonH}
  onClick={() => handleDeleteHotelClick(hotel.id)}
>
  Xóa Khách Sạn
</button>




            {rooms[hotel.id]?.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tên Phòng</th>
                    <th>Giá</th>
                    <th>Loại Phòng</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms[hotel.id].map((room) => (
                    <tr key={room.RoomId}>
                      <td>{room.RoomName}</td>
                      <td>{parseFloat(room.Price).toLocaleString()} VND</td>
                      <td>{room.RoomType}</td>
                      <td>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEditRoomClick(room)}
                        >
                          Sửa
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteRoomClick(room.RoomId, hotel.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có phòng trong khách sạn này.</p>
            )}
          </div>
        ))
      )}


 
      {editingRoom && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ✕
            </button>
            <h2>Sửa Phòng</h2>

            <div className={styles.field}>
              <label>Tên Phòng:</label>
              <input
                type="text"
                value={editingRoom.RoomName}
                onChange={(e) => setEditingRoom({ ...editingRoom, RoomName: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label>Giá:</label>
              <input
                type="number"
                value={editingRoom.Price}
                onChange={(e) => setEditingRoom({ ...editingRoom, Price: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label>Loại Phòng:</label>
              <input
                type="text"
                value={editingRoom.RoomType}
                onChange={(e) => setEditingRoom({ ...editingRoom, RoomType: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label>Tiện Nghi:</label>
              <div className={styles.amenities}>
                {allAmenities.map((amenity) => (
                  <label key={amenity.AmenityId}>
                    <input
                      type="checkbox"
                      checked={editingRoom.selectedAmenities.includes(amenity.AmenityId)}
                      onChange={() => {
                        const isSelected = editingRoom.selectedAmenities.includes(
                          amenity.AmenityId
                        );
                        const updatedAmenities = isSelected
                          ? editingRoom.selectedAmenities.filter((id) => id !== amenity.AmenityId)
                          : [...editingRoom.selectedAmenities, amenity.AmenityId];
                        setEditingRoom({ ...editingRoom, selectedAmenities: updatedAmenities });
                      }}
                    />
                    {amenity.AmenityName}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Ảnh Hiện Tại:</label>
              <div className={styles.imageGrid}>
                {roomImages.map((image, index) => (
                  <div key={image.id || `new-${index}`} className={styles.imageItem}>
                    <img
                      src={image.url || URL.createObjectURL(image.file)}
                      alt={image.description || 'Room Image'}
                    />
                    <input
                      type="text"
                      placeholder="Mô tả ảnh"
                      value={image.description ?? ''}
                      onChange={(e) => {
                        const newDescription = e.target.value;
                        setRoomImages((prevImages) =>
                          prevImages.map((img) =>
                            img.id === image.id ? { ...img, description: newDescription } : img
                          )
                        );
                      }}
                    />
                    {image.id && (
                      <button onClick={() => handleUpdateImageDescription(image)}>
                        Cập Nhật Mô Tả
                      </button>
                    )}
                    <button onClick={() => handleDeleteImage(image.id)}>Xóa</button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Thêm Ảnh Mới:</label>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  const newImages = Array.from(files).map((file) => ({
                    file,
                    description: '',
                  }));
                  setRoomImages((prevImages) => [...prevImages, ...newImages]);
                }}
              />
            </div>

            <div className={styles.actions}>
              <button onClick={handleSaveRoom}>Lưu</button>
              <button onClick={handleCloseModal}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
