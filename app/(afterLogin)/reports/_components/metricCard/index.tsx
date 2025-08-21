'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import {
  HiMiniArrowTrendingUp,
  HiMiniArrowTrendingDown,
} from 'react-icons/hi2';
import { TiArrowRepeatOutline } from 'react-icons/ti';
import { PiMoneyWavy } from 'react-icons/pi';
import { TbTargetArrow } from 'react-icons/tb';

const { Text } = Typography;

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  iconType: 'dollar' | 'document' | 'chart' | 'target';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  iconType,
}) => {
  // Icon mapping based on iconType
  const getIcon = () => {
    switch (iconType) {
      case 'dollar':
        return <DollarOutlined className="text-blue-600 text-lg" />;
      case 'document':
        return <TiArrowRepeatOutline className="text-blue-600 text-lg" />;
      case 'chart':
        return <PiMoneyWavy className="text-blue-600 text-lg" />;
      case 'target':
        return <TbTargetArrow className="text-blue-600 text-lg" />;
      default:
        return <DollarOutlined className="text-blue-600 text-lg" />;
    }
  };

  return (
    <Card
      className="text-center shadow-md hover:shadow-lg transition-shadow duration-300"
      bodyStyle={{ padding: '20px' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-between items-start gap-1">
          <Text className="text-gray-600 text-sm font-bold">{title}</Text>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center text-sm text-gray-600">
            {changeType === 'positive' ? (
              <HiMiniArrowTrendingUp
                className="mr-1"
                style={{ color: '#16a34a' }}
              />
            ) : (
              <HiMiniArrowTrendingDown
                className="mr-1"
                style={{ color: '#ea580c' }}
              />
            )}
            <span
              style={{
                color: changeType === 'positive' ? '#16a34a' : '#ea580c',
              }}
            >
              {change.split(' ')[0]}
            </span>
            <span className="ml-1">from last month</span>
          </div>
        </div>
        <div
          className="w-10 h-10 text-blue rounded-full flex items-center justify-center"
          style={{ padding: 0 }}
        >
          {getIcon()}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
