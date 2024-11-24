import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faStar,
  faHeart,
  faShareAlt,
  faCalendarAlt,
  faUser,
  faLocationDot
  
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DesDetails.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchHotelDetails, fetchRoomsByHotelId } from '../api';
import vi from 'date-fns/locale/vi';
import { fetchRoomImages } from '../api'; // Đảm bảo import API lấy ảnh phòng
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';



const DesDetails = ({ checkInDate, checkOutDate, adults, children }) => {
  const [startDate, setStartDate] = useState(null); // Quản lý ngày nhận phòng
  const [endDate, setEndDate] = useState(null); // Quản lý ngày trả phòng
  
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [roomAmenities, setRoomAmenities] = useState({}); // Tiện nghi từng phòng
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);

  const [hotelDetails, setHotelDetails] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const [isRoomDetailModalOpen, setIsRoomDetailModalOpen] = useState(false);
  const [currentRoomDetail, setCurrentRoomDetail] = useState(null);

  const { id: hotelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkInDate) setStartDate(new Date(checkInDate)); // Gán ngày nhận phòng
    if (checkOutDate) setEndDate(new Date(checkOutDate)); // Gán ngày trả phòng
    if (adults) setAdultCount(adults); // Gán số người lớn
    if (children) setChildCount(children); // Gán số trẻ em
  }, [checkInDate, checkOutDate, adults, children]);
  
  useEffect(() => {
    const getHotelDetails = async () => {
      try {
        const data = await fetchHotelDetails(hotelId);
        setHotelDetails(data);
        setHotelAmenities(data.amenities || []); // Lấy tiện nghi khách sạn
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };
    getHotelDetails();
  }, [hotelId]);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const roomsData = await fetchRoomsByHotelId(hotelId);
        setRooms(roomsData);
        if (roomsData.length > 0) {
          setSelectedRoom(roomsData[0]);
          const amenitiesMap = {};
          for (const room of roomsData) {
            amenitiesMap[room.RoomId] = room.amenities || [];
          }
          setRoomAmenities(amenitiesMap); // Gán tiện nghi từng phòng
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };
    getRooms();
  }, [hotelId]);
  const renderAmenities = (amenities) => {
    return amenities.map((amenity, index) => (
      <div key={index} className={styles.amenity}>
        <img
          src={`http://127.0.0.1:8000/storage/${amenity.AmenityIcon}`}
          alt={amenity.AmenityName}
          className={styles.amenityIcon}
        />
        <span>{amenity.AmenityName}</span>
      </div>
    ));
  };
  
  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !selectedRoom) return 0; // Kiểm tra nếu chưa chọn đủ dữ liệu
    const diffTime = Math.abs(endDate - startDate); // Tính số milliseconds giữa hai ngày
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Tính số đêm
    return nights * parseFloat(selectedRoom["Price"]); // Giá tổng = số đêm * giá phòng
  };
  


  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleViewDetails = async (room) => {
    try {
      const roomId = room.RoomId || room.id;
      if (!roomId) {
        console.error('Room ID is undefined for room:', room);
        return;
      }
      const images = await fetchRoomImages(roomId);
      setCurrentRoomDetail({ ...room, images });
      setIsRoomDetailModalOpen(true);
    } catch (error) {
      console.error('Failed to load room images:', error);
    }
  };
  
  
  const handleBooking = () => {
    const diffTime = Math.abs(endDate - startDate); // Tính số milliseconds giữa hai ngày
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Tính số đêm
  
    const bookingData = {
      hotelName: hotelDetails["tên khách sạn"],
      roomName: selectedRoom["RoomName"],
      roomImage: selectedRoom.images?.[0]?.RoomImageUrl
        ? `http://127.0.0.1:8000/storage/${selectedRoom.images[0].RoomImageUrl}`
        : "default-room.jpg", // Hình ảnh của phòng
      price: nights * parseFloat(selectedRoom["Price"]), // Tổng tiền
      checkInDate: startDate,
      checkOutDate: endDate,
      adults: adultCount,
      children: childCount,
      roomId: selectedRoom.RoomId, // Thêm RoomId
      hotelId: hotelId, // ID khách sạn
      roomAmenities: roomAmenities[selectedRoom.RoomId] || [], // Thêm tiện nghi phòng
    };
  
    navigate("/paymentpage", { state: bookingData });
  };
  

  if (!hotelDetails) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.mainContent}>
        {/* Thông tin khách sạn */}
        <div className={styles.box}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h1>{hotelDetails['tên khách sạn']}</h1>
              <div className={styles.ratingLocation}>
                <span className={styles.dot}><FontAwesomeIcon icon={faLocationDot} /></span>
                <span>{hotelDetails['địa chỉ khách sạn']}</span>
              </div>
              {/* <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
                <span>4.9 (122 đánh giá)</span> */}
            </div>
            <div className={styles.headerRight}>
              <button className={styles.actionButton}>
                <FontAwesomeIcon icon={faShareAlt} /> Chia Sẻ
              </button>
              <button className={styles.actionButton}>
                <FontAwesomeIcon icon={faHeart} /> Lưu
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách phòng */}
        <div className={styles.box}>
          <h3>Các Phòng Khả Dụng</h3>
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <div
                key={room.RoomId || index} // Thêm key duy nhất
                className={`${styles.roomCard} ${
                  selectedRoom?.RoomId === room.RoomId ? styles.selectedRoom : ''
                }`}
                onClick={() => handleSelectRoom(room)}
              >
                <div className={styles.roomImage}>
                  {room.images.length > 0 ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/${room.images[0].RoomImageUrl}`}
                      alt={room['Room Name']}
                    />
                  ) : (
                    <img src="default-room.jpg" alt="Default Room" />
                  )}
</div>

      <div className={styles.roomInfo}>
        <h4>Phòng {room["RoomName"]}</h4>
        <p>
          <strong>Loại phòng:</strong> {room["RoomType"]}
        </p>
        <p>
          <strong>Tình trạng:</strong> {room["RoomStatus"]}
        </p>
        <p>
          <strong>Giá:</strong> {parseFloat(room["Price"]).toLocaleString()} VND / đêm
        </p>
        <h5>Tiện nghi phòng:</h5>
              <div className={styles.amenities}>
                {roomAmenities[room.RoomId] && roomAmenities[room.RoomId].length > 0 ? (
                  renderAmenities(roomAmenities[room.RoomId])
                ) : (
                  <p>Không có tiện nghi.</p>
                )}
              </div>
        <p>
          <strong>Số khách tối đa:</strong> {room["MaxCustomer"]}
        </p>
        <button
          className={styles.detailButton}
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(room);
          }}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  ))
) : (
  <p>Không có phòng nào khả dụng</p>
)}

        </div>

        {/* Chính sách khách sạn */}
        <div className={styles.box}>
          <h3>Chính Sách</h3>
          <p>
            Nhận phòng từ 14:00 - Trả phòng trước 12:00.
            <br />
            Chính sách hủy đặt phòng: Hủy miễn phí trước 48 giờ.
          </p>
        </div>

        {/* Tiện nghi khách sạn */}
        <div className={styles.box}>
          <h3>Tiện Nghi Khách Sạn</h3>
          <div className={styles.amenities}>
            {hotelAmenities.length > 0 ? renderAmenities(hotelAmenities) : <p>Không có tiện nghi.</p>}
          </div>
        </div>
      </div>

      <div className={styles.bookingSummary}>
  <h2>
    Giá theo đêm: {selectedRoom ? `${parseFloat(selectedRoom["Price"]).toLocaleString()} VND` : 'N/A'}
  </h2>
 
  <div className={styles.summaryDetails}>
    <div className={styles.dateGuestContainer}>
      {/* Check-in Date */}
      <div className={styles.dateBox} onClick={() => setIsCheckInModalOpen(true)}>
        <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
        <span>
          {startDate
            ? `Nhận phòng: ${startDate.toLocaleDateString('vi-VN')}`
            : 'Chọn Ngày Nhận Phòng'}
        </span>
      </div>

      {/* Check-out Date */}
      <div className={styles.dateBox} onClick={() => setIsCheckOutModalOpen(true)}>
        <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
        <span>
          {endDate
            ? `Trả phòng: ${endDate.toLocaleDateString('vi-VN')}`
            : 'Chọn Ngày Trả Phòng'}
        </span>
      </div>

      {/* Guest Count */}
      <div className={styles.dateBox} onClick={() => setIsGuestModalOpen(true)}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <span>
          {`${adultCount} Người lớn, ${childCount} Trẻ em`}
        </span>
      </div>
    </div>
    <h2>
    Tổng tiền: {selectedRoom && startDate && endDate
      ? `${calculateTotalPrice().toLocaleString()} VND`
      : 'N/A'}
  </h2>

    <button
      className={styles.bookButton}
      disabled={!startDate || !endDate || !selectedRoom}
      onClick={handleBooking}
    >
      Đặt Ngay
    </button>
  </div>
</div>

      {/* Modals */}
{/* Room Detail Modal */}
{isRoomDetailModalOpen && currentRoomDetail && (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      {/* Nút đóng trong modalContent */}
      <button
        className={styles.closeButton}
        onClick={() => setIsRoomDetailModalOpen(false)}
      >
        ✕
      </button>

      <div className={styles.modalBody}>
        {/* Slideshow for Images */}
        <div className={styles.imageGallery}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {currentRoomDetail.images.map((image, index) => (
              <SwiperSlide key={image.RoomImageId || index}>
                <div className={styles.imageContainer}>
                  <img
                    src={`http://127.0.0.1:8000/storage/${image.RoomImageUrl}`}
                    alt={image.RoomImageDescription || "Room Image"}
                  />
                  <p className={styles.imageDescription}>
                    {image.RoomImageDescription || "Không có mô tả."}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Room Details */}
        <div className={styles.detailsWrapper}>
  <h2>Phòng: {currentRoomDetail.RoomName}</h2>
  <p>
    <strong>Loại phòng:</strong> {currentRoomDetail.RoomType}
  </p>
  <p>
    <strong>Tình trạng:</strong> {currentRoomDetail.RoomStatus}
  </p>
  <p>
    <strong>Giá:</strong> {parseFloat(currentRoomDetail.Price).toLocaleString()} VND / đêm
  </p>
  <p>
    <strong>Mô tả:</strong> {currentRoomDetail.Description}
  </p>
  <div className={styles.amenities}>
    <h3>Tiện nghi:</h3>
    {currentRoomDetail.amenities && currentRoomDetail.amenities.length > 0 ? (
      currentRoomDetail.amenities.map((amenity, index) => (
        <div key={index} className={styles.amenity}>
          <img
            src={`http://127.0.0.1:8000/storage/${amenity.AmenityIcon}`}
            alt={amenity.AmenityName}
            className={styles.amenityIcon}
          />
          <span>{amenity.AmenityName}</span>
        </div>
      ))
    ) : (
      <p>Không có tiện nghi.</p>
    )}
  </div>
  <button className={styles.bookButton}>Thêm lựa chọn phòng</button>
