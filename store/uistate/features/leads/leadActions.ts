import { create } from 'zustand';
import {
  Lead,
  CreateLeadRequest,
  UpdateLeadStageRequest,
} from '@/store/server/features/leads/interface';
import { api } from '@/config/api';

interface LeadActions {
  // Lead CRUD Actions
  createLead: (leadData: CreateLeadRequest) => Promise<Lead | null>;
  updateLead: (leadId: number, leadData: Partial<Lead>) => Promise<Lead | null>;
  deleteLead: (leadId: number) => Promise<boolean>;

  // Lead Stage Actions
  updateLeadStage: (data: UpdateLeadStageRequest) => Promise<boolean>;

  // Bulk Actions
  deleteMultipleLeads: (leadIds: number[]) => Promise<boolean>;
  updateMultipleLeadStages: (
    leadIds: number[],
    stageId: number,
  ) => Promise<boolean>;

  // Search and Filter Actions
  searchLeads: (searchTerm: string) => Promise<Lead[]>;
  filterLeads: (filters: any) => Promise<Lead[]>;

  // Export Actions
  exportLeads: (format: 'csv' | 'excel') => Promise<void>;

  // Loading States
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLeadActions = create<LeadActions>((set) => ({
  // Lead CRUD Actions
  createLead: async (leadData: CreateLeadRequest) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post('/leads', leadData);
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to create lead';
      set({ loading: false, error: errorMessage });
      return null;
    }
  },

  updateLead: async (leadId: number, leadData: Partial<Lead>) => {
    try {
      set({ loading: true, error: null });
      const response = await api.put(`/leads/${leadId}`, leadData);
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update lead';
      set({ loading: false, error: errorMessage });
      return null;
    }
  },

  deleteLead: async (leadId: number) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/leads/${leadId}`);
      set({ loading: false });
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to delete lead';
      set({ loading: false, error: errorMessage });
      return false;
    }
  },

  // Lead Stage Actions
  updateLeadStage: async (data: UpdateLeadStageRequest) => {
    try {
      set({ loading: true, error: null });
      await api.patch(`/leads/${data.leadId}/stage`, {
        stageId: data.stageId,
      });
      set({ loading: false });
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update lead stage';
      set({ loading: false, error: errorMessage });
      return false;
    }
  },

  // Bulk Actions
  deleteMultipleLeads: async (leadIds: number[]) => {
    try {
      set({ loading: true, error: null });
      await api.post('/leads/bulk-delete', { leadIds });
      set({ loading: false });
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to delete leads';
      set({ loading: false, error: errorMessage });
      return false;
    }
  },

  updateMultipleLeadStages: async (leadIds: number[], stageId: number) => {
    try {
      set({ loading: true, error: null });
      await api.post('/leads/bulk-update-stage', { leadIds, stageId });
      set({ loading: false });
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update lead stages';
      set({ loading: false, error: errorMessage });
      return false;
    }
  },

  // Search and Filter Actions
  searchLeads: async (searchTerm: string) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get('/leads', {
        params: { search: searchTerm },
      });
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to search leads';
      set({ loading: false, error: errorMessage });
      return [];
    }
  },

  filterLeads: async (filters: any) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get('/leads', { params: filters });
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to filter leads';
      set({ loading: false, error: errorMessage });
      return [];
    }
  },

  // Export Actions
  exportLeads: async (format: 'csv' | 'excel') => {
    try {
      set({ loading: true, error: null });
      const response = await api.get('/leads/export', {
        params: { format },
        responseType: 'blob',
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      set({ loading: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to export leads';
      set({ loading: false, error: errorMessage });
    }
  },

  // Loading States
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
