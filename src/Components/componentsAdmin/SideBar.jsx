import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ScheduleOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GiftOutlined,
  ToolOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    {
      key: '0',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      key: '1',
      icon: <AppstoreOutlined />,
      label: 'Quản lý Phòng',
      children: [
        {
          key: '1-1',
          icon: <AppstoreOutlined />,
          label: 'Phòng',
          path: '/admin/room_management',
        },
        {
          key: '1-2',
          icon: <GiftOutlined />,
          label: 'Khuyến mãi',
          path: '/admin/room_management/promotions',
        },
        {
          key: '1-3',
          icon: <ToolOutlined />,
          label: 'Dịch vụ',
          path: '/admin/room_management/services',
        },
      ],
    },
    {
      key: '2',
      icon: <TeamOutlined />,
      label: 'Quản lý nhân viên',
      path: '/admin/room_management/staff',
    },
    {
      key: '3',
      icon: <ScheduleOutlined />,
      label: 'Danh sách đặt phòng',
      path: '/bookings',
    },
    {
      key: '4',
      icon: <UnorderedListOutlined />,
      label: 'Quản lý Đơn Hàng',
      path: '/bookings',
    },
    {
      key: '5',
      icon: <UserAddOutlined />,
      label: 'Tạo tài khoản',
      path: '/create-account',
    },
  ];

  return (
    <div
      className={`bg-blue-900 text-white h-screen transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && <span className="text-xl font-bold">ADMIN PANEL</span>}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          className="text-white hover:text-gray-300"
        />
      </div>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="bg-blue-900"
        defaultSelectedKeys={['0']}
      >
        {menuItems.map((item) =>
          item.children ? (
            <Menu.SubMenu
              key={item.key}
              icon={item.icon}
              title={item.label}
              className="text-white hover:bg-blue-800"
            >
              {item.children.map((subItem) => (
                <Menu.Item
                  key={subItem.key}
                  icon={subItem.icon}
                  className="text-white hover:bg-blue-800"
                >
                  <NavLink
                    to={subItem.path}
                    className={({ isActive }) =>
                      isActive ? 'text-white font-bold bg-blue-800' : 'text-gray-200'
                    }
                  >
                    {subItem.label}
                  </NavLink>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              className="text-white hover:bg-blue-800"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'text-white font-bold bg-blue-800' : 'text-gray-200'
                }
              >
                {item.label}
              </NavLink>
            </Menu.Item>
          )
        )}
        <Menu.Item
          key="6"
          icon={<LogoutOutlined />}
          className="text-white hover:bg-blue-800"
          onClick={handleLogout}
        >
          Đăng xuất
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;