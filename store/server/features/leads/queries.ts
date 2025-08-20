import { useQuery } from 'react-query';
import { api, API_ENDPOINTS } from '@/config/api';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import {
  Lead,
  PaginatedResponse,
  LeadFilters,
  EngagementStage,
  Company,
  Source,
} from './interface';

export function useLeadsQuery(filters: LeadFilters) {
  const { tenantId } = useAuthenticationStore();

  return useQuery({
    queryKey: ['leads', filters, tenantId],
    // Ensure the query refetches when any filter changes
    keepPreviousData: false,
    queryFn: async (): Promise<PaginatedResponse<Lead> | Lead[]> => {
      try {
        const token = await getCurrentToken();

        const response = await api.get(API_ENDPOINTS.leads, {
          params: filters,
          headers: {
            Authorization: `Bearer ${token}`,
            tenantId: tenantId,
          },
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 0, // Always refetch when filters change
    cacheTime: 5 * 60 * 1000, // 5 minutes - keep in cache for 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    enabled: !!tenantId, // Only run query if tenantId exists
  });
}

export function useLeadsWithNamesQuery(filters: LeadFilters) {
  const leadsResponse = useLeadsQuery(filters);

  if (leadsResponse.isLoading || leadsResponse.error) {
    return leadsResponse;
  }

  try {
    // Don't process the data, return the original response structure
    // This preserves the pagination metadata
    const result = {
      ...leadsResponse,
      // Keep the original data structure intact
      data: leadsResponse.data,
    };

    return result;
  } catch (error) {
    return leadsResponse;
  }
}

export function useEngagementStagesQuery() {
  const { tenantId } = useAuthenticationStore();

  return useQuery({
    queryKey: ['engagement-stages', tenantId],
    queryFn: async (): Promise<EngagementStage[]> => {
      try {
        const token = await getCurrentToken();
        const response = await api.get(API_ENDPOINTS.engagementStage, {
          headers: {
            Authorization: `Bearer ${token}`,
            tenantId: tenantId,
          },
        });
        const data = response.data;

        // Handle paginated response from backend
        if (data && data.data && Array.isArray(data.data)) {
          return data.data;
        }

        // Fallback for direct array response
        if (Array.isArray(data)) {
          return data;
        }

        // If no valid data structure found
        return [];
      } catch (error) {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - stages don't change often
    cacheTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!tenantId, // Only run query if tenantId exists
  });
}

export function useCompaniesQuery() {
  const { tenantId } = useAuthenticationStore();

  return useQuery({
    queryKey: ['companies', tenantId],
    queryFn: async (): Promise<Company[]> => {
      try {
        const token = await getCurrentToken();
        const response = await api.get(API_ENDPOINTS.companies, {
          headers: {
            Authorization: `Bearer ${token}`,
            tenantId: tenantId,
          },
        });
        const data = response.data;

        // Handle paginated response from backend
        if (data && data.data && Array.isArray(data.data)) {
          return data.data;
        }

        // Fallback for direct array response
        if (Array.isArray(data)) {
          return data;
        }

        // If no valid data structure found
        return [];
      } catch (error) {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - companies don't change often
    cacheTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!tenantId, // Only run query if tenantId exists
  });
}

export function useSourcesQuery() {
  const { tenantId } = useAuthenticationStore();

  return useQuery({
    queryKey: ['sources', tenantId],
    queryFn: async (): Promise<Source[]> => {
      try {
        const token = await getCurrentToken();
        const response = await api.get(API_ENDPOINTS.source, {
          headers: {
            Authorization: `Bearer ${token}`,
            tenantId: tenantId,
          },
        });

        const data = response.data;

        // Handle paginated response from backend
        if (data && data.data && Array.isArray(data.data)) {
          return data.data;
        }

        // Fallback for direct array response
        if (Array.isArray(data)) {
          return data;
        }

        // If no valid data structure found
        return [];
      } catch (error) {
        return [];
      }
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!tenantId, // Only run query if tenantId exists
  });
}
