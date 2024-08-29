import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddProduct from './AddProduct';
import brandOptions from './BrandOptions';

const { Option } = Select;

const ProductList = () => {
  const [products, setProducts] = useState([
    { key: '1', name: 'iPhone 15 Pro Max', price: '27.000.000 đ', brand: 'Apple', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg' },
    { key: '2', name: 'Samsung Galaxy Z Fold 6', price: '30.000.000 đ', brand: 'Samsung', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg' },
    { key: '3', name: 'Xiaomi 13', price: '15.000.000 đ', brand: 'Xiaomi', image: 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-5g.jpg' },
    { key: '4', name: 'iPhone 7', price: '6.000.000 đ', brand: 'Apple', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-7r4.jpg' },
    { key: '5', name: 'Motorola G5S Plus', price: '5.000.000 đ', brand: 'Motorola', image: 'https://fdn2.gsmarena.com/vv/bigpic/motorola-moto-g5s.jpg' },
    { key: '6', name: 'Galaxy J7 Pro', price: '2.000.000 đ', brand: 'Samsung', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-j7-pro.jpg' },
    { key: '7', name: 'Lenovo Legion Duel 2', price: '7.000.000 đ', brand: 'Lenovo', image: 'https://fdn2.gsmarena.com/vv/bigpic/lenovo-legion-2-pro-phone-duel2-1.jpg' },
    { key: '8', name: 'Galaxy S8+', price: '5.000.000 đ', brand: 'Samsung', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s8-plus-.jpg' },
    { key: '9', name: 'iPhone 13 Pro Max', price: '20.000.000 đ', brand: 'Apple', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg' },
    { key: '10', name: 'iPhone 12 Pro Max', price: '19.000.000 đ', brand: 'Apple', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro-max-.jpg' },
    { key: '11', name: 'iPhone 11 Pro Max', price: '16.000.000 đ', brand: 'Apple', image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg' },
    { key: '12', name: 'Samsung Galaxy Z Fold 5', price: '30.000.000 đ', brand: 'Samsung', image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold5-5g.jpg' },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { key: `${products.length + 1}`, ...newProduct }]);
  };

  const handleEditProduct = (key) => {
    const product = products.find(p => p.key === key);
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      image: product.image,
      price: product.price.replace(' đ', ''),
      brand: product.brand
    });
  };

  const handleDeleteProduct = (key) => {
    setProducts(products.filter(p => p.key !== key));
  };

  const handleSaveEdit = (values) => {
    const newProduct = {
      key: editingProduct.key,
      ...values,
      price: formatPrice(parseInt(values.price, 10))
    };

    setProducts(products.map(p => (p.key === editingProduct.key ? newProduct : p)));
    setEditingProduct(null);
    notification.success({
      message: 'Sản phẩm đã được chỉnh sửa',
      description: `Sản phẩm ${values.name} đã được cập nhật thành công.`,
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={record.image} alt={record.name} style={{ width: '50px', marginRight: '10px' }} />
          {text}
        </div>
      ),
    },
    { title: 'Giá tiền (VNĐ)', dataIndex: 'price', key: 'price' },
    { title: 'Thương hiệu', dataIndex: 'brand', key: 'brand' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record.key)}
            style={{ marginRight: '8px' }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record.key)}
            danger
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <AddProduct onAddProduct={handleAddProduct} />
      <Table dataSource={products} columns={columns} />

      {editingProduct && (
        <Modal
          title="Chỉnh sửa sản phẩm"
          visible={!!editingProduct}
          onCancel={() => setEditingProduct(null)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveEdit}
            initialValues={{
              price: editingProduct.price.replace(' đ', ''),
              brand: editingProduct.brand
            }}
          >
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="image"
              label="Hình ảnh sản phẩm (URL)"
              rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá tiền (VNĐ)"
              rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
            >
              <Input
                type="text"
                suffix="đ"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  form.setFieldsValue({ price: value });
                }}
              />
            </Form.Item>

            <Form.Item
              name="brand"
              label="Thương hiệu"
              rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
            >
              <Select>
            {brandOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;