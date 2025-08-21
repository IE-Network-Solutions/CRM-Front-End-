'use client';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { useCreateLeadDrawerStore } from '@/stores/useCreateLeadDrawerStore';
import { useCreateLeadDrawerStore } from '@/store/uistate/features/leads/useCreateLeadDrawerStore';
// ✅ Fixed import path - using relative path to _components folder
import { CreateLeadDrawer } from '../_components/create-lead-drawer';
// ... import your LeadsTable component here

export default function LeadsPage() {
  const { isOpen, openDrawer, closeDrawer } = useCreateLeadDrawerStore();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={openDrawer}>
          Create Lead
        </Button>
      </div>

      {/* This is where your main list/table of leads would go */}
      {/* <LeadsTable /> */}

      <CreateLeadDrawer isOpen={isOpen} onClose={closeDrawer} />
    </div>
  );
}
