// src/components/RoomCard.jsx
import React from 'react';
import { rooms, roomTypes } from '../Mock/mockData';
import Button from '../Components/Button';


const RoomCard = ({ roomId, onBookRoom }) => {
  const room = rooms.find(r => r.MaPhong === roomId);


  if (!room) return <div>Không tìm thấy thông tin phòng.</div>;
  const roomType = roomTypes.find(rt => rt.MaLoaiPhong === room.LoaiPhong);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={room.Anh || 'https://source.unsplash.com/featured/?hotel-room'} // thay bằng room.Anh nếu có ảnh riêng
        alt={`Phòng ${room.SoPhong}`}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Phòng {room.SoPhong}</h3>
        <p className="text-sm text-gray-500 mb-2">{roomType?.GhiChu || 'Loại phòng không xác định'}</p>
        <p className="text-base font-bold text-yellow-600 mb-4">Giá: {room.GiaPhong.toLocaleString()} VND</p>
        <Button
          onClick={() => onBookRoom(room.MaPhong)}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 cursor-pointer"
        >
          Đặt phòng ngay
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;
