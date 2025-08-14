import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/config/api"
import { UpdateLeadStageRequest } from "./interface"

export function useUpdateLeadStageMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateLeadStageRequest) => {
      const response = await api.patch(`/leads/${data.leadId}/stage`, {
        stageId: data.stageId,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] })
    },
    onError: (error) => {
      // Failed to update lead stage
    },
  })
}

