import React, { useState } from "react";
import { uploadHotelImages } from "../../api";
import styles from "./HotelImageUpload.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HotelImageUpload = ({ hotelId }) => {
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10); // Giới hạn tối đa 5 ảnh
    setImages(files);
    setDescriptions(files.map(() => "")); // Tạo danh sách mô tả rỗng
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (!images || images.length === 0) {
        throw new Error("Không có ảnh để upload.");
      }
  
      if (!hotelId) {
        throw new Error("HotelId không tồn tại. Vui lòng thử lại.");
      }
  
      const formData = new FormData();
      if (images.length === 1) {
        // Nếu chỉ có 1 ảnh
        formData.append("ImageUrl", images[0]);
        formData.append(
          "HotelImageDescription",
          descriptions[0] || "Mô tả mặc định"
        );
      } else {
        // Nếu là danh sách ảnh
        images.forEach((image, index) => {
          formData.append("ImageUrl[]", image);
          formData.append(
            "HotelImageDescription[]",
            descriptions[index] || "Mô tả mặc định"
          );
        });
      }
      formData.append("HotelId", hotelId);
  
      await uploadHotelImages(formData);
      alert("Upload ảnh thành công!");
      navigate("/dashboard/rooms");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert(error.message || "Đã xảy ra lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <div className={styles.preview}>
        {images.map((file, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(file)} alt={`preview-${index}`} />
            <input
              type="text"
              placeholder={`Mô tả ảnh ${index + 1}`}
              value={descriptions[index]}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Đang xử lý..." : "Upload Ảnh"}
      </button>
    </form>
    </div>
  );
};


export default HotelImageUpload;
