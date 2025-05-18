import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const ServiceForm = ({ visible, onCancel, onSave, service }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (service) {
            form.setFieldsValue(service);
        }
    }, [service, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                const payload = service ? { ...values, maDichVu: service.maDichVu } : values;
                onSave(payload);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title={service ? 'Sửa Dịch Vụ' : 'Thêm Dịch Vụ'}
            open={visible}
            onOk={handleOk}
            onCancel={() => {
                onCancel();
                form.resetFields();
            }}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical" initialValues={service}>
              
                <Form.Item
                    name="tenDichVu"
                    label="Tên Dịch Vụ"
                    rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="loaiDichVu"
                    label="Loại Dịch Vụ"
                    rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
                >
                    <Select>
                        <Option value={1}>Dịch vụ phòng</Option>
                        {/* Thêm các loại dịch vụ khác nếu cần */}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="ghiChu"
                    label="Ghi Chú"
                    rules={[{ required: false }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ServiceForm;