'use client';

import React from 'react';
import { Typography, Button, Dropdown } from 'antd';
import { FilterOutlined, ExportOutlined } from '@ant-design/icons';
import FilterDropdown from '../filter-dropdown';
import ActionDropdown from '../action-dropdown';

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
            className="flex items-center text-blue-600 border-blue-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50"
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
            className="flex items-center text-blue-600 border-blue-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50"
          >
            Action
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
