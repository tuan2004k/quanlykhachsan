import React from 'react';
import { promotions } from '../../Mock/mockData';

const PromotionCard = ({ promotionId }) => {
  const promotion = promotions.find((p) => p.MaKhuyenMai === promotionId);

  if (!promotion) return <div className="text-center text-gray-500">Không tìm thấy thông tin khuyến mãi.</div>;

  return (
    <div className="w-full max-w-sm bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 sm:max-w-xs md:max-w-sm">
      <img
        className="w-full h-32 object-cover sm:h-28 md:h-32"
        src="https://source.unsplash.com/featured/?sale,discount"
        alt={`Khuyến mãi ${promotion.TenKhuyenMai}`}
        loading="lazy"
      />
      <div className="p-4 sm:p-5">
        <h3 className="text-xl font-bold uppercase mb-2 sm:text-2xl">
          {promotion.TenKhuyenMai}
        </h3>
        <p className="text-lg font-bold mb-2">
          Giảm {promotion.GiaTriKhuyenMai}{promotion.KieuKhuyenMai === "Phan tram" ? "%" : " VND"}
        </p>
        <p className="text-sm mb-2">
          {promotion.MoTaKhuyenMai}
        </p>
        <p className="text-xs opacity-80">
          Từ {promotion.NgayBatDau} đến {promotion.NgayKetThuc}
        </p>
      </div>
    </div>
  );
};

export default PromotionCard;