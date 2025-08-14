"use client"

import { useState } from "react"
import { Button, Input, Alert } from "antd"
import { PlusOutlined, SearchOutlined, FilterOutlined, MoreOutlined } from "@ant-design/icons"
import { LeadTable } from "./_components/LeadTable"

import { useLeadsWithNamesQuery } from "@/store/server/features/leads/queries"
import { useLeadStore } from "@/store/uistate/features/leads/leadStore"

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const { selectedRows, setSelectedRows, currentPage, setCurrentPage } = useLeadStore()

  const filters = {
    search: searchTerm,
    page: currentPage,
    limit: 10,
  }

  const { data: leads = [], isLoading, error } = useLeadsWithNamesQuery(filters)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }



  const handleBulkAction = () => {
    // Bulk action on selected rows
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen" data-cy="leads-page">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-cy="leads-page-title">
              Leads
            </h1>
            <p className="text-gray-600" data-cy="leads-page-subtitle">
              Manage and track your leads
            </p>
          </div>
          
          <Alert
            message="Error Loading Leads"
            description="Failed to fetch leads from the server. Please check your connection and try again."
            type="error"
            showIcon
            action={
              <Button size="small" danger data-cy="retry-button">
                Retry
              </Button>
            }
            data-cy="leads-error-alert"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen" data-cy="leads-page">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-cy="leads-page-title">
            Leads
          </h1>
          <p className="text-gray-600" data-cy="leads-page-subtitle">
            Manage and track your leads
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              data-cy="create-leads-button"
            >
              Create Lead
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6" data-cy="leads-controls">
            <div className="flex-1">
              <Input
                placeholder="Search leads..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                size="large"
                data-cy="leads-search-input"
              />
            </div>
            
            <div className="flex gap-2" data-cy="leads-action-buttons">
              <Button
                icon={<FilterOutlined />}
                data-cy="filter-button"
              >
                Filter
              </Button>
              <Button
                icon={<MoreOutlined />}
                onClick={handleBulkAction}
                disabled={selectedRows.length === 0}
                size="small"
                data-cy="action-button"
              >
                Actions
              </Button>
            </div>
          </div>


        </div>

        <LeadTable
          leads={leads}
          isLoading={isLoading}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          data-cy="leads-table"
        />
      </div>
    </div>
  )
}

