import React from 'react';
import { Drawer, Button, Input, Form, Select, Radio, Switch } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

interface CustomFieldDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  itemData?: any;
}

const CustomFieldDrawer: React.FC<CustomFieldDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  itemData = {},
}) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={
        <div>
          <div className="text-xl font-bold text-gray-900">Custom Field</div>
          <div className="text-sm text-gray-500 mt-1">Custom Field</div>
        </div>
      }
      placement="right"
      onClose={handleClose}
      open={isOpen}
      width={400}
      closable={false}
      styles={{
        header: { borderBottom: 'none' },
        body: { paddingTop: '24px' },
        footer: { borderTop: 'none' },
      }}
      footer={
        <div className="flex justify-center gap-3 border-t-0 p-4">
          <Button
            onClick={handleSave}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] border-[#2563eb] hover:border-[#1d4ed8] text-white py-5"
          >
            Save Custom Field
          </Button>
          <Button
            onClick={handleClose}
            className="text-[#2563eb] border-[#2563eb] hover:bg-[#eff6ff] py-5"
          >
            Cancel
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" initialValues={itemData}>
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Field name is required' }]}
        >
          <Input
            placeholder="Field Name"
            className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
          />
        </Form.Item>

        {/* Type */}
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Field type is required' }]}
        >
          <Select
            placeholder="Field Type"
            className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
          >
            <Option value="text">Text</Option>
            <Option value="number">Number</Option>
            <Option value="email">Email</Option>
            <Option value="phone">Phone</Option>
            <Option value="date">Date</Option>
            <Option value="select">Select</Option>
            <Option value="textarea">Text Area</Option>
          </Select>
        </Form.Item>

        {/* Field Association and Required Toggle */}
        <div className="flex items-center justify-between mb-4">
          <Form.Item
            label="Field Association"
            name="association"
            rules={[
              { required: true, message: 'Field association is required' },
            ]}
            className="mb-0"
          >
            <Radio.Group>
              <Radio value="deal">Deal</Radio>
              <Radio value="lead">Lead</Radio>
              <Radio value="both">Both</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Is required"
            name="isRequired"
            valuePropName="checked"
            className="mb-0"
          >
            <Switch className="bg-gray-300" />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item label="Field Description" name="description">
          <TextArea
            placeholder="Description"
            rows={4}
            className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CustomFieldDrawer;
