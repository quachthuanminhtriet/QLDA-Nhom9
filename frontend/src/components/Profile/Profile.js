import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, Typography, Button, Divider, Input, DatePicker, Select } from 'antd';
import { HomeOutlined, IdcardOutlined, LogoutOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
import './Profile.css';

const { Title, Text } = Typography;
const { Option } = Select;

// Dữ liệu mẫu
const sampleUser = {
  profilePic: 'https://img.freepik.com/free-photo/handsome-man-smiling-happy-face-portrait-close-up_53876-145493.jpg',
  name: 'Nguyễn Văn A',
  fullName: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  gender: 'Nam',
  phoneNumber: '0123456789',
  dateOfBirth: '01/01/1990',
  tvtBiddingDate: '15/05/2023',
  address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
  todayAccumulatedAmount: '1,000,000 VND'
};

const Profile = ({ initialUser = sampleUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Ở đây bạn có thể thêm logic để lưu dữ liệu vào backend
  };

  const handleChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
          <Avatar size={120} src={user.profilePic} />
          <Title level={2}>{user.name}</Title>
        </div>
        
        <div className="profile-info">
          <InfoItem 
            label="Họ và tên" 
            value={user.fullName} 
            isEditing={isEditing}
            onChange={(value) => handleChange('fullName', value)}
          />
          <InfoItem 
            label="Email" 
            value={user.email} 
            isEditing={isEditing}
            onChange={(value) => handleChange('email', value)}
          />
          <InfoItem 
            label="Giới tính" 
            value={user.gender} 
            isEditing={isEditing}
            onChange={(value) => handleChange('gender', value)}
            inputType="select"
            options={['Nam', 'Nữ', 'Khác']}
          />
          <InfoItem 
            label="Số điện thoại" 
            value={user.phoneNumber} 
            isEditing={isEditing}
            onChange={(value) => handleChange('phoneNumber', value)}
          />
          <InfoItem 
            label="Ngày sinh" 
            value={user.dateOfBirth} 
            isEditing={isEditing}
            onChange={(value) => handleChange('dateOfBirth', value)}
            inputType="date"
          />
          <InfoItem 
            label="Ngày đấu thầu TVT" 
            value={user.tvtBiddingDate} 
            isEditing={isEditing}
            onChange={(value) => handleChange('tvtBiddingDate', value)}
            inputType="date"
          />
          <InfoItem 
            label="Địa chỉ" 
            value={user.address} 
            isEditing={isEditing}
            onChange={(value) => handleChange('address', value)}
          />
          <InfoItem 
            label="Số tiền tích lũy hôm nay" 
            value={user.todayAccumulatedAmount} 
            isEditing={false} // Luôn set false để không cho phép chỉnh sửa
          />
        </div>
        
        <Button 
          type="primary" 
          block 
          className="update-button"
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? 'Lưu thông tin' : 'Chỉnh sửa thông tin'}
        </Button>
        
        <div className="profile-actions">
          <Link to="/" className="action-button">
            <HomeOutlined />
            <Text>Trang chủ</Text>
          </Link>
          <Link to="/membership" className="action-button">
            <IdcardOutlined />
            <Text>Thành viên</Text>
          </Link>
          <Link to="/logout" className="action-button">
            <LogoutOutlined />
            <Text>Đăng xuất</Text>
          </Link>
        </div>
      </Card>
    </div>
  );
};

const InfoItem = ({ label, value, isEditing, onChange, inputType = 'text', options = [] }) => (
  <>
    <div className="info-item">
      <Text strong>{label}:</Text>
      {isEditing ? (
        inputType === 'select' ? (
          <Select 
            style={{ width: '100%' }} 
            value={value} 
            onChange={onChange}
          >
            {options.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        ) : inputType === 'date' ? (
          <DatePicker 
            style={{ width: '100%' }} 
            value={moment(value, 'DD/MM/YYYY')} 
            onChange={(date, dateString) => onChange(dateString)}
            format="DD/MM/YYYY"
          />
        ) : (
          <Input 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
          />
        )
      ) : (
        <Text>{value}</Text>
      )}
    </div>
    <Divider />
  </>
);

export default Profile;
