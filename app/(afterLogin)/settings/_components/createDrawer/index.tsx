import React from 'react';
import { Drawer, Button, Input, Form } from 'antd';

const { TextArea } = Input;

interface CreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  itemType: string;
}

const CreateDrawer: React.FC<CreateDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  itemType,
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

  const getTitle = () => {
    switch (itemType) {
      case 'Create Role':
        return 'Role';
      case 'Solutions':
        return 'Solution';
      case 'Sales Vertical':
        return 'Sales Vertical';
      default:
        return itemType;
    }
  };

  const getButtonText = () => {
    switch (itemType) {
      case 'Create Role':
        return 'Create Role';
      case 'Solutions':
        return 'Create Solution';
      case 'Sales Vertical':
        return 'Create Sales Vertical';
      default:
        return `Create ${itemType}`;
    }
  };

  return (
    <Drawer
      title={
        <div>
          <div className="text-xl font-bold text-gray-900">{getTitle()}</div>
          <div className="text-sm text-gray-500 mt-1">
            Create a {getTitle()}
          </div>
        </div>
      }
      placement="right"
      onClose={handleClose}
      open={isOpen}
      width={400}
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
            {getButtonText()}
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
      <Form form={form} layout="vertical" className="-mt-2">
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: `${getTitle()} name is required` },
          ]}
        >
          <Input
            placeholder={`${getTitle()} Name`}
            className="border-gray-300 focus:border-[#2563eb] focus:ring-[#2563eb]"
          />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
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

export default CreateDrawer;
