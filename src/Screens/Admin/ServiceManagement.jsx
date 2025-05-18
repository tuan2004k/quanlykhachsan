import React, { useState, useEffect } from 'react';
import { Button, Spin, Pagination } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import ServiceList from '../../Components/componentsAdmin/ServiceList';
import ServiceForm from '../../Components/componentsAdmin/ServiceForm';
import DeleteConfirmModal from '../../Components/componentsAdmin/DeleteConfirmModal';
import { getServices, addService, updateService, deleteService } from '../../apis/apiservice';
import SideBar from '../../Components/componentsAdmin/SideBar';
import Header from '../../Common/Header';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalRecords: 0 });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
            }

            const response = await getServices(pagination.page, pagination.pageSize);
            console.log('Service API Response:', response);

            if (!response || typeof response !== 'object') {
                throw new Error('Phản hồi API không hợp lệ');
            }

            const fetchedServices = Array.isArray(response.data) ? response.data : [];
            setServices(fetchedServices);
            setPagination({
                page: response.page || 1,
                pageSize: response.pageSize || 10,
                totalPages: response.totalPages || Math.ceil((response.totalRecords || fetchedServices.length) / (response.pageSize || 10)) || 1,
                totalRecords: response.totalRecords || fetchedServices.length || 0,
            });
        } catch (error) {
            console.error('Lỗi khi gọi API:', error.message);
            toast.error('Lỗi khi tải danh sách dịch vụ: ' + error.message);
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [pagination.page, pagination.pageSize]);

    const handleAddService = () => {
        setEditingService(null);
        setIsFormVisible(true);
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setIsFormVisible(true);
    };

    const handleDeleteService = (maDichVu) => {
        setServiceToDelete(maDichVu);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteService(serviceToDelete);
            toast.success('Xóa dịch vụ thành công');
            fetchServices();
        } catch (error) {
            console.error('Lỗi khi xóa dịch vụ:', error.message);
            toast.error('Lỗi khi xóa dịch vụ: ' + error.message);
        } finally {
            setIsDeleteModalVisible(false);
            setServiceToDelete(null);
        }
    };

    const handleSaveService = async (values) => {
        try {
            if (editingService) {
                await updateService({ ...editingService, ...values });
                toast.success('Cập nhật dịch vụ thành công');
            } else {
                await addService(values);
                toast.success('Thêm dịch vụ thành công');
            }
            fetchServices();
            setIsFormVisible(false);
        } catch (error) {
            console.error('Lỗi khi lưu dịch vụ:', error.message);
            toast.error('Lỗi khi lưu dịch vụ: ' + error.message);
        }
    };

    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                    <h1 className="text-2xl font-bold mb-4">Quản Lý Dịch Vụ</h1>
                    <Button
                        type="primary"
                        onClick={handleAddService}
                        className="mb-4"
                    >
                        Thêm Dịch Vụ
                    </Button>
                    {loading ? (
                        <div className="flex justify-center my-10">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <ServiceList
                            services={services}
                            onEdit={handleEditService}
                            onDelete={handleDeleteService}
                        />
                    )}
                    <Pagination
                        current={pagination.page}
                        pageSize={pagination.pageSize}
                        total={pagination.totalRecords}
                        onChange={(page, pageSize) => setPagination({ ...pagination, page, pageSize })}
                        showSizeChanger
                        pageSizeOptions={['10', '20', '50']}
                        className="mt-4"
                        style={{ textAlign: 'right' }}
                    />
                    <ServiceForm
                        visible={isFormVisible}
                        onCancel={() => setIsFormVisible(false)}
                        onSave={handleSaveService}
                        service={editingService}
                    />
                    <DeleteConfirmModal
                        visible={isDeleteModalVisible}
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setIsDeleteModalVisible(false)}
                    />
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default ServiceManagement;