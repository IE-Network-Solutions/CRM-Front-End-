import CustomDrawerLayout from '@/components/common/customDrawer';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
const { Title, Text } = Typography;
import { HiOutlinePaintBrush } from "react-icons/hi2";


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
  {/* Stage with icon */}
  <Form.Item
    name="stage"
    label="Stage"
    rules={[{ required: true, message: "Stage is required" }]}
  >
    <div className="flex items-center gap-2">
      <Input placeholder="Stage Name" className="h-10 mt-2" />
      <Button
      type="default"
      icon={<HiOutlinePaintBrush size={20}/>
      }
        className=" p-2 flex items-center justify-center w-14 h-10"
      >
        
      </Button>
    </div>
  </Form.Item>

  {/* Stage Description */}
  <Form.Item name="description" label="Stage Description">
    <Input.TextArea placeholder="Description" className="h-32 mt-2" />
  </Form.Item>
</div>

      </Form>
    </CustomDrawerLayout>
  );
}

export default SettingsSideBar;
