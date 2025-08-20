import { useQuery } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';

// --- Configuration ---
const BASE_URL = 'https://test-org-emp.ienetworks.co/api/v1';

// --- Interfaces ---
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tenantId: string;
  [key: string]: any;
}

// --- API Service Function ---

/**
 * Fetches users for the current tenant.
 */
const getUsers = async (): Promise<User[]> => {
  try {
    const token = await getCurrentToken();

    //console.log('token', token);

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
      url: `${BASE_URL}/users`,
      method: 'GET',
      headers,
    });

    return response;
  } catch (error) {
    //console.error('Error fetching users:', error);
    throw error;
  }
};

// --- React Query Hook ---

/**
 * Hook for fetching users.
 */
export const useGetUsers = () => {
  return useQuery<User[]>(['users'], getUsers, {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    // eslint-disable-next-line
    onError: (error: any) => {
      //console.error('Failed to fetch users:', error);
    },
  });
};
