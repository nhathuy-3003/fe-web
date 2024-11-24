import axios from 'axios';

// Tạo một instance axios để sử dụng cho tất cả các yêu cầu
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // URL cơ sở của API
  headers: {
    'Content-Type': 'application/json', // Loại nội dung là JSON
  },
});

// ==========================================================
// 1. Địa điểm (Thành phố và Quận/Huyện)
// ==========================================================

// Lấy danh sách thành phố
export const fetchCities = async () => {
  try {
    const response = await api.get('/locationCity'); // Gửi yêu cầu GET
    return response.data.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thành phố:", error);
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};

// Lấy danh sách quận/huyện của một thành phố dựa trên ID thành phố
export const fetchDistrictsByCity = async (locationCityId) => {
  try {
    const response = await api.get(`/locationCity/${locationCityId}/locationDistrict`);
    console.log("Phản hồi API cho danh sách quận/huyện:", response.data.data); // Debug
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quận/huyện:", error);
    throw error;
  }
};

// ==========================================================
// 2. Khách sạn
// ==========================================================

// Lấy danh sách khách sạn dựa trên bộ lọc
export const fetchHotels = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    // Thêm các tham số lọc vào URL
    if (filters.city) params.append('city', filters.city); // Tên thành phố
    if (filters.district) params.append('district', filters.district); // Tên quận/huyện
    if (filters.checkIn) params.append('checkIn', filters.checkIn);
    if (filters.checkOut) params.append('checkOut', filters.checkOut);
    if (filters.adults) params.append('adults', filters.adults);
    if (filters.children) params.append('children', filters.children);

    const response = await api.get(`/hotel?${params.toString()}`);
    console.log("Phản hồi API cho khách sạn:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách sạn:", error);
    throw error;
  }
};
// Lấy ds khách sạn 
export const fetchAllHotels = async () => {
  try {
    const response = await api.get('/hotel');
    const hotels = response.data.data.map((hotel) => ({
      HotelId: hotel.id, // Chuẩn hóa thành HotelId
      HotelName: hotel['tên khách sạn'], // Chuẩn hóa thành HotelName
    }));
    console.log("Danh sách tất cả khách sạn:", hotels);
    return hotels;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách sạn:", error);
    throw error;
  }
};

// Lấy chi tiết khách sạn dựa trên ID
export const fetchHotelDetails = async (id) => {
  if (!id) {
    console.error("fetchHotelDetails called with invalid ID:", id);
    throw new Error("Invalid Hotel ID");
  }

  try {
    const response = await api.get(`/hotel/${id}`);
    console.log("Hotel details fetched:", response.data.data); // Debug
    return response.data.data; // Return hotel data
  } catch (error) {
    console.error("Error fetching hotel details for ID:", id, error);
    throw error;
  }
};

