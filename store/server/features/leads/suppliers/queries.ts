import { useQuery } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { CRM_URL } from '@/utils/constants';

// --- Configuration ---
// Remove hardcoded BASE_URL and use imported one

// --- Interfaces ---
export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
  isActive?: boolean;
  tenantId: string;
  [key: string]: any;
}

// --- API Service Function ---

/**
 * Fetches suppliers for the current tenant.
 */
const getSuppliers = async (): Promise<Supplier[]> => {
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
      url: `${CRM_URL}/suppliers`,
      method: 'GET',
      headers,
    });

    return response;
  } catch (error) {
    //console.error('Error fetching suppliers:', error);
    throw error;
  }
};

// --- React Query Hook ---

/**
 * Hook for fetching suppliers.
 */
export const useGetSuppliers = () => {
  return useQuery<Supplier[]>(['suppliers'], getSuppliers, {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    // eslint-disable-next-line
    onError: (error: any) => {
      //console.error('Failed to fetch suppliers:', error);
    },
  });
};
