import React, { useState } from "react";
import { uploadRoomImages } from "../../api";
import styles from "./RoomImageUpload.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RoomImageUpload = ({ roomId }) => {
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Khởi tạo navigate
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setImages(files);
    setDescriptions(files.map(() => ""));
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
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`RoomImageUrl[${index}]`, image);
        formData.append(`RoomImageDescription[${index}]`, descriptions[index] || "");
      });
      formData.append("RoomId", roomId);
  
      // Kiểm tra dữ liệu trong FormData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
  
      await uploadRoomImages(formData);
      alert("Upload ảnh thành công!");
      navigate("/dashboard/rooms");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
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

export default RoomImageUpload;
