import React, { useState } from 'react';
import { Table, Button, Modal, Alert, Popconfirm } from 'antd';
import moment from 'moment';
import './Orders.css';

const sampleOrders = [
  { id: 15, name: 'Nguyễn Văn A', email: 'user14@example.com', numberOfOrders: 2, status: 'packing', discountCode: '', paymentAmount: 18000000, orderTime: '2024-09-11', address: '77/5B Lê Lai, Phường 12, Quận Tân Bình, Thành Phố Hồ Chí Minh' },
  { id: 14, name: 'Trần Thị B', email: 'user13@example.com', numberOfOrders: 3, status: 'shipping', discountCode: 'DISCOUNT10', paymentAmount: 25000000, orderTime: '2024-09-10', address: '125 Hồng Bàng, Phường 12, Quận 5, Thành Phố Hồ Chí Minh' },
  { id: 13, name: 'Lê Văn C', email: 'user12@example.com', numberOfOrders: 2, status: 'completed', discountCode: '', paymentAmount: 22000000, orderTime: '2024-09-09', address: '123 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Thành Phố Hồ Chí Minh' },
  { id: 12, name: 'Phạm Thị D', email: 'user11@example.com', numberOfOrders: 6, status: 'canceled', discountCode: 'DISCOUNT10', paymentAmount: 60000000, orderTime: '2024-09-08', address: '45 Nguyễn Huệ, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh' },
  { id: 11, name: 'Vũ Văn E', email: 'user10@example.com', numberOfOrders: 1, status: 'packing', discountCode: '', paymentAmount: 12000000, orderTime: '2024-09-07', address: '9A Nguyễn An Ninh, Phường 6, Thành Phố Vũng Tàu' },
  { id: 10, name: 'Đỗ Thị F', email: 'user9@example.com', numberOfOrders: 2, status: 'shipping', discountCode: 'SUMMER20', paymentAmount: 20000000, orderTime: '2024-09-06', address: '60A Lê Thánh Tôn, Phường Bến Thành, Quận 1, Thành Phố Hồ Chí Minh' },
  { id: 9, name: 'Ngô Văn G', email: 'user8@example.com', numberOfOrders: 4, status: 'completed', discountCode: '', paymentAmount: 40000000, orderTime: '2024-09-05', address: '123 Lê Duẩn, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh' },
  { id: 8, name: 'Hoàng Thị H', email: 'user7@example.com', numberOfOrders: 3, status: 'canceled', discountCode: 'SUMMER20', paymentAmount: 30000000, orderTime: '2024-09-04', address: '12A Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, Thành Phố Hồ Chí Minh' },
  { id: 7, name: 'Nguyễn Văn I', email: 'user6@example.com', numberOfOrders: 5, status: 'packing', discountCode: '', paymentAmount: 50000000, orderTime: '2024-09-03', address: '45 Thống Nhất, Phường 11, Quận Gò Vấp, Thành Phố Hồ Chí Minh' },
  { id: 6, name: 'Trần Thị J', email: 'user5@example.com', numberOfOrders: 1, status: 'shipping', discountCode: 'SUMMER20', paymentAmount: 10000000, orderTime: '2024-09-02', address: '52 Trần Não, Phường Bình An, Quận 2, Thành Phố Hồ Chí Minh' },
  { id: 5, name: 'Lê Văn K', email: 'user4@example.com', numberOfOrders: 2, status: 'completed', discountCode: '', paymentAmount: 20000000, orderTime: '2024-09-01', address: '32 Cách Mạng Tháng 8, Phường 10, Quận 3, Thành Phố Hồ Chí Minh' },
  { id: 4, name: 'Phạm Thị L', email: 'user3@example.com', numberOfOrders: 4, status: 'canceled', discountCode: 'DISCOUNT10', paymentAmount: 35000000, orderTime: '2024-08-31', address: '88 Võ Thị Sáu, Phường 6, Quận 3, Thành Phố Hồ Chí Minh' },
  { id: 3, name: 'Vũ Văn M', email: 'user2@example.com', numberOfOrders: 3, status: 'packing', discountCode: 'SUMMER20', paymentAmount: 30000000, orderTime: '2024-08-30', address: '29 Nguyễn Chí Thanh, Phường 9, Quận 5, Thành Phố Hồ Chí Minh' },
  { id: 2, name: 'Đỗ Thị N', email: 'user1@example.com', numberOfOrders: 1, status: 'shipping', discountCode: '', paymentAmount: 15000000, orderTime: '2024-08-29', address: '70 Nguyễn Đình Chiểu, Phường 6, Quận 3, Thành Phố Hồ Chí Minh' },
  { id: 1, name: 'Ngô Văn O', email: 'abcxyz@gmail.com', numberOfOrders: 2, status: 'completed', discountCode: 'SUMMER20', paymentAmount: 25000000, orderTime: '2024-08-28', address: '108 Lê Lợi, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh' },
];



