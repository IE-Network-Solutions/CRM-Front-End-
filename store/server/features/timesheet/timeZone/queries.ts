import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { ORG_AND_EMP_URL } from '@/utils/constants';
import { crudRequest } from '@/utils/crudRequest';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { useQuery } from 'react-query';

/**
 * Function to fetch timezone data by sending a GET request to the API
 * @returns The response data from the API
 */
const getTimeZone = async () => {
  const token = await getCurrentToken();
  const tenantId = useAuthenticationStore.getState().tenantId;

  return crudRequest({
    url: `${ORG_AND_EMP_URL}/timezone`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      tenantId: tenantId,
    },
  });
};

/**
 * Custom hook to fetch timezone data using useQuery from react-query.
 *
 * @returns The query object for fetching timezone data.
 *
 * @description
 * This hook uses `useQuery` to fetch timezone data from the API. It returns
 * the query object containing the timezone data and any loading or error states.
 */
export const useGetTimeZone = () => useQuery<any>('timeZone', getTimeZone);
