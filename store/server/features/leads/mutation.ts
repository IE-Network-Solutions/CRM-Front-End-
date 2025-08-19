import { useMutation, useQueryClient } from 'react-query';
import { api } from '@/config/api';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { UpdateLeadStageRequest } from './interface';
import { handleSuccessMessage } from '@/utils/showSuccessMessage';
import NotificationMessage from '@/components/common/notification/notificationMessage';

export function useUpdateLeadStageMutation() {
  const queryClient = useQueryClient();
  const { tenantId } = useAuthenticationStore();

  return useMutation({
    mutationFn: async (data: UpdateLeadStageRequest) => {
      try {
        const token = await getCurrentToken();

        // Add timeout and better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        const response = await api.patch(
          `/leads/${data.leadId}`,
          {
            engagementStageId: data.stageId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              tenantId: tenantId,
            },
            signal: controller.signal,
          },
        );

        clearTimeout(timeoutId);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    onMutate: async (variables) => {
      // Cancel any outgoing refetches - use pattern matching for all leads queries
      await queryClient.cancelQueries({ queryKey: ['leads'] });

      // Snapshot the previous value - get all leads queries
      const previousLeads = queryClient.getQueriesData({ queryKey: ['leads'] });

      // Optimistically update all leads queries in cache - use pattern matching
      queryClient.setQueriesData({ queryKey: ['leads'] }, (oldData: any) => {
        if (!oldData) return oldData;

        // If it's a paginated response
        if (oldData.data && Array.isArray(oldData.data)) {
          const updatedData = {
            ...oldData,
            data: oldData.data.map((lead: any) => {
              if (lead.id === variables.leadId) {
                return { ...lead, engagementStageId: variables.stageId };
              }
              return lead;
            }),
          };
          return updatedData;
        }

        // If it's a direct array
        if (Array.isArray(oldData)) {
          const updatedData = oldData.map((lead: any) => {
            if (lead.id === variables.leadId) {
              return { ...lead, engagementStageId: variables.stageId };
            }
            return lead;
          });
          return updatedData;
        }

        return oldData;
      });

      // Return a context object with the snapshotted value
      return { previousLeads };
    },
    onSuccess: (data, variables) => {
      // Show success notification
      handleSuccessMessage('PATCH', 'Lead stage updated successfully');

      // Update the cache with the actual response data to ensure consistency
      queryClient.setQueriesData({ queryKey: ['leads'] }, (oldData: any) => {
        if (!oldData) return oldData;

        // If it's a paginated response
        if (oldData.data && Array.isArray(oldData.data)) {
          const updatedData = {
            ...oldData,
            data: oldData.data.map((lead: any) => {
              if (lead.id === variables.leadId) {
                return { ...lead, engagementStageId: variables.stageId };
              }
              return lead;
            }),
          };
          return updatedData;
        }

        // If it's a direct array
        if (Array.isArray(oldData)) {
          const updatedData = oldData.map((lead: any) => {
            if (lead.id === variables.leadId) {
              return { ...lead, engagementStageId: variables.stageId };
            }
            return lead;
          });
          return updatedData;
        }

        return oldData;
      });
    },
    onError: (error, variables, context) => {
      // Show error notification
      NotificationMessage.error({
        message: 'Stage Update Failed',
        description: 'Failed to update lead stage. Please try again.',
      });

      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousLeads) {
        context.previousLeads.forEach(([queryKey, data]: [any, any]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
  });
}
