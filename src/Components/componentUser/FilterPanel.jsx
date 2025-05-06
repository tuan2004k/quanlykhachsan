import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { promotions } from "../../Mock/mockData";

const FilterPanel = ({
  minPrice,
  maxPrice,
  minPriceLimit,
  maxPriceLimit,
  roomTypeOptions,
  selectedRoomTypes,
  onMinPriceChange,
  onMaxPriceChange,
  onRoomTypeChange,
  onResetFilter,
  promotionOptions = promotions.map(promo => promo.TenKhuyenMai),
  selectedPromotions = [],
  onPromotionChange,
}) => {
  const trackWidth = ((maxPrice - minPrice) / (maxPriceLimit - minPriceLimit)) * 100;
  const trackLeft = ((minPrice - minPriceLimit) / (maxPriceLimit - minPriceLimit)) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Lọc theo giá, loại phòng và khuyến mãi</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Chọn khoảng giá (VND)
          </label>
          <div className="relative h-6 px-4">
            <div
              className="absolute left-0 right-0 h-1.5 bg-gray-200 rounded-full"
              style={{ top: "9px", zIndex: 0 }}
            />
            <div
              className="absolute h-1.5 bg-blue-600 rounded-full"
              style={{
                width: `${trackWidth}%`,
                left: `${trackLeft}%`,
                top: "9px",
                zIndex: 1,
              }}
            />
            <input
              type="range"
              min={minPriceLimit}
              max={maxPriceLimit}
              step={Math.ceil((maxPriceLimit - minPriceLimit) / 100)}
              value={minPrice}
              onChange={(e) => onMinPriceChange(parseFloat(e.target.value))}
              className="absolute left-0 right-0 h-1.5 bg-transparent rounded-full appearance-none cursor-pointer"
              style={{ top: "9px", zIndex: 3 }}
              aria-label="Giá tối thiểu"
            />
            <input
              type="range"
              min={minPriceLimit}
              max={maxPriceLimit}
              step={Math.ceil((maxPriceLimit - minPriceLimit) / 100)}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(parseFloat(e.target.value))}
              className="absolute left-0 right-0 h-1.5 bg-transparent rounded-full appearance-none cursor-pointer"
              style={{ top: "9px", zIndex: 2 }}
              aria-label="Giá tối đa"
            />
          </div>
          <div className="flex justify-between mt-4 px-4">
            <span className="text-sm text-gray-600">{minPrice.toLocaleString()} VND</span>
            <span className="text-sm text-gray-600">{maxPrice.toLocaleString()} VND</span>
          </div>
        </div>
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
                  onChange={() => onRoomTypeChange(roomType)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {roomType === "standard"
                    ? "Tiêu chuẩn"
                    : roomType === "deluxe"
                    ? "Cao cấp"
                    : roomType === "suite"
                    ? "Hạng sang"
                    : roomType}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          
        </div>
        <Button
          onClick={onResetFilter}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  minPriceLimit: PropTypes.number.isRequired,
  maxPriceLimit: PropTypes.number.isRequired,
  roomTypeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedRoomTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMinPriceChange: PropTypes.func.isRequired,
  onMaxPriceChange: PropTypes.func.isRequired,
  onRoomTypeChange: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired,
  promotionOptions: PropTypes.arrayOf(PropTypes.string),
  selectedPromotions: PropTypes.arrayOf(PropTypes.string),
  onPromotionChange: PropTypes.func,
};

export default FilterPanel;