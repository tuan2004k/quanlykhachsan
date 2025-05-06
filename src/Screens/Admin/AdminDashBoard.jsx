import React from 'react';
import { Card, Row, Col } from 'antd';
import { HomeOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import SideBar from '../../Components/componentsAdmin/SideBar';
import Header from '../../Common/Header';

// Dữ liệu giả lập cho biểu đồ
const revenueData = [
  { name: 'Tháng 1', doanhThu: 4000000 },
  { name: 'Tháng 2', doanhThu: 3000000 },
  { name: 'Tháng 3', doanhThu: 5000000 },
  { name: 'Tháng 4', doanhThu: 4500000 },
  { name: 'Tháng 5', doanhThu: 6000000 },
  { name: 'Tháng 6', doanhThu: 5500000 },
];

const roomUsageData = [
  { name: 'Phòng trống', value: 15 },
  { name: 'Phòng đã đặt', value: 30 },
  { name: 'Phòng đang dọn', value: 5 },
];

const COLORS = ['#1890ff', '#52c41a', '#fa8c16'];

const DashboardPage = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-6 bg-gray-100 flex-1 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>

          {/* Overview Cards */}
          <Row gutter={16} className="mb-6">
            <Col span={8}>
              <Card
                title="Phòng Trống"
                bordered={false}
                className="shadow-md"
                extra={<HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
              >
                <p className="text-3xl font-bold text-blue-600">15</p>
                <p className="text-gray-500">/ 50 phòng</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Doanh Thu Hôm Nay"
                bordered={false}
                className="shadow-md"
                extra={<DollarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />}
              >
                <p className="text-3xl font-bold text-green-600">5,000,000 VNĐ</p>
                <p className="text-gray-500">+10% so với hôm qua</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Đặt Phòng Hôm Nay"
                bordered={false}
                className="shadow-md"
                extra={<CalendarOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />}
              >
                <p className="text-3xl font-bold text-orange-600">8</p>
                <p className="text-gray-500">3 đang chờ xác nhận</p>
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row gutter={16} className="mb-6">
            <Col span={12}>
              <Card title="Doanh Thu Theo Tháng" bordered={false} className="shadow-md">
                <BarChart width={500} height={300} data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="doanhThu" fill="#8884d8" />
                </BarChart>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Tỷ Lệ Sử Dụng Phòng" bordered={false} className="shadow-md">
                <PieChart width={400} height={300}>
                  <Pie
                    data={roomUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roomUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;