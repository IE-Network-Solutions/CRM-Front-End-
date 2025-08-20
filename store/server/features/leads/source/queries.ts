import { useQuery } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';

// --- Configuration ---
const BASE_URL = 'http://172.20.30.226:3000/api/v1';

// --- Interfaces ---
export interface Source {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  tenantId: string;
  [key: string]: any;
}

// --- API Service Function ---

/**
 * Fetches sources for the current tenant.
 */
const getSources = async (): Promise<Source[]> => {
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
      url: `${BASE_URL}/source`,
      method: 'GET',
      headers,
    });

    return response;
  } catch (error) {
    //console.error('Error fetching sources:', error);
    throw error;
  }
};

// --- React Query Hook ---

/**
 * Hook for fetching sources.
 */
export const useGetSources = () => {
  return useQuery<Source[]>(['sources'], getSources, {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    onError: (error: any) => {
      //console.error('Failed to fetch sources:', error);
    },
  });
};
