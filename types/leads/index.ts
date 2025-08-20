export interface Lead {
  id?: string;
  firstname: string;
  lastname: string;
  company: string;
  position?: string;
  revenue: number;
  currency?: string;
  sector: string;
  source: string;
  owner?: string;
  type: string;
  createdDate: string;
  solution?: string;
  supplier?: string;
  email: string;
  phone: string;
  website?: string;
  city: string;
  state: string;
  zipcode: string;
  stage: string;
  description?: string;
  rating?: number;
  customFields?: CustomField[];
  roles?: LeadRole[];
  files?: File[];
}

export interface CustomField {
  key: string;
  label: string;
  value: string;
}

export interface LeadRole {
  roleName: string;
  assignee: string;
}

export interface CreateLeadRequest {
  firstname: string;
  lastname: string;
  company: string;
  position?: string;
  revenue: number;
  currency?: string;
  sector: string;
  source: string;
  owner?: string;
  type: string;
  createdDate: string;
  solution?: string;
  supplier?: string;
  email: string;
  phone: string;
  website?: string;
  city: string;
  state: string;
  zipcode: string;
  stage: string;
  description?: string;
  rating?: number;
  customFields?: CustomField[];
  roles?: LeadRole[];
}

export interface LeadStage {
  value: string;
  label: string;
  color?: string;
}

export interface LeadSource {
  value: string;
  label: string;
}

export interface LeadType {
  value: string;
  label: string;
}

export interface Sector {
  value: string;
  label: string;
}

export interface Solution {
  value: string;
  label: string;
}

export interface Supplier {
  value: string;
  label: string;
}

export interface Currency {
  value: string;
  label: string;
}
