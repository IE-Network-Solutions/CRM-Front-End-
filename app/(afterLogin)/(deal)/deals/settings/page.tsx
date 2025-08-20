'use client';
import React, { useState } from 'react';
import { Button, Card, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SettingsSideBar from './_components/sideBar';

const { Title, Text } = Typography;

const DealSettings = () => {
  const [activeTab, setActiveTab] = useState('stages');
  const [open, setOpen] = useState(false);
  const settingsTabs = [
    { key: 'stages', label: 'Define Deal Stage' },
    { key: 'activity', label: 'Define Activity' },
    { key: 'type', label: 'Define Type' },
    { key: 'source', label: 'Define Source' },
    { key: 'target', label: 'Define Target' },
  ];

  const stages = [
    { id: 1, name: 'Stage 1', highlighted: false },
    { id: 2, name: 'Stage 2', highlighted: true },
    { id: 3, name: 'Stage 3', highlighted: false },
    { id: 4, name: 'Stage 4', highlighted: false },
  ];

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  // const handleCreateStage = () => {};

  const handleEditStage = (stageId: number) => {
    stageId;
  };

  const handleDeleteStage = (stageId: number) => {
    stageId;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <Title level={4} className="text-gray-900" style={{ margin: 0 }}>
              Deal Settings
            </Title>
            <Text className="text-gray-600 text-base">
              Manage Your Deal Settings
            </Text>
          </div>
        </div>
        <div className="flex justify-end mt-16">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
            className="bg-[#4080f0] h-10"
          >
            Create Stage
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm">
            <Title
              level={4}
              className="text-gray-900 mb-4"
              style={{ margin: 0 }}
            >
              Deal Settings
            </Title>

            <div className="space-y-3">
              {settingsTabs.map((tab) => (
                <Button
                  key={tab.key}
                  type={activeTab === tab.key ? 'primary' : 'default'}
                  className={`w-full text-left h-12 rounded-lg ${
                    activeTab === tab.key
                      ? 'bg-[#4080f0]'
                      : 'bg-white border-[#4080f0] text-[#4080f0] hover:bg-blue-50'
                  }`}
                  onClick={() => handleTabChange(tab.key)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Panel - Content based on active tab */}
        <div className="lg:col-span-3">
          {activeTab === 'stages' && (
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
                      <Title
                        level={5}
                        className="text-gray-900 mb-0"
                        style={{ margin: 0 }}
                      >
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
          )}

          {activeTab === 'activity' && (
            <Card className="shadow-sm">
              <Title level={4} className="text-gray-900 mb-4">
                Define Activity Settings
              </Title>
              <Text className="text-gray-600">
                Activity management settings will be implemented here.
              </Text>
            </Card>
          )}

          {activeTab === 'type' && (
            <Card className="shadow-sm">
              <Title level={4} className="text-gray-900 mb-4">
                Define Type Settings
              </Title>
              <Text className="text-gray-600">
                Type management settings will be implemented here.
              </Text>
            </Card>
          )}

          {activeTab === 'source' && (
            <Card className="shadow-sm">
              <Title level={4} className="text-gray-900 mb-4">
                Define Source Settings
              </Title>
              <Text className="text-gray-600">
                Source management settings will be implemented here.
              </Text>
            </Card>
          )}

          {activeTab === 'target' && (
            <Card className="shadow-sm">
              <Title level={4} className="text-gray-900 mb-4">
                Define Target Settings
              </Title>
              <Text className="text-gray-600">
                Target management settings will be implemented here.
              </Text>
            </Card>
          )}
        </div>
      </div>
      <SettingsSideBar open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DealSettings;
