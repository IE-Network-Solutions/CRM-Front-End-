'use client';

import { useMemo } from 'react';
import { Button, Input } from 'antd';
import {
  Search,
  Plus,
  Filter,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLeadStore } from '@/store/uistate/features/leads/leadStore';
import { useLeadsWithNamesQuery } from '@/store/server/features/leads/queries';
import LeadTable from './_components/LeadTable';
import { Lead } from '@/store/server/features/leads/interface';

export default function LeadsPage() {
  const { selectedRows, setSelectedRows, currentPage, setCurrentPage } =
    useLeadStore();

  const filters = useMemo(
    () => ({
      page: currentPage,
      limit: 10,
    }),
    [currentPage],
  );

  const leadsQueryResult = useLeadsWithNamesQuery(filters);

  // Extract leads and pagination data from the processed query result
  let leads: Lead[] = [];
  let pagination = null;
  let totalPages = 1;

  if (leadsQueryResult?.data) {
    // The query result is already processed, so data should be the leads array
    if (Array.isArray(leadsQueryResult.data)) {
      leads = leadsQueryResult.data;
      totalPages = 1;
    } else {
      // This shouldn't happen if the query is working correctly
      leads = leadsQueryResult.data as any;
      totalPages = 1;
    }
  }

  // Get pagination from the query result
  if ((leadsQueryResult as any)?.pagination) {
    pagination = (leadsQueryResult as any).pagination;
    totalPages = pagination.totalPages || 1;
  }

  // React Query will handle refetching automatically when needed
  // No need for manual refetch

  const handleCreateLead = () => {
    // Create lead functionality
  };

  const handleBulkAction = () => {
    // Bulk action functionality
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (leadsQueryResult.error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">
          {' '}
          {/* Responsive padding */}
          <div className="mb-6">
            {' '}
            {/* Responsive margin */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Leads
            </h1>
            <p className="text-sm font-medium text-gray-600">
              View Potential Customers
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            {' '}
            {/* Responsive padding */}
            <div className="text-center text-sm font-medium text-red-600">
              Failed to fetch leads from the server. Please check your
              connection and try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">
        {' '}
        {/* Responsive padding */}
        {/* Page Header with Controls */}
        <div className="mb-6 sm:mb-8">
          {' '}
          {/* Responsive margin */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            {' '}
            {/* Responsive layout */}
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Leads
              </h1>
              <p className="text-sm font-medium text-gray-600">
                View Potential Customers
              </p>
            </div>
            <Button
              type="primary"
              onClick={handleCreateLead}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-4 rounded w-full sm:w-auto" // Responsive width
              size="large"
              icon={<Plus className="h-5 w-5 mr-3" />}
            >
              Create Leads
            </Button>
          </div>
          {/* Search and Controls Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {' '}
            {/* Responsive layout */}
            {/* Search Input */}
            <div className="relative flex-1 max-w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Leads"
                value={''}
                className="pl-10 border-gray-300 bg-white w-full"
                prefix={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {' '}
              {/* Responsive layout */}
              <Button
                className="border-blue-500 text-blue-500 bg-white hover:bg-blue-50 py-[13px] px-3 rounded w-full sm:w-auto" // Responsive width
                style={{
                  borderColor: '#1890ff',
                  color: '#1890ff',
                }}
                icon={
                  <Filter
                    className="h-4 w-4 mr-2"
                    style={{ color: '#1890ff' }}
                  />
                }
              >
                Filter
              </Button>
              <Button
                className="border-blue-500 text-blue-500 bg-white hover:bg-blue-50 py-[13px] px-3 rounded w-full sm:w-auto" // Responsive width
                style={{
                  borderColor: '#1890ff',
                  color: '#1890ff',
                }}
                onClick={handleBulkAction}
                disabled={selectedRows.length === 0}
                icon={
                  <Grid3X3
                    className="h-4 w-4 mr-2"
                    style={{ color: '#1890ff' }}
                  />
                }
              >
                Action {selectedRows.length > 0 && `(${selectedRows.length})`}
              </Button>
            </div>
          </div>
        </div>
        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Section */}
          <div className="overflow-x-auto w-full">
            {' '}
            {/* Added horizontal scroll for small screens */}
            <LeadTable
              leads={leads}
              isLoading={leadsQueryResult.isLoading}
              selectedRows={selectedRows}
              onSelectionChange={setSelectedRows}
              key={`leads-${currentPage}-${leads.length}`}
            />
          </div>

          {/* Pagination - Always visible */}
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-white">
            {' '}
            {/* Responsive padding */}
            <div className="flex items-center justify-center sm:justify-end">
              {' '}
              {/* Responsive alignment */}
              <div className="flex items-center gap-1">
                <Button
                  type="default"
                  size="small"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 p-0"
                  style={{
                    borderColor: '#d1d5db',
                    color: '#6b7280',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const button = e.currentTarget as HTMLButtonElement;
                    if (!button.disabled) {
                      button.style.borderColor = '#3b82f6';
                      button.style.color = '#3b82f6';
                      button.style.backgroundColor = '#eff6ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.color = '#6b7280';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  icon={<ChevronLeft className="h-4 w-4" />}
                  data-cy="pagination-prev-button"
                />

                {/* Page Numbers */}
                {Array.from(
                  { length: Math.min(5, totalPages) },
                  (unused, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        type="default"
                        size="small"
                        onClick={() => {
                          handlePageChange(pageNum);
                        }}
                        className="w-8 h-8 p-0"
                        style={{
                          borderColor: '#d1d5db',
                          color: '#6b7280',
                          backgroundColor: '#f9fafb',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#3b82f6';
                          e.currentTarget.style.color = '#3b82f6';
                          e.currentTarget.style.backgroundColor = '#eff6ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#d1d5db';
                          e.currentTarget.style.color = '#6b7280';
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                        }}
                        data-cy={`pagination-page-${pageNum}`}
                      >
                        {pageNum}
                      </Button>
                    );
                  },
                )}

                {totalPages > 5 && (
                  <>
                    <span className="px-2 text-sm font-medium text-gray-500">
                      ...
                    </span>
                    <Button
                      type="default"
                      size="small"
                      onClick={() => handlePageChange(totalPages)}
                      className="w-8 h-8 p-0"
                      style={{
                        borderColor: '#d1d5db',
                        color: '#6b7280',
                        backgroundColor: '#f9fafb',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#3b82f6';
                        e.currentTarget.style.color = '#3b82f6';
                        e.currentTarget.style.backgroundColor = '#eff6ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.color = '#6b7280';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      data-cy={`pagination-page-${totalPages}`}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  type="default"
                  size="small"
                  onClick={() => {
                    const nextPage = currentPage + 1;
                    if (nextPage <= totalPages) {
                      handlePageChange(nextPage);
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 p-0"
                  style={{
                    borderColor: '#d1d5db',
                    color: '#6b7280',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const button = e.currentTarget as HTMLButtonElement;
                    if (!button.disabled) {
                      button.style.borderColor = '#3b82f6';
                      button.style.color = '#3b82f6';
                      button.style.backgroundColor = '#eff6ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.color = '#6b7280';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  icon={<ChevronRight className="h-4 w-4" />}
                  data-cy="pagination-next-button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
