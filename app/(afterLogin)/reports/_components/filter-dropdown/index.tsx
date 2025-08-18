'use client';

import React from 'react';
import { DatePicker, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface FilterDropdownProps {
  onFilter: (dateRange: any) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilter }) => {
  const [dateRange, setDateRange] = React.useState<any>(null);

  const handleFilter = () => {
    onFilter(dateRange);
  };

  const handleCancel = () => {
    setDateRange(null);
  };

  const dropdownContent = (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-80">
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 mb-2">Filter your activities by</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <RangePicker
            className="w-full"
            placeholder={['Start Date', 'End Date']}
            value={dateRange}
            onChange={setDateRange}
            suffixIcon={<CalendarOutlined />}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="primary"
            onClick={handleFilter}
            className="flex-1 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
          >
            Filter
          </Button>
          <Button
            onClick={handleCancel}
            className="flex-1 text-blue-600 border-blue-600 hover:text-blue-700 hover:border-blue-700 hover:bg-blue-50"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  return dropdownContent;
};

export default FilterDropdown;
