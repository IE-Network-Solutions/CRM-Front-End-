'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Rate,
  Upload,
  Select,
  //message,
  DatePicker,
  InputNumber,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useGetSuppliers } from '@/store/server/features/leads/suppliers/queries';
import { useGetSolutions } from '@/store/server/features/leads/solution/queries';
import {
  useGetCustomFields,
  separateCustomFields,
  CustomField,
} from '@/store/server/features/custom-fields/queries';
import { leadValidation } from '../options';

export type DynamicItem = { id: number };

interface AdditionalInformationSectionProps {
  customFields: DynamicItem[];
  addCustomField: () => void;
  removeCustomField: (id: number) => void;
  onFileListChange: (fileList: any[]) => void;
  form?: any; // Form instance for debugging custom field values
  clearOptionalFields?: boolean; // Flag to clear optional fields state
  onOptionalFieldsChange?: (selectedFields: Set<string>) => void; // Callback for selected optional fields
}

export const AdditionalInformationSection: React.FC<
  AdditionalInformationSectionProps
> = ({
  //customFields,
  //addCustomField,
  //removeCustomField,
  onFileListChange,
  //form,
  clearOptionalFields,
  onOptionalFieldsChange,
}) => {
  const { data: suppliers = [], isLoading: suppliersLoading } =
    useGetSuppliers();
  const { data: solutions = [], isLoading: solutionsLoading } =
    useGetSolutions();
  // eslint-disable-next-line
  const { data: allCustomFields = [], isLoading: customFieldsLoading } =
    useGetCustomFields();

  // File upload state - files will be uploaded after lead creation
  const [fileList, setFileList] = useState<any[]>([]);

  // Custom fields state
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [selectedOptionalFields, setSelectedOptionalFields] = useState<
    Set<string>
  >(new Set());

  // Separate required and optional custom fields
  const { required, optional } = separateCustomFields(allCustomFields);

  // Transform suppliers data to match Select component format
  let safeSuppliers: any[] = [];
  if (Array.isArray(suppliers)) {
    safeSuppliers = suppliers;
  } else if (suppliers && typeof suppliers === 'object') {
    const suppliersObj = suppliers as any;
    if (Array.isArray(suppliersObj.items)) {
      safeSuppliers = suppliersObj.items;
    } else if (Array.isArray(suppliersObj.data)) {
      safeSuppliers = suppliersObj.data;
    }
  }

  const supplierOptions = safeSuppliers.map((supplier: any) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  // Transform solutions data to match Select component format
  let safeSolutions: any[] = [];
  if (Array.isArray(solutions)) {
    safeSolutions = solutions;
  } else if (solutions && typeof solutions === 'object') {
    const solutionsObj = solutions as any;
    if (Array.isArray(solutionsObj.items)) {
      safeSolutions = solutionsObj.items;
    } else if (Array.isArray(solutionsObj.data)) {
      safeSolutions = solutionsObj.data;
    }
  }

  const solutionOptions = safeSolutions.map((solution: any) => ({
    value: solution.id,
    label: solution.name,
  }));

  // File upload handlers
  const handleFileChange = (info: any) => {
    const { fileList } = info;
    setFileList(fileList);
  };

  const handleFileRemove = (file: any) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const customRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  // Notify parent component when fileList changes
  useEffect(() => {
    onFileListChange(fileList);
  }, [fileList, onFileListChange]);

  // Custom fields handlers
  const clearOptionalFieldsState = () => {
    setShowOptionalFields(false);
    setSelectedOptionalFields(new Set());
  };

  const toggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
  };

  const handleFieldSelection = (fieldId: string, isSelected: boolean) => {
    const newSelected = new Set(selectedOptionalFields);
    if (isSelected) {
      newSelected.add(fieldId);
    } else {
      newSelected.delete(fieldId);
    }
    setSelectedOptionalFields(newSelected);
  };

  const clearAllOptionalFields = () => {
    setSelectedOptionalFields(new Set());
  };

  // Clear optional fields when clearOptionalFields prop is true
  useEffect(() => {
    if (clearOptionalFields) {
      clearOptionalFieldsState();
      // Also clear file list for fresh start
      setFileList([]);
    }
  }, [clearOptionalFields]);

  // Notify parent when selected optional fields change
  useEffect(() => {
    if (onOptionalFieldsChange) {
      onOptionalFieldsChange(selectedOptionalFields);
    }
  }, [selectedOptionalFields, onOptionalFieldsChange]);

  // Render custom field input based on type
  const renderCustomFieldInput = (
    field: CustomField,
    isRequired: boolean = false,
  ) => {
    const fieldName = `customField_${field.id}`;

    switch (field.type) {
      case 'checkbox':
        return (
          <Form.Item
            name={fieldName}
            label={field.name}
            required={isRequired}
            rules={
              isRequired
                ? [{ required: true, message: `${field.name} is required` }]
                : []
            }
            className="mb-4"
          >
            <Select
              placeholder={`Select ${field.name}`}
              data-cy={`custom-field-${field.id}-select`}
            >
              {field.fieldValues?.map((option) => (
                <Select.Option
                  key={option.id}
                  value={option.id}
                  data-value={option.value}
                >
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );

      case 'select':
        return (
          <Form.Item
            name={fieldName}
            label={field.name}
            required={isRequired}
            rules={
              isRequired
                ? [{ required: true, message: `${field.name} is required` }]
                : []
            }
            className="mb-4"
          >
            <Select
              placeholder={`Select ${field.name}`}
              data-cy={`custom-field-${field.id}-select`}
            >
              {field.fieldValues?.map((option) => (
                <Select.Option
                  key={option.id}
                  value={option.id}
                  data-value={option.value}
                >
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );

      case 'text':
        return (
          <Form.Item
            name={fieldName}
            label={field.name}
            required={isRequired}
            rules={
              isRequired
                ? [{ required: true, message: `${field.name} is required` }]
                : []
            }
            className="mb-4"
          >
            <Input
              placeholder={`Enter ${field.name}`}
              data-cy={`custom-field-${field.id}-input`}
            />
          </Form.Item>
        );

      case 'number':
        return (
          <Form.Item
            name={fieldName}
            label={field.name}
            required={isRequired}
            rules={
              isRequired
                ? [{ required: true, message: `${field.name} is required` }]
                : []
            }
            className="mb-4"
          >
            <InputNumber
              placeholder={`Enter ${field.name}`}
              className="w-full"
              data-cy={`custom-field-${field.id}-number`}
            />
          </Form.Item>
        );

      case 'date':
        return (
          <Form.Item
            name={fieldName}
            label={field.name}
            required={isRequired}
            rules={
              isRequired
                ? [{ required: true, message: `${field.name} is required` }]
                : []
            }
            className="mb-4"
          >
            <DatePicker
              placeholder={`Select ${field.name}`}
              className="w-full"
              data-cy={`custom-field-${field.id}-date`}
            />
          </Form.Item>
        );

      default:
        return (
          <Form.Item
            name={fieldName}
            label={field.name}
            required={isRequired}
            rules={
              isRequired
                ? [{ required: true, message: `${field.name} is required` }]
                : []
            }
            className="mb-4"
          >
            <Input
              placeholder={`Enter ${field.name}`}
              data-cy={`custom-field-${field.id}-input`}
            />
          </Form.Item>
        );
    }
  };

  return (
    <div className="space-y-6" data-cy="additional-information-section">
      {/* Lead Additional Information */}
      <div data-cy="lead-additional-info">
        <h3
          className="text-lg font-medium text-gray-900"
          data-cy="additional-info-title"
        >
          Lead Additional Information
        </h3>
        <Form.Item
          name="additionalInformation"
          className="mt-2"
          rules={[
            {
              max: leadValidation.limits.additionalInfo,
              message: `Additional information cannot exceed ${leadValidation.limits.additionalInfo} characters`,
            },
          ]}
          data-cy="additional-info-textarea"
        >
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>
      </div>

      {/* Supplier and Solution */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
        data-cy="supplier-solution-section"
      >
        <Form.Item
          name="supplierId"
          label="Supplier"
          rules={[{ required: true }]}
          data-cy="supplier-form-item"
        >
          <Select
            placeholder="Select Supplier"
            options={supplierOptions}
            loading={suppliersLoading}
            showSearch
            data-cy="supplier-select"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          name="solutionId"
          label="Solution"
          rules={[{ required: true }]}
          data-cy="solution-form-item"
        >
          <Select
            placeholder="Select Solution"
            options={solutionOptions}
            loading={solutionsLoading}
            showSearch
            data-cy="solution-select"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </div>

      {/* File Upload */}
      <Form.Item data-cy="file-upload-section">
        <div className="space-y-3">
          <Upload.Dragger
            name="leadDocuments"
            multiple
            fileList={fileList}
            onChange={handleFileChange}
            onRemove={handleFileRemove}
            customRequest={customRequest}
            beforeUpload={() => false}
            accept="*/*"
            data-cy="file-upload-dragger"
          >
            <p className="ant-upload-drag-icon" data-cy="upload-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text" data-cy="upload-text">
              Select Files
            </p>
            <p className="ant-upload-hint" data-cy="upload-hint">
              Files will be uploaded to file server when you create the lead
            </p>
          </Upload.Dragger>

          {fileList.length > 0 && (
            <div
              className="text-sm text-gray-600 text-center"
              data-cy="file-count-display"
            >
              {fileList.length} file(s) selected for upload
            </div>
          )}
        </div>
      </Form.Item>

      {/* Lead Rating */}
      <Form.Item
        label="Lead Rating"
        name="leadRate"
        rules={[
          {
            type: 'number',
            min: leadValidation.limits.leadRate.min,
            max: leadValidation.limits.leadRate.max,
            message: `Lead rating must be between ${leadValidation.limits.leadRate.min} and ${leadValidation.limits.leadRate.max}`,
          },
        ]}
        data-cy="lead-rating-section"
      >
        <Rate data-cy="lead-rating-stars" />
      </Form.Item>

      {/* Required Custom Fields - Auto Display with Form Inputs */}
      {required && required.length > 0 && (
        <div className="border-t pt-6" data-cy="required-custom-fields-section">
          <h3
            className="text-lg font-medium text-gray-900 mb-4"
            data-cy="required-fields-title"
          >
            Required Custom Fields ({required.length})
          </h3>
          <div className="space-y-4" data-cy="required-fields-container">
            {required.map((field) => (
              <div
                key={field.id}
                className="p-4 border border-gray-200 rounded-lg bg-white"
                data-cy={`required-field-${field.id}-container`}
              >
                {renderCustomFieldInput(field, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional Custom Fields - Hidden by Default, Show on Button Click */}
      {optional && optional.length > 0 && (
        <div className="border-t pt-6" data-cy="optional-custom-fields-section">
          {/* Toggle Button for Optional Fields */}
          <Button
            type="primary"
            block
            icon={<PlusOutlined />}
            onClick={toggleOptionalFields}
            className="mb-4"
            data-cy="toggle-optional-fields-btn"
          >
            {showOptionalFields ? 'Hide Custom Fields' : 'Legacy Custom Field'}
          </Button>

          {/* Optional Fields Section - Only Show When Button is Clicked */}
          {showOptionalFields && (
            <>
              <div
                className="flex items-center justify-between mb-4"
                data-cy="optional-fields-header"
              >
                <h3
                  className="text-lg font-medium text-gray-900"
                  data-cy="optional-fields-title"
                >
                  Optional Custom Fields ({optional.length})
                </h3>
                {selectedOptionalFields.size > 0 && (
                  <Button
                    type="text"
                    size="small"
                    onClick={clearAllOptionalFields}
                    className="text-red-600 hover:text-red-700"
                    data-cy="clear-all-optional-fields-btn"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Field Selection Checkboxes */}
              <div
                className="mb-4 p-3 bg-gray-50 rounded-lg border"
                data-cy="field-selection-checkboxes"
              >
                <p
                  className="text-sm text-gray-600 mb-2"
                  data-cy="field-selection-instruction"
                >
                  Select which fields to include:
                </p>
                <div className="space-y-2" data-cy="field-checkboxes-container">
                  {optional.map((field) => (
                    <label
                      key={field.id}
                      className="flex items-center space-x-2 cursor-pointer"
                      data-cy={`field-checkbox-${field.id}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptionalFields.has(field.id)}
                        onChange={(e) =>
                          handleFieldSelection(field.id, e.target.checked)
                        }
                        className="rounded"
                        data-cy={`field-checkbox-input-${field.id}`}
                      />
                      <span
                        className="text-sm text-gray-700"
                        data-cy={`field-checkbox-label-${field.id}`}
                      >
                        {field.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Selected Fields Forms */}
              {selectedOptionalFields.size > 0 && (
                <div
                  className="space-y-4"
                  data-cy="selected-optional-fields-container"
                >
                  {optional
                    .filter((field) => selectedOptionalFields.has(field.id))
                    .map((field) => (
                      <div
                        key={field.id}
                        className="p-4 border border-gray-200 rounded-lg bg-white"
                        data-cy={`optional-field-${field.id}-container`}
                      >
                        {renderCustomFieldInput(field, false)}
                      </div>
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
