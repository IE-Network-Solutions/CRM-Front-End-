export function getFrontendStageKey(backendStageName: string): string {
  const stageMapping: Record<string, string> = {
    'New Lead': 'new',
    'Qualified Lead': 'qualified',
    'Proposal Sent': 'proposal',
    Negotiation: 'negotiation',
    'Closed Won': 'closed',
    'Closed Lost': 'lost',
  };

  return stageMapping[backendStageName] || 'new';
}

export function getBackendStageName(frontendStageKey: string): string {
  const reverseMapping: Record<string, string> = {
    new: 'New Lead',
    qualified: 'Qualified Lead',
    proposal: 'Proposal Sent',
    negotiation: 'Negotiation',
    closed: 'Closed Won',
    lost: 'Closed Lost',
  };

  return reverseMapping[frontendStageKey] || 'New Lead';
}
