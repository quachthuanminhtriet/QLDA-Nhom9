import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import brandOptions from './BrandOptions';

const { Option } = Select;

const AddProduct = ({ onAddProduct }) => {
  const [form] = Form.useForm();
  const [formattedPrice, setFormattedPrice] = useState('');

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const handleAddProduct = (values) => {
    const formattedPriceValue = parseInt(values.price, 10);
    const formattedPriceWithUnit = formatPrice(formattedPriceValue);

    onAddProduct({ ...values, price: formattedPriceWithUnit });
    form.resetFields();
    notification.success({
      message: 'Sản phẩm đã được thêm',
      description: `Sản phẩm ${values.name} đã được thêm thành công.`,
    });
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
    setFormattedPrice(formatPrice(parseInt(numericValue, 10)));
    form.setFieldsValue({ price: numericValue });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thêm Sản Phẩm Mới</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddProduct}
        initialValues={{ price: 0, brand: '' }}
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
            value={formattedPrice}
            onChange={handlePriceChange}
            suffix="đ"
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
          <Button type="primary" htmlType="submit" icon={<PlusCircleOutlined />}>
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
