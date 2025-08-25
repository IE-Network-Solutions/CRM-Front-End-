'use client';

import React from 'react';
import { Modal, DatePicker, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (dateRange: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onFilter,
}) => {
  const [dateRange, setDateRange] = React.useState<any>(null);

  const handleFilter = () => {
    onFilter(dateRange);
    onClose();
  };

  const handleCancel = () => {
    setDateRange(null);
    onClose();
  };

  return (
    <Modal
      title="Filter"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
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
    </Modal>
  );
};

export default FilterModal;
