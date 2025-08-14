"use client"

import { useState } from "react"
import { Button, Dropdown } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { useUpdateLeadStageMutation } from "@/store/server/features/leads/mutation"
import { useEngagementStagesQuery } from "@/store/server/features/leads/queries"
import { getFrontendStageKey } from "@/store/server/features/leads/stageMapping"

const STAGE_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  qualified: "bg-green-100 text-green-800",
  proposal: "bg-yellow-100 text-yellow-800",
  negotiation: "bg-orange-100 text-orange-800",
  closed: "bg-gray-100 text-gray-800",
  lost: "bg-red-100 text-red-800",
}

const STAGE_OPTIONS = [
  { label: "New", value: "new" },
  { label: "Qualified", value: "qualified" },
  { label: "Proposal", value: "proposal" },
  { label: "Negotiation", value: "negotiation" },
  { label: "Closed", value: "closed" },
  { label: "Lost", value: "lost" },
]

interface LeadStatesProps {
  leadId: number
  currentStage: string | null
}

export function LeadStates({ leadId, currentStage }: LeadStatesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: engagementStages = [] } = useEngagementStagesQuery()
  const updateLeadStageMutation = useUpdateLeadStageMutation()

  const handleStageChange = async (newStage: string) => {
    try {
      const backendStageId = engagementStages.find(
        (stage) => getFrontendStageKey(stage.name) === newStage
      )?.id

      if (backendStageId) {
        await updateLeadStageMutation.mutateAsync({
          leadId,
          stageId: backendStageId,
        })
        setIsOpen(false)
      }
    } catch (error) {
      // Failed to update lead stage
    }
  }

  const currentStageKey = currentStage ? getFrontendStageKey(currentStage) : "new"
  const stageColor = STAGE_COLORS[currentStageKey] || STAGE_COLORS.new

  const items = STAGE_OPTIONS.map((option) => ({
    key: option.value,
    label: option.label,
    onClick: () => handleStageChange(option.value),
  }))

  return (
    <div className="relative" data-cy={`lead-stage-${leadId}`}>
      <Dropdown
        menu={{ items }}
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={["click"]}
        placement="bottomLeft"
      >
        <Button
          className={`${stageColor} border-0 hover:opacity-80 font-medium`}
          size="small"
          onClick={() => setIsOpen(!isOpen)}
          data-cy={`lead-stage-button-${leadId}`}
        >
          <span data-cy={`lead-stage-text-${leadId}`}>
            {STAGE_OPTIONS.find((opt) => opt.value === currentStageKey)?.label || "New"}
          </span>
          <DownOutlined className="ml-1" />
        </Button>
      </Dropdown>

      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
          data-cy={`lead-stage-backdrop-${leadId}`}
        />
      )}

      {isOpen && (
        <div
          className="absolute z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px]"
          data-cy={`lead-stage-dropdown-${leadId}`}
        >
          {STAGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                option.value === currentStageKey ? "bg-blue-50 text-blue-700" : ""
              }`}
              onClick={() => handleStageChange(option.value)}
              data-cy={`lead-stage-option-${leadId}-${option.value}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

