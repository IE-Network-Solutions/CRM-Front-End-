import axios from 'axios';

// Use real backend by default, mock API only if explicitly enabled
export const API_BASE_URL =
  process.env.USE_MOCK_API === 'true'
    ? '/api/v1' // Local mock API (only if explicitly enabled)
    : process.env.NEXT_PUBLIC_API_URL || 'http://172.20.30.226:3000/api/v1';

export const API_ENDPOINTS = {
  leads: '/leads',
  companies: '/companies',
  suppliers: '/suppliers',
  source: '/source',
  solution: '/solution',
  engagementStage: '/engagement-stage',
} as const;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
