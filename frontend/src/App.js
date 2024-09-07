import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Charts from './components/Charts/Charts';
import Catalogs from './components/Catalogs/Catalogs';
import Products from './components/Products/Products';
import Orders from './components/Orders/Orders';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Details from './components/Details/Details';
import Settings from './components/Settings/Settings';
import Dashboard from './components/Dashboard/Dashboard';
import Status from './components/Status/Status';
import './App.css'; // Import global styles if needed
import Signup from './components/Login/Signup';

const { Header: AntHeader, Sider, Content } = Layout;

function AppContent() {
  const location = useLocation();
  const isFullPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/details';
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isFullPage && (
        <AntHeader style={{ padding: 0, background: '#fff' }}>
          <Header onToggleSidebar={handleToggleSidebar} />
          {isMobile && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleToggleSidebar}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          )}
        </AntHeader>
      )}
      <Layout style={{ display: 'flex' }}>
        {!isFullPage && (
          <Sider
            width={250}
            collapsed={isMobile ? collapsed : false}
            collapsedWidth={isMobile ? 0 : 80}
            className="site-layout-background"
            trigger={null}
            breakpoint="lg"
            onBreakpoint={(broken) => {
              setCollapsed(broken);
            }}
          >
            <Sidebar />
          </Sider>
        )}
        <Layout style={{ flex: 1, padding: isFullPage ? '0' : '0 12px' }}>
          <Content style={{ padding: isFullPage ? '0' : '12px', margin: 0, minHeight: 280 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/catalogs" element={<Catalogs />} />
              <Route path="/products" element={<Products />} />     
              <Route path="/profile" element={<Profile />} />
              <Route path="/details" element={<Details />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/status" element={<Status />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

function App() {
  const api = {
    fetchDashboardData: () => {}, // Removed axios call
    fetchCoupons: () => {}, // Removed axios call
    updateCoupon: (id, data) => {}, // Removed axios call
    createCoupon: (data) => {}, // Removed axios call
    deleteCoupon: (id) => {}, // Removed axios call
    fetchOrders: () => {}, // Removed axios call
    deleteOrder: (id) => {}, // Removed axios call
    validateCoupon: (code, amount) => {}, // Removed axios call
    fetchUsers: () => {}, // Removed axios call
    createUser: (data) => {}, // Removed axios call
    deleteUser: (id) => {}, // Removed axios call
    fetchProducts: () => {}, // Removed axios call
    createProduct: (data) => {}, // Removed axios call
    deleteProduct: (id) => {}, // Removed axios call
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
