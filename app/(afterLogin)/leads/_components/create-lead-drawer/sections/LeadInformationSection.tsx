'use client';

import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Input, Select, Button } from 'antd';
import {
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { leadValidation } from '../options';
import { useGetSources } from '@/store/server/features/leads/source/queries';
import { useGetEngagementStages } from '@/store/server/features/leads/engagement-stage/queries';
import { useGetLeadTypes } from '@/store/server/features/leads/lead-types/queries';
import { useGetSectors } from '@/store/server/features/leads/sectors/queries';
import { useGetUsers } from '@/store/server/features/leads/users/queries';
import { useGetCurrencies } from '@/store/server/features/leads/currencies/queries';

interface LeadInformationSectionProps {
  form?: any;
}

export const LeadInformationSection: React.FC<LeadInformationSectionProps> = ({
  form,
}) => {
  const [budgetFields, setBudgetFields] = useState([0]); // Track budget field indices

  const { data: sources = [], isLoading: sourcesLoading } = useGetSources();
  const { data: engagementStages = [], isLoading: stagesLoading } =
    useGetEngagementStages();
  const { data: leadTypes = [], isLoading: leadTypesLoading } =
    useGetLeadTypes();
  const { data: sectors = [], isLoading: sectorsLoading } = useGetSectors();
  const { data: users = [], isLoading: usersLoading } = useGetUsers();
  const { data: currencies = [], isLoading: currenciesLoading } = useGetCurrencies();

  // Set initial form values when component mounts
  useEffect(() => {
    if (form && currencies.length > 0) {
      // Set initial values for the first budget field and today's date
      const today = dayjs(); // Use dayjs instead of native Date
      const defaultCurrency = currencies[0]?.name || 'USD';
      form.setFieldsValue({
        currencies: [defaultCurrency],
        estimatedBudgets: [''],
        createdDate: today,
      });
    }
  }, [form, currencies]);

  // Transform users data to match Select component format for lead owners
  // Handle different possible data structures from API
  let safeUsers: any[] = [];
  if (Array.isArray(users)) {
    safeUsers = users;
  } else if (users && typeof users === 'object') {
    // Handle case where API returns { items: [], total: 0 } or similar
    const usersObj = users as any;
    if (Array.isArray(usersObj.items)) {
      safeUsers = usersObj.items;
    } else if (Array.isArray(usersObj.data)) {
      safeUsers = usersObj.data;
    }
  }

  const ownerOptions = safeUsers.map((user: any) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  // Transform sources data to match Select component format
  let safeSources: any[] = [];
  if (Array.isArray(sources)) {
    safeSources = sources;
  } else if (sources && typeof sources === 'object') {
    const sourcesObj = sources as any;
    if (Array.isArray(sourcesObj.items)) safeSources = sourcesObj.items;
    else if (Array.isArray(sourcesObj.data)) safeSources = sourcesObj.data;
  }
  const sourceOptions = safeSources.map((source: any) => ({
    value: source.id,
    label: source.name,
  }));

  // Transform engagement stages data to match Select component format
  let safeStages: any[] = [];
  if (Array.isArray(engagementStages)) {
    safeStages = engagementStages;
  } else if (engagementStages && typeof engagementStages === 'object') {
    const stagesObj = engagementStages as any;
    if (Array.isArray(stagesObj.items)) safeStages = stagesObj.items;
    else if (Array.isArray(stagesObj.data)) safeStages = stagesObj.data;
  }
  const stageOptions = safeStages.map((stage: any) => ({
    value: stage.id,
    label: stage.name,
  }));

  // Transform lead types data to match Select component format
  let safeLeadTypes: any[] = [];
  if (Array.isArray(leadTypes)) {
    safeLeadTypes = leadTypes;
  } else if (leadTypes && typeof leadTypes === 'object') {
    const typesObj = leadTypes as any;
    if (Array.isArray(typesObj.items)) safeLeadTypes = typesObj.items;
    else if (Array.isArray(typesObj.data)) safeLeadTypes = typesObj.data;
  }
  const leadTypeOptions = safeLeadTypes.map((type: any) => ({
    value: type.id,
    label: type.name,
  }));

  // Transform sectors data to match Select component format
  let safeSectors: any[] = [];
  if (Array.isArray(sectors)) {
    safeSectors = sectors;
  } else if (sectors && typeof sectors === 'object') {
    const sectorsObj = sectors as any;
    if (Array.isArray(sectorsObj.items)) safeSectors = sectorsObj.items;
    else if (Array.isArray(sectorsObj.data)) safeSectors = sectorsObj.data;
  }
  const sectorOptions = safeSectors.map((sector: any) => ({
    value: sector.id,
    label: sector.name,
  }));

  // Transform currencies data to match Select component format
  let safeCurrencies: any[] = [];
  if (Array.isArray(currencies)) {
    safeCurrencies = currencies;
  } else if (currencies && typeof currencies === 'object') {
    const currenciesObj = currencies as any;
    if (Array.isArray(currenciesObj.items)) safeCurrencies = currenciesObj.items;
    else if (Array.isArray(currenciesObj.data)) safeCurrencies = currenciesObj.data;
  }
  
  // Fallback to default options if no currencies are loaded yet
  const currencyOptions = safeCurrencies.length > 0 
    ? safeCurrencies.map((currency: any) => ({
        value: currency.name, // Use 'name' as value (e.g., "USD")
        label: `${currency.name} - ${currency.description}`, // Use 'name' and 'description'
      }))
    : [
        { value: 'USD', label: 'USD - US Dollar' },
        { value: 'EUR', label: 'EUR - Euro' },
        { value: 'GBP', label: 'GBP - British Pound' },
      ];

  // Add new budget field
  const addBudgetField = () => {
    const newIndex = budgetFields.length;
    setBudgetFields([...budgetFields, newIndex]);

    // Set default currency for the new field
    if (form) {
      const currentCurrencies = form.getFieldValue('currencies') || [];
      const currentBudgets = form.getFieldValue('estimatedBudgets') || [];

      // Ensure arrays are long enough
      const newCurrencies = [...currentCurrencies];
      const newBudgets = [...currentBudgets];

      // Set default values for new field
      const defaultCurrency = currencies.length > 0 ? currencies[0]?.name : 'USD';
      newCurrencies[newIndex] = defaultCurrency;
      newBudgets[newIndex] = '';

      form.setFieldsValue({
        currencies: newCurrencies,
        estimatedBudgets: newBudgets,
      });
    }
  };

  // Remove budget field
  const removeBudgetField = (index: number) => {
    if (budgetFields.length > 1) {
      // eslint-disable-next-line
      setBudgetFields(budgetFields.filter((_, i) => i !== index));
    }
  };

  // Disable future dates - only allow today and past dates
  const disabledDate = (current: any) => {
    // Can't select dates after today
    const today = dayjs();
    today
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59)
      .set('millisecond', 999);
    return current && current.isAfter(today);
  };

  return (
    <div className="space-y-6" data-cy="lead-information-section">
      <h3
        className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2"
        data-cy="lead-info-title"
      >
        Lead Information
      </h3>

      <Form.Item
        name="leadName"
        label="Lead Name"
        rules={[
          { required: true, message: leadValidation.messages.required },
          {
            pattern: leadValidation.patterns.leadName,
            message:
              'Lead name must be 2-100 characters with only letters, spaces, hyphens, and apostrophes',
          },
        ]}
        data-cy="lead-name-form-item"
      >
        <Input
          placeholder="Enter lead name"
          className="h-10"
          data-cy="lead-name-input"
        />
      </Form.Item>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        data-cy="lead-info-grid"
      >
        <Form.Item
          name="leadOwner"
          label="Owner"
          rules={[{ required: true }]}
          data-cy="lead-owner-form-item"
        >
          <Select
            placeholder="Select lead owner"
            options={ownerOptions}
            loading={usersLoading}
            showSearch
            className="h-10"
            data-cy="lead-owner-select"
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          name="leadTypeId"
          label="Type"
          rules={[{ required: true }]}
          data-cy="lead-type-form-item"
        >
          <Select
            placeholder="Select lead type"
            options={leadTypeOptions}
            loading={leadTypesLoading}
            showSearch
            className="h-10"
            data-cy="lead-type-select"
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          name="sectorId"
          label="Sector"
          rules={[{ required: true }]}
          data-cy="sector-form-item"
        >
          <Select
            placeholder="Select sector"
            options={sectorOptions}
            loading={sectorsLoading}
            showSearch
            className="h-10"
            data-cy="sector-select"
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          name="sourceId"
          label="Source"
          rules={[{ required: true }]}
          data-cy="source-form-item"
        >
          <Select
            placeholder="Select source"
            options={sourceOptions}
            loading={sourcesLoading}
            showSearch
            className="h-10"
            data-cy="source-select"
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          name="engagementStageId"
          label="Stage"
          rules={[{ required: true }]}
          data-cy="engagement-stage-form-item"
        >
          <Select
            placeholder="Select stage"
            options={stageOptions}
            loading={stagesLoading}
            showSearch
            className="h-10"
            data-cy="engagement-stage-select"
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </div>

      <Form.Item
        label="Lead Amount"
        required
        className="mb-0"
        data-cy="lead-amount-section"
      >
        <div
          className="flex justify-end pt-1"
          data-cy="add-budget-button-container"
        >
          <Button
            type="text"
            icon={<PlusOutlined className="text-blue-500" />}
            onClick={addBudgetField}
            className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200 hover:border-blue-300 transition-colors text-sm"
            data-cy="add-budget-btn"
          >
            Add Budget
          </Button>
        </div>
        <div className="space-y-2" data-cy="budget-fields-container">
          {budgetFields.map((fieldIndex, index) => (
            <div
              key={fieldIndex}
              className="flex items-center gap-2"
              data-cy={`budget-field-${index}`}
            >
              <Form.Item
                name={['estimatedBudgets', index]}
                noStyle
                rules={[
                  { required: true, message: 'Lead amount is required' },
                  {
                    pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message:
                      'Please enter a valid amount (e.g., 1000 or 1000.50)',
                  },
                ]}
                data-cy={`budget-amount-form-item-${index}`}
              >
                <Input
                  placeholder="Lead Amount"
                  prefix={<DollarOutlined className="text-gray-400" />}
                  className="flex-1 h-9"
                  style={{ minWidth: '180px' }}
                  data-cy={`budget-amount-input-${index}`}
                />
              </Form.Item>
              <Form.Item
                name={['currencies', index]}
                noStyle
                rules={[{ required: true, message: 'Currency is required' }]}
                data-cy={`budget-currency-form-item-${index}`}
              >
                <Select
                  options={currencyOptions}
                  loading={currenciesLoading}
                  className="w-28 h-9"
                  placeholder="Currency"
                  data-cy={`budget-currency-select-${index}`}
                />
              </Form.Item>
              {budgetFields.length > 1 && (
                <Button
                  type="text"
                  size="small"
                  danger
                  onClick={() => removeBudgetField(index)}
                  className="text-red-500 hover:text-red-700 h-9 w-8 flex items-center justify-center p-0"
                  data-cy={`remove-budget-btn-${index}`}
                >
                  ×
                </Button>
              )}
            </div>
          ))}
        </div>
      </Form.Item>

      <Form.Item
        name="createdDate"
        label="Created Date"
        rules={[
          { required: true, message: 'Created date is required' },
          {
            // eslint-disable-next-line
            validator: (_, value) => {
              // eslint-disable-next-line
              if (value) {
                const selectedDate = dayjs(value);
                const today = dayjs();
                today
                  .set('hour', 23)
                  .set('minute', 59)
                  .set('second', 59)
                  .set('millisecond', 999);

                if (selectedDate.isAfter(today)) {
                  return Promise.reject(
                    new Error("Don't select day more than today"),
                  );
                }
              }
              return Promise.resolve();
            },
          },
        ]}
        data-cy="created-date-form-item"
      >
        <DatePicker
          placeholder="Select created date"
          className="w-full h-10"
          suffixIcon={<CalendarOutlined />}
          disabledDate={disabledDate}
          format="DD/MM/YYYY"
          data-cy="created-date-picker"
        />
      </Form.Item>
    </div>
  );
};

export default LeadInformationSection;
