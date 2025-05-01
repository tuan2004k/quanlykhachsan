import React, { useState } from "react";
import Banner from "../../Components/Banner";
import SearchBox from "../../Components/componentUser/SearchBox";
import FilterPanel from "../../Components/componentUser/FilterPanel";
import RoomList from "../../Components/RoomList";
import Modal from "../../Components/Modal";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import useRoomFilter from "../../hooks/useHome";
import PromotionCard from "../../Components/componentUser/PromotionCard";

const Home = () => {
  const {
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
    loading,
    error,
  } = useRoomFilter();

  const [showModal, setShowModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleBookRoom = (roomId) => {
    console.log('Room ID selected:', roomId);
    setSelectedRoomId(roomId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoomId(null);
  };

  const searchFields = [
    {
      name: "roomName",
      label: "Room Name",
      type: "text",
      placeholder: "Enter room name...",
    },
    {
      name: "roomType",
      label: "Room Type",
      type: "select",
      options: [
        { value: "", label: "All" },
        { value: "Phòng đơn", label: "Phòng đơn" },
        { value: "Phòng đôi", label: "Phòng đôi" },
        { value: "Phòng gia đình", label: "Phòng gia đình" },
      ],
    },
  ];

  const selectedRoom = filteredRooms.find((r) => r.maPhong === selectedRoomId);
  console.log('Filtered rooms:', filteredRooms);
  console.log('Selected room:', selectedRoom);


  if (error) {
    return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Banner />
        <div className="container mx-auto px-4 pt-10 pb-20">
          <div className="relative z-10 -mt-24 mb-12">
            <SearchBox
              fields={searchFields}
              onSearch={handleSearch}
              buttonText="Search Rooms"
            />
          </div>
          <h1 className="text-3xl font-bold mb-8 text-center">Danh sách Phòng</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/5 w-full">
              <FilterPanel
                minPrice={minPrice}
                maxPrice={maxPrice}
                minPriceLimit={minPriceLimit}
                maxPriceLimit={maxPriceLimit}
                roomTypeOptions={roomTypeOptions}
                selectedRoomTypes={selectedRoomTypes}
                onMinPriceChange={handleMinPriceChange}
                onMaxPriceChange={handleMaxPriceChange}
                onRoomTypeChange={handleRoomTypeChange}
                onResetFilter={handleResetFilter}
              />
            </div>
            <div className="lg:w-4/5 w-full">
              <RoomList filteredRooms={filteredRooms} onBookRoom={handleBookRoom} />
            </div>
          </div>
          <PromotionCard promotionId={3} />
        </div>
      </main>
      <Footer />
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Xác nhận đặt phòng</h2>
            {selectedRoom ? (
              <>
                <p className="mb-2">
                  <strong>Phòng:</strong> {selectedRoom.soPhong || "Không xác định"}
                </p>
                <p className="mb-2">
                  <strong>Loại phòng:</strong> {selectedRoom.ghiChu || "Không xác định"}
                </p>
                <p className="mb-4">
                  <strong>Số giường:</strong> {selectedRoom.soGiuong || "Không xác định"}
                </p>
              </>
            ) : (
              <p className="mb-4 text-red-500">Không tìm thấy thông tin phòng.</p>
            )}
            <div className="flex gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (selectedRoom) {
                    console.log(`Đặt phòng ${selectedRoom.soPhong}`);
                  }
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