import React, { useState, useEffect } from 'react';
import {
  fetchHotelDetails,
  updateHotelById,
  fetchAmenities,
  fetchCities,
  fetchDistrictsByCity,
  fetchHotelImages,
  uploadHotelImages,
  deleteHotelImage,
  updateHotelImageDescription,
} from '../../api';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditHotel.module.css';

const EditHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [allAmenities, setAllAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalHotel, setOriginalHotel] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newDescriptions, setNewDescriptions] = useState([]);
  const [imageDescriptions, setImageDescriptions] = useState({}); // Lưu mô tả tạm thời
  // Fetch hotel details and amenities
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Lấy chi tiết khách sạn
        const hotelData = await fetchHotelDetails(hotelId);
  
        // Chuyển đổi tên thuộc tính nếu cần
        const hotel = {
          id: hotelData.id,
          HotelName: hotelData.HotelName || hotelData['tên khách sạn'],
          HotelAddress: hotelData.HotelAddress || hotelData['địa chỉ khách sạn'],
          OpenDay: hotelData.OpenDay || hotelData['ngày mở cửa'],
          HotelStatus: hotelData.HotelStatus || hotelData['trạng thái'],
          locationDistrictId: hotelData.locationDistrictId || hotelData['id quận'],
          locationCityId: hotelData.locationCityId || hotelData['id thành phố'],
          amenities: hotelData.amenities,
        };
  
        setHotel(hotel);
        setOriginalHotel({ ...hotel }); // Lưu dữ liệu gốc
        // Thiết lập selectedCity và selectedDistrict
        setSelectedCity(hotel.locationCityId);
        setSelectedDistrict(hotel.locationDistrictId);
  
        // Tải danh sách thành phố
        const citiesData = await fetchCities();
        setCities(citiesData);
  
        // Tải danh sách quận/huyện cho thành phố đã chọn
        if (hotel.locationCityId) {
          const districtsData = await fetchDistrictsByCity(hotel.locationCityId);
          setDistricts(districtsData);
        }
        // Tải danh sách hình ảnh
        const hotelImages = await fetchHotelImages(hotelId);
setHotelImages(hotelImages);

