import React, { useState, useEffect, useCallback } from 'react';
import { Column } from '@ant-design/plots';
import './Charts.css';

const Charts = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  // Giả lậm dữ liệu cho 12 tháng
  const monthlyData = {
    '7/2023': [
      { product: 'Headphone', quantity: 145 },
      { product: 'TV', quantity: 845 },
      { product: 'Mobile', quantity: 423 },
      { product: 'Laptop', quantity: 72 },
    ],
    '8/2023': [
      { product: 'Headphone', quantity: 245 },
      { product: 'TV', quantity: 945 },
      { product: 'Mobile', quantity: 323 },
      { product: 'Laptop', quantity: 81 },
    ],
    '9/2023': [
      { product: 'Headphone', quantity: 77 },
      { product: 'TV', quantity: 100 },
      { product: 'Mobile', quantity: 50 },
      { product: 'Laptop', quantity: 90 },
    ],
    '10/2023': [
      { product: 'Headphone', quantity: 88 },
      { product: 'TV', quantity: 111 },
      { product: 'Mobile', quantity: 66 },
      { product: 'Laptop', quantity: 100 },
    ],
    '11/2023': [
      { product: 'Headphone', quantity: 99 },
      { product: 'TV', quantity: 122 },
      { product: 'Mobile', quantity: 77 },
      { product: 'Laptop', quantity: 111 },
    ],
    '12/2023': [
      { product: 'Headphone', quantity: 100 },
      { product: 'TV', quantity: 133 },
      { product: 'Mobile', quantity: 88 },
      { product: 'Laptop', quantity: 122 },
    ],
    '1/2024': [
      { product: 'Headphone', quantity: 11 },
      { product: 'TV', quantity: 14 },
      { product: 'Mobile', quantity: 9 },
      { product: 'Laptop', quantity: 13 },
    ],
    '2/2024': [
      { product: 'Headphone', quantity: 12 },
      { product: 'TV', quantity: 15 },
      { product: 'Mobile', quantity: 10 },
      { product: 'Laptop', quantity: 14 },
    ],
    '3/2024': [
      { product: 'Headphone', quantity: 13 },
      { product: 'TV', quantity: 16 },
      { product: 'Mobile', quantity: 11 },
      { product: 'Laptop', quantity: 15 },
    ],
    '4/2024': [
      { product: 'Headphone', quantity: 14 },
      { product: 'TV', quantity: 17 },
      { product: 'Mobile', quantity: 12 },
      { product: 'Laptop', quantity: 16 },
    ],
    '5/2024': [
      { product: 'Headphone', quantity: 15 },
      { product: 'TV', quantity: 18 },
      { product: 'Mobile', quantity: 13 },
      { product: 'Laptop', quantity: 17 },
    ],
    '6/2024': [
      { product: 'Headphone', quantity: 16 },
      { product: 'TV', quantity: 19 },
      { product: 'Mobile', quantity: 14 },
      { product: 'Laptop', quantity: 18 },
    ],
    '7/2024': [
      { product: 'Headphone', quantity: 17 },
      { product: 'TV', quantity: 20 },
      { product: 'Mobile', quantity: 15 },
      { product: 'Laptop', quantity: 19 },
    ],
    '8/2024': [
      { product: 'Headphone', quantity: 18 },
      { product: 'TV', quantity: 21 },
      { product: 'Mobile', quantity: 16 },
      { product: 'Laptop', quantity: 20 },
    ],
    '9/2024': [
      { product: 'Headphone', quantity: 192 },
      { product: 'TV', quantity: 223 },
      { product: 'Mobile', quantity: 171 },
      { product: 'Laptop', quantity: 214 },
    ],
  };

  const updateChartData = useCallback(() => {
    const currentMonthKey = `${selectedMonth + 1}/${selectedYear}`;
    const currentMonthData = monthlyData[currentMonthKey];
  
    if (!currentMonthData || !Array.isArray(currentMonthData)) {
      setError('Không có dữ liệu hợp lệ cho tháng đã chọn');
      setChartData([]);
      return;
    }
  
    const validData = currentMonthData.map(item => {
      if (!item || typeof item !== 'object' || !item.product || typeof item.quantity !== 'number') {
        console.warn('Dữ liệu không hợp lệ:', item);
        return null;
      }
      return {
        product: item.product,
        quantity: item.quantity,
      };
    }).filter(Boolean); // Lọc các giá trị null
  
    setChartData(validData.length ? validData : []);
    setError(validData.length ? null : 'Không có dữ liệu hợp lệ cho tháng đã chọn');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear]);
  

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  const config = {
    data: chartData,
    xField: 'product',
    yField: 'quantity',
    columnStyle: {
      radius: [10, 10, 0, 0],
    },
    color: ['#1890ff', '#2fc25b', '#facc14', '#223273'],
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `${v}`,
      },
    },
    label: {
      position: 'top',
      style: {
        fill: '#000000',
        opacity: 0.8,
      },
      formatter: (datum) => `${datum.quantity}`,
    },
    meta: {
      product: { alias: 'Sản phẩm' },
      quantity: { alias: 'Số lượng' },
    },
    tooltip: {
      customContent: (title, items) => {
        if (items && items.length > 0 && items[0].data) {
          const { product, quantity } = items[0].data;
          return (
            <div>
              <h4>{product || 'Không xác định'}</h4>
              <p>{typeof quantity === 'number' ? `${quantity} sản phẩm` : 'Không có dữ liệu'}</p>
            </div>
          );
        }
        return <div>Không có dữ liệu</div>;
      },
    },
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setSelectedMonth(newMonth);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);
  };

  const handleExportPDF = () => {
    // Implement PDF export logic here
  };

  const handleSendEmail = () => {
    // Implement email sending logic here
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Thống kê sản phẩm</h2>
      <div style={{ marginBottom: '15px', textAlign: 'center' }}>
        <select value={selectedMonth} onChange={handleMonthChange} style={selectStyle}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{i + 1}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange} style={selectStyle}>
          {[2023, 2024].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="chart-container">
        {error ? (
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffcccb', borderRadius: '5px' }}>
            {error}
          </div>
        ) : chartData.length > 0 ? (
          <div className="custom-chart">
            <Column {...config} />
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            Không có dữ liệu cho tháng {selectedMonth + 1}/{selectedYear}
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={handleExportPDF} style={buttonStyle}>Xuất PDF</button>
        <button onClick={handleSendEmail} style={buttonStyle}>Gửi mail</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const selectStyle = {
  padding: '5px',
  marginRight: '10px',
  fontSize: '14px',
};

export default Charts;