</div>

      </div>
    </div>
  </div>
)}


    {/* Modal Chọn Ngày Nhận Phòng */}
    {isCheckInModalOpen && (
  <div className={styles.newModal}>
    <div className={styles.newModalContent}>
      <button
        className={styles.newCloseButton}
        onClick={() => setIsCheckInModalOpen(false)}
      >
        ✕
      </button>
      <h2 className={styles.newModalTitle}>Chọn Ngày Nhận Phòng</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)} // Cập nhật ngày nhận phòng
        inline
        locale={vi}
        minDate={new Date()}
        
      />
      <button
        onClick={() => setIsCheckInModalOpen(false)}
        className={styles.confirmButton}
      >
        Xác Nhận
      </button>
    </div>
  </div>
)}

{/* Modal Chọn Ngày Trả Phòng */}
{isCheckOutModalOpen && (
  <div className={styles.newModal}>
    <div className={styles.newModalContent}>
      <button
        className={styles.newCloseButton}
        onClick={() => setIsCheckOutModalOpen(false)}
      >
        ✕
      </button>
      <h2 className={styles.newModalTitle}>Chọn Ngày Trả Phòng</h2>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)} // Cập nhật ngày trả phòng
        inline
        locale={vi}
        minDate={startDate || new Date()} // Ngày trả phòng phải sau ngày nhận phòng
      />
      <button
        onClick={() => setIsCheckOutModalOpen(false)}
        className={styles.confirmButton}
      >
        Xác Nhận
      </button>
    </div>
  </div>
)}