const descriptions = {};
hotelImages.forEach((image) => {
  descriptions[image.id] = image.description || "";
});
setImageDescriptions(descriptions);


        // Tải danh sách tiện nghi
        const amenitiesData = await fetchAmenities();
        setAllAmenities(amenitiesData);
        
        // Lấy danh sách tiện nghi đã chọn
        const hotelAmenities = hotel.amenities || [];
        const amenityIds = hotelAmenities.map((amenity) => amenity.AmenityId);
        setSelectedAmenities(amenityIds);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu khách sạn:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [hotelId]);
  
 
  const handleImageDelete = async (imageId) => {
    try {
      await deleteHotelImage(imageId);
      setHotelImages(hotelImages.filter((img) => img.id !== imageId));
      alert("Xóa ảnh thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
      alert("Xóa ảnh thất bại!");
    }
  };


const handleImageDescriptionChange = (imageId, value) => {
    setImageDescriptions((prev) => ({ ...prev, [imageId]: value }));
  };


  const handleSaveImages = async () => {
  try {
    const formData = new FormData();
    formData.append("HotelId", hotelId);

    newImages.forEach((image, index) => {
      formData.append(`ImageUrl[${index}]`, image);
      formData.append(`HotelImageDescription[${index}]`, newDescriptions[index] || "Không có mô tả");
    });

    // Kiểm tra dữ liệu trong FormData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    await uploadHotelImages(formData);
    alert("Thêm ảnh thành công!");
    setNewImages([]);
    setNewDescriptions([]);
    const updatedImages = await fetchHotelImages(hotelId);
    setHotelImages(updatedImages);
  } catch (error) {
    console.error("Lỗi khi tải lên hình ảnh:", error);
    alert("Thêm ảnh thất bại!");
  }
};



  const handleUpdateImageDescription = async (imageId) => {
    try {
      const newDescription = imageDescriptions[imageId];
      await updateHotelImageDescription(imageId, { HotelImageDescription: newDescription });
      setHotelImages((prev) =>
        prev.map((img) => (img.id === imageId ? { ...img, description: newDescription } : img))
      );
      alert("Cập nhật mô tả thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật mô tả hình ảnh:", error);
      alert("Cập nhật mô tả thất bại!");
    }
  };
  

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict(null); // Reset quận/huyện khi thay đổi thành phố
    setDistricts([]); // Reset danh sách quận/huyện

    // Tải danh sách quận/huyện mới
    try {
      const districtsData = await fetchDistrictsByCity(cityId);
      console.log('Districts Data:', districtsData); // Kiểm tra dữ liệu nhận được
      setDistricts(districtsData);
    } catch (error) {
      console.error('Lỗi khi tải danh sách quận/huyện:', error);
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
  };

  const handleSaveHotel = async () => {
    try {
        const updatedHotel = {};
        if (hotel.HotelName && hotel.HotelName !== originalHotel.HotelName) {
            updatedHotel.HotelName = hotel.HotelName;
        }
        if (hotel.HotelAddress && hotel.HotelAddress !== originalHotel.HotelAddress) {
            updatedHotel.HotelAddress = hotel.HotelAddress;
        }
        if (hotel.OpenDay && hotel.OpenDay !== originalHotel.OpenDay) {
            updatedHotel.OpenDay = hotel.OpenDay;
        }
        if (hotel.HotelStatus !== originalHotel.HotelStatus) {
            updatedHotel.HotelStatus = hotel.HotelStatus;
        }
        if (selectedCity && selectedCity !== originalHotel.locationCityId) {
            updatedHotel.locationCityId = selectedCity;
        }
        if (selectedDistrict && selectedDistrict !== originalHotel.locationDistrictId) {
            updatedHotel.locationDistrictId = selectedDistrict;
        }
        if (JSON.stringify(selectedAmenities) !== JSON.stringify(originalHotel.AmenityIds)) {
            updatedHotel.AmenityIds = selectedAmenities;
        }

        if (Object.keys(updatedHotel).length === 0) {
            alert("Không có thay đổi nào để cập nhật.");
            return;
        }

        console.log('Updated Hotel Data:', updatedHotel);

        await updateHotelById(hotel.id, updatedHotel);

        alert('Cập nhật khách sạn thành công!');
        navigate('/dashboard/rooms');
    } catch (error) {
        console.error('Lỗi khi cập nhật khách sạn:', error.response?.data || error.message);
        alert(`Cập nhật khách sạn thất bại! Lỗi: ${error.response?.data?.message || error.message}`);
    }
};

  
  const handleAmenityChange = (amenityId) => {
    const isSelected = selectedAmenities.includes(amenityId);
    const updatedAmenities = isSelected
      ? selectedAmenities.filter((id) => id !== amenityId)
      : [...selectedAmenities, amenityId];
    setSelectedAmenities(updatedAmenities);
  };

  if (loading || !hotel) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Chỉnh sửa Khách sạn</h1>

      <div className={styles.field}>
        <label>Tên Khách sạn:</label>
        <input
          type="text"
          value={hotel.HotelName || ''}
          onChange={(e) => setHotel({ ...hotel, HotelName: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label>Địa chỉ Khách sạn:</label>
        <input
          type="text"
          value={hotel.HotelAddress || ''}
          onChange={(e) => setHotel({ ...hotel, HotelAddress: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label>Ngày mở cửa:</label>
        <input
          type="date"
          value={hotel.OpenDay || ''}
          onChange={(e) => setHotel({ ...hotel, OpenDay: e.target.value })}
        />
      </div>

      <div className={styles.field}>
  <label>Thành phố:</label>
  <select
  value={selectedCity || ''}
  onChange={handleCityChange}
>
  <option value="">Chọn thành phố</option>
  {cities.map((city) => (
    <option key={city.locationCityId} value={city.locationCityId}>
      {city.locationCityName}
    </option>
  ))}
</select>

</div>

<div className={styles.field}>
  <label>Quận/Huyện:</label>
  <select
  value={selectedDistrict || ''}
  onChange={handleDistrictChange}
  disabled={!selectedCity}
>
  <option value="">Chọn quận/huyện</option>
  {districts.map((district) => {
    const districtId = district.id; // Hoặc sử dụng district.locationDistrictId nếu phù hợp
    const districtName = district['tên quận'];

    if (!districtId || !districtName) {
      console.warn('Thiếu thông tin quận/huyện:', district);
      return null;
    }

    return (
      <option key={districtId} value={districtId}>
        {districtName}
      </option>
    );
  })}
</select>

</div>


      <div className={styles.field}>
        <label>Trạng thái:</label>
        <select
          value={hotel.HotelStatus || ''}
          onChange={(e) => setHotel({ ...hotel, HotelStatus: e.target.value })}
        >
          <option value="1">Hoạt động</option>
          <option value="0">Không hoạt động</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Tiện Nghi:</label>
        <div className={styles.amenities}>
          {allAmenities.map((amenity) => (
            <label key={amenity.AmenityId}>
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity.AmenityId)}
                onChange={() => handleAmenityChange(amenity.AmenityId)}
              />
              {amenity.AmenityName}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.images}>
        <h3>Hình ảnh khách sạn</h3>
        <div className={styles.imageList}>
          {hotelImages.map((image) => (
            <div key={image.id} className={styles.imageItem}>
              <img src={image.url} alt="Hình ảnh khách sạn" />
              <textarea
                value={imageDescriptions[image.id]}
                onChange={(e) => handleImageDescriptionChange(image.id, e.target.value)}
                placeholder="Nhập mô tả"
              />
              <button onClick={() => handleUpdateImageDescription(image.id)}>
                Cập nhật mô tả
              </button>
              <button onClick={() => handleImageDelete(image.id)}>Xóa</button>
            </div>
          ))}
        </div>

        <div className={styles.imageUpload}>
          <label>Thêm ảnh mới:</label>
          <input type="file" multiple accept="image/*" onChange={(e) => setNewImages([...newImages, ...e.target.files])} />
          {newImages.map((_, index) => (
            <textarea
              key={index}
              placeholder="Nhập mô tả ảnh mới"
              value={newDescriptions[index] || ""}
              onChange={(e) =>
                setNewDescriptions((prev) => {
                  const updated = [...prev];
                  updated[index] = e.target.value;
                  return updated;
                })
              }
            />
          ))}
        </div>
        <button onClick={handleSaveImages} disabled={!newImages.length}>
          Lưu ảnh mới
        </button>
      </div>


      <div className={styles.actions}>
        <button onClick={handleSaveHotel}>Lưu</button>
        <button onClick={() => navigate('/dashboard/rooms')}>Hủy</button>
      </div>
    </div>
  );
};

export default EditHotel;
