import React from 'react';
import { Layout, Menu, Typography, Avatar } from 'antd';
import './Header.css'; // Import the custom CSS for the header
import { UserOutlined } from '@ant-design/icons';
const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  return (
    <AntHeader className="header">
      <div className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png" alt="Logo" className="logo-image" />
      </div>
      <div className="header-right">
        <Menu theme="light" mode="horizontal" selectable={false} className="header-menu">
          <Menu.Item key="1">
          <Avatar icon={<UserOutlined />} />
          <Text className="username">Admin</Text>
          </Menu.Item>
        </Menu>
      </div>
    </AntHeader>
  );
};

export default Header;
