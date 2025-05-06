import React from 'react';
import { Table, Button,Popconfirm,Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const RoomList = ({ rooms, onEdit, onDelete }) => {
  const columns = [
    { title: 'Mã Phòng', dataIndex: 'maPhong', key: 'maPhong' },
    { title: 'Số Phòng', dataIndex: 'soPhong', key: 'soPhong' },
    { title: 'Loại Phòng', dataIndex: 'ghiChu', key: 'ghiChu' },
    { title: 'Số Giường', dataIndex: 'soGiuong', key: 'soGiuong' },
    {
      title: 'Trạng Thái',
      dataIndex: 'tinhTrangPhong',
      key: 'tinhTrangPhong',
      render: (status) => (
        <span className={status === 0 ? 'text-green-600' : 'text-red-600'}>
          {status === 0 ? 'Trống' : 'Đã sử dụng'}
        </span>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa khuyến mãi này?"
            onConfirm={() => onDelete(record.maPhong)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              icon={<DeleteOutlined />}
              className="bg-red-600 text-white hover:bg-red-700"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={rooms}
      rowKey="maPhong"
      pagination={false}
      className="bg-white rounded-lg shadow-md"
    />
  );
};

export default RoomList;