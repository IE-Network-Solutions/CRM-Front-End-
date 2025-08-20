import { useMutation, useQueryClient } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { handleSuccessMessage } from '@/utils/showSuccessMessage';
import { CRM_URL } from '@/utils/constants';

// --- Configuration ---
// Remove hardcoded BASE_URL and use imported one

// --- Interfaces ---
export interface CreateLeadInput {
  name: string;
  contactPersonFName?: string;
  contactPersonLName?: string;
  contactPersonPosition?: string;
  contactPersonEmail?: string;
  contactPersonPhoneNumber?: string;
  companyId?: string;
  supplierId?: string;
  solutionId?: string[];
  leadOwner?: string;
  leadTypeId?: string;
  sectorId?: string;
  sourceId?: string;
  engagementStageId?: string;
  estimatedBudgets?: Array<{ amount: number; currency: string }>;
  additionalInformation?: string;
  leadRate?: number;
  createdDate?: string;
  [key: string]: any;
}

export interface LeadResponse {
  id: string;
  name: string;
  contactPersonFName?: string;
  contactPersonLName?: string;
  contactPersonPosition?: string;
  contactPersonEmail?: string;
  contactPersonPhoneNumber?: string;
  companyId?: string;
  supplierId?: string;
  solutionId?: string[];
  leadOwner?: string;
  leadTypeId?: string;
  sectorId?: string;
  sourceId?: string;
  engagementStageId?: string;
  estimatedBudgets?: Array<{ amount: number; currency: string }>;
  additionalInformation?: string;
  leadRate?: number;
  createdDate?: string;
  tenantId: string;
  [key: string]: any;
}

// --- API Service Function ---

/**
 * Creates a new lead.
 */
const createLead = async (data: CreateLeadInput): Promise<LeadResponse> => {
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

    // Add tenant ID to the payload for backend validation
    const payloadWithTenant = {
      ...data,
      tenantId: tenantId,
    };

    const response = await crudRequest({
      url: `${CRM_URL}/leads`,
      method: 'POST',
      data: payloadWithTenant,
      headers,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

// --- React Query Mutation Hook ---

/**
 * Hook for creating a lead.
 */
export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation(createLead, {
    // eslint-disable-next-line
    onSuccess: (data) => {
      queryClient.invalidateQueries(['leads']);
      handleSuccessMessage('POST');
    },
    // eslint-disable-next-line
    onError: (error: any) => {
      // Error handling - no logging needed
    },
  });
};
