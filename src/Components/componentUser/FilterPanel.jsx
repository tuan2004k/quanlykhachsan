import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { rooms } from '../../Mock/mockData';
import Button from '../Button'; // Import rooms to calculate dynamic range

const FilterPanel = ({ onFilter }) => {
  // Dynamic price range based on rooms data
  const minPriceLimit = Math.min(...rooms.map((r) => r.GiaPhong)) || 0;
  const maxPriceLimit = Math.max(...rooms.map((r) => r.GiaPhong)) || 10000000;
  const [minPrice, setMinPrice] = useState(minPriceLimit);
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit);

  // Dynamic room type options from rooms data
  const roomTypeOptions = [...new Set(rooms.map((r) => r.LoaiPhong).filter(Boolean))] || [
    'standard',
    'deluxe',
    'suite',
  ];
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  const handleApplyFilter = () => {
    if (minPrice > maxPrice) {
      alert('Giá tối thiểu phải nhỏ hơn hoặc bằng giá tối đa.');
      return;
    }
    onFilter({ minPrice, maxPrice, roomTypes: selectedRoomTypes });
  };

  const handleResetFilter = () => {
    setMinPrice(minPriceLimit);
    setMaxPrice(maxPriceLimit);
    setSelectedRoomTypes([]);
    onFilter({ minPrice: minPriceLimit, maxPrice: maxPriceLimit, roomTypes: [] });
  };

  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
      onFilter({ minPrice: value, maxPrice, roomTypes: selectedRoomTypes }); // Real-time filtering
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
      onFilter({ minPrice, maxPrice: value, roomTypes: selectedRoomTypes }); // Real-time filtering
    }
  };

  const handleRoomTypeChange = (roomType) => {
    const updatedRoomTypes = selectedRoomTypes.includes(roomType)
      ? selectedRoomTypes.filter((type) => type !== roomType)
      : [...selectedRoomTypes, roomType];
    setSelectedRoomTypes(updatedRoomTypes);
    onFilter({ minPrice, maxPrice, roomTypes: updatedRoomTypes }); // Real-time filtering
  };

  // Calculate track width and position (fixed version)
  const trackWidth = ((maxPrice - minPrice) / (maxPriceLimit - minPriceLimit)) * 100;
  const trackLeft = ((minPrice - minPriceLimit) / (maxPriceLimit - minPriceLimit)) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Lọc theo giá và loại phòng</h2>
      <div className="space-y-6">
        {/* Price Range Sliders */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Chọn khoảng giá (VND)
          </label>
          <div className="relative h-6 px-4">
            {/* Background Track */}
            <div
              className="absolute left-0 right-0 h-1.5 bg-gray-200 rounded-full"
              style={{ top: '9px', zIndex: 0 }}
            />
            {/* Active Track */}
            <div
              className="absolute h-1.5 bg-blue-600 rounded-full"
              style={{
                width: `${trackWidth}%`,
                left: `${trackLeft}%`,
                top: '9px',
                zIndex: 1,
              }}
            />
            {/* Min Price Slider */}
            <input
              type="range"
              min={minPriceLimit}
              max={maxPriceLimit}
              step={Math.ceil((maxPriceLimit - minPriceLimit) / 100)} // Dynamic step
              value={minPrice}
              onChange={handleMinPriceChange}
              className="absolute left-0 right-0 h-1.5 bg-transparent rounded-full appearance-none cursor-pointer"
              style={{ top: '9px', zIndex: 3 }}
              aria-label="Giá tối thiểu"
            />
            {/* Max Price Slider */}
            <input
              type="range"
              min={minPriceLimit}
              max={maxPriceLimit}
              step={Math.ceil((maxPriceLimit - minPriceLimit) / 100)}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="absolute left-0 right-0 h-1.5 bg-transparent rounded-full appearance-none cursor-pointer"
              style={{ top: '9px', zIndex: 2 }}
              aria-label="Giá tối đa"
            />
          </div>
          {/* Display selected prices */}
          <div className="flex justify-between mt-4 px-4">
            <span className="text-sm text-gray-600">
              {minPrice.toLocaleString()} VND
            </span>
            <span className="text-sm text-gray-600">
              {maxPrice.toLocaleString()} VND
            </span>
          </div>
        </div>
        {/* Room Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Lọc theo loại phòng
          </label>
          <div className="space-y-2">
            {roomTypeOptions.map((roomType) => (
              <label key={roomType} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedRoomTypes.includes(roomType)}
                  onChange={() => handleRoomTypeChange(roomType)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {roomType === 'standard'
                    ? 'Tiêu chuẩn'
                    : roomType === 'deluxe'
                    ? 'Cao cấp'
                    : roomType === 'suite'
                    ? 'Hạng sang'
                    : roomType}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* Apply Button */}
        <button
          onClick={handleApplyFilter}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Áp dụng bộ lọc
        </button>
        {/* Reset Button */}
        <Button
          onClick={handleResetFilter}
          className="w-full bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterPanel;