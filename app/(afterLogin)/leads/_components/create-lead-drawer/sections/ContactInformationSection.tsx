'use client';

import React, { useState } from 'react';
import { Form, Input, Select, Modal, Button, message } from 'antd';
import {
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useGetCompanies } from '@/store/server/features/leads/companies/queries';
import { useCreateCompany } from '@/store/server/features/leads/companies/mutation';
import { useQueryClient } from 'react-query';

// Import the Company type from queries
import type { Company } from '@/store/server/features/leads/companies/queries';

export const ContactInformationSection: React.FC = () => {
  const {
    data: companies = [],
    isLoading: companiesLoading,
    //refetch: refetchCompanies,
  } = useGetCompanies();
  const { mutate: createCompany, isLoading: isCreatingCompany } =
    useCreateCompany();
  const queryClient = useQueryClient();
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [addCompanyForm] = Form.useForm();

  // Handle different possible data structures from API
  let safeCompanies: Company[] = [];

  if (Array.isArray(companies)) {
    safeCompanies = companies;
  } else if (companies && typeof companies === 'object') {
    // Handle case where API returns { items: [], total: 0 } or similar
    const companiesObj = companies as any;
    if (Array.isArray(companiesObj.items)) {
      safeCompanies = companiesObj.items;
    } else if (Array.isArray(companiesObj.data)) {
      safeCompanies = companiesObj.data;
    }
  }

  // Transform companies data to match Select component format
  const companyOptions = safeCompanies.map((company: Company) => ({
    value: company.id,
    label: company.name,
  }));

  const hasCompanies = safeCompanies.length > 0;
  const shouldShowNoCompanies = !companiesLoading && !hasCompanies;
  const shouldDisableSelect = !hasCompanies && !companiesLoading;

  const handleAddCompany = () => {
    setIsAddCompanyModalOpen(true);
  };

  const handleCreateCompany = async (values: any) => {
    try {
      createCompany(values, {
        onSuccess: () => {
          message.success('Company created successfully!');
          setIsAddCompanyModalOpen(false);
          addCompanyForm.resetFields();

          // Invalidate and refetch companies list
          queryClient.invalidateQueries(['companies']);
        },
        onError: (error: any) => {
          message.error(
            error.message || 'Failed to create company. Please try again.',
          );
        },
      });
    } catch (error) {
      message.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleCancelAddCompany = () => {
    setIsAddCompanyModalOpen(false);
    addCompanyForm.resetFields();
  };

  return (
    <div className="space-y-4" data-cy="contact-information-section">
      <h3
        className="text-lg font-medium text-gray-900"
        data-cy="contact-info-title"
      >
        Contact Information
      </h3>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
        data-cy="contact-info-grid"
      >
        <Form.Item
          name="contactPersonFName"
          label="Firstname"
          rules={[{ required: true }]}
          data-cy="firstname-form-item"
        >
          <Input
            placeholder="Lead Firstname"
            prefix={<UserOutlined />}
            data-cy="firstname-input"
          />
        </Form.Item>
        <Form.Item
          name="contactPersonLName"
          label="Lastname"
          rules={[{ required: true }]}
          data-cy="lastname-form-item"
        >
          <Input
            placeholder="Lead Lastname"
            prefix={<UserOutlined />}
            data-cy="lastname-input"
          />
        </Form.Item>
        <Form.Item
          name="companyId"
          label="Company"
          rules={[{ required: true }]}
          data-cy="company-form-item"
        >
          <Select
            placeholder={
              hasCompanies
                ? 'Lead Company'
                : 'No companies available. Add one first.'
            }
            options={companyOptions}
            loading={companiesLoading}
            disabled={shouldDisableSelect}
            showSearch
            data-cy="company-select"
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            dropdownRender={(menu) => (
              <div>
                {menu}
                <div style={{ padding: '8px', borderTop: '1px solid #f0f0f0' }}>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={handleAddCompany}
                    style={{ width: '100%', textAlign: 'left' }}
                    data-cy="add-company-dropdown-btn"
                  >
                    Add Company
                  </Button>
                </div>
              </div>
            )}
          />
          {shouldShowNoCompanies && (
            <div
              className="text-sm text-gray-500 mt-1"
              data-cy="no-companies-message"
            >
              No companies available. Please add a company first.
            </div>
          )}
        </Form.Item>
        <Form.Item
          name="contactPersonPosition"
          label="Position"
          rules={[{ required: true }]}
          data-cy="position-form-item"
        >
          <Input
            placeholder="Lead Position"
            prefix={<IdcardOutlined />}
            data-cy="position-input"
          />
        </Form.Item>
      </div>

      <h3
        className="text-lg font-medium text-gray-900"
        data-cy="contact-address-title"
      >
        Contact Address Information
      </h3>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
        data-cy="contact-address-grid"
      >
        <Form.Item
          name="contactPersonEmail"
          label="Email"
          rules={[{ required: true, type: 'email' }]}
          data-cy="email-form-item"
        >
          <Input
            placeholder="Lead Email"
            prefix={<MailOutlined />}
            data-cy="email-input"
          />
        </Form.Item>
        <Form.Item
          name="contactPersonPhoneNumber"
          label="Phone"
          rules={[{ required: true }]}
          data-cy="phone-form-item"
        >
          <Input
            placeholder="Lead Phone"
            prefix={<PhoneOutlined />}
            data-cy="phone-input"
          />
        </Form.Item>
      </div>

      {/* Add Company Modal */}
      <Modal
        title="Company Details"
        open={isAddCompanyModalOpen}
        onCancel={handleCancelAddCompany}
        footer={null}
        width={600}
        confirmLoading={isCreatingCompany}
        data-cy="add-company-modal"
      >
        <Form
          form={addCompanyForm}
          layout="vertical"
          onFinish={handleCreateCompany}
          className="space-y-4"
          data-cy="add-company-form"
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
            data-cy="company-form-grid"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Company name is required' }]}
              data-cy="company-name-form-item"
            >
              <Input placeholder="Company Name" data-cy="company-name-input" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
              data-cy="company-email-form-item"
            >
              <Input
                placeholder="Company Email"
                data-cy="company-email-input"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Phone is required' }]}
              data-cy="company-phone-form-item"
            >
              <Input
                placeholder="Company Phone"
                data-cy="company-phone-input"
              />
            </Form.Item>
            <Form.Item
              name="website"
              label="Website"
              data-cy="company-website-form-item"
            >
              <Input
                placeholder="Company Website"
                data-cy="company-website-input"
              />
            </Form.Item>
          </div>

          <div
            className="flex justify-end space-x-2 pt-4"
            data-cy="company-form-actions"
          >
            <Button
              onClick={handleCancelAddCompany}
              disabled={isCreatingCompany}
              data-cy="cancel-company-btn"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreatingCompany}
              data-cy="create-company-btn"
            >
              Create Company
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
