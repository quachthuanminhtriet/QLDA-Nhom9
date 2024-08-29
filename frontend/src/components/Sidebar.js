import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined, PlusCircleOutlined, ContainerOutlined } from '@ant-design/icons';

const Sidebar = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
    >
<Menu.Item key="1" icon={<HomeOutlined />}>
  <Link to="/dashboard">Trang chủ</Link>
</Menu.Item>
<Menu.Item key="2" icon={<SettingOutlined />}>
  <Link to="/settings">Cài đặt</Link>
</Menu.Item>
<Menu.Item key="3" icon={<ShoppingCartOutlined />}>
  <Link to="/orders">Quản lý đơn hàng</Link>
</Menu.Item>
<Menu.Item key="3" icon={<ContainerOutlined />}>
  <Link to="/coupon">Quản lý mã giảm giá</Link>
</Menu.Item>
<Menu.Item key="4" icon={<UserOutlined />}>
  <Link to="/users">Quản lý người dùng</Link>
</Menu.Item>
<Menu.Item key="5" icon={<PlusCircleOutlined />}>
  <Link to="/add-product">Thêm sản phẩm</Link>
</Menu.Item>
    </Menu>
  );
};

export default Sidebar;
