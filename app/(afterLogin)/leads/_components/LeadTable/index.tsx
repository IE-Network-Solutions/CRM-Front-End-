'use client';
import { Table, Checkbox } from 'antd';
import { LeadStates } from '../LeadStates';
import type { Lead } from '@/store/server/features/leads/interface';

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  selectedRows: string[];
  onSelectionChange: (selectedRows: string[]) => void;
}

export default function LeadTable({
  leads,
  isLoading,
  selectedRows,
  onSelectionChange,
}: LeadTableProps) {
  const handleSelectRow = (leadId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedRows, leadId]);
    } else {
      onSelectionChange(selectedRows.filter((id) => id !== leadId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(leads.map((lead) => lead.id));
    } else {
      onSelectionChange([]);
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedRows.length === leads.length && leads.length > 0}
          onChange={(e) => handleSelectAll(e.target.checked)}
          aria-label="Select all leads"
          className="!rounded-none" // Make checkbox square instead of circular
        />
      ),
      dataIndex: 'selection',
      key: 'selection',
      width: 40, // Very narrow width - just enough for the checkbox
      fixed: 'left' as const,
      render: (unused: any, record: Lead) => (
        <Checkbox
          checked={selectedRows.includes(record.id)}
          onChange={(e) => handleSelectRow(record.id, e.target.checked)}
          aria-label={`Select ${record.contactPersonFName} ${record.contactPersonLName}`}
          className="!rounded-none" // Make checkbox square instead of circular
        />
      ),
    },
    {
      title: 'Leads Name',
      dataIndex: 'contactPersonFName',
      key: 'contactPerson',
      width: 140, // Reduced width and positioned closer to checkbox
      render: (unused: any, record: Lead) => (
        <span className="text-sm font-semibold text-gray-900">
          {record.contactPersonFName} {record.contactPersonLName}
        </span>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'name',
      key: 'company',
      width: 150,
      render: (name: string) => (
        <span className="text-sm font-medium text-gray-800">{name}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'contactPersonEmail',
      key: 'email',
      width: 200,
      render: (email: string) => (
        <span className="text-sm font-medium text-gray-700">{email}</span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'contactPersonPhoneNumber',
      key: 'phone',
      width: 130,
      render: (phone: string) => (
        <span className="text-sm font-medium text-gray-700">
          {phone || '-'}
        </span>
      ),
    },
    {
      title: 'Lead Source',
      dataIndex: 'sourceId',
      key: 'source',
      width: 120,
      render: (sourceId: string | null) => (
        <span className="text-sm font-medium text-gray-700">
          {sourceId || '-'}
        </span>
      ),
    },
    {
      title: 'Lead Stage',
      dataIndex: 'engagementStageId',
      key: 'stage',
      width: 150,
      render: (stageId: string | null, record: Lead) => (
        <LeadStates
          leadId={record.id}
          currentStage={stageId}
          onStageChange={() => {}} // handleStageChange is removed
          data-cy={`lead-stage-dropdown-${record.id}`}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border-0">
        <div className="p-8 text-center text-sm font-medium text-gray-600">
          Loading leads...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border-0">
      <Table
        columns={columns}
        dataSource={leads}
        rowKey="id"
        pagination={false}
        loading={isLoading}
        className="custom-table"
        size="middle"
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
        }
      />
    </div>
  );
}
