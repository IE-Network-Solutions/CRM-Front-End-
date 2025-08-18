'use client'
import React, { useState } from 'react';
import { Button, Input, Tag, Card, Modal, Select, DatePicker } from 'antd';
import { 
  ArrowLeftOutlined, 
  FilterOutlined, 
  PlusOutlined, 
  SearchOutlined,
  MailOutlined,
  PhoneOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  CloseOutlined,
  MoreOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import CustomButton from '@/components/common/buttons/customButton';
import FilterModal from '../manage-deals/_components/filter';

const { TextArea } = Input;
const { Option } = Select;

const DealActivity = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(4);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  const activities = [
    {
      id: 1,
      time: '12:00AM',
      date: '24 May 2025',
      type: 'email',
      icon: <MailOutlined className="text-blue-600" />,
      priority: 'Low',
      priorityColor: '#22C55E',
      title: 'Send Emails to clients',
      person: 'Robel Kebede',
      dealTitle: 'Deal title',
      highlighted: false,
      notes: '',
      files: [],
      backgroundColor: 'bg-gray-50'
    },
    {
      id: 2,
      time: '12:00AM',
      date: '24 May 2025',
      type: 'call',
      icon: <PhoneOutlined className="text-green-600" />,
      priority: 'Low',
      priorityColor: '#22C55E',
      title: 'Send Emails to clients',
      person: 'Robel Kebede',
      dealTitle: 'Deal title',
      highlighted: false,
      notes: '',
      files: [],
      backgroundColor: 'bg-gray-50'
    },
    {
      id: 3,
      time: '12:00AM',
      date: '24 May 2025',
      type: 'document',
      icon: <FileTextOutlined className="text-purple-600" />,
      priority: 'Low',
      priorityColor: '#22C55E',
      title: 'Share Document with Client',
      person: 'Robel Kebede',
      dealTitle: 'Deal title',
      highlighted: true,
      highlightColor: '#22C55E',
      notes: '',
      files: ['File Name 1', 'File Name 2', 'File Name 3', 'File Name 4', 'File Name 5'],
      backgroundColor: 'bg-green-50'
    },
    {
      id: 4,
      time: '12:00AM',
      date: '24 May 2025',
      type: 'call',
      icon: <PhoneOutlined className="text-green-600" />,
      priority: 'High',
      priorityColor: '#EF4444',
      title: 'Send Emails to clients',
      person: 'Robel Kebede',
      dealTitle: 'Deal title',
      highlighted: true,
      highlightColor: '#2563EB',
      notes: 'Lorem ipsum dolor sit amet consectetur. Dolor tristique consectetur odio tempus. Erat magna pellentesque risus gravida venenatis id ultricies aliquam orci.',
      files: ['File Name 1', 'File Name 2', 'File Name 3', 'File Name 4', 'File Name 5'],
      backgroundColor: 'bg-blue-50'
    }
  ];

  const handleBack = () => {
    window.history.back();
  };

  const handleCreateActivity = () => {
    setIsCreateModalOpen(true);
  };

  const handleActivitySelect = (activityId: number) => {
    setSelectedActivity(activityId);
  };

  const handleRemoveFile = (activityId: number, fileName: string) => {
    console.log(`Remove file ${fileName} from activity ${activityId}`);
  };

  const selectedActivityData = activities.find(activity => activity.id === selectedActivity);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deal Title Activity</h1>
              <p className="text-gray-600">View and manage your deal activity</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CustomButton
              title="Create Activity"
              icon={<PlusOutlined />}
              onClick={handleCreateActivity}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            />
            <Button 
              icon={<FilterOutlined />} 
              className="h-10 bg-white border-gray-300 hover:border-gray-400"
              onClick={() => setIsFilterOpen(true)}
            >
              Filter
            </Button>
            <Button 
              icon={<MoreOutlined />} 
              className="h-10 bg-white border-gray-300 hover:border-gray-400"
              onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            >
              Action
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Timeline Column */}
        <div className="flex-1 lg:border-r border-gray-200">
          <div className="p-6">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 hidden lg:block"></div>
              
              {/* Date Header */}
              <div className="mb-6">
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  24 May 2025
                </div>
              </div>
              
              {/* Activities */}
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="relative">
                    {/* Timeline Dot - Desktop Only */}
                    <div className="absolute left-4 w-4 h-4 bg-white border-2 border-gray-300 rounded-full z-10 hidden lg:block"></div>
                    
                    {/* Activity Card */}
                    <div 
                      className={`lg:ml-12 p-4 ${activity.backgroundColor} rounded-lg shadow-sm cursor-pointer transition-all border ${
                        activity.highlighted 
                          ? `border-2 border-${activity.highlightColor === '#22C55E' ? 'green' : 'blue'}-500` 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleActivitySelect(activity.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-lg">{activity.icon}</div>
                          <Tag 
                            style={{ backgroundColor: activity.priorityColor, color: 'white', border: 'none' }}
                            className="text-xs h-6 px-2 font-medium"
                          >
                            {activity.priority}
                          </Tag>
                        </div>
                        <div className="text-sm text-gray-500 font-medium">{activity.time}</div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base mb-1">{activity.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{activity.person}</p>
                        <p className="text-xs text-gray-500">{activity.dealTitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Details Column */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 border-gray-200">
          {selectedActivityData ? (
            <div className="p-6">
              <div className="space-y-6">
                {/* Notes Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-700">Notes</span>
                    <PaperClipOutlined className="text-gray-500 text-sm" />
                  </div>
                  <TextArea
                    rows={4}
                    placeholder="Add notes..."
                    value={selectedActivityData.notes}
                    className="w-full border-gray-300 rounded-lg resize-none"
                  />
                </div>

                {/* Files Section */}
                {selectedActivityData.files.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Attached Files</span>
                      <PaperClipOutlined className="text-gray-500 text-sm" />
                    </div>
                    <div className="space-y-2">
                      {selectedActivityData.files.map((fileName, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <span className="text-sm text-gray-600">{fileName}</span>
                          <Button
                            type="text"
                            icon={<CloseOutlined />}
                            size="small"
                            onClick={() => handleRemoveFile(selectedActivityData.id, fileName)}
                            className="text-gray-400 hover:text-red-500 h-6 w-6 flex items-center justify-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add File Button */}
                <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                  <PaperClipOutlined className="text-gray-500" />
                  <span>Add attachment</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center text-gray-500 py-12">
                <FileTextOutlined className="text-4xl text-gray-300 mb-4" />
                <p>Select an activity to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Activity Modal */}
      <Modal
        title="Create New Activity"
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsCreateModalOpen(false)}>
            Create Activity
          </Button>,
        ]}
        width={600}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
            <Select placeholder="Select activity type" className="w-full">
              <Option value="email">Email</Option>
              <Option value="call">Call</Option>
              <Option value="meeting">Meeting</Option>
              <Option value="document">Document</Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <Input placeholder="Enter activity title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <Select placeholder="Select priority" className="w-full">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
            <DatePicker showTime className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <TextArea rows={3} placeholder="Add notes..." />
          </div>
        </div>
      </Modal>

      <FilterModal 
        open={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onFilter={() => {}} 
        onRemoveAll={() => {}} 
      />
    </div>
  );
};

export default DealActivity;