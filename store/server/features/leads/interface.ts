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
  sourceId?: string | null;
  sectorId?: string | null;
  leadTypeId?: string | null;
  engagementStageId?: string | null;
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
  search?: string;
  page?: number;
  limit?: number;
  companyId?: string;
  sourceId?: string;
  stageId?: string;
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
  sourceId?: string;
  stageId?: string;
}

export interface UpdateLeadStageRequest {
  leadId: string;
  stageId: string;
}
