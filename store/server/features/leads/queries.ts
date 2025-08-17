import { useQuery } from 'react-query';
import { api } from '@/config/api';
import {
  Lead,
  PaginatedResponse,
  LeadFilters,
  EngagementStage,
  Company,
  Source,
} from './interface';

export function useLeadsQuery(filters: LeadFilters) {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: async (): Promise<PaginatedResponse<Lead> | Lead[]> => {
      try {
        const response = await api.get('/leads', { params: filters });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 30 * 1000, // 30 seconds - data is fresh for 30 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes - keep in cache for 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}

export function useLeadsWithNamesQuery(filters: LeadFilters) {
  const leadsResponse = useLeadsQuery(filters);

  if (leadsResponse.isLoading || leadsResponse.error) {
    return leadsResponse;
  }

  try {
    let leads: Lead[] = [];
    let pagination = null;
    let isPaginated = false;

    if (leadsResponse.data) {
      if (Array.isArray(leadsResponse.data)) {
        leads = leadsResponse.data;
        isPaginated = false;
      } else {
        leads = (leadsResponse.data as PaginatedResponse<Lead>).data;
        // Check for both 'meta' and 'pagination' properties
        pagination =
          (leadsResponse.data as any).meta ||
          (leadsResponse.data as any).pagination;
        isPaginated = true;
      }
    }

    const result = {
      ...leadsResponse,
      data: leads,
      pagination,
      isPaginated,
    };

    return result;
  } catch (error) {
    return {
      ...leadsResponse,
      data: [],
      pagination: null,
      isPaginated: false,
    };
  }
}

export function useEngagementStagesQuery() {
  return useQuery({
    queryKey: ['engagement-stages'],
    queryFn: async (): Promise<EngagementStage[]> => {
      try {
        const response = await api.get('/engagement-stage');
        const data = response.data;

        if (Array.isArray(data)) {
          return data;
        }

        // Expected array for engagement stages
        return [];
      } catch (error) {
        // Failed to fetch engagement stages
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - stages don't change often
    cacheTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
}

export function useCompaniesQuery() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async (): Promise<Company[]> => {
      try {
        const response = await api.get('/companies');
        const data = response.data;

        if (Array.isArray(data)) {
          return data;
        }

        // Expected array for companies
        return [];
      } catch (error) {
        // Failed to fetch companies
        return [];
      }
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useSourcesQuery() {
  return useQuery({
    queryKey: ['sources'],
    queryFn: async (): Promise<Source[]> => {
      try {
        const response = await api.get('/source');
        const data = response.data;

        if (Array.isArray(data)) {
          return data;
        }

        // Expected array for sources
        return [];
      } catch (error) {
        // Failed to fetch sources
        return [];
      }
    },
    staleTime: 10 * 60 * 1000,
  });
}
