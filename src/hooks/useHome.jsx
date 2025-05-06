import { useState, useEffect } from "react";
import { getRooms } from "../apis/apiroom";

const useHome = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const minPriceLimit = 0;
  const maxPriceLimit = 10000000;
  const [minPrice, setMinPrice] = useState(minPriceLimit);
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit);

  const roomTypeOptions = Array.isArray(rooms) && rooms.length > 0
    ? [...new Set(rooms.map((r) => r.ghiChu).filter(Boolean))]
    : ["Phòng đơn", "Phòng đôi", "Phòng gia đình"];
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        setLoading(true);
        let allRooms = [];
        let page = 1;
        const pageSize = 10; // Giả định pageSize mặc định từ API
        let hasMore = true;

        while (hasMore) {
          const roomsData = await getRooms(page, pageSize);
          console.log(`Danh sách phòng trang ${page} (API Response):`, roomsData);

          if (roomsData && Array.isArray(roomsData.data)) {
            allRooms = [...allRooms, ...roomsData.data];
            if (page >= roomsData.totalPages || roomsData.totalPages === 0) {
              hasMore = false;
            } else {
              page++;
            }
          } else {
            console.warn('Dữ liệu từ API không hợp lệ:', roomsData);
            hasMore = false;
          }
        }

        setRooms(allRooms);
        setFilteredRooms(allRooms);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchAllRooms();
  }, []);

  const handleSearch = (searchData) => {
    const { roomName = "", roomType = "", minPrice, maxPrice, roomTypes = [] } = searchData;
    const filtered = (Array.isArray(rooms) ? rooms : []).filter((room) => {
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