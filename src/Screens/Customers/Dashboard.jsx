// src/pages/Home.jsx
import React, { useState } from 'react';
import Banner from '../../Components/Banner';
import SearchForm from '../../Components/SearchForm';
import RoomCard from '../../Components/RoomCard';
import Modal from '../../Components/Modal';
import { rooms } from '../../Mock/mockData';
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import SearchBox from '../../Components/componentUser/SearchBox';

const Dashboard = () => {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleSearch = (searchTerm) => {
    const filtered = rooms.filter(room =>
      room.SoPhong.includes(searchTerm) ||
      room.GiaPhong.toString().includes(searchTerm)
    );
    setFilteredRooms(filtered);
  };

  const handleBookRoom = (roomId) => {
    setSelectedRoomId(roomId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='bg-gray-100'>
      <Header />
      <div>
        <Banner />
        <div className='flex justify-center grid grid-row-2 pt-10'>
          <SearchBox onSearch={handleSearch} />
          <h1 className="text-3xl font-bold mb-4 text-center pt-10 pb-10">Danh sách Phong</h1>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pl-30 pr-30 pb-20">
            {rooms.map((room) => (
              <RoomCard
                key={room.MaPhong}
                roomId={room.MaPhong}    
                onBookRoom={(id) => console.log("Book room", id)}
              />
            ))}
          </div>



        </div>


      </div>


      <div className="">
      </div>




      <Footer />


    </div>
  );
};

export default Dashboard;
