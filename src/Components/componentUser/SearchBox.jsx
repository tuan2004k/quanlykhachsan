// src/components/HorizontalSearchBox.jsx
import React, { useState } from 'react';

const HorizontalSearchBox = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bạn có thể validate ở đây trước khi gọi callback
    onSearch({ location, checkIn, checkOut, rooms, adults });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 -mt-24 relative z-10"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Location */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Where are you headed?
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, hotel, landmark..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Check‑in */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Check in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Check‑out */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Check out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Rooms */}
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Rooms
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(+e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[...Array(5)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>

        {/* Adults */}
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Adults
          </label>
          <select
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[...Array(5)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default HorizontalSearchBox;
