import { useQuery } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { CRM_URL } from '@/utils/constants';

// --- Configuration ---
// Remove hardcoded BASE_URL and use imported one

// --- Interfaces ---
export interface LeadType {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  tenantId: string;
  [key: string]: any;
}

// --- API Service Function ---

/**
 * Fetches lead types for the current tenant.
 */
const getLeadTypes = async (): Promise<LeadType[]> => {
  try {
    const token = await getCurrentToken();

    // Get tenant ID dynamically inside the function
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

    const response = await crudRequest({
      url: `${CRM_URL}/lead-types`,
      method: 'GET',
      headers,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

// --- React Query Hook ---

/**
 * Hook for fetching lead types.
 */
export const useGetLeadTypes = () => {
  return useQuery<LeadType[]>(['leadTypes'], getLeadTypes, {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    // eslint-disable-next-line
    onError: (error: any) => {
      // Error handling can be done here, e.g., showing a notification
    },
  });
};
