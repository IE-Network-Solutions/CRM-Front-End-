'use client';

import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, message } from 'antd';
import {
  AdditionalInformationSection,
  ContactInformationSection,
  LeadInformationSection,
  RolesSection,
} from './sections';
import { useCreateLead } from '@/store/server/features/leads/mutation';
import { useUploadLeadDocument } from '@/store/server/features/leads/lead-documents/mutation';
import { useCreateMultipleLeadCustomFields } from '@/store/server/features/lead-custom-fields/mutation';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { useGetCustomFields } from '@/store/server/features/custom-fields/queries';
import { leadValidation } from './options';
import dayjs from 'dayjs';

interface CreateLeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateLeadDrawer: React.FC<CreateLeadDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateLead();
  const { mutate: uploadDocument } = useUploadLeadDocument();
  const { mutate: createCustomFields, isLoading: customFieldsLoading } =
    useCreateMultipleLeadCustomFields();
  const { data: allCustomFields = [] } = useGetCustomFields();

  const [leadParticipants, setLeadParticipants] = useState<
    Array<{ id: number }>
  >([{ id: Date.now() }]);

  const [customFields, setCustomFields] = useState<Array<{ id: number }>>([]);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [clearOptionalFields, setClearOptionalFields] = useState(false);
  const [selectedOptionalFields, setSelectedOptionalFields] = useState<
    Set<string>
  >(new Set());

  useEffect(() => {
    if (clearOptionalFields) {
      const timer = setTimeout(() => {
        setClearOptionalFields(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [clearOptionalFields]);

  useEffect(() => {
    if (clearOptionalFields) {
      setSelectedOptionalFields(new Set());
    }
  }, [clearOptionalFields]);

  useEffect(() => {
    if (form && isOpen) {
      const today = dayjs();
      form.setFieldsValue({
        currencies: ['USD'],
        estimatedBudgets: [''],
        createdDate: today,
      });
    }
  }, [form, isOpen]);

  const handleCreateLead = (values: any) => {
    const cleanValues = Object.keys(values).reduce((acc, key) => {
      const value = values[key];
      if (
        value !== null &&
        value !== undefined &&
        typeof value !== 'function' &&
        typeof value !== 'symbol' &&
        !(value instanceof HTMLElement) &&
        !(value?.constructor?.name === 'HTMLInputElement') &&
        !(value?.constructor?.name === 'HTMLSelectElement') &&
        !(value?.constructor?.name === 'HTMLTextAreaElement')
      ) {
        acc[key] = value;
      }
      return acc;
    }, {} as any);

    const {
      contactPersonFName,
      contactPersonLName,
      contactPersonPosition,
      contactPersonEmail,
      contactPersonPhoneNumber,
      companyId,
      supplierId,
      solutionId,
      leadOwner,
      leadTypeId,
      sectorId,
      sourceId,
      engagementStageId,
      estimatedBudgets,
      currencies,
      additionalInformation,
      leadRate,
      leadName,
      createdDate,
      ...rest
    } = cleanValues || {};

    const normalizedCreatedDate = createdDate
      ? createdDate?.toDate?.()
        ? createdDate.toDate().toISOString()
        : createdDate?.toISOString
          ? createdDate.toISOString()
          : createdDate
      : undefined;

    const dateFormats = {
      isoString: normalizedCreatedDate,
      dateOnly: createdDate
        ? dayjs(createdDate).format('YYYY-MM-DD')
        : undefined,
      timestamp: createdDate ? dayjs(createdDate).valueOf() : undefined,
      isoDate: createdDate ? dayjs(createdDate).toISOString() : undefined,
      formattedDate: createdDate
        ? dayjs(createdDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        : undefined,
    };

    // Validate required fields
    const missingRequiredFields = leadValidation.required.filter((field) => {
      const value = cleanValues[field];
      return !value || (typeof value === 'string' && value.trim() === '');
    });

    if (missingRequiredFields.length > 0) {
      message.error(
        `Missing required fields: ${missingRequiredFields.join(', ')}`,
      );
      return;
    }

    if (!leadName || typeof leadName !== 'string' || leadName.trim() === '') {
      message.error('Lead name is required and must be a non-empty string');
      return;
    }

    const leadParticipantsData =
      form.getFieldValue('leadParticipants') || cleanValues.leadParticipants;

    const { tenantId } = useAuthenticationStore.getState();

    const cleanLeadParticipants = Array.isArray(leadParticipantsData)
      ? leadParticipantsData
          .slice(0, leadValidation.limits.leadParticipants)
          .flatMap((item) => {
            if (item.roleId && item.users && Array.isArray(item.users)) {
              return item.users.map((userId: string) => ({
                roleId: item.roleId,
                userId: userId,
                tenantId: tenantId,
              }));
            }
            return [];
          })
      : [];

    const hasValidLeadParticipants = cleanLeadParticipants.every(
      (item) =>
        item.roleId &&
        item.userId &&
        typeof item.roleId === 'string' &&
        typeof item.userId === 'string',
    );

    if (cleanLeadParticipants.length > 0 && !hasValidLeadParticipants) {
      message.error(
        'Invalid lead participants data. Please check your selections.',
      );
      return;
    }

    const basePayload = {
      name: leadName.trim(),
      contactPersonFName: contactPersonFName?.toString() || '',
      contactPersonLName: contactPersonLName?.toString() || '',
      contactPersonPosition: contactPersonPosition?.toString() || '',
      contactPersonEmail: contactPersonEmail?.toString() || '',
      contactPersonPhoneNumber: contactPersonPhoneNumber?.toString() || '',
      companyId: companyId?.toString() || '',
      supplierId: supplierId?.toString() || '',
      solutionId: solutionId
        ? [solutionId.toString()].slice(0, leadValidation.limits.solutionIds)
        : [],
      leadOwner: leadOwner?.toString() || '',
      leadTypeId: leadTypeId?.toString() || '',
      sectorId: sectorId?.toString() || '',
      sourceId: sourceId?.toString() || '',
      engagementStageId: engagementStageId?.toString() || '',
      estimatedBudgets:
        estimatedBudgets && currencies
          ? estimatedBudgets
              .slice(0, leadValidation.limits.estimatedBudgets)
              .map((amount: any, index: number) => ({
                amount: parseFloat(amount) || 0,
                currency: currencies[index] || 'USD',
                tenantId: tenantId,
              }))
          : [],
      additionalInformation: additionalInformation?.toString() || '',
      leadRate: leadRate ? parseInt(leadRate) : 0,
      createdDate: normalizedCreatedDate,
      createdAt: normalizedCreatedDate,
      dateCreated: normalizedCreatedDate,
      leadCreatedDate: normalizedCreatedDate,
      ...dateFormats,
      leadDate: normalizedCreatedDate,
      customCreatedAt: normalizedCreatedDate,
      dates: {
        createdAt: normalizedCreatedDate,
        createdDate: normalizedCreatedDate,
        customDate: normalizedCreatedDate,
      },
    };

    const payload = {
      ...basePayload,
      ...rest,
      leadParticipants: cleanLeadParticipants,
    };

    mutate(payload, {
      onSuccess: (leadData: any) => {
        const leadId =
          leadData?.id ||
          leadData?._id ||
          leadData?.leadId ||
          leadData?.data?.id ||
          leadData?.data?._id;

        if (!leadId) {
          message.error(
            'Lead created but could not upload files - missing lead ID',
          );
          return;
        }

        const formValues = form.getFieldsValue();
        const customFieldsPayload: Array<{
          customFieldId: string;
          value: string;
          leadId: string;
          optionId?: string;
          tenantId: string;
        }> = [];

        Object.keys(formValues).forEach((key) => {
          if (key.startsWith('customField_')) {
            const fieldId = key.replace('customField_', '');
            const value = formValues[key];

            if (value !== undefined && value !== null && value !== '') {
              const customField = allCustomFields.find(
                (field) => field.id === fieldId,
              );

              if (customField) {
                if (
                  customField.isRequired ||
                  selectedOptionalFields.has(fieldId)
                ) {
                  let stringValue = '';
                  let optionId = null;

                  if (
                    customField.type === 'checkbox' ||
                    customField.type === 'select'
                  ) {
                    const selectedOption = customField.fieldValues?.find(
                      (option) => option.id === value,
                    );
                    if (selectedOption) {
                      stringValue = selectedOption.value;
                      optionId = value;
                    }
                  } else if (value instanceof Date) {
                    stringValue = value.toISOString();
                  } else {
                    stringValue = value.toString();
                  }

                  if (stringValue) {
                    customFieldsPayload.push({
                      customFieldId: fieldId,
                      value: stringValue,
                      leadId: leadId,
                      optionId: optionId,
                      tenantId: tenantId,
                    });
                  }
                }
              }
            }
          }
        });

        if (customFieldsPayload.length > 0) {
          createCustomFields(customFieldsPayload, {
            onSuccess: () => {
              message.success('Lead and custom fields created successfully');
              setClearOptionalFields(true);
              setSelectedFiles([]);
            },
            onError: () => {
              message.warning('Lead created but custom fields failed to save');
            },
          });
        }

        if (selectedFiles.length > 0) {
          // Limit the number of files to upload
          const filesToUpload = selectedFiles.slice(
            0,
            leadValidation.limits.leadDocuments,
          );
          filesToUpload.forEach((file) => {
            if (file.originFileObj) {
              uploadDocument({
                file: file.originFileObj,
                leadId: leadId,
                documentName: file.name,
              });
            } else {
              message.error(
                `File ${file.name} is missing and cannot be uploaded`,
              );
            }
          });

          onClose();
          form.resetFields();
          setLeadParticipants([{ id: Date.now() }]);
          setCustomFields([]);
          setSelectedFiles([]);
        } else {
          onClose();
          form.resetFields();
          setLeadParticipants([{ id: Date.now() }]);
          setCustomFields([]);
          setSelectedFiles([]);
        }
      },
      onError: () => {
        message.error('Lead creation failed');
      },
    });
  };

  const addLeadParticipantRow = () => {
    setLeadParticipants([...leadParticipants, { id: Date.now() }]);
  };

  const removeLeadParticipantRow = (id: number) => {
    if (leadParticipants.length > 1) {
      setLeadParticipants(
        leadParticipants.filter((participant) => participant.id !== id),
      );
      const currentLeadParticipants =
        form.getFieldValue('leadParticipants') || [];
      const newLeadParticipants = currentLeadParticipants.filter(
        // eslint-disable-next-line
        (_: any, index: number) => leadParticipants[index]?.id !== id,
      );
      form.setFieldValue('leadParticipants', newLeadParticipants);
    }
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { id: Date.now() }]);
  };

  const removeCustomField = (id: number) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
    const currentCustomInfo = form.getFieldValue('customInformation') || [];
    const newCustomInfo = currentCustomInfo.filter(
      // eslint-disable-next-line
      (_: any, index: number) => customFields[index]?.id !== id,
    );
    form.setFieldValue('customInformation', newCustomInfo);
  };

  const handleFileListChange = (fileList: any[]) => {
    setSelectedFiles(fileList);
  };

  return (
    <Drawer
      title={
        <div data-cy="create-lead-drawer-title">
          <h2 className="text-2xl font-semibold" data-cy="create-lead-title">
            Leads
          </h2>
          <p className="text-sm text-gray-500" data-cy="create-lead-subtitle">
            Create a potential lead
          </p>
        </div>
      }
      placement="right"
      width={600}
      open={isOpen}
      onClose={() => {
        setClearOptionalFields(true);
        setSelectedFiles([]);
        onClose();
      }}
      data-cy="create-lead-drawer"
      footer={
        <div
          className="flex justify-end space-x-2"
          data-cy="create-lead-drawer-footer"
        >
          <Button onClick={onClose} data-cy="cancel-lead-btn">
            Cancel
          </Button>
          <Button
            type="primary"
            loading={isLoading || customFieldsLoading}
            onClick={() => form.submit()}
            data-cy="create-lead-submit-btn"
          >
            Create Lead
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateLead}
        className="space-y-6"
        initialValues={{
          currencies: ['USD'],
          estimatedBudgets: [''],
        }}
        data-cy="create-lead-form"
      >
        <LeadInformationSection form={form} />

        <RolesSection
          roles={leadParticipants}
          addRoleRow={addLeadParticipantRow}
          removeRoleRow={removeLeadParticipantRow}
        />

        <ContactInformationSection />

        <AdditionalInformationSection
          customFields={customFields}
          addCustomField={addCustomField}
          removeCustomField={removeCustomField}
          onFileListChange={handleFileListChange}
          form={form}
          clearOptionalFields={clearOptionalFields}
          onOptionalFieldsChange={setSelectedOptionalFields}
        />
      </Form>
    </Drawer>
  );
};
