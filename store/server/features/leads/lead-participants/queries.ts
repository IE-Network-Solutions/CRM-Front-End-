import { useQuery } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { CRM_URL } from '@/utils/constants';

// --- Configuration ---
// Remove hardcoded BASE_URL and use imported one

// --- Interfaces ---
export interface LeadParticipant {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  department?: string;
  isActive?: boolean;
  leadId?: string;
  tenantId: string;
  [key: string]: any;
}

// --- API Service Function ---

/**
 * Fetches lead participants for the current tenant.
 */
const getLeadParticipants = async (): Promise<LeadParticipant[]> => {
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
      url: `${CRM_URL}/lead-participants`,
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
 * Hook for fetching lead participants.
 */
export const useGetLeadParticipants = () => {
  return useQuery<LeadParticipant[]>(
    ['leadParticipants'],
    getLeadParticipants,
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      // eslint-disable-next-line
      onError: (error: any) => {
        // Error handling can be done here, e.g., showing a notification
      },
    },
  );
};
