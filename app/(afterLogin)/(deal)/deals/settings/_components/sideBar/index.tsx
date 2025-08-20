import CustomDrawerLayout from '@/components/common/customDrawer';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
const { Title, Text } = Typography;

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

function SettingsSideBar({ open, onClose }: SideBarProps) {
  return (
    <CustomDrawerLayout
      modalHeader={
        <div>
          <Title level={5} style={{ margin: 0 }}>
            Deal Stage
          </Title>
          <Text style={{ color: '#8c8c8c' }}>Create a Deal Stage</Text>
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
            Create Stage
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
        <div className="grid grid-cols-1 gap-4">
          <Form.Item
            name="stage"
            label="Stage Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Deal Name" />
          </Form.Item>
          <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
            <Input placeholder="Account Owner" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
        </div>
      </Form>
    </CustomDrawerLayout>
  );
}

export default SettingsSideBar;
