'use client';

import React from 'react';
import { Typography, Button, Dropdown } from 'antd';
import { FilterOutlined, ExportOutlined } from '@ant-design/icons';
import FilterDropdown from '../filterDropdown';
import ActionDropdown from '../actionDropdown';

const { Title, Text } = Typography;

const Header: React.FC = () => {
  const handleFilter = () => {
    // Add your filter logic here
  };

  const handleExport = () => {
    // Add your export logic here
  };

  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <Title level={3} className="mb-1">
          Report
        </Title>
        <Text className="text-gray-600">View All Reports</Text>
      </div>
      <div className="flex gap-3">
        <Dropdown
          overlay={<FilterDropdown onFilter={handleFilter} />}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            icon={<FilterOutlined />}
            style={{
              color: '#3b82f6',
              borderColor: '#93c5fd',
              borderWidth: '1px',
              height: '50px',
            }}
            className="flex items-center hover:bg-blue-50"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1d4ed8';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.borderColor = '#93c5fd';
            }}
          >
            Filter
          </Button>
        </Dropdown>

        <Dropdown
          overlay={<ActionDropdown onExport={handleExport} />}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            icon={<ExportOutlined />}
            style={{
              color: '#3b82f6',
              borderColor: '#93c5fd',
              borderWidth: '1px',
              height: '50px',
            }}
            className="flex items-center hover:bg-blue-50"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1d4ed8';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.borderColor = '#93c5fd';
            }}
          >
            Action
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
