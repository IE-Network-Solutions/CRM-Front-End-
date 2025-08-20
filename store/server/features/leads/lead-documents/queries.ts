import { useQuery } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { CRM_URL } from '@/utils/constants';

// --- Configuration ---
// Remove hardcoded BASE_URL and use imported one

// --- Interfaces ---
export interface LeadDocument {
  id: string;
  name: string;
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  fileType?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  tenantId: string;
  [key: string]: any;
}

// --- API Service Function ---

/**
 * Fetches lead documents for the current tenant.
 */
const getLeadDocuments = async (): Promise<LeadDocument[]> => {
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
      url: `${CRM_URL}/lead-documents`,
      method: 'GET',
      headers,
    });

    return response;
  } catch (error) {
    //console.error('Error fetching lead documents:', error);
    throw error;
  }
};

// --- React Query Hook ---

/**
 * Hook for fetching lead documents.
 */
export const useGetLeadDocuments = () => {
  return useQuery<LeadDocument[]>(['leadDocuments'], getLeadDocuments, {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    // eslint-disable-next-line
    onError: (error: any) => {
      //console.error('Failed to fetch lead documents:', error);
    },
  });
};
