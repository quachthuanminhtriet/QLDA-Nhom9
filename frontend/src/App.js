import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Orders from './components/Orders';
import Users from './components/Users';
import ProductList from './components/ProductList';
import Coupon from './components/Coupon';
import { Layout } from 'antd';
import Header from './components/Header'; // Import the Header component

const { Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header /> {/* Add the Header component */}
        <Layout style={{ display: 'flex' }}>
          <Sider width={200} className="site-layout-background">
            <Sidebar />
          </Sider>
          <Layout style={{ flex: 1, padding: '0 24px' }}>
            <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect to /dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/coupon" element={<Coupon />} />
                <Route path="/users" element={<Users />} />
                <Route path="/add-product" element={<ProductList />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
