import { useMutation, useQueryClient } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { handleSuccessMessage } from '@/utils/showSuccessMessage';

// --- Configuration ---
const BASE_URL = 'http://172.20.30.226:3000/api/v1';

// --- Interfaces ---
export interface CreateCompanyInput {
  name: string;
  email: string;
  phone: string;
  website?: string;
}

export interface CompanyResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  [key: string]: any;
}

// --- API Service Function ---

/**
 * Creates a new company.
 */
const createCompany = async (
  data: CreateCompanyInput,
): Promise<CompanyResponse> => {
  try {
    const token = await getCurrentToken();

    // 🚨 FIXED: Get tenant ID dynamically inside the function
    const tenantId = useAuthenticationStore.getState().tenantId;

    // Validate that tenant ID exists
    if (!tenantId) {
      throw new Error(
        'Tenant ID not found. Please ensure you are properly authenticated.',
      );
    }

    const headers = {
      tenantId: tenantId,
      Authorization: `Bearer ${token}`,
    };

    // Add tenant ID to the payload as well for backend validation
    const payloadWithTenant = {
      ...data,
      tenantId: tenantId, // Ensure tenant ID is in the request body too
    };

    const response = await crudRequest({
      url: `${BASE_URL}/companies`,
      method: 'POST',
      data: payloadWithTenant,
      headers,
    });

    return response;
  } catch (error) {
    //console.error('Error in createCompany:', error);
    throw error;
  }
};

// --- React Query Mutation Hook ---

/**
 * Hook for creating a company.
 */
export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(createCompany, {
    // eslint-disable-next-line
    onSuccess: (data) => {
      queryClient.invalidateQueries(['companies']);
      handleSuccessMessage('POST');
    },
    // eslint-disable-next-line
    onError: (error: any) => {
      // Error handling - no logging needed
    },
  });
};
