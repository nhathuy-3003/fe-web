import React, { useState, useEffect } from "react";
import { fetchCities, fetchDistrictsByCity, createHotel, fetchAmenities } from "../../api";
import styles from "./HotelInfoForm.module.css";

const HotelInfoForm = ({ onHotelCreated }) => {
  const [formValues, setFormValues] = useState({
    hotelName: "",
    address: "",
    openDay: "",
    cityId: "",
    districtId: "",
    amenities: [],
  });

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch danh sách thành phố và tiện nghi khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cityData, amenityData] = await Promise.all([
          fetchCities(),
          fetchAmenities(),
        ]);
        setCities(cityData);
        setAmenities(amenityData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchData();
  }, []);

  // Xử lý khi chọn thành phố
  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setFormValues((prevState) => ({
      ...prevState,
      cityId,
      districtId: "", // Reset quận khi thay đổi thành phố
    }));

    try {
      if (cityId) {
        const districtData = await fetchDistrictsByCity(cityId);
        setDistricts(districtData);
      } else {
        setDistricts([]); // Xóa quận nếu không chọn thành phố
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  // Xử lý khi nhập thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Xử lý khi chọn tiện nghi
  const handleAmenityChange = (amenityId) => {
    setFormValues((prevState) => {
      const updatedAmenities = prevState.amenities.includes(amenityId)
        ? prevState.amenities.filter((id) => id !== amenityId)
        : [...prevState.amenities, amenityId];
      return { ...prevState, amenities: updatedAmenities };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const hotelData = {
        HotelName: formValues.hotelName,
        HotelAddress: formValues.address,
        OpenDay: formValues.openDay,
        locationCityId: formValues.cityId,
        locationDistrictId: formValues.districtId,
        amenities: formValues.amenities, // Gửi danh sách tiện nghi
      };
  
      console.log("Dữ liệu gửi đi:", hotelData); // Debug dữ liệu
  
      const hotelResponse = await createHotel(hotelData);
      console.log("Phản hồi từ API:", hotelResponse);
  
      if (hotelResponse?.data?.HotelId) { // Sử dụng HotelId thay vì id
        alert("Tạo khách sạn thành công!");
        console.log("Hotel ID:", hotelResponse.data.HotelId);
        onHotelCreated(hotelResponse.data.HotelId); // Truyền đúng ID khách sạn
    } else {
        throw new Error("Không thể tạo khách sạn.");
    }
    
    } catch (error) {
      console.error("Error creating hotel:", error);
      alert("Đã xảy ra lỗi khi tạo khách sạn.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="hotelName">Tên Khách Sạn</label>
          <input
            type="text"
            id="hotelName"
            name="hotelName"
            placeholder="Nhập tên khách sạn..."
            value={formValues.hotelName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Địa Chỉ</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Nhập địa chỉ khách sạn..."
            value={formValues.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="openDay">Ngày Mở Cửa</label>
          <input
            type="date"
            id="openDay"
            name="openDay"
            value={formValues.openDay}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cityId">Thành Phố</label>
          <select
            id="cityId"
            name="cityId"
            value={formValues.cityId}
            onChange={handleCityChange}
            required
          >
            <option value="">Chọn thành phố...</option>
            {cities.map((city) => (
              <option key={city.locationCityId} value={city.locationCityId}>
                {city.locationCityName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="districtId">Quận</label>
          <select
            id="districtId"
            name="districtId"
            value={formValues.districtId}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn quận...</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district["tên quận"]}
              </option>
            ))}
          </select>
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
          {loading ? "Đang xử lý..." : "Tạo Khách Sạn"}
        </button>
      </form>
    </div>
  );
};

export default HotelInfoForm;
