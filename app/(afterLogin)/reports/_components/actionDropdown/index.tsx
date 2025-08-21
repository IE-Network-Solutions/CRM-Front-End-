'use client';

import React from 'react';
import { Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

interface ActionDropdownProps {
  onExport: () => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ onExport }) => {
  const handleExport = () => {
    onExport();
  };

  const dropdownContent = (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-48">
      <div className="space-y-2">
        <Button
          type="primary"
          icon={<ExportOutlined />}
          onClick={handleExport}
          className="w-full h-10 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
        >
          Export Report
        </Button>
      </div>
    </div>
  );

  return dropdownContent;
};

export default ActionDropdown;
