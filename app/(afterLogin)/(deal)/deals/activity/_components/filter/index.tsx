import { Button, DatePicker, Form, Input, Select } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import React from 'react';

interface ActivityFilterProps {
  onFilter: (dateRange: any) => void;
}

const ActivityFilterModal: React.FC<ActivityFilterProps> = ({ onFilter }) => {
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
          <p className="text-gray-500 text-sm -mt-1">Filter your activities by</p>
        </div>
        <Button type="link" onClick={handleFilter} className="text-blue-500">
          Remove All
        </Button>
      </div>

      <Form layout="vertical" form={form} className="w-full">
        <h3 className="text-gray-500 text-sm mb-2 mt-3">
          Filter
        </h3>

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="name" label="Name">
            <Select placeholder="Deal Name" className='h-10 mt-1' />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Select placeholder="Deal Type" className='h-10 mt-1' />
          </Form.Item>
        </div>

          <Form.Item name="priority" label="Priority">
            <Select placeholder="Priority" className='h-10 mt-1' />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker className="w-full h-10 mt-1" placeholder="Set Date" />
          </Form.Item>

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

export default ActivityFilterModal;
