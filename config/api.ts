import axios from 'axios';
import { CRM_URL, CRM_ENDPOINTS } from '@/utils/constants';

// Real backend API configuration - CRM_URL already has fallback in constants
export const API_BASE_URL = CRM_URL;

export const API_ENDPOINTS = CRM_ENDPOINTS;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, 
  headers: {
    'Content-Type': 'application/json',
  },
});
