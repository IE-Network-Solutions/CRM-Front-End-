export interface Lead {
  id: number
  name: string
  email: string
  phone?: string
  companyId?: number
  companyName?: string | null
  sourceId?: number
  sourceName?: string | null
  stageId?: number
  stageName?: string | null
  createdAt: string
  updatedAt: string
}

export interface PaginationMeta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface LeadFilters {
  search?: string
  page?: number
  limit?: number
  companyId?: number
  sourceId?: number
  stageId?: number
}

export interface EngagementStage {
  id: number
  name: string
  description?: string
}

export interface Company {
  id: number
  name: string
  industry?: string
}

export interface Source {
  id: number
  name: string
  description?: string
}

export interface CreateLeadRequest {
  name: string
  email: string
  phone?: string
  companyId?: number
  sourceId?: number
  stageId?: number
}

export interface UpdateLeadStageRequest {
  leadId: number
  stageId: number
}

