'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Space, Form, Rate, Spin, Alert } from 'antd';
import {
  DollarOutlined,
  PhoneOutlined,
  MailOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  useEngagementStagesQuery,
  useCompaniesQuery,
  useSourcesQuery,
  useSectorsQuery,
  useCurrenciesQuery,
} from '@/store/server/features/leads/queries';

const { Option } = Select;

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
  currentFilters?: FilterState;
}

interface FilterState {
  companyId?: string;
  sectorId?: string;
  source?: string; // Changed from sourceId to match backend DTO
  engagementStageId?: string; // Changed back to engagementStageId to match backend
  revenue?: number;
  currency?: string;
  leadRate?: number;
  contactPersonEmail?: string;
  contactPersonPhoneNumber?: string;
}

const RATING_TOOLTIPS = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
  currentFilters,
}: FilterModalProps) {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState<FilterState>(currentFilters || {});
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: stages = [],
    isLoading: stagesLoading,
    error: stagesError,
  } = useEngagementStagesQuery();
  const {
    data: companies = [],
    isLoading: companiesLoading,
    error: companiesError,
  } = useCompaniesQuery();
  const {
    data: sources = [],
    isLoading: sourcesLoading,
    error: sourcesError,
  } = useSourcesQuery();

  const {
    data: sectors = [],
    isLoading: sectorsLoading,
    error: sectorsError,
  } = useSectorsQuery();
  const {
    data: currencies = [],
    isLoading: currenciesLoading,
    error: currenciesError,
  } = useCurrenciesQuery();

  const safeCurrencies = Array.isArray(currencies) ? currencies : [];
  const safeCompanies = Array.isArray(companies) ? companies : [];
  const safeSources = Array.isArray(sources) ? sources : [];
  const safeSectors = Array.isArray(sectors) ? sectors : [];
  const safeStages = Array.isArray(stages) ? stages : [];

  const isAnyLoading =
    stagesLoading ||
    companiesLoading ||
    sourcesLoading ||
    sectorsLoading ||
    currenciesLoading;

  const hasErrors =
    stagesError ||
    companiesError ||
    sourcesError ||
    sectorsError ||
    currenciesError;

  useEffect(() => {
    if (isOpen && currentFilters) {
      form.setFieldsValue(currentFilters);
      setFilters(currentFilters);
    } else if (
      isOpen &&
      (!currentFilters || Object.keys(currentFilters).length === 0)
    ) {
      // Reset form when filters are cleared from parent
      form.resetFields();
      setFilters({});
    }
  }, [isOpen, currentFilters, form]);

  const handleRemoveAll = () => {
    // Reset the form fields
    form.resetFields();

    // Reset the local filters state
    setFilters({});

    // Call the parent's clear filters function to reset active filters
    onClearFilters();

    // Close the dropdown after clearing
    onClose();
  };

  const handleApply = async () => {
    try {
      setIsLoading(true);

      const formValues = await form.validateFields();

      const cleanedValues = Object.fromEntries(
        Object.entries(formValues).filter(
          ([, value]) => value !== undefined && value !== '',
        ),
      );

      setFilters(cleanedValues);
      onApplyFilters(cleanedValues);
      onClose();
    } catch (error) {
      // Filter validation failed, close dropdown
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleRatingChange = (value: number) => {
    form.setFieldValue('leadRate', value);
  };

  const renderErrorMessage = () => {
    if (!hasErrors) return null;

    const errorMessages = [];
    if (stagesError) errorMessages.push('Failed to load engagement stages');
    if (companiesError) errorMessages.push('Failed to load companies');
    if (sourcesError) errorMessages.push('Failed to load sources');
    if (sectorsError) errorMessages.push('Failed to load sectors');
    if (currenciesError) errorMessages.push('Failed to load currencies');

    return (
      <Alert
        message="Failed to load some filter options"
        description={
          <div>
            <p>The following filter options may not be available:</p>
            <ul className="mt-2 list-disc list-inside">
              {errorMessages.map((msg, index) => (
                <li key={index} className="text-sm">
                  {msg}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm">
              Please refresh the page or try again later.
            </p>
          </div>
        }
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        className="mb-4"
      />
    );
  };

  const renderLoadingState = () => {
    if (!isAnyLoading) return null;

    return (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
        <span className="ml-3 text-gray-500">Loading filter options...</span>
      </div>
    );
  };

  const dropdownContent = (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 sm:p-4 w-[520px] max-w-[95vw] sm:max-w-[90vw] md:max-w-[520px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pb-3 sm:pb-4 border-b border-gray-200 mb-3 sm:mb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            Filter
          </span>
          <span className="text-xs text-gray-500">Filter your leads by</span>
        </div>
        <Button
          type="default"
          onClick={handleRemoveAll}
          className="!bg-blue-50 !border-blue-400 !text-blue-600 hover:!bg-blue-100 hover:!border-blue-500 hover:!text-blue-700 w-full sm:w-auto"
          style={{
            minWidth: 0,
            backgroundColor: '#dbeafe',
            borderColor: '#60a5fa',
            color: '#2563eb',
          }}
          data-cy="filter-remove-all-button"
        >
          Remove All
        </Button>
      </div>

      {renderErrorMessage()}

      {isAnyLoading ? (
        renderLoadingState()
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={filters}
          onValuesChange={(changedValues, allValues) => setFilters(allValues)}
        >
          {/* Filter by general information */}
          <div className="mb-3 sm:mb-4">
            <h3 className="block font-semibold text-gray-900 mb-2 text-sm">
              Filter by general information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div>
                <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">
                  Company
                </label>
                <Form.Item name="companyId" className="mb-0">
                  <Select
                    placeholder="Lead Company"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    notFoundContent="No companies found"
                    className="rounded-md"
                    loading={companiesLoading}
                    dropdownStyle={{ zIndex: 10001 }}
                    size="middle"
                  >
                    {safeCompanies.map((company) => (
                      <Option key={company.id} value={company.id}>
                        {company.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div>
                <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">
                  Sector
                </label>
                <Form.Item name="sectorId" className="mb-0">
                  <Select
                    placeholder="Lead Sector"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    className="rounded-md"
                    loading={sectorsLoading}
                    data-cy="filter-sector-select"
                    dropdownStyle={{ zIndex: 10001 }}
                    size="middle"
                  >
                    {safeSectors.map((sector) => (
                      <Option key={sector.id} value={sector.id}>
                        {sector.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="mb-2 sm:mb-3">
              <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">
                Source
              </label>
              <Form.Item name="source" className="mb-0">
                <Select
                  placeholder="Lead Source"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  notFoundContent="No sources found"
                  className="rounded-md"
                  loading={sourcesLoading}
                  data-cy="filter-source-select"
                  dropdownStyle={{ zIndex: 10001 }}
                  size="middle"
                >
                  {safeSources.map((source) => (
                    <Option key={source.id} value={source.id}>
                      {source.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="sm:col-span-2">
                <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">
                  Revenue
                </label>
                <Form.Item name="revenue" className="mb-0">
                  <Input
                    placeholder="Revenue"
                    prefix={<DollarOutlined className="text-gray-400" />}
                    allowClear
                    className="rounded-md"
                    data-cy="filter-revenue-input"
                    size="middle"
                  />
                </Form.Item>
              </div>

              <div>
                <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <Form.Item name="currency" className="mb-0">
                  <Select
                    placeholder="Select Currency"
                    allowClear
                    loading={currenciesLoading}
                    data-cy="filter-currency-select"
                    dropdownStyle={{ zIndex: 10001 }}
                    disabled={safeCurrencies.length === 0}
                    notFoundContent={
                      safeCurrencies.length === 0
                        ? 'No currencies available'
                        : 'No currencies found'
                    }
                    size="middle"
                  >
                    {safeCurrencies.map((currency) => (
                      <Option key={currency.id} value={currency.name}>
                        {currency.name} - {currency.description}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {safeCurrencies.length === 0 && !currenciesLoading && (
                  <div className="text-xs text-orange-600 mt-1">
                    Currency filter unavailable - currencies failed to load
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filter by Address Information */}
          <div className="mb-3 sm:mb-4">
            <h3 className="block font-semibold text-gray-900 mb-2 text-sm">
              Filter by Address Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Form.Item name="contactPersonPhoneNumber" className="mb-0">
                  <Input
                    placeholder="Phone"
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    allowClear
                    className="rounded-md"
                    data-cy="filter-phone-input"
                    size="middle"
                  />
                </Form.Item>
              </div>

              <div>
                <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Form.Item name="contactPersonEmail" className="mb-0">
                  <Input
                    placeholder="Email"
                    prefix={<MailOutlined className="text-gray-400" />}
                    allowClear
                    className="rounded-md"
                    data-cy="filter-email-input"
                    size="middle"
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Filter by Status Information */}
          <div className="mb-3 sm:mb-4">
            <h3 className="block font-semibold text-gray-900 mb-2 text-sm">
              Filter by Status Information
            </h3>

            <div>
              <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">
                Label
              </label>
              <Form.Item name="engagementStageId" className="mb-0">
                <Select
                  placeholder="Lead Status"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  notFoundContent="No stages found"
                  className="rounded-md"
                  loading={stagesLoading}
                  data-cy="filter-stage-select"
                  dropdownStyle={{ zIndex: 10001 }}
                  size="middle"
                >
                  {safeStages.map((stage: any) => (
                    <Option key={stage.id} value={stage.id}>
                      <Space>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: stage.colorCode || '#1890ff',
                          }}
                        />
                        {stage.name}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* Filter by Rating */}
          <div className="mb-3 sm:mb-4">
            <h3 className="block font-semibold text-gray-900 mb-2 text-sm">
              Filter by Rating
            </h3>

            <Form.Item name="leadRate" className="mb-0">
              <Rate
                onChange={handleRatingChange}
                allowHalf={false}
                tooltips={RATING_TOOLTIPS}
                className="text-yellow-500"
                data-cy="filter-rating-rate"
              />
            </Form.Item>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 pt-3 border-t border-gray-200">
            <Button
              type="primary"
              onClick={handleApply}
              loading={isLoading}
              className="flex-1 w-full sm:w-auto"
              style={{ minWidth: 0 }}
              data-cy="filter-apply-button"
              size="middle"
            >
              Filter
            </Button>
            <Button
              onClick={handleCancel}
              className="flex-1 w-full sm:w-auto !bg-blue-50 !border-blue-400 !text-blue-600 hover:!bg-blue-100 hover:!border-blue-500 hover:!text-blue-700"
              style={{
                minWidth: 0,
                backgroundColor: '#dbeafe',
                borderColor: '#60a5fa',
                color: '#2563eb',
              }}
              data-cy="filter-cancel-button"
              size="middle"
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-25 z-[9999]"
        onClick={onClose}
      />
      {/* Dropdown content */}
      <div className="absolute top-full right-0 mt-2 z-[10000] sm:right-0 right-0">
        {dropdownContent}
      </div>
    </>
  );
}
