import React, { useState, useEffect } from 'react';
import { Button, Spin, Table, Input, Select, Modal, Popconfirm, Space } from 'antd';
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

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const response = await getStaff();
            console.log('API Response:', response);
            if (!response || typeof response !== 'object') {
                throw new Error('Phản hồi API không hợp lệ');
            }
            const fetchedStaff = Array.isArray(response.data) ? response.data : response || [];
            setStaff(fetchedStaff);
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
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleAddStaff = () => {
        setEditingStaff(null);
        setIsFormVisible(true);
    };

    const handleEditStaff = (record) => {
        setEditingStaff(record);
        setIsFormVisible(true);
    };

    const handleDeleteStaff = (cccd) => {
        setStaffToDelete(cccd);
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
            console.error('Lỗi khi lưu nhân viên:', error.message);
            toast.error('Lỗi khi lưu nhân viên: ' + error.message);
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
        },
        {
            title: 'Họ',
            dataIndex: 'ho',
            key: 'ho',
        },
        {
            title: 'Tên',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            key: 'sdt',
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
        },
        {
            title: 'Vai trò',
            dataIndex: 'vaiTro',
            key: 'vaiTro',
            render: (vaiTro) => (vaiTro === 0 ? 'Nhân viên' : 'Quản lý'),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEditStaff(record)}
                        className="bg-blue-900 text-blue-600 hover:bg-blue-700"
                    />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa khuyến mãi này?"
                        onConfirm={() => handleDeleteStaff(record.maNhanVien)}
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
        <div className="flex h-screen ">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-6 bg-gray-100 overflow-auto">

                    <h1 className="text-2xl font-bold mb-4">Quản Lý Nhân Viên</h1>
                    <Button
                        type="primary"
                        onClick={handleAddStaff}
                        className="mb-4 bg-blue-500 hover:bg-blue-600 border-none"
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
                            <Option value="0">Nhân viên</Option>
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
                            rowKey="cccd"
                            pagination={false}
                            className="shadow-md rounded-lg"
                        />
                    )}
                    <Modal
                        title={editingStaff ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}
                        visible={isFormVisible}
                        onCancel={() => setIsFormVisible(false)}
                        footer={null}
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const values = {
                                    maNhanVien: formData.get('maNhanVien'),
                                    ho: formData.get('ho'),
                                    ten: formData.get('ten'),
                                    email: formData.get('email'),
                                    sdt: formData.get('sdt'),
                                    cccd: formData.get('cccd'),
                                    vaiTro: parseInt(formData.get('vaiTro')),
                                    matKhau: formData.get('matKhau'),
                                };
                                handleSaveStaff(values);
                            }}
                        >
                            <div className="mb-4">
                                <label className="block mb-1 ">Mã nhân viên</label>
                                <Input name="maNhanVien" defaultValue={editingStaff?.maNhanVien} disabled={!!editingStaff} />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Họ</label>
                                <Input name="ho" defaultValue={editingStaff?.ho} required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Tên</label>
                                <Input name="ten" defaultValue={editingStaff?.ten} required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Email</label>
                                <Input name="email" type="email" defaultValue={editingStaff?.email} required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Số điện thoại</label>
                                <Input name="sdt" defaultValue={editingStaff?.sdt} required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">CCCD</label>
                                <Input name="cccd" defaultValue={editingStaff?.cccd} required disabled={!!editingStaff} />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Vai trò</label>
                                <Select
                                    name="vaiTro"
                                    defaultValue={editingStaff?.vaiTro.toString()}
                                    className="w-full"
                                    required
                                >
                                    <Option value="0">Nhân viên</Option>
                                    <Option value="1">Quản lý</Option>
                                </Select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Mật khẩu</label>
                                <Input name="matKhau" type="password" defaultValue={editingStaff?.matKhau} required />
                            </div>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Lưu
                            </Button>
                        </form>
                    </Modal>
                    <Modal
                        title="Xác nhận xóa"
                        visible={isDeleteModalVisible}
                        onOk={handleConfirmDelete}
                        onCancel={() => setIsDeleteModalVisible(false)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ className: 'bg-red-500 hover:bg-red-600' }}
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