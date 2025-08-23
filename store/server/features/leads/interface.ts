export interface Lead {
  id: string;
  name: string;
  contactPersonFName: string;
  contactPersonLName: string;
  contactPersonPosition: string;
  contactPersonEmail: string;
  contactPersonPhoneNumber: string;
  companyId?: string | null;
  supplierId?: string | null;
  source?: string | null; // Changed from sourceId to match backend DTO
  sectorId?: string | null;
  leadTypeId?: string | null;
  engagementStageId?: string | null; // Changed back to engagementStageId to match backend
  leadOwner?: string | null;
  tenantId?: string | null;
  additionalInformation?: string;
  leadRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta; // Changed from 'meta' to 'pagination' to match backend
}

export interface LeadFilters {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  companyId?: string;
  sectorId?: string;
  source?: string; // Changed from sourceId to match backend DTO
  engagementStageId?: string; // Changed back to engagementStageId to match backend
  revenue?: number;
  currency?: string;
  leadRate?: number;
  contactPersonEmail?: string;
  contactPersonPhoneNumber?: string;
}

export interface EngagementStage {
  id: string;
  name: string;
  description?: string;
  isLead?: boolean;
  isDeal?: boolean;
  level?: number;
  colorCode?: string;
  tenantId?: string | null;
}

export interface Company {
  id: string;
  name: string;
  industry?: string;
}

export interface Source {
  id: string;
  name: string;
  description?: string;
}

export interface CreateLeadRequest {
  name: string;
  email: string;
  phone?: string;
  companyId?: string;
  source?: string; // Changed from sourceId to match backend DTO
  engagementStageId?: string; // Changed back to engagementStageId to match backend
}

export interface UpdateLeadStageRequest {
  leadId: string;
  stageId: string; // Changed back to stageId to match the mutation code
}
