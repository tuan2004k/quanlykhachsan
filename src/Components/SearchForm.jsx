// src/components/SearchForm.jsx
import React, { useState } from 'react';
import { rooms } from '../Mock/mockData';
import RoomCard from './RoomCard';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchResults = rooms.filter(room => room.SoPhong.includes(searchQuery));
    setFilteredRooms(searchResults);
  };

  return (
    <div className="bg-gray-200 py-6 mb-4">
      <div className="max-w-screen-lg mx-auto text-center">
        <form onSubmit={handleSearchSubmit} className="flex justify-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-md w-2/3 border border-gray-300"
            placeholder="Nhập mã phòng"
          />
          <button type="submit" className="bg-yellow-400 text-white px-6 py-2 rounded-md hover:bg-yellow-500">
            Tìm kiếm
          </button>
        </form>
    
      </div>
    </div>
  );
};

export default SearchForm;