{/* Modal Chọn Số Lượng Khách */}
{isGuestModalOpen && (
  <div className={styles.newModal}>
    <div className={styles.newModalContent}>
      <button
        className={styles.newCloseButton}
        onClick={() => setIsGuestModalOpen(false)}
      >
        ✕
      </button>
      <h2 className={styles.newModalTitle}>Chọn Số Lượng Khách</h2>
      <div className={styles.newGuestControls}>
  <div className={styles.newGuestItem}>
    <span>Người lớn</span>
    <div className={styles.newCounter}>
      <button onClick={() => setAdultCount((prev) => Math.max(prev - 1, 1))}>-</button>
      <span>{adultCount}</span>
      <button onClick={() => setAdultCount((prev) => prev + 1)}>+</button>
    </div>
  </div>
  <div className={styles.newGuestItem}>
    <span>Trẻ em</span>
    <div className={styles.newCounter}>
      <button onClick={() => setChildCount((prev) => Math.max(prev - 1, 0))}>-</button>
      <span>{childCount}</span>
      <button onClick={() => setChildCount((prev) => prev + 1)}>+</button>
    </div>
  </div>
</div>
      <button
        onClick={() => setIsGuestModalOpen(false)}
        className={styles.confirmButton}
      >
        Xác Nhận
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default DesDetails;
