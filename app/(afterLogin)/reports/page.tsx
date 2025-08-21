'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { 
  DollarOutlined, 
  MessageOutlined, 
  TagOutlined
} from '@ant-design/icons';
import Header from './_components/header';
import MetricCard from './_components/metricCard';
import PerformanceTable from './_components/performanceTable';

const ReportsPage: React.FC = () => {
  // Lead Source Performance data
  const leadSourceData = [
    { key: '1', source: 'Website', leads: 35, conversions: 12, rate: '12%' },
    { key: '2', source: 'Trade Show', leads: 45, conversions: 11, rate: '11%' },
    { key: '3', source: 'Referral', leads: 32, conversions: 26, rate: '26%' },
    { key: '4', source: 'Partner Introduction', leads: 60, conversions: 43, rate: '43%' },
    { key: '5', source: 'Cold Call', leads: 22, conversions: 5, rate: '5%' },
    { key: '6', source: 'Email Campaign', leads: 50, conversions: 12, rate: '12%' },
  ];

  const leadSourceColumns = [
    { title: 'Lead Source', dataIndex: 'source', key: 'source' },
    { title: 'Leads', dataIndex: 'leads', key: 'leads' },
    { title: 'Conversions', dataIndex: 'conversions', key: 'conversions' },
    { title: 'Rate', dataIndex: 'rate', key: 'rate' },
  ];

  // Sales Pipeline Status data
  const pipelineData = [
    { key: '1', stage: 'Commit', deals: 35, value: 'ETB 450,000' },
    { key: '2', stage: 'Ongoing', deals: 45, value: 'ETB 50,000' },
    { key: '3', stage: 'Follow-Up', deals: 32, value: 'ETB 980,000' },
    { key: '4', stage: 'Closed/Won', deals: 60, value: 'ETB 450,000,000' },
    { key: '5', stage: 'Closed/Lost', deals: 22, value: 'ETB 4,500,000' },
  ];

  const pipelineColumns = [
    { title: 'Stage', dataIndex: 'stage', key: 'stage' },
    { title: 'Deals', dataIndex: 'deals', key: 'deals' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];

  // Sector Performance data
  const sectorData = [
    { 
      key: '1', 
      sector: 'Technology', 
      deals: 35, 
      actual: 'ETB 1,200,000', 
      target: 'ETB 100,000', 
      achievements: '120%' 
    },
    { 
      key: '2', 
      sector: 'Healthcare', 
      deals: 45, 
      actual: 'ETB 200,000', 
      target: 'ETB 100,000,000', 
      achievements: '120%' 
    },
    { 
      key: '3', 
      sector: 'Finance', 
      deals: 32, 
      actual: 'ETB 1,200,000,000', 
      target: 'ETB 100,000,000', 
      achievements: '100%' 
    },
    { 
      key: '4', 
      sector: 'Manufacturing', 
      deals: 60, 
      actual: 'ETB 800,000', 
      target: 'ETB 500,000', 
      achievements: '160%' 
    },
    { 
      key: '5', 
      sector: 'Education', 
      deals: 22, 
      actual: 'ETB 300,000', 
      target: 'ETB 400,000', 
      achievements: '75%' 
    },
  ];

  const sectorColumns = [
    { title: 'Sector', dataIndex: 'sector', key: 'sector' },
    { title: 'Deals', dataIndex: 'deals', key: 'deals' },
    { title: 'Actual', dataIndex: 'actual', key: 'actual' },
    { title: 'Target', dataIndex: 'target', key: 'target' },
    { title: 'Achievements', dataIndex: 'achievements', key: 'achievements' },
  ];

  // Deals Requiring Attention data
  const dealsAttentionData = [
    { 
      key: '1', 
      company: 'XYZ Tech', 
      stage: 'Follow-up', 
      days: 12, 
      value: 'ETB 450,000', 
      owner: 'Nahom Esrael' 
    },
    { 
      key: '2', 
      company: 'XYZ Tech', 
      stage: 'Follow-up', 
      days: 11, 
      value: 'ETB 50,000', 
      owner: 'Nahom Esrael' 
    },
    { 
      key: '3', 
      company: 'XYZ Tech', 
      stage: 'Follow-up', 
      days: 26, 
      value: 'ETB 980,000', 
      owner: 'Nahom Esrael' 
    },
    { 
      key: '4', 
      company: 'XYZ Tech', 
      stage: 'Follow-up', 
      days: 43, 
      value: 'ETB 450,000,000', 
      owner: 'Nahom Esrael' 
    },
    { 
      key: '5', 
      company: 'XYZ Tech', 
      stage: 'Follow-up', 
      days: 5, 
      value: 'ETB 200,000', 
      owner: 'Nahom Esrael' 
    },
    { 
      key: '6', 
      company: 'XYZ Tech', 
      stage: 'Follow-up', 
      days: 12, 
      value: 'ETB 150,000', 
      owner: 'Nahom Esrael' 
    },
  ];

  const dealsAttentionColumns = [
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Stage', dataIndex: 'stage', key: 'stage' },
    { title: 'Days', dataIndex: 'days', key: 'days' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { 
      title: 'Owner', 
      dataIndex: 'owner', 
      key: 'owner',
      render: (owner: string) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-600">👤</span>
          </div>
          <span>{owner}</span>
        </div>
      )
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Key Metrics Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Pipeline Value"
            value="$2.5 M"
            change="18% from last month"
            changeType="positive"
            icon={<DollarOutlined className="text-blue-600 text-lg" />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Active Deals"
            value="48"
            change="+6 from last month"
            changeType="positive"
            icon={<MessageOutlined className="text-blue-600 text-lg" />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Conversion Rate"
            value="24.5%"
            change="30.5% from last month"
            changeType="positive"
            icon={<TagOutlined className="text-blue-600 text-lg" />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Avg Deal Age"
            value="31 Days"
            change="-12.5% from last month"
            changeType="negative"
            icon={<TagOutlined className="text-blue-600 text-lg" />}
          />
        </Col>
      </Row>

      {/* Performance Tables Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <PerformanceTable
            title="Lead Source Performance"
            dataSource={leadSourceData}
            columns={leadSourceColumns}
          />
        </Col>
        <Col xs={24} lg={12}>
          <PerformanceTable
            title="Sales Pipeline Status"
            dataSource={pipelineData}
            columns={pipelineColumns}
          />
        </Col>
      </Row>

      {/* Sector Performance Table */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24}>
          <PerformanceTable
            title="Sector Performance Vs Target"
            dataSource={sectorData}
            columns={sectorColumns}
          />
        </Col>
      </Row>

      {/* Deals Requiring Attention Table */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <PerformanceTable
            title="Deals Requiring Attention"
            dataSource={dealsAttentionData}
            columns={dealsAttentionColumns}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReportsPage;
