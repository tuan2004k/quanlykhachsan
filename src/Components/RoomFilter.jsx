// src/components/RoomFilter.jsx
import React, { useState } from 'react';

const RoomFilter = ({ onFilter }) => {
  const [roomType, setRoomType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [amenities, setAmenities] = useState('');

  const handleFilterChange = () => {
    onFilter({ roomType, priceRange, amenities });
  };

  return (
    <div className="flex gap-4 mb-4">
      <select
        className="p-2 border rounded"
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
      >
        <option value="">Loại phòng</option>
        <option value="single">Phòng đơn</option>
        <option value="double">Phòng đôi</option>
        <option value="vip">Phòng VIP</option>
      </select>

      <select
        className="p-2 border rounded"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option value="">Giá phòng</option>
        <option value="cheap">Giá rẻ</option>
        <option value="moderate">Giá trung bình</option>
        <option value="expensive">Giá cao cấp</option>
      </select>

      <select
        className="p-2 border rounded"
        value={amenities}
        onChange={(e) => setAmenities(e.target.value)}
      >
        <option value="">Tiện ích</option>
        <option value="wifi">WiFi</option>
        <option value="tv">TV</option>
        <option value="ac">Điều hòa</option>
        <option value="pool">Bể bơi</option>
      </select>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleFilterChange}
      >
        Lọc
      </button>
    </div>
  );
};

export default RoomFilter;
