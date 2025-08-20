'use client';
import React, { useState } from 'react';
import {
  PlusOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  UserOutlined,
  DragOutlined,
} from '@ant-design/icons';
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

// Sortable Deal Card Component
const SortableDealCard: React.FC<{ deal: Deal; index: number }> = ({
  deal,
}) => {
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
        style={{
          borderRadius: '8px',
          boxShadow: isDragging
            ? '0 4px 12px rgba(0,0,0,0.15)'
            : '0 1px 3px rgba(0,0,0,0.08)',
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'none',
          marginBottom: '12px',
        }}
        bodyStyle={{ padding: '12px' }}
      >
        {/* Drag Handle */}
        <div
          style={{
            cursor: 'grab',
            padding: '4px',
            marginBottom: '8px',
            display: 'flex',
            justifyContent: 'center',
            opacity: 0.6,
            touchAction: 'none',
          }}
        >
          <DragOutlined style={{ fontSize: '16px', color: '#8c8c8c' }} />
        </div>

        <div className="flex justify-between items-start mb-3">
          <div>
            <Text className="text-[14px] font-bold block mb-2">
              {deal.title}
            </Text>
            <Text className="text-[12px] text-[#8c8c8c]">{deal.date}</Text>
          </div>
        </div>

        <div className="mb-3">
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

          <Space size={8}>
            <PhoneOutlined
              style={{ fontSize: '14px', color: '#8c8c8c', cursor: 'pointer' }}
            />
            <MailOutlined
              style={{ fontSize: '14px', color: '#8c8c8c', cursor: 'pointer' }}
            />
          </Space>
        </div>
      </Card>
    </div>
  );
};

function KanbanBoard() {
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
  ]);

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
    <Col key={stage.id} xs={24} sm={12} md={6} style={{ paddingRight: '12px' }}>
      <div className="mb-4">
        <div
          className="flex justify-between items-center p-3"
          style={{
            borderRadius: '8px 8px 0 0',
            backgroundColor: `${stage.color || '#d9d9d9'}`,
          }}
        >
          <div>
            <Text className="text-[12px] text-[#8c8c8c] block">
              {stage.title}
            </Text>
          </div>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              style={{ color: '#8c8c8c' }}
            />
            <Button
              type="text"
              icon={<PlusOutlined />}
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
            backgroundColor: '#fafafa',
            minHeight: '400px',
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
              <SortableDealCard key={deal.id} deal={deal} index={index} />
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

        {stage.id === 'stage1' && (
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              block
              style={{ borderRadius: '8px' }}
            >
              Add Deal
            </Button>
          </div>
        )}

        {stage.id === 'stage3' && (
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              block
              style={{ borderRadius: '8px' }}
            >
              Add Deal
            </Button>
          </div>
        )}
      </div>
    </Col>
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
        <Row gutter={[16, 16]} style={{ marginRight: '-12px' }}>
          {stages.map((stage) => renderStage(stage))}
        </Row>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
