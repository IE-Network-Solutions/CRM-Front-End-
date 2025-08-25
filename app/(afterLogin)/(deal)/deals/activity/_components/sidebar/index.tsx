import CustomDrawerLayout from '@/components/common/customDrawer';
import { Button, DatePicker, Form, Input, Select, TimePicker, Typography, Checkbox } from 'antd';
import React from 'react';
const { Title, Text } = Typography;
import type { Dayjs } from 'dayjs';


interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

function ActivitySideBar({ open, onClose }: SideBarProps) {
  return (
    <CustomDrawerLayout
      modalHeader={
        <div>
          <Title level={5} style={{ margin: 0 }}>
            Deal Activity
          </Title>
          <Text style={{ color: '#8c8c8c' }}>Create a Deal Activity</Text>
        </div>
      }
      onClose={onClose}
      open={open}
      width="25%"
      footer={
        <div className="flex justify-center items-center gap-4">
          <Button
            type="primary"
            className="font-md bg-[#4080f0] text-white h-10"
            onClick={() => {}}
          >
            Create Activity
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
        
          <Form.Item name="dealName" label="Deal" rules={[{ required: true }]}>
            <Input placeholder="Deal Name" className='h-10 mt-1' />
          </Form.Item>
          <Form.Item name="activityName" label="Activity Name" rules={[{ required: true }]}>
            <Input placeholder="Activity Name" className='h-10 mt-1' />
          </Form.Item>
          <Form.Item name="assignedTo" label="Assigned To" rules={[{ required: true }]}>
            <Select placeholder="Activity Assigned To" className='h-10 mt-1' />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select placeholder="Activity Type" className="h-10 mt-1" />
          </Form.Item>
          <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
            <Select placeholder="Activity Priority" className="h-10 mt-1" />
          </Form.Item>
                 <div className="grid grid-cols-2 gap-4">
           <Form.Item name="time" label="Time" rules={[{ required: true }]}>
             <TimePicker className="w-full h-10 mt-1" placeholder="Set Time" />
           </Form.Item>
           <Form.Item name="date" label="Date" rules={[{ required: true }]}>
             <DatePicker className="w-full h-10 mt-1" placeholder="Set Date" />
           </Form.Item>
         </div>
         
         <div className="flex justify-end">
           <Form.Item name="useTodayDate" valuePropName="checked" noStyle>
             <Checkbox>Use todays Date</Checkbox>
           </Form.Item>
         </div>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea className="w-full h-36 mt-1" placeholder="Description" />
        </Form.Item>
        
        <div className="flex justify-center mt-2 mb-6">
          <Button
              type="primary"
              className="font-md bg-[#4080f0] text-white h-10"
              onClick={() => {}}
            >
              Mark as Done
            </Button>
        </div>
      </Form>

    </CustomDrawerLayout>
  );
}

export default ActivitySideBar;
