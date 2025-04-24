// src/components/BookingModal.jsx
import React, { useState } from 'react';
import { rooms, customers } from '../Mock/mockData';

const BookingModal = ({ roomId, customerId, isOpen, closeModal }) => {
  const room = rooms.find(r => r.MaPhong === roomId);
  const customer = customers.find(c => c.MaKhachHang === customerId);
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    alert(`Đặt phòng thành công cho ${customer.Ho} ${customer.Ten} vào ngày ${date}`);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Đặt phòng: {room.SoPhong}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm">Ngày nhận phòng</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={closeModal} className="text-gray-500 mr-4">Hủy</button>
            <button type="submit" className="bg-yellow-400 text-white px-6 py-2 rounded-md hover:bg-yellow-500">Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
