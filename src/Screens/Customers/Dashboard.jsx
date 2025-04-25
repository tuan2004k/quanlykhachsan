// src/pages/Home.jsx
import React, { useState } from 'react';
import Banner from '../../Components/Banner';
import HorizontalSearchBox from '../../Components/componentUser/SearchBox';
import RoomCard from '../../Components/RoomCard';
import Modal from '../../Components/Modal';
import FilterPanel from '../../Components/componentUser/FilterPanel'; // New component
import { rooms, roomTypes } from '../../Mock/mockData';
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';

const Home = () => {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // Search and filter handler
  const handleSearch = (searchData) => {
    const { roomName, roomType, minPrice, maxPrice } = searchData;
    const filtered = rooms.filter((room) => {
      const matchesRoomName = roomName
        ? room.SoPhong.toLowerCase().includes(roomName.toLowerCase())
        : true;
      const matchesRoomType = roomType
        ? room.LoaiPhong === roomType
        : true;
      const matchesMinPrice = minPrice
        ? room.GiaPhong >= parseFloat(minPrice)
        : true;
      const matchesMaxPrice = maxPrice
        ? room.GiaPhong <= parseFloat(maxPrice)
        : true;
      return matchesRoomName && matchesRoomType && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredRooms(filtered);
  };

  // Booking handler
  const handleBookRoom = (roomId) => {
    setSelectedRoomId(roomId);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoomId(null);
  };

  // SearchBox fields configuration
  const searchFields = [
    {
      name: 'roomName',
      label: 'Room Name',
      type: 'text',
      placeholder: 'Enter room name...',
    },
    {
      name: 'roomType',
      label: 'Room Type',
      type: 'select',
      options: [
        { value: '', label: 'All' },
        { value: 'standard', label: 'Standard' },
        { value: 'deluxe', label: 'Deluxe' },
        { value: 'suite', label: 'Suite' },
      ],
    },
  ];

  // Modal content for booking
  const selectedRoom = rooms.find((r) => r.MaPhong === selectedRoomId);
  const selectedRoomType = roomTypes.find((rt) => rt.MaLoaiPhong === selectedRoom?.LoaiPhong);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Banner />
        <div className="container mx-auto px-4 pt-10 pb-20">
          <div className="relative z-10 -mt-24 mb-12">
            <HorizontalSearchBox
              fields={searchFields}
              onSearch={handleSearch}
              buttonText="Search Rooms"
            />
          </div>
          <h1 className="text-3xl font-bold mb-8 text-center">Danh sách Phòng</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Panel (20%) */}
            <div className="lg:w-1/5 w-full">
              <FilterPanel onFilter={handleSearch} />
            </div>
            {/* Room List (80%) */}
            <div className="lg:w-4/5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <RoomCard
                      key={room.MaPhong}
                      roomId={room.MaPhong}
                      onBookRoom={handleBookRoom}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    Không tìm thấy phòng phù hợp.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal for booking */}
      {showModal && selectedRoom && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Xác nhận đặt phòng</h2>
            <p className="mb-2">
              <strong>Phòng:</strong> {selectedRoom.SoPhong}
            </p>
            <p className="mb-2">
              <strong>Loại phòng:</strong> {selectedRoomType?.GhiChu || 'Không xác định'}
            </p>
            <p className="mb-4">
              <strong>Giá:</strong> {selectedRoom.GiaPhong.toLocaleString()} VND
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  console.log(`Đặt phòng ${selectedRoom.SoPhong}`);
                  handleCloseModal();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;