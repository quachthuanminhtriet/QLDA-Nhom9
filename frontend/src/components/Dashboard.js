import React, { useMemo } from 'react';
import { Card, Col, Row, Table, Typography } from 'antd';
import { Line } from '@ant-design/plots'; // Using @ant-design/plots
import 'antd/dist/reset.css';
import './Dashboard.css'; // Import the custom CSS
import dayjs from 'dayjs';

const { Title: AntTitle } = Typography;

const Dashboard = () => {
  // Sample data
  const todayIncome = 20000000;
  const monthIncome = 45000000;
  const lastMonthIncome = 40000000;

  const chartData = useMemo(() => [
    { date: '2023-01-01', value: 12000000, category: 'Doanh thu' },
    { date: '2023-02-01', value: 27000000, category: 'Doanh thu' },
    { date: '2023-03-01', value: 23000000, category: 'Doanh thu' },
    { date: '2023-04-01', value: 32000000, category: 'Doanh thu' },
    { date: '2023-01-01', value: 6000, category: 'Đơn hàng' },
    { date: '2023-02-01', value: 8000, category: 'Đơn hàng' },
    { date: '2023-03-01', value: 4000, category: 'Đơn hàng' },
    { date: '2023-04-01', value: 11000, category: 'Đơn hàng' },
  ], []);

  const chartConfig = useMemo(() => ({
    data: chartData,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    colorField: 'category',
    legend: { position: 'top' },
    xAxis: { tickCount: 5 },
    yAxis: {
      label: { formatter: (v) => `${v.toLocaleString()} đ` },
      min: 0,
      max: 35000000,
    },
  }), [chartData]);

  const userData = useMemo(() => [
    { key: '1', product: 'iPhone 15 Pro Max', views: 15210 },
    { key: '2', product: 'Samsung Galaxy Z Fold 6', views: 13440 },
    { key: '3', product: 'iPhone 14 Pro Max', views: 12450 },
    { key: '4', product: 'Xiaomi Redmi 12C', views: 12010 },
    { key: '5', product: 'Xiaomi Redmi Note 12 Pro 5G', views: 1850 },
    { key: '6', product: 'OPPO Reno 4', views: 1250 },
  ], []);

  const purchaseData = useMemo(() => [
    { key: '1', product: 'iPhone 14 Pro Max', quantity: 210 },
    { key: '2', product: 'Samsung Galaxy Z Fold 6', quantity: 184 },
    { key: '3', product: 'Samsung Galaxy A54 5G', quantity: 175 },
    { key: '4', product: 'iPhone 13 Pro Max', quantity: 140 },
    { key: '5', product: 'Xiaomi POCO X6 Pro 5G', quantity: 100 },
    { key: '6', product: 'Xiaomi 13', quantity: 87 },
  ], []);

  const ordersData = useMemo(() => [
    { key: '1', orderId: 'ORD3234', deliveryDate: dayjs().format('YYYY-MM-DD') },
    { key: '2', orderId: 'ORD3238', deliveryDate: dayjs().format('YYYY-MM-DD') },
    { key: '3', orderId: 'ORD2451', deliveryDate: dayjs().format('YYYY-MM-DD') },
    { key: '4', orderId: 'ORD6323', deliveryDate: dayjs().format('YYYY-MM-DD') },
    { key: '5', orderId: 'ORD3237', deliveryDate: dayjs().format('YYYY-MM-DD') },
    { key: '6', orderId: 'ORD3452', deliveryDate: dayjs().format('YYYY-MM-DD') },
    { key: '7', orderId: 'ORD2661', deliveryDate: dayjs().format('YYYY-MM-DD') },
    { key: '8', orderId: 'ORD3323', deliveryDate: dayjs().format('YYYY-MM-DD') },
  ], []);

  const ordersHome = useMemo(() => [
    { key: '1', orderId: 'Apple', deliveryDate: dayjs().format('YYYY-MM-DD') },
    { key: '2', orderId: 'Samsung', deliveryDate: dayjs().format('YYYY-MM-DD') },
  ], []);

  return (
    <div className="dashboard-container">
      <Row gutter={16}>
        <Col span={8}>
          <Card className="dashboard-card" title="Thu nhập hôm nay">
            <AntTitle level={2}>{todayIncome.toLocaleString('vi-VN')} đ</AntTitle>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card" title="Thu nhập tháng này">
            <AntTitle level={2}>{monthIncome.toLocaleString('vi-VN')} đ</AntTitle>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card" title="Thu nhập tháng trước">
            <AntTitle level={2}>{lastMonthIncome.toLocaleString('vi-VN')} đ</AntTitle>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card className="chart-card" title="Biểu đồ doanh thu và đơn hàng">
            <Line {...chartConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="notification-card" title="Đơn hàng cần giao trong hôm nay">
            <Table
              dataSource={ordersData.filter(order => order.deliveryDate === dayjs().format('YYYY-MM-DD'))}
              columns={[
                { title: 'Mã đơn hàng', dataIndex: 'orderId', key: 'orderId' },
                { title: 'Ngày giao hàng', dataIndex: 'deliveryDate', key: 'deliveryDate' }
              ]}
              pagination={{ pageSize: 6 }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
        <Card className="arrival-card" title="Dự kiến ngày hàng về">
            <Table
              dataSource={ordersHome.filter(order => order.deliveryDate === dayjs().format('YYYY-MM-DD'))}
              columns={[
                { title: 'Mã đơn hàng', dataIndex: 'orderId', key: 'orderId' },
                { title: 'Ngày giao hàng', dataIndex: 'deliveryDate', key: 'deliveryDate' }
              ]}
              pagination={{ pageSize: 6 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card className="data-card" title="Người dùng quan tâm đến sản phẩm nào trong tháng">
            <Table
              dataSource={userData}
              columns={[
                { title: 'Sản phẩm', dataIndex: 'product', key: 'product' },
                { title: 'Lượt xem', dataIndex: 'views', key: 'views' }
              ]}
              pagination={{ pageSize: 6 }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="data-card" title="Những điện thoại bán chạy nhất trong tháng">
            <Table
              dataSource={purchaseData}
              columns={[
                { title: 'Sản phẩm', dataIndex: 'product', key: 'product' },
                { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' }
              ]}
              pagination={{ pageSize: 6 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Dashboard);
