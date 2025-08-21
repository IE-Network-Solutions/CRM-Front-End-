import React from 'react';
import { Button } from 'antd';

interface RemoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedItem: string;
  itemType: string;
  position?: { x: number; y: number };
}

const RemoveModal: React.FC<RemoveModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemType,
  position,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Modal Content */}
      <div
        className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[280px]"
        style={{
          top: position?.y || 0,
          left: position?.x || 0,
          transform: 'translateX(-100%)',
        }}
      >
        <div className="text-center mb-4">
          <h4 className="font-bold text-gray-900 mb-2">Remove {itemType}</h4>
          <p className="text-gray-700 text-sm">
            Are you sure you want to delete this {itemType} ?
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={onConfirm}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] border-[#2563eb] hover:border-[#1d4ed8] text-white text-sm px-4 py-5"
          >
            Remove {itemType}
          </Button>
          <Button
            onClick={onClose}
            className="text-[#2563eb] border-[#2563eb] hover:bg-[#eff6ff] text-sm px-4 py-5"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default RemoveModal;
