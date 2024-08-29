import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Switch } from 'antd';
import moment from 'moment';

const Coupon = () => {
  const [dataSource, setDataSource] = useState([
    { key: '1', code: 'DISCOUNT10', value: '10%', expiry: '2025-12-31', status: true },
    { key: '2', code: 'SUMMER20', value: '20%', expiry: '2025-06-30', status: true },
    // Add more sample data as needed
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleAddOrUpdate = (values) => {
    if (selectedRecord) {
      // Update existing coupon
      setDataSource(dataSource.map(item => item.key === selectedRecord.key ? {
        ...item,
        code: values.code,
        value: values.value,
        expiry: values.expiry.format('YYYY-MM-DD'),
        status: values.status,
      } : item));
    } else {
      // Add new coupon
      setDataSource([...dataSource, {
        key: (dataSource.length + 1).toString(),
        code: values.code,
        value: values.value,
        expiry: values.expiry.format('YYYY-MM-DD'),
        status: values.status,
      }]);
    }
    setIsModalVisible(false);
    form.resetFields();
    setSelectedRecord(null);
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      code: record.code,
      value: record.value,
      expiry: moment(record.expiry, 'YYYY-MM-DD'), // Chuyển đổi ngày cũ về dạng moment
      status: record.status,
    });
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: 'Mã giảm giá', dataIndex: 'code', key: 'code' },
    { title: 'Giá trị giảm giá', dataIndex: 'value', key: 'value' },
    { title: 'Ngày hết hạn', dataIndex: 'expiry', key: 'expiry', render: date => moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: status => status ? 'Đang hoạt động' : 'Đã hết hạn' },
    { title: 'Hành động', key: 'action', render: (text, record) => (
      <span>
        <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
        <Button type="link" danger onClick={() => handleDelete(record.key)}>Xóa</Button>
      </span>
    ) },
  ];

  const handleDelete = (key) => {
    setDataSource(dataSource.filter(item => item.key !== key));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={() => { setIsModalVisible(true); form.resetFields(); }} style={{ marginBottom: 16 }}>
        Thêm Mã Giảm Giá
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="key" pagination={{ pageSize: 10 }} />

      <Modal title={selectedRecord ? "Sửa Mã Giảm Giá" : "Thêm Mã Giảm Giá"} visible={isModalVisible} onCancel={() => { setIsModalVisible(false); setSelectedRecord(null); }} footer={null}>
        <Form form={form} onFinish={handleAddOrUpdate}>
          <Form.Item name="code" label="Mã Giảm Giá" rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="value" label="Giá Trị Giảm Giá" rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="expiry" label="Ngày Hết Hạn" rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn!' }]}>
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item name="status" label="Trạng Thái">
            <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Đã hết hạn" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedRecord ? 'Cập Nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Coupon;
