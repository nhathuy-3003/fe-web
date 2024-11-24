import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faUser, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { format, addDays, differenceInDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';
import { fetchCities, fetchDistrictsByCity } from '../api';

export default function SearchBox({ initialFilters }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [checkInDate, checkOutDate] = dateRange;
  const [modal, setModal] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [guestCount, setGuestCount] = useState({ adults: 2, children: 0 });
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [selectedNights, setSelectedNights] = useState(null);

  const navigate = useNavigate();
  

  // Temp state for modal values
  const [tempDateRange, setTempDateRange] = useState([null, null]);
  const [tempSelectedCity, setTempSelectedCity] = useState(null);
  const [tempSelectedDistrict, setTempSelectedDistrict] = useState(null);
  const [tempGuestCount, setTempGuestCount] = useState({ adults: 2, children: 0 });
  const [tempSelectedNights, setTempSelectedNights] = useState(null);

  const formatDate = (date) => (date ? format(date, 'EEEE, dd/MM/yyyy', { locale: vi }) : '');

  useEffect(() => {
    const loadCities = async () => {
      try {
        const cities = await fetchCities();
        const options = cities.map((city) => ({
          value: city.locationCityId,
          label: city.locationCityName,
        }));
        setCityOptions(options);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };
    loadCities();
  }, []);

  
  const handleCityChange = async (selected) => {
    setTempSelectedCity(selected);
    setTempSelectedDistrict(null);
    if (selected) {
      setLoadingDistricts(true);
      try {
        const districts = await fetchDistrictsByCity(selected.value);
        const options = districts.map((district) => ({
          value: district.id,
          label: district['tên quận'] || district.name || "Unnamed District",
        }));
        setDistrictOptions(options);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      } finally {
        setLoadingDistricts(false);
      }
    } else {
      setDistrictOptions([]);
    }
  };

  const handleGuestCountChange = (type, operation) => {
    setTempGuestCount((prev) => {
      const newCount = { ...prev };
      if (operation === 'increment') {
        newCount[type] += 1;
      } else if (operation === 'decrement' && newCount[type] > 0) {
        newCount[type] -= 1;
      }
      return newCount;
    });
  };

  const generateNightOptions = () => {
    const options = [];
    for (let i = 1; i <= 30; i++) {
      const checkOutDateOption = addDays(tempDateRange[0] || new Date(), i);
      options.push({
        value: i,
        label: `${i} đêm - ${format(checkOutDateOption, "EEEE, dd 'thg' MM yyyy", { locale: vi })}`,
      });
    }
    return options;
  };

  useEffect(() => {
    if (tempDateRange[0] && tempDateRange[1]) {
      const nights = differenceInDays(tempDateRange[1], tempDateRange[0]);
      setTempSelectedNights({ value: nights, label: `${nights} đêm` });
    }
  }, [tempDateRange]);

  const handleNightChange = (option) => {
    setTempSelectedNights(option);
    if (tempDateRange[0]) {
      const newCheckOutDate = addDays(tempDateRange[0], option.value);
      setTempDateRange([tempDateRange[0], newCheckOutDate]);
    }
  };

  const confirmModal = () => {
    if (modal === 'location') {
      setSelectedCity(tempSelectedCity);
      setSelectedDistrict(tempSelectedDistrict);
    } else if (modal === 'date') {
      setDateRange(tempDateRange);
      setSelectedNights(tempSelectedNights);
    } else if (modal === 'guest') {
      setGuestCount(tempGuestCount);
    }
    closeModal();
  };

  const openModal = (modalType) => {
    setModal(modalType);
    if (modalType === 'location') {
      setTempSelectedCity(selectedCity);
      setTempSelectedDistrict(selectedDistrict);
    } else if (modalType === 'date') {
      setTempDateRange(dateRange);
      setTempSelectedNights(selectedNights);
    } else if (modalType === 'guest') {
      setTempGuestCount(guestCount);
    }
  };

  const closeModal = () => setModal(null);

  const handleSearch = () => {
    const searchData = {
      city: selectedCity ? selectedCity.label : '', // Tên thành phố
      district: selectedDistrict ? selectedDistrict.label : '', // Tên quận/huyện
      checkIn: checkInDate ? checkInDate.toISOString() : '',
      checkOut: checkOutDate ? checkOutDate.toISOString() : '',
      adults: guestCount.adults,
      children: guestCount.children,
    };
  
    navigate('/hotels', { state: searchData });
  };
  
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.city) {
        setSelectedCity({ label: initialFilters.city, value: initialFilters.city });
      }
      if (initialFilters.district) {
        setSelectedDistrict({ label: initialFilters.district, value: initialFilters.district });
      }
      if (initialFilters.checkIn && initialFilters.checkOut) {
        setDateRange([new Date(initialFilters.checkIn), new Date(initialFilters.checkOut)]);
      }
      if (initialFilters.adults || initialFilters.children) {
        setGuestCount({
          adults: initialFilters.adults || 2,
          children: initialFilters.children || 0,
        });
      }
    }
  }, [initialFilters]);

  return (
    <div className={styles.frame3}>
      <div className={styles.heroSearch}>
        <div className={styles.searchBox}>
          <div className={styles.searchItem} onClick={() => openModal('location')}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            <div className={styles.textGroup}>
              <span className={styles.label}>Địa Điểm</span>
              <span className={styles.subLabel}>
                {selectedCity && selectedDistrict
                  ? `${selectedCity.label}, ${selectedDistrict.label}`
                  : selectedCity
                  ? `${selectedCity.label}`
                  : "Chọn Địa Điểm"}
              </span>
            </div>
          </div>

          <div className={styles.searchItem} onClick={() => openModal('date')}>
            <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
            <div className={styles.textGroup}>
              <span className={styles.label}>Nhận/Trả Phòng</span>
              <span className={styles.subLabel}>
                {checkInDate && checkOutDate
                  ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`
                  : 'Chọn ngày nhận phòng - Chọn ngày trả phòng'}
              </span>
            </div>
          </div>

          <div className={styles.searchItem} onClick={() => openModal('guest')}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <div className={styles.textGroup}>
              <span className={styles.label}>Số Khách</span>
              <span className={styles.subLabel}>
                {`${guestCount.adults} Người lớn, ${guestCount.children} Trẻ em`}
              </span>
            </div>
          </div>

          <button className={styles.searchButton} onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>

      {/* Location Modal */}
      {modal === 'location' && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={closeModal} />
            <h2>Chọn Địa Điểm</h2>
            <Select
              options={cityOptions}
              value={tempSelectedCity}
              onChange={handleCityChange}
              placeholder="Chọn tỉnh/thành phố"
              className={styles.select}
              isClearable
            />
            {tempSelectedCity && (
              <Select
                options={districtOptions}
                value={tempSelectedDistrict}
                onChange={setTempSelectedDistrict}
                placeholder="Chọn quận/huyện"
                className={styles.select}
                isClearable
                isLoading={loadingDistricts}
              />
            )}
            <button onClick={confirmModal} className={styles.confirmButton}>Xác Nhận</button>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {modal === 'date' && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={closeModal} />
            <h2>Chọn Ngày Nhận và Trả Phòng</h2>
            <div className={styles.calendarContainer}>
              <DatePicker
                selected={tempDateRange[0]}
                onChange={(update) => setTempDateRange(update)}
                startDate={tempDateRange[0]}
                endDate={tempDateRange[1]}
                minDate={new Date()}
                selectsRange
                monthsShown={2}
                inline
                locale={vi}
              />
            </div>
            <div className={styles.nightsSelector}>
        <label>Số đêm:</label>
        <Select
          options={generateNightOptions()}
          value={tempSelectedNights}
          onChange={handleNightChange}
          placeholder="Chọn số đêm"
          className={styles.select}
        />
      </div>
            <button onClick={confirmModal} className={styles.confirmButton}>Xác Nhận</button>
          </div>
        </div>
      )}

      {/* Guest Modal */}
      {modal === 'guest' && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={closeModal} />
            <h2>Số Khách</h2>
            {['adults', 'children'].map((type) => (
              <div key={type} className={styles.guestItem}>
                <span>{type === 'adults' ? 'Người lớn' : 'Trẻ em'}</span>
                <div className={styles.guestControls}>
                  <button onClick={() => handleGuestCountChange(type, 'decrement')}>-</button>
                  <span>{tempGuestCount[type]}</span>
                  <button onClick={() => handleGuestCountChange(type, 'increment')}>+</button>
                </div>
              </div>
            ))}
            <button onClick={confirmModal} className={styles.confirmButton}>Xác Nhận</button>
          </div>
        </div>
      )}
    </div>
  );
}
