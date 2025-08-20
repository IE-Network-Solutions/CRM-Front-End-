'use client';
import React, { useState } from 'react';
import {
  PlusOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  DragOutlined,
} from '@ant-design/icons';
import { GrFormEdit } from 'react-icons/gr';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd';
const { Text } = Typography;
import { useRouter } from 'next/navigation';
import { IoCallOutline, IoMailOutline } from 'react-icons/io5';

interface Deal {
  id: string;
  title: string;
  amount: string;
  currency: string;
  date: string;
  assignee: string;
  stage: string;
}

interface Stage {
  id: string;
  title: string;
  total: string;
  currency: string;
  deals: Deal[];
  color?: string;
}

interface KanbanBoardProps {
  onClick: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ onClick }) => {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'stage1',
      title: 'Deal Stage',
      total: '200,000',
      currency: '$',
      deals: [
        {
          id: 'deal1',
          title: 'The Rogue Deal',
          amount: '200,000',
          currency: '$',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage1',
        },
      ],
      color: '#d9e6fc',
    },
    {
      id: 'stage2',
      title: 'Deal Stage',
      total: '0',
      currency: '$',
      deals: [
        {
          id: 'deal22',
          title: 'The Rogue Deal',
          amount: '200,000',
          currency: '$',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage2',
        },
        {
          id: 'deal33',
          title: 'The Rogue Deal',
          amount: '200,000',
          currency: '$',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage2',
        },
      ],
      color: '#d9f2fc',
    },
    {
      id: 'stage3',
      title: 'Deal Stage',
      total: '400,000',
      currency: '$',
      color: '#fdedd3',
      deals: [
        {
          id: 'deal2',
          title: 'The Rogue Deal',
          amount: '200,000',
          currency: '€',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage3',
        },
        {
          id: 'deal3',
          title: 'The Rogue Deal',
          amount: '220,000',
          currency: '€',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage3',
        },
        {
          id: 'deal4',
          title: 'The Rogue Deal',
          amount: '230,000',
          currency: 'AED',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage3',
        },
        {
          id: 'deal5',
          title: 'The Rogue Deal',
          amount: '200,000',
          currency: '$',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage3',
        },
        {
          id: 'deal6',
          title: 'The Rogue Deal',
          amount: '210,000',
          currency: 'ETB',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage3',
        },
      ],
    },
    {
      id: 'stage4',
      title: 'Deal Stage',
      total: '400,000',
      currency: '$',
      deals: [
        {
          id: 'deal7',
          title: 'The Rogue Deal',
          amount: '200,000',
          currency: '$',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage4',
        },
        {
          id: 'deal8',
          title: 'The Rogue Deal',
          amount: '200,000',
          currency: '€',
          date: '24 Mar 2024',
          assignee: 'Nahom Esrael',
          stage: 'stage4',
        },
      ],
      color: '#eaf7ed',
    },
    {
      id: 'stage5',
      title: 'Deal Stage',
      total: '200,000',
      currency: '$',
      deals: [
        {
          id: 'deal15',
          title: 'The Ben Deal',
          amount: '100,000',
          currency: '$',
          date: '24 Mar 2024',
          assignee: 'Ben Esrael',
          stage: 'stage5',
        },
      ],
      color: '#d9e6fc',
    },
    {
      id: 'stage6',
      title: 'Deal Stage',
      total: '150,000',
      currency: '$',
      deals: [
        {
          id: 'deal16',
          title: 'The Sarah Deal',
          amount: '150,000',
          currency: '$',
          date: '25 Mar 2024',
          assignee: 'Sarah Johnson',
          stage: 'stage6',
        },
      ],
      color: '#fce4ec',
    },
    {
      id: 'stage7',
      title: 'Deal Stage',
      total: '300,000',
      currency: '$',
      deals: [
        {
          id: 'deal17',
          title: 'The Mike Deal',
          amount: '300,000',
          currency: '$',
          date: '26 Mar 2024',
          assignee: 'Mike Wilson',
          stage: 'stage7',
        },
      ],
      color: '#e8f5e8',
    },
  ]);

  // Sortable Deal Card Component
  const SortableDealCard: React.FC<{
    deal: Deal;
    index: number;
    stageColor?: string;
  }> = ({ deal, stageColor }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: deal.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };
    const router = useRouter();

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => {
          router.push(`/deals/manage-deals/${deal.id}`);
        }}
      >
        <Card
          size="small"
          className={`mb-3`}
          style={{
            borderRadius: '10px',
            height: '114px',
            marginBottom: '12px',
            border: `2px solid ${stageColor || '#d9d9d9'}`,

            boxShadow: isDragging
              ? '0 4px 12px rgba(0,0,0,0.15)'
              : '0 1px 3px rgba(0,0,0,0.08)',
          }}
          bodyStyle={{
            padding: '4px',
            paddingRight: '6px',
            paddingLeft: '6px',
          }}
        >
          <div className="mb-3">
            <div className="flex justify-between gap-2">
              <Text className="text-[14px] font-bold block mb-2">
                {deal.title}
              </Text>
              <Text className="text-[12px] text-[#8c8c8c]">{deal.date}</Text>
            </div>
          </div>

          <div className="mb-3 flex justify-center">
            <Text className="text-[18px] font-bold">
              {deal.currency === '€'
                ? '€'
                : deal.currency === 'AED'
                  ? 'AED '
                  : deal.currency === 'ETB'
                    ? 'ETB '
                    : '$'}
              {deal.amount}
            </Text>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Space size={4}>
              <Avatar
                size={24}
                icon={<UserOutlined />}
                style={{ backgroundColor: '#1890ff' }}
              />
              <Text style={{ fontSize: '12px' }}>{deal.assignee}</Text>
            </Space>

            <Space size={12}>
              <IoCallOutline size={16} className="text-black" />
              <IoMailOutline size={16} className="text-black" />
            </Space>
          </div>
        </Card>
      </div>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = (event: DragStartEvent) => {
    // console.log('Drag started:', event.active.id);
    event;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Find the stages containing the active and over items
    const activeStageIndex = stages.findIndex((stage) =>
      stage.deals.some((deal) => deal.id === activeId),
    );
    const overStageIndex = stages.findIndex(
      (stage) =>
        stage.deals.some((deal) => deal.id === overId) || stage.id === overId,
    );

    if (activeStageIndex === -1 || overStageIndex === -1) return;

    const activeStage = stages[activeStageIndex];
    const overStage = stages[overStageIndex];
    const activeDeal = activeStage.deals.find((deal) => deal.id === activeId);

    if (!activeDeal) return;

    // If dropping on a stage (empty area)
    if (overStage.id === overId) {
      const newStages = [...stages];
      const sourceDeals = [...newStages[activeStageIndex].deals];
      const [movedDeal] = sourceDeals.splice(
        sourceDeals.findIndex((deal) => deal.id === activeId),
        1,
      );

      movedDeal.stage = overStage.id;
      newStages[overStageIndex].deals.push(movedDeal);
      setStages(newStages);
      return;
    }

    // If dropping on another deal
    const overDeal = overStage.deals.find((deal) => deal.id === overId);
    if (!overDeal) return;

    const activeIndex = activeStage.deals.findIndex(
      (deal) => deal.id === activeId,
    );
    const overIndex = overStage.deals.findIndex((deal) => deal.id === overId);

    if (activeStageIndex === overStageIndex) {
      // Same stage reordering
      const newStages = [...stages];
      newStages[activeStageIndex].deals = arrayMove(
        newStages[activeStageIndex].deals,
        activeIndex,
        overIndex,
      );
      setStages(newStages);
    } else {
      // Moving between stages
      const newStages = [...stages];
      const [movedDeal] = newStages[activeStageIndex].deals.splice(
        activeIndex,
        1,
      );
      movedDeal.stage = overStage.id;

      const newOverIndex = overIndex > activeIndex ? overIndex : overIndex;
      newStages[overStageIndex].deals.splice(newOverIndex, 0, movedDeal);
      setStages(newStages);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;
  };

  const renderStage = (stage: Stage) => (
    <div
      key={stage.id}
      style={{
        minWidth: '280px',
        maxWidth: '280px',
        marginRight: '16px',
        flexShrink: 0,
        width: '280px',
      }}
    >
      <div className="mb-4">
        <div
          className="flex justify-between items-center p-3"
          style={{
            borderRadius: '8px 8px 0 0',
            backgroundColor: `${stage.color || '#d9d9d9'}`,
          }}
        >
          <div>
            <Text className="text-base text-black font-bold block">
              {stage.title}
            </Text>
          </div>
          <Space>
            <Button
              type="text"
              icon={<GrFormEdit size={20} className="text-black" />}
              size="small"
              style={{ color: '#8c8c8c' }}
            />
            <Button
              type="text"
              icon={<PlusOutlined size={20} className="text-black" />}
              size="small"
              style={{ color: '#8c8c8c' }}
            />
          </Space>
        </div>
        <div className="p-3">
          <Text className="flex text-[20px] font-bold items-center justify-center">
            {stage.currency}
            {stage.total}
          </Text>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '12px',
            borderRadius: '0 0 8px 8px',
            transition: 'background-color 0.2s',
            position: 'relative',
          }}
        >
          <SortableContext
            items={stage.deals.map((deal) => deal.id)}
            strategy={verticalListSortingStrategy}
          >
            {stage.deals.map((deal, index) => (
              <SortableDealCard
                key={deal.id}
                deal={deal}
                index={index}
                stageColor={stage.color}
              />
            ))}
          </SortableContext>

          {stage.deals.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#bfbfbf',
              }}
            >
              <Text style={{ color: '#bfbfbf' }}>No deals in this stage</Text>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <Button
            type="dashed"
            icon={<PlusOutlined className="text-[#4080f0]" />}
            block
            style={{ borderRadius: '8px' }}
            className="border-[#e3e4e7]"
            onClick={onClick}
          ></Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          className="flex overflow-x-auto overflow-y-hidden pb-4 gap-0 kanban-horizontal-scroll px-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#d9d9d9 #f0f0f0',
          }}
        >
          {stages.map((stage) => renderStage(stage))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
