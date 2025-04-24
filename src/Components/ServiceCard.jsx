// src/components/ServiceCard.jsx
import React from 'react';
import { services } from '../mockData';

const ServiceCard = ({ serviceId }) => {
  const service = services.find(s => s.MaDichVu === serviceId);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">{service.TenDichVu}</h3>
      <p className="text-gray-600">{service.GhiChu}</p>
      <button className="bg-yellow-400 text-white px-4 py-2 mt-4 rounded-md hover:bg-yellow-500">
        Đặt dịch vụ
      </button>
    </div>
  );
};

export default ServiceCard;
