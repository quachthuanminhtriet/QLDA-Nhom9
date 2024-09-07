import React from 'react';
import { Table } from 'antd';

const Catalogs = () => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const data = [
    { id: 1, name: 'Mobile' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'TV' },
    { id: 4, name: 'Headphone' },
    // Thêm các danh mục khác nếu cần
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Danh sách danh mục</h2>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default Catalogs;
