# Backend Integration for Leads Table

## Overview
This document describes the backend integration for the leads table, which fetches data from the backend API and displays it in the existing UI without affecting the visual appearance or functionality.

## Configuration

### Backend URL
- **Base URL**: `http://172.20.30.226:3000/api/v1`
- **Environment Variable**: `NEXT_PUBLIC_API_URL` (falls back to the above URL if not set)

### Available Endpoints
- `/leads` - Fetch all leads
- `/companies` - Fetch company lookup data
- `/suppliers` - Fetch supplier lookup data
- `/source` - Fetch lead source lookup data
- `/solution` - Fetch solution lookup data
- `/engagement-stage` - Fetch engagement stage lookup data

## Data Structure

### Lead Object
The backend returns leads with the following structure:
```typescript
{
  id: string
  contactPersonFName: string | null
  contactPersonLName: string | null
  contactPersonEmail: string | null
  contactPersonPhoneNumber: string | null
  companyId: string | null
  sourceId: string | null
  engagementStageId: string | null
  // ... other fields
}
```

### ID Resolution
The frontend automatically resolves IDs to readable names:
- **Company IDs** → Company names (e.g., "doni")
- **Source IDs** → Source names (e.g., "Trade Show")
- **Stage IDs** → Stage names (e.g., "Initial Contact" → "New")

**Note**: "Initial Contact" stages from the backend are automatically mapped to "New" for consistent UI experience.

## Implementation Details

### Data Fetching
- Uses React Query for efficient data fetching and caching
- Fetches leads, companies, sources, and engagement stages separately
- Combines data on the frontend to resolve IDs to names

### UI Preservation
- All existing UI elements remain unchanged
- "Create Leads" button preserved for future development
- Clickable lead names maintained
- Lead stage dropdown with full styling preserved
- Search and filtering functionality intact

### Stage Mapping
The following stage mapping is applied:
- `"Initial Contact"` (backend) → `"New"` (UI)
- All other stages display as-is

## Current Status
✅ **Read-only data fetching implemented**
✅ **ID resolution working**
✅ **UI completely preserved**
✅ **Stage mapping implemented**
🔄 **Ready for future CRUD operations**

## Troubleshooting

### Common Issues
1. **"N/A" values**: These appear when the backend has `null` values for companyId, sourceId, or engagementStageId
2. **Stage display**: "Initial Contact" stages automatically show as "New" in the UI
3. **Data loading**: Check browser console for detailed API call logs

### Debug Information
The system provides extensive logging:
- API call URLs and responses
- Data resolution steps
- Error details with status codes
- Lookup data counts and mappings

## Future Enhancements
When ready to implement mutations:
1. Add create, update, delete mutations
2. Implement optimistic updates
3. Add real-time stage change functionality
4. Integrate with existing UI components
