'use client'
import React, { useState } from 'react';
import { Button, Card, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomButton from '@/components/common/buttons/customButton';

const { Title, Text } = Typography;

const DealSettings = () => {
  const [activeTab, setActiveTab] = useState('stages');

  const settingsTabs = [
    { key: 'stages', label: 'Define Deal Stage', active: true },
    { key: 'activity', label: 'Define Activity' },
    { key: 'type', label: 'Define Type' },
    { key: 'source', label: 'Define Source' },
    { key: 'target', label: 'Define Target' }
  ];

  const stages = [
    { id: 1, name: 'Stage 1', highlighted: false },
    { id: 2, name: 'Stage 2', highlighted: true },
    { id: 3, name: 'Stage 3', highlighted: false },
    { id: 4, name: 'Stage 4', highlighted: false }
  ];

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const handleCreateStage = () => {
    console.log('Create Stage clicked');
  };

  const handleEditStage = (stageId: number) => {
    console.log(`Edit stage ${stageId}`);
  };

  const handleDeleteStage = (stageId: number) => {
    console.log(`Delete stage ${stageId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <Title level={2} className="text-gray-900 mb-2" style={{ margin: 0 }}>
              Deal Settings
            </Title>
            <Text className="text-gray-600 text-base">
              Manage Your Deal Settings
            </Text>
          </div>
          <CustomButton
            title="Create Stage"
            icon={<PlusOutlined />}
            onClick={handleCreateStage}
            className="bg-blue-600 hover:bg-blue-700"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm">
            <Title level={4} className="text-gray-900 mb-4" style={{ margin: 0 }}>
              Deal Settings
            </Title>
            
            <div className="space-y-3">
              {settingsTabs.map((tab) => (
                <Button
                  key={tab.key}
                  type={tab.active ? 'primary' : 'default'}
                  className={`w-full text-left h-12 rounded-lg ${
                    tab.active 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => handleTabChange(tab.key)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Panel - Stages Management */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {stages.map((stage) => (
              <Card 
                key={stage.id}
                className={`shadow-sm ${
                  stage.highlighted 
                    ? 'bg-gradient-to-r from-pink-50 to-red-50 border-pink-200' 
                    : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Title level={5} className="text-gray-900 mb-0" style={{ margin: 0 }}>
                      {stage.name}
                    </Title>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEditStage(stage.id)}
                      className="text-gray-500 hover:text-gray-700"
                    />
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteStage(stage.id)}
                      className="text-gray-500 hover:text-red-600"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealSettings;