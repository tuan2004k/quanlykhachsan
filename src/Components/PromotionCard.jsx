// src/components/PromotionCard.jsx
import React from 'react';
import { promotions } from '../mockData';

const PromotionCard = ({ promotionId }) => {
  const promotion = promotions.find(p => p.MaKhuyenMai === promotionId);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">{promotion.TenKhuyenMai}</h3>
      <p className="text-gray-600">{promotion.MoTaKhuyenMai}</p>
      <p className="text-gray-800 font-bold mt-2">Giảm giá: {promotion.GiaTriKhuyenMai}%</p>
    </div>
  );
};

export default PromotionCard;
