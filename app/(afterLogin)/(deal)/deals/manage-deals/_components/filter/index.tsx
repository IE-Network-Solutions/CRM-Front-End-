import { Button, Form, Input, Modal, Select } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import React from "react";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: () => void;
  onRemoveAll: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  onFilter,
  onRemoveAll,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={350}
      style={{ top: "25%", right: "100px", left: "60%", position: "absolute" }}
      title={
        <div className="flex justify-between items-center mb-1">
          <div>
            <h2 className="text-lg font-semibold">Filter</h2>
            <p className="text-gray-500 text-sm -mt-1">
              Filter your leads by
            </p>
          </div>
          <Button type="link" onClick={onRemoveAll} className="text-blue-500">
            Remove All
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} className="w-full">
        <h3 className="text-gray-500 text-sm mb-2">
          Filter by general information
        </h3>

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="name" label="Name">
            <Select placeholder="Account Name" />
          </Form.Item>
          <Form.Item name="owner" label="Owner">
            <Select placeholder="Account Owner" />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Select placeholder="Deal Type" />
          </Form.Item>
          <Form.Item name="stage" label="Stage">
            <Select placeholder="Deal Stage" />
          </Form.Item>
        </div>

        {/* Revenue Row */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="revenue" label="Revenue">
            <Input
              placeholder="Expected Revenue"
              prefix={<DollarOutlined />}
            />
          </Form.Item>
          <Form.Item name="currency" label=" ">
            <Select placeholder="Currency" />
          </Form.Item>
        </div>

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
          <Button type="default" className="px-6" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FilterModal;
