import React from 'react';
import { Drawer, Button, Input, Form } from 'antd';

const { TextArea } = Input;

interface EditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  itemType: string;
  itemName: string;
  itemDescription?: string;
}

const EditDrawer: React.FC<EditDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  itemType,
  itemName,
  itemDescription = '',
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
          <div className="text-xl font-bold text-gray-900">{itemType}</div>
          <div className="text-sm text-gray-500 mt-1">{itemType}</div>
        </div>
      }
      placement="right"
      onClose={handleClose}
      open={isOpen}
      width={400}
      closable={false}
      styles={{
        header: { borderBottom: 'none' },
        footer: { borderTop: 'none' },
      }}
      footer={
        <div className="flex justify-center gap-3 border-t-0 p-4">
          <Button
            onClick={handleClose}
            className="text-[#2563eb] border-[#2563eb] hover:bg-[#eff6ff]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] border-[#2563eb] hover:border-[#1d4ed8] text-white"
          >
            Save {itemType}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: itemName,
          description: itemDescription,
        }}
      >
        <Form.Item
          label={`${itemType} Name `}
          name="name"
          rules={[{ required: true, message: `${itemType} name is required` }]}
        >
          <Input
            placeholder={`${itemType} Name`}
            className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
          />
        </Form.Item>

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

export default EditDrawer;
