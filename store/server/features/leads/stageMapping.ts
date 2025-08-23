export function getFrontendStageKey(backendStageName: string): string {
  const stageMapping: Record<string, string> = {
    New: 'new',
    Qualified: 'qualified',
    Lost: 'lost',
    Contacted: 'contacted',
    'Follow Up': 'follow-up',
    'Follow-up': 'follow-up', // Handle both variations
    'Follow up': 'follow-up', // Handle both variations
  };

  return stageMapping[backendStageName] || 'new';
}

export function getBackendStageName(frontendStageKey: string): string {
  const reverseMapping: Record<string, string> = {
    new: 'New',
    qualified: 'Qualified',
    lost: 'Lost',
    contacted: 'Contacted',
    'follow-up': 'Follow Up',
  };

  return reverseMapping[frontendStageKey] || 'New';
}
