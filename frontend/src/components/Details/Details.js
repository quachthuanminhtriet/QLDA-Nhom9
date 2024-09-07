import React, { useState, useMemo } from 'react';
import { Card, Col, Row, Typography, Button, Segmented, Space } from 'antd';
import { ShoppingCartOutlined, TagOutlined, DollarOutlined } from '@ant-design/icons';
import './Details.css';
import BenefitsCard from './BenefitsCard';
import UserReviews from './UserReviews';
import ProductInfo from './ProductInfo';

// Import images
import image1 from '../../assets/Details/1.jpg';
import image2 from '../../assets/Details/2.jpg';
import image3 from '../../assets/Details/3.jpg';
import image4 from '../../assets/Details/4.jpg';
import image5 from '../../assets/Details/5.jpg';
import image6 from '../../assets/Details/6.jpg';
import image7 from '../../assets/Details/7.jpg';
import image8 from '../../assets/Details/8.jpg';
import image9 from '../../assets/Details/9.jpg';
import titanWhite from '../../assets/Details/Titan_white.jpg';
import titanBlue from '../../assets/Details/Titan_blue.jpg';
import titanBlack from '../../assets/Details/Titan_black.jpg';
import titanNatural from '../../assets/Details/Titan_natural.jpg';

const { Title } = Typography;

const allImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

function Details() {
  const [mainImage, setMainImage] = useState(image1);
  const [selectedStorage, setSelectedStorage] = useState('1TB');
  const [selectedColor, setSelectedColor] = useState('Titan Đen');
  const [selectedPriceType, setSelectedPriceType] = useState('dealPrice');

  // Hàm tính dealPrice (giảm 10% từ price)
  const calculateDealPrice = (price) => {
    const numericPrice = parseInt(price.replace(/\D/g, ''), 10);
    const dealPrice = Math.round(numericPrice * 0.9);
    return dealPrice.toLocaleString('vi-VN') + ' đ';
  };

  // Hàm tạo option với price và tự động tính dealPrice
  const createStorageOption = (value, price) => ({
    value,
    price,
    dealPrice: calculateDealPrice(price)
  });

  // Sử dụng useMemo để tính toán storageOptions
  const storageOptions = useMemo(() => [
    createStorageOption('1TB', '42.000.000 đ'),
    createStorageOption('512GB', '38.000.000 đ'),
    createStorageOption('256GB', '20.000.000 đ'),
  ], []);

  const colorOptions = [
    { name: 'Titan Đen', mainImage: titanBlack, images: [image1, image2, image3] },
    { name: 'Titan Trắng', mainImage: titanWhite, images: [titanWhite, image4, image5] },
    { name: 'Titan Xanh', mainImage: titanBlue, images: [titanBlue, image2, image4] },
    { name: 'Titan Tự Nhiên', mainImage: titanNatural, images: [titanNatural, image3, image5] }
  ];

  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const selectedColorOption = colorOptions.find(option => option.name === color);
    if (selectedColorOption) {
      setMainImage(selectedColorOption.mainImage);
    }
  };

  const handlePriceTypeChange = (value) => {
    setSelectedPriceType(value);
  };

  return (
    <div className="details-container">
      <Title level={2}>iPhone 15 Pro Max ({selectedStorage}) | Chính hãng VN/A</Title>
      <Row gutter={16}>
        <Col span={15}>
          <Card className="main-image-container">
            <div className="box-ksp">
              <div className="image-wrapper gradient-background">
                <img src={mainImage} alt="iPhone 15 Pro Max" className="main-image" />
              </div>
              <div className="features-text">
                <Space align="center" direction="vertical" style={{ width: '100%' }}>
                  <Title level={4} className="features-title">
                    TÍNH NĂNG NỔI BẬT
                  </Title>
                </Space>
                <ul className="features-list">
                  <li>Thiết kế khung viền từ titan chuẩn hàng không vũ trụ - Cực nhẹ, bền cùng viền cạnh mỏng cầm nắm thoải mái</li>
                  <li>Hiệu năng Pro chiến game thả ga - Chip A17 Pro mang lại hiệu năng đồ họa vô cùng sống động và chân thực</li>
                  <li>Thoả sức sáng tạo và quay phim chuyên nghiệp - Cụm 3 camera sau đến 48MP và nhiều chế độ tiên tiến</li>
                  <li>Nút tác vụ mới giúp nhanh chóng kích hoạt tính năng yêu thích của bạn</li>
                </ul>
              </div>
            </div>
          </Card>
          <div className="image-selector">
            {allImages.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`iPhone 15 Pro Max view ${index + 1}`} 
                onClick={() => setMainImage(img)}
                className={mainImage === img ? 'active' : ''}
              />
            ))}
          </div>
          <Row gutter={16}>
            <Col span={24}>
              <BenefitsCard />
            </Col>
            <Col span={24}>
              <UserReviews />
            </Col>
          </Row>
        </Col>
        <Col span={9}>
          <Title level={5}>Dung lượng</Title>
          <div className="option-buttons">
            {storageOptions.map((option) => (
              <Button
                key={option.value}
                className={`option-btn ${selectedStorage === option.value ? 'active' : ''}`}
                onClick={() => handleStorageChange(option.value)}
              >
                <div className="option-value">{option.value}</div>
                <div className="option-subtext">{option.price}</div>
              </Button>
            ))}
          </div>
          <Title level={5}>Màu sắc</Title>
          <div className="option-buttons">
            {colorOptions.map((color) => (
              <Button
                key={color.name}
                className={`option-btn ${selectedColor === color.name ? 'active' : ''}`}
                onClick={() => handleColorChange(color.name)}
              >
                <div className="option-value">
                  <img src={color.mainImage} alt={color.name} className="color-icon" />
                </div>
                <div className="option-subtext">{color.name}</div>
              </Button>
            ))}
          </div>
          <Card className="price-selection">
            <Segmented
              options={[
                {
                  label: (
                    <div className="price-option">
                      <div className="price-type">
                        <TagOutlined style={{ color: '#1890ff' }} />
                        <span>Giá thu cũ</span>
                      </div>
                      <div className="price-value">{storageOptions.find(opt => opt.value === selectedStorage)?.dealPrice}</div>
                    </div>
                  ),
                  value: 'dealPrice',
                },
                {
                  label: (
                    <div className="price-option">
                      <div className="price-type">
                        <DollarOutlined style={{ color: '#52c41a' }} />
                        <span>Giá gốc</span>
                      </div>
                      <div className="price-value">{storageOptions.find(opt => opt.value === selectedStorage)?.price}</div>
                    </div>
                  ),
                  value: 'price',
                },
              ]}
              value={selectedPriceType}
              onChange={handlePriceTypeChange}
              block
            />
          </Card>
          <div className="action-buttons">
            <Button type="primary" className="primary-btn">Mua ngay</Button>
            <Button icon={<ShoppingCartOutlined />} className="cart-btn" />
          </div>
          <div className="payment-options">
            <Button className="payment-btn">Trả góp 0%</Button>
            <Button className="payment-btn">Trả góp 0% qua thẻ</Button>
          </div>
          <div className="payment-options">
            <Button className="payment-btn">Thu cũ lên đời từ
              <div className="price-value">{storageOptions.find(opt => opt.value === selectedStorage)?.dealPrice}</div></Button>
          </div>
          <ProductInfo />
        </Col>
      </Row>
    </div>
  );
}

export default Details;
