import CustomDrawerLayout from '@/components/common/customDrawer';
import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
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
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="contactName"
            label="Contact Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Contact Name" />
          </Form.Item>
          <Form.Item name="contactPhone" label="Contact Phone">
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true }]}
          >
            <Input placeholder="Company" />
          </Form.Item>
        </div>

        {/* Deal Information */}
        <Text style={{ color: '#8c8c8c' }}>Deal Information</Text>
        <Form.Item
          name="createdBy"
          label="Created by"
          rules={[{ required: true }]}
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
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="totalAmount"
            label="Total Amount"
            rules={[{ required: true }]}
          >
            <Input placeholder="Total Amount" />
          </Form.Item>
          <Form.Item name="currency" label=" " rules={[{ required: true }]}>
            <Select placeholder="Currency" />
          </Form.Item>
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
        <div className="flex justify-between ">
          <Form.Item label="Roles"></Form.Item>
          <Button type="dashed" icon="+" />
        </div>
      </Form>
    </CustomDrawerLayout>
  );
}

export default DealSideBar;
