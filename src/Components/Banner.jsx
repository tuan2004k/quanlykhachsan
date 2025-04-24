// src/components/Banner.jsx
import React from 'react';
import bannerImage from '../assets/Image/Hotel.jpg'; // Đường dẫn tới ảnh trong thư mục

const Banner = () => {
  return (
    <div className="relative w-full h-[350px] bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Khách Sạn 8Bross</h1>
        <p className="text-lg">Trải nghiệm không gian nghỉ dưỡng thoải mái và hiện đại cho khách hàng.</p>
      </div>
    </div>
  );
};

export default Banner;