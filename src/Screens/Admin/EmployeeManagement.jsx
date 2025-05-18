import React, { useState, useEffect } from 'react';
import { Button, Spin, Table, Input, Select, Modal, Popconfirm, Pagination, Form, Space } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getStaff, addStaff, updateStaff, deleteStaff } from '../../apis/apistaff';
import Sidebar from '../../Components/componentsAdmin/SideBar';
import Header from '../../Common/Header';

const { Option } = Select;

const StaffManagement = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ search: '', vaiTro: '' });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalRecords: 0 });

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const response = await getStaff(pagination.page, pagination.pageSize);
            console.log('API Response:', response);

            if (!response || typeof response !== 'object') {
                throw new Error('Phản hồi API không hợp lệ');
            }

            const fetchedStaff = Array.isArray(response.data) ? response.data : [];
            setStaff(fetchedStaff);
            setPagination({
                page: response.page || 1,
                pageSize: response.pageSize || 10,
                totalPages: response.totalPages || Math.ceil((response.totalRecords || fetchedStaff.length) / (response.pageSize || 10)) || 1,
                totalRecords: response.totalRecords || fetchedStaff.length || 0,
            });
        } catch (error) {
            console.error('Lỗi khi gọi API:', error.message);
            toast.error('Lỗi khi tải danh sách nhân viên: ' + error.message);
            setStaff([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, [pagination.page, pagination.pageSize]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPagination({ ...pagination, page: 1 }); // Reset về trang 1 khi lọc
    };

    const handleAddStaff = () => {
        setEditingStaff(null);
        setIsFormVisible(true);
    };

    const handleEditStaff = (record) => {
        setEditingStaff(record);
        setIsFormVisible(true);
    };

    const handleDeleteStaff = (maNhanVien) => {
        setStaffToDelete(maNhanVien);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteStaff(staffToDelete);
            toast.success('Xóa nhân viên thành công');
            fetchStaff();
        } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error.message);
            toast.error('Lỗi khi xóa nhân viên: ' + error.message);
        } finally {
            setIsDeleteModalVisible(false);
            setStaffToDelete(null);
        }
    };

    const handleSaveStaff = async (values) => {
        try {
            if (editingStaff) {
                await updateStaff({ ...editingStaff, ...values });
                toast.success('Cập nhật nhân viên thành công');
            } else {
                await addStaff(values);
                toast.success('Thêm nhân viên thành công');
            }
            fetchStaff();
            setIsFormVisible(false);
        } catch (error) {
            if (error.message.includes('Unexpected end of JSON input')) {
                toast.success(editingStaff ? 'Cập nhật nhân viên thành công' : 'Thêm nhân viên thành công');
                fetchStaff();
                setIsFormVisible(false);
            } else {
                console.error('Lỗi khi lưu nhân viên:', error.message);
                toast.error('Lỗi khi lưu nhân viên: ' + error.message);
            }
        }
    };

    const filteredStaff = staff.filter((employee) => {
        const searchText = filters.search.toLowerCase();
        const matchesSearch =
            (employee.ho || '').toLowerCase().includes(searchText) ||
            (employee.ten || '').toLowerCase().includes(searchText) ||
            (employee.email || '').toLowerCase().includes(searchText);
        const matchesVaiTro = filters.vaiTro === '' || employee.vaiTro.toString() === filters.vaiTro;
        return matchesSearch && matchesVaiTro;
    });

    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'maNhanVien',
            key: 'maNhanVien',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Họ',
            dataIndex: 'ho',
            key: 'ho',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Tên',
            dataIndex: 'ten',
            key: 'ten',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            key: 'sdt',
            render: (text) => text || 'N/A',
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Vai trò',
            dataIndex: 'vaiTro',
            key: 'vaiTro',
            render: (vaiTro) => (vaiTro === 1 ? 'Quản lý' : vaiTro === 2 ? 'Nhân Viên' : 'N/A'),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEditStaff(record)}
                        type="primary"
                        ghost
                    />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa nhân viên này?"
                        onConfirm={() => handleDeleteStaff(record.maNhanVien)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                    <h1 className="text-2xl font-bold mb-4">Quản Lý Nhân Viên</h1>
                    <Button
                        type="primary"
                        onClick={handleAddStaff}
                        className="mb-4"
                    >
                        Thêm Nhân Viên
                    </Button>
                    <div className="flex mb-4 space-x-4">
                        <Input
                            placeholder="Tìm kiếm theo họ, tên, hoặc email"
                            value={filters.search}
                            onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
                            className="w-64"
                        />
                        <Select
                            placeholder="Lọc theo vai trò"
                            value={filters.vaiTro}
                            onChange={(value) => handleFilterChange({ ...filters, vaiTro: value })}
                            className="w-32"
                        >
                            <Option value="">Tất cả</Option>
                            <Option value="2">Nhân viên</Option>
                            <Option value="1">Quản lý</Option>
                        </Select>
                    </div>
                    {loading ? (
                        <div className="flex justify-center my-10">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={filteredStaff}
                            rowKey="maNhanVien"
                            pagination={false}
                            className="shadow-md rounded-lg"
                        />
                    )}
                    <Pagination
                        current={pagination.page}
                        pageSize={pagination.pageSize}
                        total={pagination.totalRecords}
                        onChange={(page, pageSize) => setPagination({ ...pagination, page, pageSize })}
                        showSizeChanger
                        pageSizeOptions={['10', '20', '50']}
                        className="mt-10 flex justify-end items-center"
                        style={{ textAlign: 'right' }}
                    />
                    <Modal
                        title={editingStaff ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}
                        open={isFormVisible}
                        onCancel={() => setIsFormVisible(false)}
                        footer={null}
                    >
                        <Form
                            layout="vertical"
                            initialValues={editingStaff}
                            onFinish={handleSaveStaff}
                        >
                            <Form.Item
                                name="maNhanVien"
                                label="Mã nhân viên"
                                rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
                            >
                                <Input disabled={!!editingStaff} />
                            </Form.Item>
                            <Form.Item
                                name="ho"
                                label="Họ"
                                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="ten"
                                label="Tên"
                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không hợp lệ' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="sdt"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="cccd"
                                label="CCCD"
                                rules={[{ required: true, message: 'Vui lòng nhập CCCD' }]}
                            >
                                <Input disabled={!!editingStaff} />
                            </Form.Item>
                            <Form.Item
                                name="vaiTro"
                                label="Vai trò"
                                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                            >
                                <Select>
                                    <Option value={0}>Nhân viên</Option>
                                    <Option value={1}>Quản lý</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="matKhau"
                                label="Mật khẩu"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full">
                                    Lưu
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title="Xác nhận xóa"
                        open={isDeleteModalVisible}
                        onOk={handleConfirmDelete}
                        onCancel={() => setIsDeleteModalVisible(false)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <p>Bạn có chắc chắn muốn xóa nhân viên này?</p>
                    </Modal>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default StaffManagement;