import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { ORG_AND_EMP_URL } from '@/utils/constants';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Function to update timezone data by sending a PUT request to the API
 * @param data The timezone data to update
 * @returns The response data from the API
 */
const updateTimeZone = async (data: any) => {
  const token = await getCurrentToken();
  const tenantId = useAuthenticationStore.getState().tenantId;

  return crudRequest({
    url: `${ORG_AND_EMP_URL}/timezone`,
    method: 'PUT',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
  });
};

/**
 * Custom hook to update timezone data using useMutation from react-query.
 *
 * @returns The mutation object for updating timezone data.
 *
 * @description
 * This hook uses `useMutation` to update timezone data in the API. It returns
 * the mutation object containing the update function and any loading or error states.
 */
export const useUpdateTimeZone = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTimeZone, {
    onSuccess: () => {
      queryClient.invalidateQueries('timeZone');
    },
  });
};
