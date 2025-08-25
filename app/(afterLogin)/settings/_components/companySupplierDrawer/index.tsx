import React from 'react';
import { Drawer, Button, Input, Form, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface CompanySupplierDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  itemType: string;
  itemData?: any;
}

const CompanySupplierDrawer: React.FC<CompanySupplierDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  itemType,
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

  const uploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: () => false,
    showUploadList: false,
  };

  return (
    <Drawer
      title={
        <div>
          <div className="text-xl font-bold text-gray-900">{itemType}</div>
          <div className="text-sm text-gray-500 mt-1">{itemType}</div>
        </div>
      }
      placement="right"
      onClose={handleClose}
      open={isOpen}
      width={500}
      closable={false}
      styles={{
        header: { borderBottom: 'none' },
        body: { paddingTop: '16px' },
        footer: { borderTop: 'none' },
      }}
      footer={
        <div className="flex justify-center gap-3 border-t-0 p-4">
          <Button
            onClick={handleSave}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] border-[#2563eb] hover:border-[#1d4ed8] text-white py-5"
          >
            Save {itemType}
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
      <Form
        form={form}
        layout="vertical"
        className="-mt-2"
        initialValues={itemData}
      >
        {/* Logo Upload - Full Width */}
        <Form.Item label={`${itemType} Logo`} name="logo">
          <Upload.Dragger {...uploadProps}>
            <div className="p-8 text-center">
              <UploadOutlined className="text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600">
                Drag or drop file or select file from device
              </p>
            </div>
          </Upload.Dragger>
        </Form.Item>

        {/* Two Column Layout for Form Fields */}
        <Row gutter={16}>
          {/* Left Column */}
          <Col span={12}>
            {/* Name */}
            <Form.Item label="Name" name="name">
              <Input
                placeholder={`${itemType} Name`}
                className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
              />
            </Form.Item>

            {/* Phone */}
            <Form.Item label="Phone" name="phone">
              <Input
                placeholder={`${itemType} Phone`}
                className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                placeholder={`${itemType} Email`}
                className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
              />
            </Form.Item>

            {/* Website */}
            <Form.Item label="Website" name="website">
              <Input
                placeholder={`${itemType} Website`}
                className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
              />
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col span={12}>
            {/* City */}
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'City is required' }]}
            >
              <Input
                placeholder={`${itemType} City`}
                className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
              />
            </Form.Item>

            {/* State */}
            <Form.Item label="State" name="state">
              <Input
                placeholder={`${itemType} State`}
                className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
              />
            </Form.Item>

            {/* Zipcode */}
            <Form.Item
              label="Zipcode"
              name="zipcode"
              rules={[{ required: true, message: 'Zipcode is required' }]}
            >
              <Input
                placeholder={`${itemType} Zipcode`}
                className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Description - Full Width */}
        <Form.Item label={`${itemType} Description`} name="description">
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

export default CompanySupplierDrawer;
