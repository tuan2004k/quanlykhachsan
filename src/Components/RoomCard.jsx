// src/components/RoomCard.jsx
import React from 'react';
import { rooms, roomTypes } from '../Mock/mockData';
import Button from '../Components/Button';

const RoomCard = ({ roomId, onBookRoom }) => {
  const room = rooms.find((r) => r.MaPhong === roomId);

  if (!room) return <div className="text-center text-gray-500">Không tìm thấy thông tin phòng.</div>;

  const roomType = roomTypes.find((rt) => rt.MaLoaiPhong === room.LoaiPhong);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 sm:max-w-xs md:max-w-sm">
      <img
        className="w-full h-48 object-cover sm:h-40 md:h-48"
        src={room.Anh || 'https://source.unsplash.com/featured/?hotel-room'}
        alt={`Phòng ${room.SoPhong}`}
        loading="lazy" // Tối ưu tải hình ảnh
      />
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 sm:text-xl">
          Phòng {room.SoPhong}
        </h3>
        <p className="text-xs text-gray-500 mb-2 sm:text-sm">
          {roomType?.GhiChu || 'Loại phòng không xác định'}
        </p>
        <p className="text-sm font-bold text-yellow-600 mb-4 sm:text-base">
          Giá: {room.GiaPhong.toLocaleString()} VND
        </p>
        <Button
          onClick={() => onBookRoom(room.MaPhong)}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
        >
          Đặt phòng ngay
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;