import { useMutation, useQueryClient } from 'react-query';
import { api } from '@/config/api';
import { UpdateLeadStageRequest } from './interface';
import { handleSuccessMessage } from '@/utils/showSuccessMessage';
import NotificationMessage from '@/components/common/notification/notificationMessage';

export function useUpdateLeadStageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateLeadStageRequest) => {
      try {
        const response = await api.put(`/leads/${data.leadId}/stage`, {
          stageId: data.stageId,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['leads'] });

      // Snapshot the previous value
      const previousLeads = queryClient.getQueriesData({ queryKey: ['leads'] });

      // Optimistically update all leads queries in cache
      queryClient.setQueriesData({ queryKey: ['leads'] }, (oldData: any) => {
        if (!oldData) return oldData;

        // If it's a paginated response
        if (oldData.data && Array.isArray(oldData.data)) {
          return {
            ...oldData,
            data: oldData.data.map((lead: any) =>
              lead.id === variables.leadId
                ? { ...lead, engagementStageId: variables.stageId }
                : lead,
            ),
          };
        }

        // If it's a direct array
        if (Array.isArray(oldData)) {
          return oldData.map((lead: any) =>
            lead.id === variables.leadId
              ? { ...lead, engagementStageId: variables.stageId }
              : lead,
          );
        }

        return oldData;
      });

      // Return a context object with the snapshotted value
      return { previousLeads };
    },
    onSuccess: () => {
      // Show success notification
      handleSuccessMessage('PUT', 'Lead stage updated successfully');

      // The optimistic update should already be in place
      // Just invalidate to ensure consistency
      queryClient.invalidateQueries({
        queryKey: ['leads'],
        exact: false,
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
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({
        queryKey: ['leads'],
        exact: false,
      });
    },
  });
}
