import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import RoomInfoForm from '../../components/dashboard/RoomInfoForm';
import RoomImageUpload from '../../components/dashboard/RoomImageUpload';

const AddRoomPage = () => {
  const { hotelId } = useParams(); // Lấy hotelId từ URL
  const [roomId, setRoomId] = useState(null);

  // Nếu hotelId không có, chuyển hướng đến trang danh sách khách sạn hoặc hiển thị thông báo
  if (!hotelId) {
    return <Navigate to="/dashboard/overview" replace />;
    // Hoặc bạn có thể hiển thị thông báo lỗi:
    // return <p>Không tìm thấy khách sạn. Vui lòng chọn khách sạn từ danh sách.</p>;
  }

  return (
    <div>
      {!roomId ? (
        <RoomInfoForm hotelId={hotelId} onRoomCreated={setRoomId} />
      ) : (
        <RoomImageUpload roomId={roomId} />
      )}
    </div>
  );
};

export default AddRoomPage;
