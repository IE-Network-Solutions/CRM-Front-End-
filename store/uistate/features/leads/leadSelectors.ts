import { create } from "zustand"
import { Lead } from "@/store/server/features/leads/interface"

interface LeadSelectors {
  // Basic Selectors
  getSelectedLeads: (leads: Lead[]) => Lead[]
  getLeadById: (leads: Lead[], id: number) => Lead | undefined
  
  // Filter Selectors
  getLeadsByStage: (leads: Lead[], stageName: string) => Lead[]
  getLeadsByCompany: (leads: Lead[], companyId: number) => Lead[]
  getLeadsBySource: (leads: Lead[], sourceId: number) => Lead[]
  getLeadsBySearchTerm: (leads: Lead[], searchTerm: string) => Lead[]
  
  // Computed Selectors
  getLeadsCount: (leads: Lead[]) => number
  getLeadsByStageCount: (leads: Lead[]) => Record<string, number>
  getLeadsByCompanyCount: (leads: Lead[]) => Record<string, number>
  getLeadsBySourceCount: (leads: Lead[]) => Record<string, number>
  
  // Pagination Selectors
  getPaginatedLeads: (leads: Lead[], page: number, pageSize: number) => Lead[]
  getTotalPages: (leads: Lead[], pageSize: number) => number
  
  // Sort Selectors
  getSortedLeads: (leads: Lead[], sortBy: keyof Lead, sortOrder: 'asc' | 'desc') => Lead[]
  
  // Statistics Selectors
  getLeadStatistics: (leads: Lead[]) => {
    total: number
    byStage: Record<string, number>
    byCompany: Record<string, number>
    bySource: Record<string, number>
    recentLeads: Lead[]
    conversionRate: number
  }
  
  // Export Selectors
  getExportData: (leads: Lead[]) => any[]
}

export const useLeadSelectors = create<LeadSelectors>((set, get) => ({
  // Basic Selectors
  getSelectedLeads: (leads: Lead[]) => {
    return leads.filter(lead => lead.id !== undefined)
  },

  getLeadById: (leads: Lead[], id: number) => {
    return leads.find(lead => lead.id === id)
  },

  // Filter Selectors
  getLeadsByStage: (leads: Lead[], stageName: string) => {
    return leads.filter(lead => lead.stageName === stageName)
  },

  getLeadsByCompany: (leads: Lead[], companyId: number) => {
    return leads.filter(lead => lead.companyId === companyId)
  },

  getLeadsBySource: (leads: Lead[], sourceId: number) => {
    return leads.filter(lead => lead.sourceId === sourceId)
  },

  getLeadsBySearchTerm: (leads: Lead[], searchTerm: string) => {
    if (!searchTerm.trim()) return leads
    
    const term = searchTerm.toLowerCase()
    return leads.filter(lead => 
      lead.name.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      (lead.phone && lead.phone.includes(term)) ||
      (lead.companyName && lead.companyName.toLowerCase().includes(term)) ||
      (lead.sourceName && lead.sourceName.toLowerCase().includes(term))
    )
  },

  // Computed Selectors
  getLeadsCount: (leads: Lead[]) => {
    return leads.length
  },

  getLeadsByStageCount: (leads: Lead[]) => {
    const counts: Record<string, number> = {}
    leads.forEach(lead => {
      const stage = lead.stageName || 'Unknown'
      counts[stage] = (counts[stage] || 0) + 1
    })
    return counts
  },

  getLeadsByCompanyCount: (leads: Lead[]) => {
    const counts: Record<string, number> = {}
    leads.forEach(lead => {
      const company = lead.companyName || 'Unknown'
      counts[company] = (counts[company] || 0) + 1
    })
    return counts
  },

  getLeadsBySourceCount: (leads: Lead[]) => {
    const counts: Record<string, number> = {}
    leads.forEach(lead => {
      const source = lead.sourceName || 'Unknown'
      counts[source] = (counts[source] || 0) + 1
    })
    return counts
  },

  // Pagination Selectors
  getPaginatedLeads: (leads: Lead[], page: number, pageSize: number) => {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return leads.slice(startIndex, endIndex)
  },

  getTotalPages: (leads: Lead[], pageSize: number) => {
    return Math.ceil(leads.length / pageSize)
  },

  // Sort Selectors
  getSortedLeads: (leads: Lead[], sortBy: keyof Lead, sortOrder: 'asc' | 'desc') => {
    return [...leads].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      
      if (aValue === undefined && bValue === undefined) return 0
      if (aValue === undefined) return sortOrder === 'asc' ? -1 : 1
      if (bValue === undefined) return sortOrder === 'asc' ? 1 : -1
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })
  },

  // Statistics Selectors
  getLeadStatistics: (leads: Lead[]) => {
    const byStage = get().getLeadsByStageCount(leads)
    const byCompany = get().getLeadsByCompanyCount(leads)
    const bySource = get().getLeadsBySourceCount(leads)
    
    // Get recent leads (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentLeads = leads.filter(lead => 
      new Date(lead.createdAt) >= thirtyDaysAgo
    )
    
    // Calculate conversion rate (closed leads / total leads)
    const totalLeads = leads.length
    const closedLeads = leads.filter(lead => 
      lead.stageName === 'Closed Won' || lead.stageName === 'Closed Lost'
    ).length
    
    const conversionRate = totalLeads > 0 ? (closedLeads / totalLeads) * 100 : 0
    
    return {
      total: totalLeads,
      byStage,
      byCompany,
      bySource,
      recentLeads,
      conversionRate: Math.round(conversionRate * 100) / 100
    }
  },

  // Export Selectors
  getExportData: (leads: Lead[]) => {
    return leads.map(lead => ({
      ID: lead.id,
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone || 'N/A',
      Company: lead.companyName || 'N/A',
      Source: lead.sourceName || 'N/A',
      Stage: lead.stageName || 'N/A',
      'Created Date': new Date(lead.createdAt).toLocaleDateString(),
      'Last Updated': new Date(lead.updatedAt).toLocaleDateString(),
    }))
  },
}))

