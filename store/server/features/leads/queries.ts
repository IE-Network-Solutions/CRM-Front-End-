import { useQuery } from "@tanstack/react-query"
import { api } from "@/config/api"
import { Lead, PaginatedResponse, LeadFilters, EngagementStage, Company, Source } from "./interface"

export function useLeadsQuery(filters: LeadFilters) {
  return useQuery({
    queryKey: ["leads", filters],
    queryFn: async (): Promise<PaginatedResponse<Lead> | Lead[]> => {
      try {
        const response = await api.get("/leads", { params: filters })
        return response.data
      } catch (error) {
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useLeadsWithNamesQuery(filters: LeadFilters) {
  const leadsResponse = useLeadsQuery(filters)
  
  if (leadsResponse.isLoading || leadsResponse.error) {
    return leadsResponse
  }

  try {
    let leads: Lead[] = []
    let pagination = null
    let isPaginated = false

    if (leadsResponse.data) {
      if (Array.isArray(leadsResponse.data)) {
        leads = leadsResponse.data
        isPaginated = false
      } else {
        leads = (leadsResponse.data as PaginatedResponse<Lead>).data
        pagination = (leadsResponse.data as PaginatedResponse<Lead>).meta
        isPaginated = true
      }
    }

    return {
      ...leadsResponse,
      data: leads,
      pagination,
      isPaginated,
    }
      } catch (error) {
      return {
      ...leadsResponse,
      data: [],
      pagination: null,
      isPaginated: false,
    }
  }
}

export function useEngagementStagesQuery() {
  return useQuery({
    queryKey: ["engagement-stages"],
    queryFn: async (): Promise<EngagementStage[]> => {
      try {
        const response = await api.get("/engagement-stages")
        const data = response.data
        
        if (Array.isArray(data)) {
          return data
        }
        
        // Expected array for engagement stages
        return []
      } catch (error) {
        // Failed to fetch engagement stages
        return []
      }
    },
    staleTime: 10 * 60 * 1000,
  })
}

export function useCompaniesQuery() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async (): Promise<Company[]> => {
      try {
        const response = await api.get("/companies")
        const data = response.data
        
        if (Array.isArray(data)) {
          return data
        }
        
        // Expected array for companies
        return []
      } catch (error) {
        // Failed to fetch companies
        return []
      }
    },
    staleTime: 10 * 60 * 1000,
  })
}

export function useSourcesQuery() {
  return useQuery({
    queryKey: ["sources"],
    queryFn: async (): Promise<Source[]> => {
      try {
        const response = await api.get("/sources")
        const data = response.data
        
        if (Array.isArray(data)) {
          return data
        }
        
        // Expected array for sources
        return []
      } catch (error) {
        // Failed to fetch sources
        return []
      }
    },
    staleTime: 10 * 60 * 1000,
  })
}

