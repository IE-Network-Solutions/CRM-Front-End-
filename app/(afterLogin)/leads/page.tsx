'use client';

import { useMemo, useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import {
  Search,
  Plus,
  Filter,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ClearOutlined } from '@ant-design/icons';
import { useLeadStore } from '@/store/uistate/features/leads/leadStore';
import { useLeadsWithNamesQuery } from '@/store/server/features/leads/queries';
import LeadTable from './_components/LeadTable';
import { Lead } from '@/store/server/features/leads/interface';
import { useQueryClient } from 'react-query';
import { FilterModal } from './_components/FilterModal';
import { LeadFilters } from '@/store/server/features/leads/interface';

export default function LeadsPage() {
  // Define FilterState interface inside component scope
  interface FilterState {
    companyId?: string;
    sectorId?: string;
    source?: string;
    engagementStageId?: string; // Changed back to engagementStageId to match backend
    revenue?: number;
    currency?: string;
    leadRate?: number;
    contactPersonEmail?: string;
    contactPersonPhoneNumber?: string;
  }

  const { selectedRows, setSelectedRows, currentPage, setCurrentPage } =
    useLeadStore();
  const queryClient = useQueryClient();

  // Filter state management
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<LeadFilters>({});
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Debounce search value for API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);

      // Add to search history if it's a meaningful search
      if (searchValue.trim() && !searchHistory.includes(searchValue.trim())) {
        setSearchHistory((prev) => [searchValue.trim(), ...prev.slice(0, 4)]); // Keep last 5 searches
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, searchHistory]);

  const filters = useMemo(() => {
    const combinedFilters = {
      page: currentPage,
      pageSize: 10,
      searchTerm: debouncedSearchValue,
      ...activeFilters,
    };

    return combinedFilters;
  }, [currentPage, debouncedSearchValue, activeFilters]);

  const leadsQueryResult = useLeadsWithNamesQuery(filters);

  // Extract leads and pagination data from the query result
  let leads: Lead[] = [];
  let pagination = null;
  let totalPages = 1;

  if (leadsQueryResult?.data) {
    // The real backend response has this structure: { data: Lead[], pagination: {...} }
    if (Array.isArray(leadsQueryResult.data)) {
      // If data is directly an array (fallback case)
      leads = leadsQueryResult.data;
      totalPages = 1;
    } else if (
      leadsQueryResult.data.data &&
      Array.isArray(leadsQueryResult.data.data)
    ) {
      // Real backend response structure with pagination
      leads = leadsQueryResult.data.data;
      // Get pagination data from the response
      const responseData = leadsQueryResult.data as any;
      pagination = responseData.pagination;
      totalPages = pagination?.totalPages || 1;
    } else {
      // Fallback for other structures
      leads = leadsQueryResult.data as any;
      totalPages = 1;
    }
  }

  // React Query will handle refetching automatically when needed
  // No need for manual refetch

  const handleCreateLead = () => {
    // Create lead functionality
  };

  const handleBulkAction = () => {
    // Bulk action functionality
  };

  const handleApplyFilters = (filters: FilterState) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== '',
      ),
    );

    setActiveFilters(cleanedFilters);
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // Reset to first page when search changes
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  // Handle search clearing
  const handleSearchClear = () => {
    setSearchValue('');
    setDebouncedSearchValue('');
    setCurrentPage(1);

    // Let React Query handle cache naturally - this preserves filter state
  };

  const handleClearFilters = () => {
    // Clear all active filters
    setActiveFilters({});

    // Clear search value
    setSearchValue('');

    // Reset to first page
    setCurrentPage(1);

    // Close the filter modal if it's open
    if (isFilterModalOpen) {
      setIsFilterModalOpen(false);
    }

    // Let React Query handle cache naturally - this prevents unnecessary API calls
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      // Invalidate the leads cache to force a fresh fetch
      queryClient.invalidateQueries(['leads']);

      // Force refetch of the current query
      if (leadsQueryResult.refetch) {
        leadsQueryResult.refetch();
      }
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

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          currentFilters={activeFilters}
        />
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
                value={searchValue}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                allowClear
                className="pl-10 border-gray-300 bg-white w-full"
                prefix={<Search className="h-4 w-4 text-gray-400" />}
                suffix={
                  debouncedSearchValue !== searchValue &&
                  searchValue && (
                    <div className="text-xs text-gray-400 animate-pulse">
                      Searching...
                    </div>
                  )
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {' '}
              {/* Responsive layout */}
              <div className="relative">
                <Button
                  className="relative border-blue-500 text-blue-500 bg-white hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 py-[13px] px-3 rounded w-full sm:w-auto" // Responsive width
                  style={{
                    borderColor: '#1890ff',
                    color: '#1890ff',
                  }}
                  onClick={() => setIsFilterModalOpen(true)}
                  icon={
                    <Filter
                      className="h-4 w-4 mr-2"
                      style={{ color: '#1890ff' }}
                    />
                  }
                >
                  Filter
                  {Object.keys(activeFilters).length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {Object.keys(activeFilters).length}
                    </span>
                  )}
                </Button>

                <FilterModal
                  isOpen={isFilterModalOpen}
                  onClose={() => setIsFilterModalOpen(false)}
                  onApplyFilters={handleApplyFilters}
                  onClearFilters={handleClearFilters}
                  currentFilters={activeFilters}
                />
              </div>
              {Object.keys(activeFilters).length > 0 && (
                <Button
                  className="border-red-500 text-red-500 bg-white hover:bg-red-50 py-[13px] px-3 rounded w-full sm:w-auto"
                  style={{
                    borderColor: '#ef4444',
                    color: '#ef4444',
                  }}
                  onClick={handleClearFilters}
                  icon={<ClearOutlined />}
                >
                  Clear Filters
                </Button>
              )}
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
              key={`leads-${currentPage}`}
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

                {/* Page Numbers with Smart Display Logic */}
                {(() => {
                  const pages = [];
                  const maxVisiblePages = 5;

                  if (totalPages <= maxVisiblePages) {
                    // Show all pages if total is 5 or less
                    for (let i = 1; i <= totalPages; i++) {
                      const isCurrentPage = i === currentPage;
                      pages.push(
                        <Button
                          key={i}
                          type={isCurrentPage ? 'primary' : 'default'}
                          size="small"
                          onClick={() => {
                            handlePageChange(i);
                          }}
                          className={`w-8 h-8 p-0 ${isCurrentPage ? 'bg-blue-600 text-white' : ''}`}
                          style={{
                            borderColor: isCurrentPage ? '#3b82f6' : '#d1d5db',
                            color: isCurrentPage ? '#ffffff' : '#6b7280',
                            backgroundColor: isCurrentPage
                              ? '#3b82f6'
                              : '#f9fafb',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!isCurrentPage) {
                              e.currentTarget.style.borderColor = '#3b82f6';
                              e.currentTarget.style.color = '#3b82f6';
                              e.currentTarget.style.backgroundColor = '#eff6ff';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isCurrentPage) {
                              e.currentTarget.style.borderColor = '#d1d5db';
                              e.currentTarget.style.color = '#6b7280';
                              e.currentTarget.style.backgroundColor = '#f9fafb';
                            }
                          }}
                          data-cy={`pagination-page-${i}`}
                        >
                          {i}
                        </Button>,
                      );
                    }
                  } else {
                    // Smart pagination for more than 5 pages
                    // Always show first page
                    const isFirstPageCurrent = 1 === currentPage;
                    pages.push(
                      <Button
                        key={1}
                        type={isFirstPageCurrent ? 'primary' : 'default'}
                        size="small"
                        onClick={() => {
                          handlePageChange(1);
                        }}
                        className={`w-8 h-8 p-0 ${isFirstPageCurrent ? 'bg-blue-600 text-white' : ''}`}
                        style={{
                          borderColor: isFirstPageCurrent
                            ? '#3b82f6'
                            : '#d1d5db',
                          color: isFirstPageCurrent ? '#ffffff' : '#6b7280',
                          backgroundColor: isFirstPageCurrent
                            ? '#3b82f6'
                            : '#f9fafb',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (!isFirstPageCurrent) {
                            e.currentTarget.style.borderColor = '#3b82f6';
                            e.currentTarget.style.color = '#3b82f6';
                            e.currentTarget.style.backgroundColor = '#eff6ff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isFirstPageCurrent) {
                            e.currentTarget.style.borderColor = '#d1d5db';
                            e.currentTarget.style.color = '#6b7280';
                            e.currentTarget.style.backgroundColor = '#f9fafb';
                          }
                        }}
                        data-cy={`pagination-page-1`}
                      >
                        1
                      </Button>,
                    );

                    // Add ellipsis after first page if needed
                    if (currentPage > 3) {
                      pages.push(
                        <span
                          key="ellipsis-start"
                          className="px-2 text-sm font-medium text-gray-500"
                        >
                          ...
                        </span>,
                      );
                    }

                    // Show pages around current page
                    const startPage = Math.max(2, currentPage - 1);
                    const endPage = Math.min(totalPages - 1, currentPage + 1);

                    for (let i = startPage; i <= endPage; i++) {
                      if (i === 1 || i === totalPages) continue; // Skip first and last as they're handled separately

                      const isCurrentPage = i === currentPage;
                      pages.push(
                        <Button
                          key={i}
                          type={isCurrentPage ? 'primary' : 'default'}
                          size="small"
                          onClick={() => {
                            handlePageChange(i);
                          }}
                          className={`w-8 h-8 p-0 ${isCurrentPage ? 'bg-blue-600 text-white' : ''}`}
                          style={{
                            borderColor: isCurrentPage ? '#3b82f6' : '#d1d5db',
                            color: isCurrentPage ? '#ffffff' : '#6b7280',
                            backgroundColor: isCurrentPage
                              ? '#3b82f6'
                              : '#f9fafb',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!isCurrentPage) {
                              e.currentTarget.style.borderColor = '#3b82f6';
                              e.currentTarget.style.color = '#3b82f6';
                              e.currentTarget.style.backgroundColor = '#eff6ff';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isCurrentPage) {
                              e.currentTarget.style.borderColor = '#d1d5db';
                              e.currentTarget.style.color = '#6b7280';
                              e.currentTarget.style.backgroundColor = '#f9fafb';
                            }
                          }}
                          data-cy={`pagination-page-${i}`}
                        >
                          {i}
                        </Button>,
                      );
                    }

                    // Add ellipsis before last page if needed
                    if (currentPage < totalPages - 2) {
                      pages.push(
                        <span
                          key="ellipsis-end"
                          className="px-2 text-sm font-medium text-gray-500"
                        >
                          ...
                        </span>,
                      );
                    }

                    // Always show last page
                    const isLastPageCurrent = totalPages === currentPage;
                    pages.push(
                      <Button
                        key={totalPages}
                        type={isLastPageCurrent ? 'primary' : 'default'}
                        size="small"
                        onClick={() => {
                          handlePageChange(totalPages);
                        }}
                        className={`w-8 h-8 p-0 ${isLastPageCurrent ? 'bg-blue-600 text-white' : ''}`}
                        style={{
                          borderColor: isLastPageCurrent
                            ? '#3b82f6'
                            : '#d1d5db',
                          color: isLastPageCurrent ? '#ffffff' : '#6b7280',
                          backgroundColor: isLastPageCurrent
                            ? '#3b82f6'
                            : '#f9fafb',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (!isLastPageCurrent) {
                            e.currentTarget.style.borderColor = '#3b82f6';
                            e.currentTarget.style.color = '#3b82f6';
                            e.currentTarget.style.backgroundColor = '#eff6ff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isLastPageCurrent) {
                            e.currentTarget.style.borderColor = '#d1d5db';
                            e.currentTarget.style.color = '#6b7280';
                            e.currentTarget.style.backgroundColor = '#f9fafb';
                          }
                        }}
                        data-cy={`pagination-page-${totalPages}`}
                      >
                        {totalPages}
                      </Button>,
                    );
                  }

                  return pages;
                })()}

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
