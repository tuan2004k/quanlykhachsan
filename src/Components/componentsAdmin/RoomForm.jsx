import React from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const RoomForm = ({ visible, onCancel, onSave, room }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values); 
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={room ? 'Sửa Phòng' : 'Thêm Phòng'}
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      okText="Lưu"
      cancelText="Hủy"
      className="rounded-lg"
    >
      <Form form={form} layout="vertical" initialValues={room}>
        <Form.Item
          name="soPhong"
          label="Số Phòng"
          rules={[{ required: true, message: 'Vui lòng nhập số phòng' }]}
        >
          <Input className="w-full" />
        </Form.Item>
        <Form.Item
          name="maLoaiPhong"
          label="Loại Phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
        >
          <Select className="w-full">
            <Option value={1}>Phòng đơn</Option>
            <Option value={2}>Phòng đôi</Option>
            <Option value={3}>Phòng gia đình</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="soGiuong"
          label="Số Giường"
          rules={[{ required: true, message: 'Vui lòng nhập số giường' }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item
          name="tinhTrangPhong"
          label="Trạng Thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select className="w-full">
            <Option value={0}>Trống</Option>
            <Option value={1}>Đã sử dụng</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomForm;