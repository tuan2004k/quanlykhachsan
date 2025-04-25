// src/components/HorizontalSearchBox.jsx
import React, { useState } from 'react';

const HorizontalSearchBox = ({ onSearch }) => {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName.trim()) {
      onSearch({ roomName });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 -mt-24 relative z-10 "
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Room Name */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Room Name
          </label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default HorizontalSearchBox;