// Thêm khách sạn mới
export const createHotel = async (hotelData) => {
  try {
    const response = await api.post("/hotel", hotelData);
    console.log("Phản hồi từ API (Thêm khách sạn):", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm khách sạn:", error);
    throw error;
  }
};

// Cập nhật khách sạn
export const updateHotelById = async (hotelId, hotelData) => {
  if (!hotelId) {
    console.error("Error: Missing hotelId for update.");
    throw new Error("HotelId is required.");
  }

  try {
    const response = await api.put(`/hotel/${hotelId}`, hotelData);
    console.log("Hotel update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating hotel:", error);
    throw error;
  }
};

// Xóa khách sạn theo ID
export const deleteHotelById = async (hotelId) => {
  if (!hotelId) throw new Error('HotelId không hợp lệ hoặc bị thiếu.');
  try {
    const response = await api.delete(`/hotel/${hotelId}`);
    console.log(`Khách sạn (ID: ${hotelId}) đã bị xóa thành công.`);
    return response.data; // Trả về dữ liệu từ backend (nếu có)
  } catch (error) {
    console.error(`Lỗi khi xóa khách sạn (HotelId: ${hotelId}):`, error.response?.data || error.message);
    throw error;
  }
};


// ==========================================================
// 3. Tiện nghi (Amenities)
// ==========================================================

// Lấy danh sách tiện nghi
export const fetchAmenities = async () => {
  try {
    const response = await api.get('/amenities');
    return response.data.data; // Trả về danh sách tiện nghi
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tiện nghi:", error);
    throw error;
  }
};

// ==========================================================
// 4. Hình ảnh khách sạn
// ==========================================================

// Lấy danh sách hình ảnh khách sạn theo ID khách sạn
export const fetchHotelImages = async (hotelId) => {
  if (!hotelId) {
    console.error("fetchHotelImages được gọi mà không có hotelId.");
    return [];
  }

  try {
    const response = await api.get(`/hotel/${hotelId}/hotelImg`);
    if (!response.data || !Array.isArray(response.data)) {
      console.error("Định dạng phản hồi API không hợp lệ:", response);
      return [];
    }

    return response.data.map((image) => ({
      id: image.HotelImageId,
      url: `http://127.0.0.1:8000/storage/${image.ImageUrl}`,
      description: image.HotelImageDescription,
    }));
  } catch (error) {
    console.error("Lỗi khi lấy danh sách hình ảnh khách sạn:", error);
    throw error;
  }
};

// Upload hình ảnh khách sạn
export const uploadHotelImages = async (formData) => {
  try {
    const response = await api.post("/hotelImg", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi upload hình ảnh khách sạn:", error);
    throw error;
  }
};

export const updateHotelImageDescription = async (imageId, data) => {
  try {
    const response = await api.put(`/hotelImg/${imageId}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật mô tả hình ảnh:", error);
    throw error;
  }
};
// Xóa hình ảnh khách sạn
export const deleteHotelImage = async (imageId) => {
  if (!imageId) throw new Error('ImageId không hợp lệ hoặc bị thiếu.');
  try {
    const response = await api.delete(`/hotelImg/${imageId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa hình ảnh khách sạn:", error);
    throw error;
  }
};
// ==========================================================
// 5. Phòng
// ==========================================================

// Lấy danh sách phòng theo ID khách sạn
export const fetchRoomsByHotelId = async (hotelId) => {
  try {
    const response = await api.get(`/hotel/${hotelId}/rooms`);
    return response.data.data || [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn(`Không tìm thấy phòng cho khách sạn ID: ${hotelId}`);
      return [];
    }
    console.error("Lỗi khi lấy danh sách phòng:", error);
    throw error;
  }
};

// Tạo phòng mới
export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/rooms', roomData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo phòng:", error.response?.data || error.message);
    throw error;
  }
};

// Cập nhật phòng
export const updateRoomById = async (roomId, roomData) => {
  if (!roomId) throw new Error('RoomId không hợp lệ hoặc bị thiếu.');
  return axios.put(`http://127.0.0.1:8000/api/rooms/${roomId}`, roomData);
};

// Xóa phòng
export const deleteRoomById = async (roomId) => {
  return await api.delete(`/rooms/${roomId}`);
};

// ==========================================================
// 6. Hình ảnh phòng
// ==========================================================

// Lấy danh sách hình ảnh của một phòng dựa trên ID phòng
export const fetchRoomImages = async (roomId) => {
  try {
    const response = await api.get(`/room/${roomId}/images`);
    console.log('Hình ảnh phòng được lấy:', roomId, ':', response.data);
    return response.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách hình ảnh phòng:", error);
    return [];
  }
};

export const fetchRoomImagesAmbule = async (roomId) => {
  try {
    const response = await api.get(`/room/${roomId}/images`);
    console.log('Hình ảnh phòng được lấy:', roomId, response.data);
    return response.data.map((image) => ({
      id: image.RoomImageId,
      url: `http://127.0.0.1:8000/storage/${image.RoomImageUrl}`,
      description: image.RoomImageDescription || '',
    }));
  } catch (error) {
    console.error(`Lỗi khi lấy danh sách hình ảnh phòng (RoomId: ${roomId}):`, error);
    return [];
  }
};

// Upload hình ảnh của phòng
export const uploadRoomImages = async (formData) => {
  try {
    const response = await api.post("/roomImg", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error uploading room images:", error);
    throw error;
  }
};

export const updateRoomImageDescription = async (imageId, data) => {
  try {
    const response = await api.put(`/roomImg/${imageId}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật mô tả hình ảnh:", error);
    throw error;
  }
};

// Xóa hình ảnh của phòng
export const deleteRoomImage = async (imageId) => {
  if (!imageId) throw new Error('ImageId không hợp lệ hoặc bị thiếu.');
  try {
    const response = await api.delete(`/roomImg/${imageId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa hình ảnh phòng:", error);
    throw error;
  }
};

// ==========================================================
// 7. Booking
// ==========================================================
// Lấy danh sách booking
export const fetchBookings = async () => {
  try {
    const response = await api.get('/booking');
    return response.data.data; // Trả về danh sách booking
  } catch (error) {
    console.error("Lỗi khi lấy danh sách booking:", error);
    throw error;
  }
};
// Lấy chi tiết booking theo ID
export const fetchBookingDetails = async (bookingId) => {
  if (!bookingId) throw new Error('BookingId không hợp lệ hoặc bị thiếu.');

  try {
    const response = await api.get(`/booking/${bookingId}`);
    return response.data.data; // Trả về thông tin chi tiết booking
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết booking (BookingId: ${bookingId}):`, error);
    throw error;
  }
};
// Tạo booking mới
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/booking', bookingData);
    console.log("Phản hồi từ API (Tạo booking):", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo booking:", error.response?.data || error.message);
    throw error;
  }
};

// Cập nhật booking theo ID
export const updateBookingById = async (bookingId, bookingData) => {
  try {
    const response = await api.put(`/booking/${bookingId}`, bookingData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật booking (BookingId: ${bookingId}):`, error.response?.data || error.message);
    throw error;
  }
};


// Xóa booking theo ID
export const deleteBookingById = async (bookingId) => {
  if (!bookingId) throw new Error('BookingId không hợp lệ hoặc bị thiếu.');
  try {
    const response = await api.delete(`/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa booking (BookingId: ${bookingId}):`, error);
    throw error;
  }
};

// ==========================================================
// 8. Người dùng
// ==========================================================

// Lấy danh sách người dùng
export const fetchUsers = async () => {
  try {
    const response = await api.get('/user'); // Đường dẫn API trả danh sách người dùng
    return response.data.data; // Trả về danh sách người dùng từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    throw error;
  }
};

// Lấy thông tin người dùng từ token (đổi tên hàm)
export const fetchUserSetting = async (token) => {
  try {
    const response = await api.get('/user', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    // Kiểm tra nếu dữ liệu trả về có phần tử và lấy phần tử đầu tiên (data[0])
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data[0];  // Trả về phần tử đầu tiên trong mảng dữ liệu người dùng
    } else {
      throw new Error('Không có dữ liệu người dùng.');
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    throw error;  // Ném lỗi để xử lý ở nơi gọi
  }
};


// Thay đổi mật khẩu người dùng
export const updatePassword = async (token, currentPassword, newPassword) => {
  try {
    const response = await api.post('/change-password', {
      currentPassword,
      newPassword
    }, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data;  // Trả về kết quả thay đổi mật khẩu
  } catch (error) {
    console.error("Lỗi khi thay đổi mật khẩu:", error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (userId, userData) => {
  if (!userId) {
    console.error("Error: Missing userId for update.");
    throw new Error("UserId is required.");
  }

  try {
    // Kiểm tra nếu mật khẩu cũ và mật khẩu mới được cung cấp
    if (userData.currentPassword && userData.password) {
      // Thêm logic để gửi mật khẩu cũ và mật khẩu mới cho API
      const response = await api.post(`/check-password`, {
        currentPassword: userData.currentPassword,  // Mật khẩu cũ
      });

      if (response.data.isValid) {
        // Nếu mật khẩu cũ đúng, tiếp tục với việc thay đổi mật khẩu mới
        userData.Password = userData.password;
        delete userData.currentPassword;  // Loại bỏ trường currentPassword khỏi yêu cầu gửi đến API
      } else {
        alert("Mật khẩu cũ không đúng.");
        return; // Dừng lại nếu mật khẩu cũ không đúng
      }
    }

    // Gửi yêu cầu PUT với dữ liệu đã thay đổi
    const response = await api.put(`/user/${userId}`, userData);
    console.log("User update response:", response.data);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(`Error updating user (UserId: ${userId}):`, error.response?.data || error.message);
    throw error;
  }
};
//login
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { // Gọi API login
      UserName: username,
      Password: password,
    });

    if (response.data && response.data.token) {
      // Lưu token vào localStorage để dùng cho các yêu cầu sau
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } else {
      throw new Error('Không có token trong phản hồi');
    }
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    throw error; // Ném lỗi nếu có
  }
};



export default api;
