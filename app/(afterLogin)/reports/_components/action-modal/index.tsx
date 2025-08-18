'use client';

import React from 'react';
import { Modal, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  onExport
}) => {
  const handleExport = () => {
    onExport();
    onClose();
  };

  return (
    <Modal
      title="Actions"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <div className="space-y-4">
        <Button
          type="primary"
          icon={<ExportOutlined />}
          onClick={handleExport}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-base"
        >
          Export Report
        </Button>
      </div>
    </Modal>
  );
};

export default ActionModal;
