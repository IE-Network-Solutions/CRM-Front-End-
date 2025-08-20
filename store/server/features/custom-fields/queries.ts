import { useQuery } from 'react-query';
import { crudRequest } from '@/utils/crudRequest';

// --- Interfaces ---
export interface CustomField {
  id: string;
  name: string;
  type: 'checkbox' | 'text' | 'select' | 'number' | 'date';
  fieldValues: Array<{
    id: string;
    value: string;
    label?: string;
  }>;
  isRequired: boolean;
  tenantId: string;
}

export interface CustomFieldsResponse {
  data: CustomField[];
  total: number;
  page: number;
  limit: number;
}

// --- API Functions ---
const fetchCustomFields = async (): Promise<CustomField[]> => {
  try {
    // Use the same base URL as other lead APIs
    const BASE_URL = 'http://172.20.30.226:3000/api/v1';
    const fullUrl = `${BASE_URL}/custom-fields`;

    const response = await crudRequest({
      url: fullUrl,
      method: 'GET',
    });

    // Handle different response structures
    if (Array.isArray(response)) {
      return response;
    } else if (response?.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response?.items && Array.isArray(response.items)) {
      return response.items;
    }

    return [];
  } catch (error) {
    // console.error('Error fetching custom fields:', error);
    return [];
  }
};

// --- React Query Hooks ---
export const useGetCustomFields = () => {
  const query = useQuery({
    queryKey: ['customFields'],
    queryFn: fetchCustomFields,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return query;
};

// --- Utility Functions ---
export const separateCustomFields = (customFields: CustomField[]) => {
  if (!customFields || !Array.isArray(customFields)) {
    return { required: [], optional: [] };
  }

  const required = customFields.filter((field) => field.isRequired);
  const optional = customFields.filter((field) => !field.isRequired);

  return { required, optional };
};
