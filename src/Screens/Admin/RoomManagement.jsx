import React, { useState, useEffect } from 'react';
import { Button, Spin, Pagination as AntdPagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import RoomList from '../../Components/componentsAdmin/RoomList';
import RoomFilter from '../../Components/componentsAdmin/RoomFilter';
import RoomForm from '../../Components/componentsAdmin/RoomForm';
import DeleteConfirmModal from '../../Components/componentsAdmin/DeleteConfirmModal';
import { getRooms, addRoom, updateRoom, deleteRoom } from '../../apis/apiroom';
import SideBar from '../../Components/componentsAdmin/SideBar';
import Header from '../../Common/Header';

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalRecords: 0 });
    const [filters, setFilters] = useState({ search: '', status: '', type: '' });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
            }

            const response = await getRooms(pagination.page, pagination.pageSize);
            console.log('API Response:', response);

            if (!response || typeof response !== 'object') {
                throw new Error('Phản hồi API không hợp lệ');
            }

            const fetchedRooms = Array.isArray(response.data) ? response.data : response || [];
            setRooms(fetchedRooms);
            setPagination({
                page: response.page || 1,
                pageSize: response.pageSize || 10,
                totalPages: response.totalPages || Math.ceil((response.totalRecords || fetchedRooms.length) / (response.pageSize || 10)) || 1,
                totalRecords: response.totalRecords || fetchedRooms.length || 0,
            });
        } catch (error) {
            console.error('Lỗi khi gọi API:', error.message);
            toast.error('Lỗi khi tải danh sách phòng: ' + error.message);
            setRooms([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [pagination.page, pagination.pageSize]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPagination({ ...pagination, page: 1 });
    };

    const handleAddRoom = () => {
        setEditingRoom(null);
        setIsFormVisible(true);
    };

    const handleEditRoom = (room) => {
        setEditingRoom(room);
        setIsFormVisible(true);
    };

    const handleDeleteRoom = (maPhong) => {
        setRoomToDelete(maPhong);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteRoom(roomToDelete);
            toast.success('Xóa phòng thành công');
            fetchRooms();
        } catch (error) {
            console.error('Lỗi khi xóa phòng:', error.message);
            toast.error('Lỗi khi xóa phòng: ' + error.message);
        } finally {
            setIsDeleteModalVisible(false);
            setRoomToDelete(null);
        }
    };

    const handleSaveRoom = async (values) => {
        try {
            if (editingRoom) {
                await updateRoom({ ...editingRoom, ...values });
                toast.success('Cập nhật phòng thành công');
            } else {
                await addRoom(values);
                toast.success('Thêm phòng thành công');
            }
            fetchRooms();
            setIsFormVisible(false);
        } catch (error) {
            console.error('Lỗi khi lưu phòng:', error.message);
            toast.error('Lỗi khi lưu phòng: ' + error.message);
        }
    };

    const filteredRooms = rooms.filter((room) => {
        const searchText = filters.search.toLowerCase();
        const matchesSearch =
            (room.soPhong || '').toLowerCase().includes(searchText) ||
            (room.maPhong || '').toString().toLowerCase().includes(searchText);
        const matchesStatus = filters.status === '' || (room.tinhTrangPhong !== undefined && room.tinhTrangPhong.toString() === filters.status);
        const matchesType = filters.type === '' || (room.maLoaiPhong !== undefined && room.maLoaiPhong.toString() === filters.type);
        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="flex h-screen ">
            <SideBar />
            <div className="flex flex-col flex-1">
                <Header />

                <div className="flex-1 p-6 bg-gray-100 min-h-scree overflow-auto">
                    <h1 className="text-2xl font-bold mb-4">Quản Lý Phòng</h1>
                    <Button
                        type="primary"
                        onClick={handleAddRoom}
                        className="mb-4 bg-blue-500 hover:bg-blue-600 border-none"
                    >
                        Thêm Phòng
                    </Button>
                    <RoomFilter onFilterChange={handleFilterChange} />
                    {loading ? (
                        <div className="flex justify-center my-10">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <RoomList rooms={filteredRooms} onEdit={handleEditRoom} onDelete={handleDeleteRoom} />
                    )}
                    <AntdPagination
                        current={pagination.page}
                        pageSize={pagination.pageSize}
                        total={pagination.totalRecords}
                        onChange={(page, pageSize) => setPagination({ ...pagination, page, pageSize })}
                        showSizeChanger
                        pageSizeOptions={['10', '20', '50']}
                        className="mt-4 flex justify-end"
                    />
                    <RoomForm
                        visible={isFormVisible}
                        onCancel={() => setIsFormVisible(false)}
                        onSave={handleSaveRoom}
                        room={editingRoom}
                    />
                    <DeleteConfirmModal
                        visible={isDeleteModalVisible}
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setIsDeleteModalVisible(false)}
                    />
                    <ToastContainer />
                </div>
                );
            </div>
        </div>
    );
};

export default RoomManagement;