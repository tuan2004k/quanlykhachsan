import React from "react";

const Item = ({ image, title, price, address }) => {
  return (
    <div className="w-[295px] border border-gray-300 rounded-lg overflow-hidden shadow-md font-sans">
      <img
        src={image}
        alt={title}
        className="w-[295px] h-[220px] object-cover"
      />
      <div className="p-3">
        <h3 className="mb-2 font-bold text-base">{title}</h3>
        <p className="mb-1 text-red-600 font-medium">{price}</p>
        <p className="text-sm text-gray-700">{address}</p>
      </div>
    </div>
  );
};

export default Item;
