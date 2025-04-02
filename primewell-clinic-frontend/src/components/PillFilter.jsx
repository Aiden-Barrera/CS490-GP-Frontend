import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Medicine Name',
    dataIndex: 'Pill_Name',
    sorter: (a, b) => a.Pill_Name.localeCompare(b.Pill_Name),
    width: 150,
  },
  {
    title: 'ID',
    dataIndex: 'Pill_ID',
    sorter: (a, b) => a.Pill_ID - b.Pill_ID,
    width: 150,
  },
  {
    title: 'Dosage',
    dataIndex: 'Dosage',
    sorter: (a, b) => a.Dosage - b.Dosage,
    width: 150,
  },
  {
    title: 'Cost',
    dataIndex: 'Cost',
    sorter: (a, b) => parseFloat(a.Cost) - parseFloat(b.Cost),
    width: 150,
  },
];

const PillFilter = () => {
  const [pillsInfo, setPillsInfo] = useState([]);
  const [searchedPill, setSearchedPill] = useState("");
  
  useEffect(() => {
    const fetchPillsInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/pillbank");
        setPillsInfo(res.data);
      } catch (error) {
        console.error("Error fetching pill data:", error);
      }
    };
    fetchPillsInfo();
  }, []);

  const handleSearch = (e) => {
    setSearchedPill(e.target.value);
  };

  const filteredPills = pillsInfo.filter((pill) =>
    pill.Pill_Name.toLowerCase().includes(searchedPill.toLowerCase())
  );

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div style={{ width: '100%' }}>
      <Input 
        justifyContent="end"
        alignItems="end"
        placeholder="Search by Medicine Name" 
        value={searchedPill} 
        onChange={handleSearch} 
        style={{ marginBottom: 20, width: 300, justify:"center" }}
        prefix={<img src="/searchIcon.svg" alt="Icon" style={{width: "15px", marginRight: "5px"}}
      />}
      />
      <Table
        columns={columns}
        dataSource={filteredPills}
        onChange={onChange}
        bordered
        size="middle"
        pagination={{ pageSize: 5 }}
        rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
        rowKey="Pill_ID"
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

