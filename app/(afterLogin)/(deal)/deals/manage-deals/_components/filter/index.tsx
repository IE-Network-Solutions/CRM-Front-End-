import { Button, Form, Input, Modal, Select } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import React from 'react';

interface FilterDropdownProps {
  onFilter: (dateRange: any) => void;
}

const FilterModal: React.FC<FilterDropdownProps> = ({ onFilter }) => {
  const [dateRange, setDateRange] = React.useState<any>(null);
  const [form] = Form.useForm();

  const handleFilter = () => {
    onFilter(dateRange);
  };

  const handleCancel = () => {
    setDateRange(null);
  };

  const dropdownContent = (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-80">
      <div className="flex justify-between items-center mb-1 ">
        <div>
          <h2 className="text-lg font-semibold">Filter</h2>
          <p className="text-gray-500 text-sm -mt-1">Filter your leads by</p>
        </div>
        <Button type="link" onClick={handleFilter} className="text-blue-500">
          Remove All
        </Button>
      </div>

      <Form layout="vertical" form={form} className="w-full">
        <h3 className="text-gray-500 text-sm mb-2">
          Filter by general information
        </h3>

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="name" label="Name">
            <Select placeholder="Account Name" />
          </Form.Item>
          <Form.Item name="owner" label="Owner">
            <Select placeholder="Account Owner" />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Select placeholder="Deal Type" />
          </Form.Item>
          <Form.Item name="stage" label="Stage">
            <Select placeholder="Deal Stage" />
          </Form.Item>
        </div>

        {/* Revenue Row */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="revenue" label="Revenue">
            <Input placeholder="Expected Revenue" prefix={<DollarOutlined />} />
          </Form.Item>
          <Form.Item name="currency" label=" ">
            <Select placeholder="Currency" />
          </Form.Item>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-2 mt-6">
          <Button
            type="primary"
            className="px-6"
            onClick={() => {
              form.validateFields().then(onFilter);
            }}
          >
            Filter
          </Button>
          <Button type="default" className="px-6" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );




  return dropdownContent;

  
    
  
};

export default FilterModal;
