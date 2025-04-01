import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert } from 'antd';

const columns = [
  {
    title: 'Medicine Name',
    dataIndex: 'pill_name',
    sorter: (a, b) => a.pill_name.localeCompare(b.pill_name),
    width: 250,
  },
  {
    title: 'ID',
    dataIndex: 'pill_id',
    sorter: (a, b) => a.pill_id - b.pill_id,
    width: 150,
  },
  {
    title: 'Math Sc',
    dataIndex: 'math',
    sorter: (a, b) => a.math - b.math,
    width: 150,
  },
  {
    title: 'Count',
    dataIndex: 'count',
    sorter: (a, b) => a.count - b.count,
    width: 150,
  },
];

const PillFilter = () => {
  const [data, setData] = useState([]); // Store API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/pills'); // Replace with actual API URL
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result); // Set API data
      } catch (error) {
        setError(error.message); // Capture error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div style={{ width: '100%', padding: '20px' }}>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          bordered
          size="middle"
          pagination={{ pageSize: 5 }}
          rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
          rowKey="pill_id" // Ensure unique row keys
        />
      <style>
        {`
          .table-row-light {
            background-color: #fafafa;
          }
          .table-row-dark {
            background-color: #ffffff;
          }
          .ant-table-thead > tr > th {
            background-color: #f0f2f5 !important;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default PillFilter;

