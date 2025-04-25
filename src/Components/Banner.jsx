// src/components/Banner.jsx
import React, { useState, useEffect } from 'react';
import bannerImage1 from '../assets/Image/Hotel.jpg';
import bannerImage2 from '../assets/Image/hotel2.jpeg'; // Thêm các ảnh khác
import bannerImage3 from '../assets/Image/hotel3.jpg';

const banners = [
  {
    image: bannerImage1,
    title: 'Chào mừng đến với Khách Sạn 8Bross',
    description: 'Trải nghiệm không gian nghỉ dưỡng thoải mái và hiện đại.',
  },
  {
    image: bannerImage2,
    title: 'Khám phá sự sang trọng',
    description: 'Nghỉ dưỡng đẳng cấp với dịch vụ 5 sao.',
  },
  {
    image: bannerImage3,
    title: 'Thư giãn tuyệt đối',
    description: 'Hòa mình vào không gian yên bình và tiện nghi.',
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển đổi sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // 5000ms = 5 giây

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, []);

  // Xử lý chuyển đổi thủ công
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const { image, title, description } = banners[currentIndex];

  return (
    <div
      className="relative w-full h-[350px] bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 flex gap-2 left-1/2 transform -translate-x-1/2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;