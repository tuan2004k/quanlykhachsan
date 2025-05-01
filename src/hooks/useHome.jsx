import { useState, useEffect } from "react";
import { getRooms } from "../apis/apiroom";

const useHome = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Khởi tạo minPriceLimit và maxPriceLimit (giả định vì không có GiaPhong)
  const minPriceLimit = 0;
  const maxPriceLimit = 10000000;
  const [minPrice, setMinPrice] = useState(minPriceLimit);
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit);

  // Lấy danh sách loại phòng từ ghiChu
  const roomTypeOptions = [...new Set(rooms.map((r) => r.ghiChu).filter(Boolean))] || [
    "Phòng đơn",
    "Phòng đôi",
    "Phòng gia đình",
  ];
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  // Gọi API để lấy danh sách phòng
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const roomsData = await getRooms();
        console.log('Danh sách phòng:', roomsData);
        setRooms(roomsData);
        setFilteredRooms(roomsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleSearch = (searchData) => {
    const { roomName = "", roomType = "", minPrice, maxPrice, roomTypes = [] } = searchData;
    const filtered = rooms.filter((room) => {
      const matchesRoomName = roomName
        ? room.soPhong.toLowerCase().includes(roomName.toLowerCase())
        : true;
      const matchesRoomType = roomType ? room.ghiChu === roomType : true;
      const matchesRoomTypes = roomTypes.length > 0 ? roomTypes.includes(room.ghiChu) : true;
      return matchesRoomName && matchesRoomType && matchesRoomTypes;
    });
    setFilteredRooms(filtered);
  };

  const handleMinPriceChange = (value) => {
    if (value <= maxPrice) {
      setMinPrice(value);
      handleSearch({ minPrice: value, maxPrice, roomTypes: selectedRoomTypes });
    }
  };

  const handleMaxPriceChange = (value) => {
    if (value >= minPrice) {
      setMaxPrice(value);
      handleSearch({ minPrice, maxPrice: value, roomTypes: selectedRoomTypes });
    }
  };

  const handleRoomTypeChange = (roomType) => {
    const updatedRoomTypes = selectedRoomTypes.includes(roomType)
      ? selectedRoomTypes.filter((type) => type !== roomType)
      : [...selectedRoomTypes, roomType];
    setSelectedRoomTypes(updatedRoomTypes);
    handleSearch({ minPrice, maxPrice, roomTypes: updatedRoomTypes });
  };

  const handleResetFilter = () => {
    setMinPrice(minPriceLimit);
    setMaxPrice(maxPriceLimit);
    setSelectedRoomTypes([]);
    handleSearch({ minPrice: minPriceLimit, maxPrice: maxPriceLimit, roomTypes: [] });
  };

  return {
    filteredRooms,
    minPrice,
    maxPrice,
    minPriceLimit,
    maxPriceLimit,
    roomTypeOptions,
    selectedRoomTypes,
    handleSearch,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleRoomTypeChange,
    handleResetFilter,
    setRooms,
    loading,
    error,
  };
};

export default useHome;