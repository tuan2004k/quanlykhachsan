import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { fetchPromotions, fetchPromotionTypes, createPromotion, updatePromotion, deletePromotion } from '../../apis/apipromotion';
import SideBar from '../../Components/componentsAdmin/SideBar';
import Header from '../../Common/Header';

const { RangePicker } = DatePicker;
const { Option } = Select;

const PromotionsPage = () => {
    const [form] = Form.useForm();
    const [promotions, setPromotions] = useState([]);
    const [promotionTypes, setPromotionTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPromo, setCurrentPromo] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const loadPromotions = async (page = 1, pageSize = 10) => {
        setLoading(true);
        const data = await fetchPromotions(page, pageSize);
        setPromotions(data);
        setPagination({
            current: page,
            pageSize,
            total: data.length ? data.length * 10 : 0,
        });
        setLoading(false);
    };

    const loadPromotionTypes = async () => {
        const types = await fetchPromotionTypes();
        if (types.length === 0 || !types.every(type => type.id && type.tenKieuKhuyenMai)) {
            // Sử dụng giá trị mặc định nếu API không trả về dữ liệu hợp lệ
            setPromotionTypes([
                { id: 1, tenKieuKhuyenMai: 'Phần trăm' },
                { id: 2, tenKieuKhuyenMai: 'Trực tiếp' },
            ]);
        } else {
            setPromotionTypes(types);
        }
    };

    useEffect(() => {
        loadPromotions();
        loadPromotionTypes();
    }, []);

    const handleTableChange = (pagination) => {
        loadPromotions(pagination.current, pagination.pageSize);
    };

    const handleCreate = () => {
        form.resetFields();
        setIsEditing(false);
        setModalVisible(true);
    };

    const handleEdit = (promo) => {
        setCurrentPromo(promo);
        setIsEditing(true);
        form.setFieldsValue({
            tenKhuyenMai: promo.tenKhuyenMai,
            moTaKhuyenMai: promo.moTaKhuyenMai,
            dateRange: [moment(promo.ngayBatDau), moment(promo.ngayKetThuc)],
            giaTriKhuyenMai: promo.giaTriKhuyenMai,
            kieuKhuyenMai: parseInt(promo.kieuKhuyenMai), // Đảm bảo là số
            ghiChu: promo.ghiChu,
        });
        setModalVisible(true);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const promoData = {
                tenKhuyenMai: values.tenKhuyenMai,
                moTaKhuyenMai: values.moTaKhuyenMai,
                ngayBatDau: values.dateRange[0].format('YYYY-MM-DD'),
                ngayKetThuc: values.dateRange[1].format('YYYY-MM-DD'),
                giaTriKhuyenMai: parseFloat(values.giaTriKhuyenMai) || 0,
                kieuKhuyenMai: parseInt(values.kieuKhuyenMai), // Đảm bảo là số
                ghiChu: values.ghiChu || '',
            };

            if (!moment(promoData.ngayBatDau).isValid() || !moment(promoData.ngayKetThuc).isValid()) {
                throw new Error('Ngày không hợp lệ!');
            }

            if (isNaN(promoData.kieuKhuyenMai) || promoData.kieuKhuyenMai < 0 || promoData.kieuKhuyenMai > 255) {
                throw new Error('Kiểu khuyến mãi không hợp lệ!');
            }

            let result;
            if (isEditing) {
                result = await updatePromotion(currentPromo.maKhuyenMai, promoData);
                if (result) {
                    setPromotions(promotions.map(p => (p.maKhuyenMai === currentPromo.maKhuyenMai ? result : p)));
                    message.success('Cập nhật khuyến mãi thành công!');
                } else {
                    message.error('Cập nhật khuyến mãi thất bại!');
                }
            } else {
                result = await createPromotion(promoData);
                if (result) {
                    setPromotions([...promotions, result]);
                    message.success('Tạo khuyến mãi thành công!');
                } else {
                    message.error('Tạo khuyến mãi thất bại!');
                }
            }
            setModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Lỗi khi gửi form:', error.message);
            message.error(`Vui lòng kiểm tra lại thông tin! Chi tiết: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        const success = await deletePromotion(id);
        if (success) {
            setPromotions(promotions.filter(p => p.maKhuyenMai !== id));
            message.success('Xóa khuyến mãi thành công!');
        } else {
            message.error('Xóa khuyến mãi thất bại!');
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên Khuyến mãi',
            dataIndex: 'tenKhuyenMai',
            key: 'tenKhuyenMai',
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTaKhuyenMai',
            key: 'moTaKhuyenMai',
        },
        {
            title: 'Ngày Bắt đầu',
            dataIndex: 'ngayBatDau',
            key: 'ngayBatDau',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Ngày Kết thúc',
            dataIndex: 'ngayKetThuc',
            key: 'ngayKetThuc',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Giá trị',
            dataIndex: 'giaTriKhuyenMai',
            key: 'giaTriKhuyenMai',
        },
        {
            title: 'Kiểu',
            dataIndex: 'kieuKhuyenMai',
            key: 'kieuKhuyenMai',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghiChu',
            key: 'ghiChu',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa khuyến mãi này?"
                        onConfirm={() => handleDelete(record.maKhuyenMai)}
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
            <SideBar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="p-6 bg-gray-100 overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý Khuyến mãi</h1>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleCreate}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                        >
                            Tạo Khuyến mãi
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={promotions}
                        rowKey="maKhuyenMai"
                        loading={loading}
                        pagination={pagination}
                        onChange={handleTableChange}
                        className="bg-white rounded-lg shadow-md"
                        rowClassName="hover:bg-gray-50"
                    />
                    <Modal
                        classNames={"pb-2"}
                        title={isEditing ? 'Chỉnh sửa Khuyến mãi' : 'Tạo Khuyến mãi'}
                        visible={modalVisible}
                        onOk={handleSubmit}
                        onCancel={() => {
                            setModalVisible(false);
                            form.resetFields();
                        }}
                        okText={isEditing ? 'Cập nhật' : 'Tạo'}
                        cancelText="Hủy"
                        className="rounded-lg"
                    >
                        <Form form={form} layout="vertical" className="space-y-4">
                            <Form.Item
                                name="tenKhuyenMai"
                                label="Tên Khuyến mãi"
                                rules={[{ required: true, message: 'Vui lòng nhập tên khuyến mãi!' }]}
                            >
                                <Input placeholder="Nhập tên khuyến mãi" />
                            </Form.Item>
                            <Form.Item
                                name="moTaKhuyenMai"
                                label="Mô tả"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                            >
                                <Input.TextArea className="h-20" rows={2} placeholder="Nhập mô tả khuyến mãi" />
                            </Form.Item>
                            <Form.Item
                                name="dateRange"
                                label="Thời gian"
                                rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
                            >
                                <RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="giaTriKhuyenMai"
                                label="Giá trị (VNĐ nếu Trực tiếp, % nếu Phần trăm)"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá trị khuyến mãi!' },
                                    { type: 'number', min: 0, message: 'Giá trị phải lớn hơn hoặc bằng 0!' },
                                ]}
                                normalize={(value) => (value ? parseFloat(value) : value)}
                            >
                                <Input type="number" placeholder="Nhập giá trị khuyến mãi" />
                            </Form.Item>
                            <Form.Item
                                name="kieuKhuyenMai"
                                label="Kiểu Khuyến mãi"
                                rules={[{ required: true, message: 'Vui lòng chọn kiểu khuyến mãi!' }]}
                            >
                                <Select placeholder="Chọn kiểu khuyến mãi">
                                    {promotionTypes.map(type => (
                                        <Option key={type.id} value={type.id}>
                                            {type.tenKieuKhuyenMai}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="ghiChu"
                                label="Ghi chú"
                            >
                                <Input.TextArea rows={2} placeholder="Nhập ghi chú (tùy chọn)" />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default PromotionsPage;