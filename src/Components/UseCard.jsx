import React from "react";

const UserCard = ({
  image = "https://randomuser.me/api/portraits/lego/1.jpg",
  name = "Tên người dùng",
  info = "Chức vụ hoặc mô tả ngắn",
  onEdit = () => alert("Chỉnh sửa người dùng"),
  onDelete = () => alert("Xoá người dùng"),
}) => {
  return (
    <div className="flex items-start border border-gray-300 rounded-xl p-4 max-w-[500px] shadow-md bg-white">
      <img
        src={image}
        alt={name}
        className="w-[100px] h-[100px] rounded-xl object-cover mr-5"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="m-0 font-semibold text-lg">{name}</h3>
          <p className="mt-1 text-gray-600">{info}</p>
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={onEdit}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
