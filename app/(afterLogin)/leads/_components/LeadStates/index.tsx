'use client';

import { useState } from 'react';
import { Button, Dropdown, Spin } from 'antd';
import { ChevronDown } from 'lucide-react';
import { useUpdateLeadStageMutation } from '@/store/server/features/leads/mutation';
import { useEngagementStagesQuery } from '@/store/server/features/leads/queries';
import { getFrontendStageKey } from '@/store/server/features/leads/stageMapping';
import type { EngagementStage } from '@/store/server/features/leads/interface';

const STAGE_COLORS: Record<
  string,
  { base?: string; hover?: string; border: string; color: string }
> = {
  new: {
    border: '#f5a623', // orange
    color: '#f5a623',
  },
  qualified: {
    border: '#52c41a', // green
    color: '#52c41a',
  },
  lost: {
    border: '#ff4d4f', // red
    color: '#ff4d4f',
  },
  contacted: {
    border: '#1890ff', // blue
    color: '#1890ff',
  },
  'follow-up': {
    border: '#87ceeb', // light blue (sky blue)
    color: '#87ceeb',
  },
};

interface LeadStatesProps {
  leadId: string;
  currentStage: string | null;
  onStageChange?: (leadId: string, newStage: string) => void;
  'data-cy'?: string;
}

export function LeadStates({
  leadId,
  currentStage,
  onStageChange,
  'data-cy': dataCy,
}: LeadStatesProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: engagementStages = [] } = useEngagementStagesQuery();
  const updateLeadStageMutation = useUpdateLeadStageMutation();

  // Use the mutation's loading state
  const isUpdating = updateLeadStageMutation.isLoading;

  // Find the current stage object by ID
  const currentStageObj = engagementStages.find(
    (stage: EngagementStage) => stage.id === currentStage,
  );
  const currentStageName = currentStageObj?.name || 'New';
  const currentStageKey = currentStageObj
    ? getFrontendStageKey(currentStageObj.name)
    : 'new';
  const stageColors = STAGE_COLORS[currentStageKey] || STAGE_COLORS.new;

  const handleStageChange = async (newStage: string) => {
    if (newStage === currentStageKey) {
      return;
    }

    try {
      const backendStageId = engagementStages.find(
        (stage: EngagementStage) =>
          getFrontendStageKey(stage.name) === newStage,
      )?.id;

      if (backendStageId) {
        await updateLeadStageMutation.mutateAsync({
          leadId,
          stageId: backendStageId,
        });

        onStageChange?.(leadId, newStage);
      } else {
        // Backend stage not found - this should not happen in normal operation
        // The mutation will handle the error display
      }
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const stages: Array<{ value: string; label: string }> = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'lost', label: 'Lost' },
    { value: 'follow-up', label: 'Follow-up' },
  ];

  const menuItems = stages.map((stage) => ({
    key: stage.value,
    label: (
      <Button
        type="default"
        ghost
        size="small"
        style={{
          borderColor: STAGE_COLORS[stage.value].border,
          color: STAGE_COLORS[stage.value].color,
          background: 'transparent',
          width: '100%',
          marginBottom: 2, // Decreased margin between buttons
          fontWeight: 500,
          fontSize: '14px',
          padding: '14px 16px', // Increased vertical padding
          borderWidth: 2, // More intense border
          borderStyle: 'solid',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f3f4f6'; // Light gray on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.background = '#e5e7eb'; // Darker gray when clicked
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.background = '#f3f4f6'; // Back to hover state
        }}
        onClick={() => handleStageChange(stage.value)}
        data-cy={`stage-option-${stage.value}`}
      >
        {stage.label}
      </Button>
    ),
    onClick: () => {
      handleStageChange(stage.value);
    },
  }));

  return (
    <>
      {/* Global overlay when dropdown is open */}
      {dropdownOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.3)', // Light dark overlay
            zIndex: 1000, // Lower z-index so dropdown appears above
            pointerEvents: 'none', // Allow clicks to pass through
          }}
        />
      )}

      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        placement="bottomLeft"
        disabled={isUpdating}
        onOpenChange={(open) => {
          setDropdownOpen(open);
        }}
        overlayStyle={{ zIndex: 1001 }} // Higher z-index than overlay
      >
        <Button
          type="default"
          ghost
          size="small"
          style={{
            borderColor: stageColors.border,
            color: stageColors.color,
            background: 'transparent',
            fontWeight: 500,
            fontSize: '14px',
            padding: '14px 8px', // Decreased horizontal padding, vertical remains
            borderWidth: 2, // More intense border
            borderStyle: 'solid',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6'; // Light gray on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.background = '#e5e7eb'; // Darker gray when clicked
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.background = '#f3f4f6'; // Back to hover state
          }}
          disabled={isUpdating}
          icon={
            isUpdating ? (
              <Spin size="small" />
            ) : (
              <ChevronDown className="ml-1 h-3 w-3" />
            )
          }
          onClick={() => {}} // Empty click handler to prevent dropdown from closing
          data-cy={dataCy || `lead-stage-button-${leadId}`}
        >
          {isUpdating ? 'Updating...' : currentStageName}
        </Button>
      </Dropdown>
    </>
  );
}
