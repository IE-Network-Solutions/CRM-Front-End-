'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon
}) => {
  return (
    <Card 
      className="text-center shadow-md hover:shadow-lg transition-shadow duration-300"
      bodyStyle={{ padding: '14px' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-between items-start gap-1">
          <Text className="text-gray-600 text-sm font-bold">{title}</Text>
          <div className="text-2xl font-bold">{value}</div>
          <div className={`flex items-center text-sm ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? (
              <ArrowUpOutlined className="mr-1" />
            ) : (
              <ArrowDownOutlined className="mr-1 text-red-600" />
            )}
            {change}
          </div>
        </div>
        <div className="w-10 h-10 bg-blue-100 text-blue rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
