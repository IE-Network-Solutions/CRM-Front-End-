'use client';

import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Input, 
  Select, 
  Drawer, 
  Space, 
  Form,
  Rate,
  Spin,
  Alert,
} from 'antd';
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
  useJobsQuery,
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
  sourceId?: string;
  stageId?: string;
  jobId?: string;
  revenue?: string;
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
    data: jobs = [],
    isLoading: jobsLoading,
    error: jobsError,
  } = useJobsQuery();
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

  const safeStages = Array.isArray(stages) ? stages : [];
  const safeCompanies = Array.isArray(companies) ? companies : [];
  const safeSources = Array.isArray(sources) ? sources : [];
  const safeJobs = Array.isArray(jobs) ? jobs : [];
  const safeSectors = Array.isArray(sectors) ? sectors : [];
  const safeCurrencies = Array.isArray(currencies) ? currencies : [];

  const isAnyLoading =
    stagesLoading ||
    companiesLoading ||
    sourcesLoading ||
    jobsLoading ||
    sectorsLoading ||
    currenciesLoading;

  const hasErrors =
    stagesError ||
    companiesError ||
    sourcesError ||
    jobsError ||
    sectorsError ||
    currenciesError;

  useEffect(() => {
    if (isOpen && currentFilters) {
      form.setFieldsValue(currentFilters);
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters, form]);

  const handleRemoveAll = () => {
    // Reset the form fields
    form.resetFields();

    // Reset the local filters state
    setFilters({});

    // Call the parent's clear filters function to reset active filters
    onClearFilters();

    // Close the modal after clearing
    onClose();
  };

  const handleApply = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      const newFilters = { ...values };

      Object.keys(newFilters).forEach((key) => {
        if (
          newFilters[key as keyof FilterState] === '' ||
          newFilters[key as keyof FilterState] === undefined
        ) {
          delete newFilters[key as keyof FilterState];
        }
      });

      setFilters(newFilters);
      onApplyFilters(newFilters);
      onClose();
    } catch (error) {
      // Filter validation failed, close modal
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

    return (
      <Alert
        message="Failed to load filter options"
        description="Some filter options may not be available. Please refresh the page or try again later."
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

  return (
    <Drawer
      closable={false}
      title={
        <div className="flex items-center justify-between w-full pb-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-bold text-gray-900">Filter</span>
            <span className="text-xs text-gray-500">Filter your leads by</span>
          </div>
          <Button
            type="default"
            onClick={handleRemoveAll}
            className="ml-2 !bg-blue-50 !border-blue-400 !text-blue-600 hover:!bg-blue-100 hover:!border-blue-500 hover:!text-blue-700"
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
      }
      placement="right"
      width={480}
      open={isOpen}
      onClose={onClose}
      styles={{
        header: {
          background: '#ffffff',
          padding: '24px 24px 16px 24px',
        },
        body: {
          background: '#ffffff',
          padding: '0 24px 24px 24px',
        },
        footer: {
          background: '#ffffff',
          padding: '16px 24px',
        },
      }}
      footer={
        <div className="flex items-center justify-between gap-3">
            <Button 
              type="primary" 
              onClick={handleApply}
              loading={isLoading}
              className="flex-1"
            style={{ minWidth: 0 }}
            data-cy="filter-apply-button"
          >
            Filter
          </Button>
          <Button
            onClick={handleCancel}
            className="flex-1 !bg-blue-50 !border-blue-400 !text-blue-600 hover:!bg-blue-100 hover:!border-blue-500 hover:!text-blue-700"
            style={{
              minWidth: 0,
              backgroundColor: '#dbeafe',
              borderColor: '#60a5fa',
              color: '#2563eb',
            }}
            data-cy="filter-cancel-button"
          >
            Cancel
            </Button>
        </div>
      }
    >
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
          <div className="mb-6">
            <h3 className="block font-semibold text-gray-900 mb-3 text-sm">
              Filter by general information
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
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
                <label className="block text-md font-medium text-gray-700 mb-1">
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
                  >
                    {safeSectors.map((sector) => (
                      <Option key={sector.id} value={sector.id}>
                        {sector.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Source
                </label>
              <Form.Item name="sourceId" className="mb-0">
                <Select
                    placeholder="Lead Source"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  notFoundContent="No sources found"
                  className="rounded-md"
                    loading={sourcesLoading}
                    data-cy="filter-source-select"
                >
                    {safeSources.map((source) => (
                    <Option key={source.id} value={source.id}>
                      {source.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
        </div>

              
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Revenue
                </label>
                <Form.Item name="revenue" className="mb-0">
                  <Input
                    placeholder="Revenue"
                    prefix={<DollarOutlined className="text-gray-400" />}
                    allowClear
                    className="rounded-md"
                    data-cy="filter-revenue-input"
            />
          </Form.Item>
        </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <Form.Item name="currency" className="mb-0">
                  <Select
                    placeholder="USD"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    className="rounded-md"
                    loading={currenciesLoading}
                    data-cy="filter-currency-select"
                  >
                    {safeCurrencies.map((currency) => (
                      <Option key={currency.id} value={currency.id}>
                        {currency.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Filter by Address Information */}
          <div className="mb-6">
            <h3 className="block font-semibold text-gray-900 mb-3 text-sm">
              Filter by Address Information
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Form.Item name="contactPersonPhoneNumber" className="mb-0">
                <Input 
                    placeholder="Phone"
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  allowClear
                  className="rounded-md"
                    data-cy="filter-phone-input"
                />
              </Form.Item>
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Form.Item name="contactPersonEmail" className="mb-0">
                <Input 
                    placeholder="Email"
                  prefix={<MailOutlined className="text-gray-400" />}
                  allowClear
                  className="rounded-md"
                    data-cy="filter-email-input"
                />
              </Form.Item>
              </div>
            </div>
        </div>

          {/* Filter by Status Information */}
          <div className="mb-6">
            <h3 className="block font-semibold text-gray-900 mb-3 text-sm">
              Filter by Status Information
            </h3>

        <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Label
              </label>
              <Form.Item name="stageId" className="mb-0">
            <Select
                  placeholder="Lead Status"
              allowClear
              showSearch
              optionFilterProp="children"
                  notFoundContent="No stages found"
              className="rounded-md"
                  loading={stagesLoading}
                  data-cy="filter-stage-select"
                >
                  {safeStages.map((stage) => (
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
          <div className="mb-6">
            <h3 className="block font-semibold text-gray-900 mb-3 text-sm">
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

            <div className="mt-2 text-xs text-gray-500">
              Shows leads with the selected rating and above
            </div>
        </div>
      </Form>
      )}
    </Drawer>
  );
}
