// This file now contains only the options that are not fetched from the API
// Dynamic options are fetched using the queries in store/server/features/leads/

export const ownerOptions = [
  { value: 'robel_debebe', label: 'Robel Debebe' },
  { value: 'jane_doe', label: 'Jane Doe' },
  { value: 'john_smith', label: 'John Smith' },
  { value: 'emily_white', label: 'Emily White' },
  { value: '16c44cfd-c440-4550-9b8c-fed38e8c03ad', label: 'Jane Doe' },
];

export const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'JPY', label: 'JPY' },
];

// Note: The following options are now fetched dynamically from the API:
// - companyOptions (from /companies endpoint)
// - sourceOptions (from /source endpoint)
// - stageOptions (from /engagement-stage endpoint)
// - supplierOptions (from /suppliers endpoint)
// - solutionOptions (from /solution endpoint)
// - leadTypeOptions (from /lead-types endpoint)
// - leadDocumentOptions (from /lead-documents endpoint)
// - leadParticipantOptions (from /lead-participants endpoint)
// - sectorOptions (from /sectors endpoint)
// - roleOptions (from /roles endpoint)
