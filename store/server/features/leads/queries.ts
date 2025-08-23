import { useQuery } from 'react-query';
import { api, API_ENDPOINTS } from '@/config/api';
import { getCurrentToken } from '@/utils/getCurrentToken';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { TENANT_MGMT_URL } from '@/utils/constants';
import {
  Lead,
  PaginatedResponse,
  LeadFilters,
  EngagementStage,
  Company,
  Source,
} from './interface';
import { useMemo } from 'react';
import axios from 'axios';

export function useLeadsQuery(filters: LeadFilters) {
  const { tenantId } = useAuthenticationStore();

  // Create a stable query key that changes when filters change
  const queryKey = useMemo(() => {
    // Sort filter keys to ensure consistent query key
    const sortedFilters = Object.keys(filters)
      .sort()
      .reduce((acc, key) => {
        if (filters[key as keyof LeadFilters] !== undefined) {
          acc[key] = filters[key as keyof LeadFilters];
        }
        return acc;
      }, {} as any);

    return ['leads', sortedFilters, tenantId];
  }, [filters, tenantId]);

  // Check if this is a search query
  const isSearchQuery = !!filters.searchTerm;

  return useQuery({
    queryKey,
    keepPreviousData: !isSearchQuery, // Don't keep previous data for search queries
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
      } catch (error: any) {
        // Enhanced error handling
        if (error.response?.status === 204) {
          // 204 No Content means the request was successful but no data found

          return {
            data: [],
            pagination: {
              totalItems: 0,
              currentPage: 1,
              itemsPerPage: 10,
              totalPages: 0,
            },
          };
        } else if (error.response?.status === 404) {
          throw new Error('No leads found matching your search criteria');
        } else if (error.response?.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        } else if (error.response?.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(
            error.response?.data?.message || 'Failed to fetch leads',
          );
        }
      }
    },
    staleTime: isSearchQuery ? 0 : 5 * 60 * 1000, // No cache for search queries
    cacheTime: isSearchQuery ? 2 * 60 * 1000 : 5 * 60 * 1000, // Shorter cache for search
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors
      if (error.response?.status >= 400 && error.response?.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
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

// New query functions for FilterModal - following the same pattern
export function useJobsQuery() {
  const { tenantId } = useAuthenticationStore();

  return useQuery({
    queryKey: ['jobs', tenantId],
    queryFn: async (): Promise<Array<{ id: string; name: string }>> => {
      try {
        const token = await getCurrentToken();
        const response = await api.get('/jobs', {
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!tenantId, // Only run query if tenantId exists
  });
}

export function useSectorsQuery() {
  const { tenantId } = useAuthenticationStore();

  return useQuery({
    queryKey: ['sectors', tenantId],
    queryFn: async (): Promise<Array<{ id: string; name: string }>> => {
      try {
        const token = await getCurrentToken();
        const response = await api.get('/sectors', {
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
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!tenantId, // Only run query if tenantId exists
  });
}

export function useCurrenciesQuery() {
  const { tenantId } = useAuthenticationStore();

  return useQuery({
    queryKey: ['currencies', tenantId],
    queryFn: async (): Promise<
      Array<{
        id: string;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
      }>
    > => {
      try {
        const token = await getCurrentToken();

        // Try to fetch from main CRM API first
        try {
          const response = await api.get(API_ENDPOINTS.currencies, {
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

          // If no valid data structure found, return empty array
          return [];
        } catch (crmError: any) {
          // If CRM API fails, try the tenant management service as fallback
          if (TENANT_MGMT_URL) {
            try {
              const response = await axios.get(
                `${TENANT_MGMT_URL}/subscription/rest/currencies/all`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    tenantId: tenantId,
                  },
                },
              );

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
            } catch (tenantError: any) {
              // Both CRM API and tenant management service failed
              return [];
            }
          }

          return [];
        }
      } catch (error) {
        return [];
      }
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!tenantId, // Only run query if tenantId exists
  });
}
