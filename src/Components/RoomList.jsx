import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ filteredRooms, onBookRoom }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <RoomCard
            className="pb-4"
            key={room.maPhong}
            room={room} // Truyền toàn bộ object room
            onBookRoom={onBookRoom}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          Không tìm thấy phòng phù hợp.
        </p>
      )}
    </div>
  );
};

export default RoomList;