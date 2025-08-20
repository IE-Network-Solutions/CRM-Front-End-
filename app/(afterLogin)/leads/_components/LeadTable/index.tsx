'use client';
import { Table, Checkbox } from 'antd';
import { LeadStates } from '../LeadStates';
import type { Lead } from '@/store/server/features/leads/interface';
import {
  useSourcesQuery,
  useCompaniesQuery,
} from '@/store/server/features/leads/queries';

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
  // Fetch sources to map sourceId to source name
  const {
    data: sources = [],
    isLoading: sourcesLoading,
    error: sourcesError,
  } = useSourcesQuery();
  // Fetch companies to map companyId to company name
  const { data: companies = [], isLoading: companiesLoading } =
    useCompaniesQuery();

  // Show warning if no sources are available
  if (sources.length === 0 && !sourcesLoading && !sourcesError) {
    // No sources found in system. Lead sources will show as "No Source"
  }

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
      dataIndex: 'name',
      key: 'leadName',
      width: 140, // Reduced width and positioned closer to checkbox
      render: (name: string) => (
        <span className="text-sm font-semibold text-gray-900">
          {name || '-'}
        </span>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'companyId',
      key: 'company',
      width: 150,
      render: (companyId: string | null) => {
        if (!companyId) {
          return <span className="text-sm font-medium text-gray-700">-</span>;
        }

        if (companiesLoading) {
          return (
            <span className="text-sm font-medium text-gray-500">
              Loading...
            </span>
          );
        }

        const company = companies.find((c) => c.id === companyId);

        if (!company) {
          return (
            <span className="text-sm font-medium text-gray-700">
              {companyId}
            </span>
          );
        }

        return (
          <span className="text-sm font-medium text-gray-800">
            {company.name}
          </span>
        );
      },
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
      render: (sourceId: string | null) => {
        if (!sourceId)
          return <span className="text-sm font-medium text-gray-700">-</span>;

        if (sourcesLoading) {
          return (
            <span className="text-sm font-medium text-gray-500">
              Loading sources...
            </span>
          );
        }

        const source = sources.find((s) => s.id === sourceId);

        if (!source) {
          if (sources.length === 0) {
            return (
              <span
                className="text-sm font-medium text-gray-500"
                title="No sources configured in system"
              >
                No Source
              </span>
            );
          }

          return (
            <span
              className="text-sm font-medium text-gray-700"
              title={`Source ID: ${sourceId} (Sources loaded: ${sources.length})`}
            >
              {sourceId}
            </span>
          );
        }

        return (
          <span className="text-sm font-medium text-gray-700">
            {source.name}
          </span>
        );
      },
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
        size="small"
        scroll={{ x: 1000 }} // Enable horizontal scrolling for small screens
        // Remove custom rowClassName to avoid extra blank row
        locale={leads.length === 0 ? { emptyText: null } : undefined}
        bordered={false}
        showHeader={true}
      />
    </div>
  );
}
