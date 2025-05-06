import React from 'react';
import Button from '../Components/Button';


const RoomCard = ({ room, onBookRoom }) => {
  if (!room) return <div className="text-center text-gray-500">Không tìm thấy thông tin phòng.</div>;

  return (
    <div className="pb-15">
      <div className="relative w-full max-w-sm sm:max-w-xs md:max-w-sm group cursor-pointer">
        <div className="bg-white border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img
            className="w-full h-48 object-cover sm:h-40 md:h-48"
            src={room.anh || 'https://source.unsplash.com/featured/?hotel-room'}
            alt={`Phòng ${room.soPhong}`}
            loading="lazy"
          />
          <div className="p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 sm:text-xl">
              Phòng {room.soPhong}
            </h3>
            <p className="text-xs text-gray-500 mb-2 sm:text-sm">
              {room.ghiChu || 'Loại phòng không xác định'}
            </p>
            <p className="text-sm text-gray-600 mb-4 sm:text-base">
              Số giường: {room.soGiuong}
            </p>
            {/* Nếu có giá phòng từ API, bỏ comment */}
            {/* <p className="text-sm font-bold text-yellow-600 mb-4 sm:text-base">
              Giá: {room.giaPhong?.toLocaleString() || 'Liên hệ'} VND
            </p> */}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-0 group-hover:translate-y-8 transition-all duration-300 opacity-0 group-hover:opacity-100 pt-2">
          <Button
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 hover:bg-blue-700 text-sm sm:text-base cursor-pointer"
            onClick={() => onBookRoom?.(room.maPhong)}
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;