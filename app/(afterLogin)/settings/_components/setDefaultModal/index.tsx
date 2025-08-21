import React from 'react';
import { Modal, Button } from 'antd';

interface SetDefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCurrency: string;
}

const SetDefaultModal: React.FC<SetDefaultModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      title={<div className="text-center font-bold">Set Default</div>}
      open={isOpen}
      onCancel={onClose}
      centered
      closable={false}
      footer={
        <div className="flex justify-center gap-3">
          <Button
            onClick={onConfirm}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] border-[#2563eb] hover:border-[#1d4ed8] text-white py-5"
          >
            Set Default
          </Button>
          <Button
            onClick={onClose}
            className="text-[#2563eb] border-[#2563eb] hover:bg-[#eff6ff] py-5"
          >
            Cancel
          </Button>
        </div>
      }
    >
      <div className="py-4 text-center">
        <p className="text-gray-700 mb-2">
          Are you sure you want to make this currency default ?
        </p>
        <p className="text-gray-700">
          This will remove the current Default currency
        </p>
      </div>
    </Modal>
  );
};

export default SetDefaultModal;