const Orders = () => {
  const [dataSource, setDataSource] = useState(sampleOrders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = (id) => {
    setDataSource(dataSource.filter(order => order.id !== id));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };

  const calculateDiscount = (amount, discountCode) => {
    if (discountCode === 'DISCOUNT10') {
      return amount * 0.1;
    } else if (discountCode === 'SUMMER20') {
      return amount * 0.2;
    }
    return 0;
  };

  const formatOrderStatus = (status) => {
    switch (status) {
      case 'completed':
        return 'Đã hoàn thành';
      case 'shipping':
        return 'Đang vận chuyển';
      case 'packing':
        return 'Đang đóng gói';
      case 'canceled':
        return 'Đã huỷ';
      default:
        return status;
    }
  };
  
  const columns = [
    { title: 'Mã Đơn Hàng', dataIndex: 'id', key: 'id' },
    { title: 'Số Đơn Hàng', dataIndex: 'numberOfOrders', key: 'numberOfOrders' },
    { title: 'Trạng Thái Đơn Hàng', dataIndex: 'status', key: 'status',
      render: (status) => {
        const statusMap = {
            completed: { color: 'green', text: 'Đã hoàn thành' },
            shipping: { color: 'blue', text: 'Đang vận chuyển' },
            packing: { color: 'red', text: 'Đang đóng gói' },
            canceled: { color: 'grey', text: 'Đã huỷ' },
        };
        return <span style={{ color: statusMap[status].color }}>{statusMap[status].text}</span>;
      }
    },
    { title: 'Mã Giảm Giá', dataIndex: 'discountCode', key: 'discountCode', render: (code) => code || 'Không có mã giảm' },
    { title: 'Số Tiền Thanh Toán', dataIndex: 'paymentAmount', key: 'paymentAmount', render: (amount) => `${amount.toLocaleString()} ₫` },
    { title: 'Thời Gian Đơn Hàng', dataIndex: 'orderTime', key: 'orderTime', render: (time) => moment(time).format('DD-MM-YYYY') },
    { title: 'Hành Động', key: 'action', render: (text, record) => (
      <span>
        <Button type="link" onClick={() => { setSelectedOrder(record); setIsModalVisible(true); }}>Chi Tiết</Button>
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa đơn hàng này không?"
          onConfirm={() => handleDelete(record.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="link" danger>Xóa</Button>
        </Popconfirm>
      </span>
    ) },
  ];

  return (
    <div className="orders-container">
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Thêm Đơn Hàng
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
      {showAlert && (
        <Alert
          message="Đã xóa thành công"
          type="success"
          showIcon
          className="orders-alert"
        />
      )}
      <Modal
        title="Thông Tin Đơn Hàng"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="orders-modal"
      >
        {selectedOrder && (
          <div className="orders-modal-content">
          <p><strong>Tên Khách Hàng:</strong> {selectedOrder.name}</p>
          <p><strong>Email:</strong> {selectedOrder.email}</p>
          <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
          <p><strong>Số lượng sản phẩm:</strong> {selectedOrder.numberOfOrders}</p>
          <p><strong>Đơn Hàng Số:</strong> {selectedOrder.id}</p>
          <p><strong>Trạng Thái Đơn Hàng:</strong> {formatOrderStatus(selectedOrder.status)}</p>
          <p><strong>Mã Giảm Giá:</strong> {selectedOrder.discountCode || 'Không có mã giảm'}</p>
          <p><strong>Số Tiền Thanh Toán:</strong> {selectedOrder.paymentAmount.toLocaleString()} ₫</p>
          <p><strong>Số Tiền Giảm Giá:</strong> {`-${calculateDiscount(selectedOrder.paymentAmount, selectedOrder.discountCode).toLocaleString()} ₫`}</p>
          <p><strong>Tổng Tiền Thanh Toán:</strong> {(selectedOrder.paymentAmount - calculateDiscount(selectedOrder.paymentAmount, selectedOrder.discountCode)).toLocaleString()} ₫</p>
          <p><strong>Thời Gian Tạo:</strong> {moment(selectedOrder.orderTime).format('DD-MM-YYYY')}</p>
        </div>        

        )}
      </Modal>
    </div>
  );
};

export default Orders;