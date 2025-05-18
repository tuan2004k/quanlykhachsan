import React from 'react';
import { Table, Button, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ServiceList = ({ services, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Mã Dịch Vụ',
            dataIndex: 'maDichVu',
            key: 'maDichVu',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Tên Dịch Vụ',
            dataIndex: 'tenDichVu',
            key: 'tenDichVu',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Loại Dịch Vụ',
            dataIndex: 'tenLoaiDichVu',
            key: 'tenLoaiDichVu',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Ghi Chú',
            dataIndex: 'ghiChu',
            key: 'ghiChu',
            render: (text) => text || 'N/A',
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
                        title="Bạn có chắc muốn xóa dịch vụ này?"
                        onConfirm={() => onDelete(record.maDichVu)}
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
            dataSource={Array.isArray(services) ? services : []}
            rowKey="maDichVu"
            pagination={false}
            locale={{ emptyText: 'Không có dịch vụ nào' }}
        />
    );
};

export default ServiceList;