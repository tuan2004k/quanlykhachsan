import React, { useState, useEffect } from 'react';
import { fetchPromotions } from '../../apis/apipromotion';

const PromotionBanner = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadPromotions = async () => {
      setLoading(true);
      const data = await fetchPromotions(1, 10); 
      setPromotions(data);
      setLoading(false);
    };
    loadPromotions();
  }, []);

  useEffect(() => {
    if (promotions.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); 

      return () => clearInterval(interval); 
    }
  }, [promotions]);

  if (loading) return <div className="text-center text-gray-500">Đang tải khuyến mãi...</div>;
  if (promotions.length === 0) return <div className="text-center text-gray-500">Không có khuyến mãi nào.</div>;

  return (
    <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden relative">
      <div
        className="flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {promotions.map((promotion) => (
          <div
            key={promotion.maKhuyenMai}
            className="flex-shrink-0 w-full h-full flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white mb-20"
          >
            <img
              className="w-1/3 h-full object-cover"
              src="https://source.unsplash.com/featured/?sale,discount"
              alt={`Khuyến mãi ${promotion.tenKhuyenMai}`}
              loading="lazy"
            />
            <div className="p-4 sm:p-6 flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-2">
                {promotion.tenKhuyenMai}
              </h3>
              <p className="text-lg sm:text-xl font-bold mb-2">
                Giảm {promotion.giaTriKhuyenMai}{promotion.kieuKhuyenMai === "Phan tram" ? "%" : " VND"}
              </p>
              <p className="text-sm sm:text-base mb-2">
                {promotion.moTaKhuyenMai}
              </p>
              <p className="text-xs sm:text-sm opacity-80">
                Từ {promotion.ngayBatDau} đến {promotion.ngayKetThuc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white scale-125' : 'bg-gray-300 opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionBanner;