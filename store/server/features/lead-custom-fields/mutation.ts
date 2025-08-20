import { useMutation, useQueryClient } from 'react-query';
import { crudRequest } from '@/utils/crudRequest';
import { message } from 'antd';

// --- Interfaces ---
export interface LeadCustomField {
  id?: string;
  customFieldId: string;
  value: string;
  leadId: string;
  optionId?: string;
  tenantId: string;
}

export interface CreateLeadCustomFieldInput {
  customFieldId: string;
  value: string;
  leadId: string;
  optionId?: string;
  tenantId: string;
}

// --- API Functions ---
const createLeadCustomField = async (
  data: CreateLeadCustomFieldInput,
): Promise<LeadCustomField> => {
  try {
    // Use the same base URL as other lead APIs
    const BASE_URL = 'http://172.20.30.226:3000/api/v1';
    const fullUrl = `${BASE_URL}/lead-custom-fields`;

    // Ensure tenantId is included in the request
    const requestData = {
      ...data,
      tenantId: data.tenantId,
    };

    const response = await crudRequest({
      url: fullUrl,
      method: 'POST',
      data: requestData,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const createMultipleLeadCustomFields = async (
  fields: CreateLeadCustomFieldInput[],
): Promise<LeadCustomField[]> => {
  try {
    // Create multiple custom fields in parallel
    const promises = fields.map((field) => createLeadCustomField(field));
    const results = await Promise.all(promises);

    return results;
  } catch (error) {
    throw error;
  }
};

// --- React Query Hooks ---
export const useCreateLeadCustomField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLeadCustomField,
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries(['leadCustomFields']);
      queryClient.invalidateQueries(['leads']);
    },
    onError: (error: any) => {
      message.error('Failed to save custom field');
    },
  });
};

export const useCreateMultipleLeadCustomFields = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMultipleLeadCustomFields,
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries(['leadCustomFields']);
      queryClient.invalidateQueries(['leads']);
    },
    onError: (error: any) => {
      message.error('Failed to save custom fields');
    },
  });
};
