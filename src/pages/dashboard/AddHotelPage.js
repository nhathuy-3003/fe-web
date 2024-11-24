import React, { useState } from "react";
import HotelInfoForm from "../../components/dashboard/HotelInfoForm";
import HotelImageUpload from "../../components/dashboard/HotelImageUpload";

const AddHotelPage = () => {
  const [hotelId, setHotelId] = useState(null);

  React.useEffect(() => {
    console.log("Current Hotel ID:", hotelId);
  }, [hotelId]);

  return (
    <div>
      {!hotelId ? (
        <HotelInfoForm onHotelCreated={(id) => {
          console.log("Hotel created with ID:", id); // Debug ID nhận được
          setHotelId(id); // Gán giá trị hotelId
      }} />
      ) : (
        <HotelImageUpload hotelId={hotelId} />
      )}
    </div>
  );
};

export default AddHotelPage;
