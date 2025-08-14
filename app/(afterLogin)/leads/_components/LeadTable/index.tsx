"use client"

import { Table, Button, Space } from "antd"
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import { Lead } from "@/store/server/features/leads/interface"
import { LeadStates } from "../LeadStates"
import { CustomPagination } from "@/components/customPagination"
import { useLeadStore } from "@/store/uistate/features/leads/leadStore"

interface LeadTableProps {
  leads: Lead[]
  isLoading: boolean
  selectedRows: number[]
  onSelectionChange: (selectedRows: number[]) => void
}

export function LeadTable({ leads, isLoading, selectedRows, onSelectionChange }: LeadTableProps) {
  const { currentPage, setCurrentPage } = useLeadStore()

  const handleSelectionChange = (selectedRowKeys: React.Key[]) => {
    onSelectionChange(selectedRowKeys.map(key => Number(key)))
  }

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: handleSelectionChange,
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Lead) => (
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
      render: (companyName: string | null) => companyName || "N/A",
    },
    {
      title: "Source",
      dataIndex: "sourceName",
      key: "sourceName",
      render: (sourceName: string | null) => sourceName || "N/A",
    },
    {
      title: "Stage",
      dataIndex: "stageName",
      key: "stageName",
      render: (stageName: string | null, record: Lead) => (
        <LeadStates leadId={record.id} currentStage={stageName} />
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => phone || "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_unused: any, record: Lead) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            data-cy={`lead-view-button-${record.id}`}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            data-cy={`lead-edit-button-${record.id}`}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            danger
            data-cy={`lead-delete-button-${record.id}`}
          />
        </Space>
      ),
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200" data-cy="leads-table">
      <Table
        columns={columns}
        dataSource={leads}
        rowKey="id"
        loading={isLoading}
        rowSelection={rowSelection}
        pagination={false}
        className="custom-table"
      />
      
      {leads.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <CustomPagination
            current={currentPage}
            total={leads.length}
            pageSize={10}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

