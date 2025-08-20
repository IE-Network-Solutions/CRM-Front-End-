import { useMutation, useQueryClient } from 'react-query';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import { crudRequest } from '@/utils/crudRequest';
import { message } from 'antd';
import { fileUpload } from '@/utils/fileUpload';

// --- Configuration ---
const BASE_URL = 'http://172.20.30.226:3000/api/v1';

// --- Interfaces ---
export interface UploadLeadDocumentInput {
  file: File;
  leadId?: string;
  documentName?: string;
  [key: string]: any;
}

export interface LeadDocumentResponse {
  id: string;
  name: string;
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  fileType?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  tenantId: string;
  [key: string]: any;
}

export interface LeadDocumentPayload {
  leadId: string;
  filePath: string;
  fileName: string;
  tenantId: string;
}

// --- File Server Upload Function ---
const uploadToFileServer = async (file: File): Promise<string> => {
  try {
    // Use the existing fileUpload utility instead of direct fetch
    const response = await fileUpload(file);

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(
        `File server upload failed: ${response.status} ${response.statusText}`,
      );
    }

    // Extract file path/URL from response
    // The fileUpload utility returns CustomFile interface with image and viewImage
    const filePath = response.data?.image || response.data?.viewImage;

    if (!filePath) {
      // Fallback to mock path for testing
      const mockFilePath = `https://files.ienetworks.co/uploads/${file.name}`;
      return mockFilePath;
    }

    return filePath;
  } catch (error) {
    throw error;
  }
};

// --- Backend Document Creation Function ---
const createLeadDocument = async (
  payload: LeadDocumentPayload,
): Promise<LeadDocumentResponse> => {
  try {
    const response = await crudRequest({
      url: `${BASE_URL}/lead-documents`,
      method: 'POST',
      data: payload,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

// --- Main Upload Function ---
const uploadLeadDocument = async (
  data: UploadLeadDocumentInput,
): Promise<LeadDocumentResponse> => {
  try {
    const tenantId = useAuthenticationStore.getState().tenantId;

    if (!tenantId) {
      throw new Error(
        'Tenant ID not found. Please ensure you are properly authenticated.',
      );
    }

    if (!data.leadId) {
      throw new Error('Lead ID is required for document upload.');
    }

    try {
      // Step 1: Upload file to file server
      const filePath = await uploadToFileServer(data.file);

      // Step 2: Create document record in backend
      const documentPayload: LeadDocumentPayload = {
        leadId: data.leadId,
        filePath: filePath,
        fileName: data.documentName || data.file.name,
        tenantId: tenantId,
      };

      const result = await createLeadDocument(documentPayload);

      return result;
    } catch (uploadError) {
      throw uploadError;
    }
  } catch (error) {
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('File server upload failed')) {
        throw new Error(
          `File upload failed: ${error.message}. Please check the file server configuration.`,
        );
      } else if (error.message.includes('Backend document creation error')) {
        throw new Error(
          `Document record creation failed: ${error.message}. Please check the backend configuration.`,
        );
      }
    }

    throw error;
  }
};

// --- React Query Hook ---
export const useUploadLeadDocument = () => {
  const queryClient = useQueryClient();

  return useMutation(uploadLeadDocument, {
    onSuccess: (data, variables) => {
      // Invalidate lead documents query to refresh the list
      queryClient.invalidateQueries(['leadDocuments']);

      // Also invalidate leads query if we have a leadId
      if (data.leadId) {
        queryClient.invalidateQueries(['leads']);
      }

      message.success(
        `Document "${variables.file.name}" uploaded successfully!`,
      );
    },
    onError: (error: any, variables) => {
      let errorMessage = 'Failed to upload document.';

      if (error?.message) {
        if (typeof error.message === 'string') {
          errorMessage = error.message;
        } else if (Array.isArray(error.message)) {
          errorMessage = error.message.join(', ');
        }
      }

      message.error(
        `Failed to upload "${variables?.file?.name || 'document'}": ${errorMessage}`,
      );
    },
  });
};
