import CustomDrawerLayout from '@/components/common/customDrawer';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React from 'react';
const { Title, Text } = Typography;

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

function DealSideBar({ open, onClose }: SideBarProps) {
  return (
    <CustomDrawerLayout
      modalHeader={
        <div>
          <Title level={5} style={{ margin: 0 }}>
            Deals
          </Title>
          <Text style={{ color: '#8c8c8c' }}>Create a deal</Text>
        </div>
      }
      onClose={onClose}
      open={open}
      width="30%"
      footer={
        <div className="flex justify-center items-center gap-4">
          <Button
            type="primary"
            className="font-md bg-[#4080f0] text-white h-10"
            onClick={() => {}}
          >
            Create Deal
          </Button>
          <Button
            type="default"
            className="font-md border-[#4080f0] text-[#4080f0] h-10"
            onClick={() => {}}
          >
            Cancel
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onValuesChange={() => {}} className="w-full">
        {/* General Information */}
        <Text style={{ color: '#8c8c8c' }}>General Information</Text>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Deal Name" />
          </Form.Item>
          <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
            <Input placeholder="Account Owner" />
          </Form.Item>
          <Form.Item
            name="opening"
            label="Opening"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" placeholder="Start Date" />
          </Form.Item>
          <Form.Item
            name="closing"
            label="Closing"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" placeholder="Closing Date" />
          </Form.Item>
        </div>

        {/* Contact Information */}
        <Text style={{ color: '#8c8c8c' }}>Contact Information</Text>
        <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
          <Form.Item
            name="contactName"
            label="Contact Name"
            rules={[{ required: true }]}
          >
            <Input className="border-[#e7e7e8] " placeholder="Contact Name" />
          </Form.Item>
          <Form.Item name="contactPhone" label="Contact Phone">
            <Input className="border-[#e7e7e8]" placeholder="Phone" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input className="border-[#e7e7e8]" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true }]}
          >
            <Input className="border-[#e7e7e8]" placeholder="Company" />
          </Form.Item>
        </div>

        {/* Deal Information */}
        <Text style={{ color: '#8c8c8c' }}>Deal Information</Text>
        <Form.Item
          name="createdBy"
          label="Created by"
          rules={[{ required: true }]}
          className="mt-3"
        >
          <Input placeholder="Deal Created by" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select placeholder="Deal Type" />
          </Form.Item>
          <Form.Item name="source" label="Source" rules={[{ required: true }]}>
            <Select placeholder="Deal Source" />
          </Form.Item>
        </div>
        <Form.Item name="stage" label="Stage">
          <Select placeholder="Deal Stage" />
        </Form.Item>

        {/* Total Amount */}
        <div className="flex justify-between gap-4 items-center">
          <Form.Item
            name="totalAmount"
            label="Total Amount"
            rules={[{ required: true }]}
          >
            <Input placeholder="Total Amount" className="h-10" />
          </Form.Item>
          <Form.Item name="currency" label=" " rules={[{ required: true }]}>
            <Select placeholder="Currency" className="h-10 min-w-[170px]" />
          </Form.Item>
          <Button
            type="dashed"
            icon={<PlusOutlined className="text-[#4080f0]" size={20} />}
            className="border-[#e3e4e7] h-10 border-none"
          ></Button>
        </div>

        {/* Solution & Supplier */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="solution" label="Solution">
            <Select placeholder="Solution" />
          </Form.Item>
          <Form.Item name="supplier" label="Supplier">
            <Select placeholder="Supplier" />
          </Form.Item>
        </div>

        {/* Roles */}
        <div className="flex justify-between items-center ">
          <Text style={{ color: '#8c8c8c' }}>Roles</Text>
          <Button
            type="dashed"
            icon={<PlusOutlined className="text-[#4080f0]" size={20} />}
            className="border-[#e3e4e7] h-10 border-none"
          ></Button>
        </div>

        <Form.Item>
          <div className="grid grid-cols-2 gap-4">
            <Select placeholder="Deal Type" />
            <Input className="border-[#e7e7e8]" placeholder="Role Name" />
          </div>
        </Form.Item>
        <div className="space-y-6">
          {/* Upload File */}
          <Form.Item name="upload" valuePropName="fileList" className="mb-0">
            <Dragger
              multiple
              showUploadList={false}
              className="rounded-lg"
              style={{ borderColor: '#4080f0' }}
            >
              <p className="text-[#4080f0] font-medium text-lg">Upload File</p>
              <UploadOutlined className="text-[#4080f0] text-2xl my-2" />
              <p className="text-[#4080f0]">
                Drag File or Upload from computer
              </p>
            </Dragger>
          </Form.Item>

          {/* Deal Additional Info */}
          <div>
            <label className="block text-gray-600 mb-2">
              Deal Additional Information
            </label>
            <Form.Item name="description" className="mb-0">
              <Input.TextArea
                placeholder="Description"
                rows={4}
                className="rounded-lg"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </CustomDrawerLayout>
  );
}

export default DealSideBar;
