// src/hooks/useHome.js
import { useState } from "react";
import { rooms } from "../Mock/mockData";

const useHome = () => {
  const minPriceLimit = Math.min(...rooms.map((r) => r.GiaPhong)) || 0;
  const maxPriceLimit = Math.max(...rooms.map((r) => r.GiaPhong)) || 10000000;
  const [minPrice, setMinPrice] = useState(minPriceLimit);
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit);

  const roomTypeOptions = [...new Set(rooms.map((r) => r.LoaiPhong).filter(Boolean))] || [
    "standard",
    "deluxe",
    "suite",
  ];
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const handleSearch = (searchData) => {
    const { roomName = "", roomType = "", minPrice, maxPrice, roomTypes = [] } = searchData;
    const filtered = rooms.filter((room) => {
      const matchesRoomName = roomName
        ? room.SoPhong.toLowerCase().includes(roomName.toLowerCase())
        : true;
      const matchesRoomType = roomType ? room.LoaiPhong === roomType : true;
      const matchesMinPrice = minPrice ? room.GiaPhong >= parseFloat(minPrice) : true;
      const matchesMaxPrice = maxPrice ? room.GiaPhong <= parseFloat(maxPrice) : true;
      const matchesRoomTypes = roomTypes.length > 0 ? roomTypes.includes(room.LoaiPhong) : true;
      return matchesRoomName && matchesRoomType && matchesMinPrice && matchesMaxPrice && matchesRoomTypes;
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
  };
};

export default useHome;