'use client';
import React, { useState } from 'react';
import { Button, Input, Tag, Modal, Select, DatePicker } from 'antd';
import {
  ArrowLeftOutlined,
  FilterOutlined,
  PlusOutlined,
  MailOutlined,
  PhoneOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import FilterModal from '../manage-deals/_components/filter';

const { TextArea } = Input;
const { Option } = Select;

const DealActivity = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(1);
  const [notes, setNotes] = useState<{ [key: number]: string }>({
    1: '',
    2: '',
    3: '',
    4: '',
  });

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
      backgroundColor: 'bg-gray-50',
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
      dealTitle: 'Lead title',
      highlighted: false,
      notes: '',
      files: [],
      backgroundColor: 'bg-gray-50',
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
      files: [
        'File Name 1',
        'File Name 2',
        'File Name 3',
        'File Name 4',
        'File Name 5',
      ],
      backgroundColor: 'bg-green-50',
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
      notes:
        'Lorem ipsum dolor sit amet consectetur. Dolor tristique consectetur odio tempus. Erat magna pellentesque risus gravida venenatis id ultricies aliquam orci.',
      files: [
        'File Name 1',
        'File Name 2',
        'File Name 3',
        'File Name 4',
        'File Name 5',
      ],
      backgroundColor: 'bg-blue-50',
    },
  ];

  const handleBack = () => {
    window.history.back();
  };

  const handleCreateActivity = () => {
    setIsCreateModalOpen(true);
  };

  const handleActivitySelect = (activityId: number) => {
    setSelectedActivity(activityId);
    selectedActivity;
  };

  // const handleRemoveFile = (activityId: number, fileName: string) => {
  //   fileName;
  //   activityId;
  // };

  const handleNotesChange = (activityId: number, value: string) => {
    setNotes((prev) => ({
      ...prev,
      [activityId]: value,
    }));
  };

  const handleCompleteActivity = (activityId: number) => {
    // Handle complete activity logic
    // console.log('Complete activity:', activityId);
    activityId;
  };

  const handleDeleteActivity = (activityId: number) => {
    // Handle delete activity logic
    // console.log('Delete activity:', activityId);
    activityId;
  };

  // const selectedActivityData = activities.find(
  //   (activity) => activity.id === selectedActivity,
  // );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="mb-6 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="text-[#4080f0] border-[#4080f0] h-10 w-10"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Deal Title Activity
              </h1>
              <p className="text-gray-600">
                View and manage your deal activity
              </p>
            </div>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateActivity}
            className="bg-[#4080f0] hover:bg-[#4080f0] text-white h-10"
          >
            Create Activity
          </Button>
        </div>
        <div className="flex justify-end mt-5">
          <div className="flex gap-2">
            <Button
              icon={<FilterOutlined />}
              className="h-10 border-[#4080f0] text-[#4080f0]"
              onClick={() => {
                setIsFilterOpen(true);
              }}
            >
              Filter
            </Button>
            <Button className="h-10 border-[#4080f0] text-[#4080f0]">
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
              <div className="mb-6 relative">
                <div className="inline-block border border-blue-300 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium bg-white">
                  24 May 2025
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-300 mt-1"></div>
              </div>

              {/* Activities */}
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="relative">
                    {/* Timeline Dot - Desktop Only */}
                    <div className="absolute left-4 w-4 h-4 bg-white border-2 border-gray-300 rounded-full z-10 hidden lg:block"></div>

                    {/* Activity Card */}
                    <div
                      // className={`relative bg-white rounded-lg shadow-sm transition-all duration-200 ${
                      //   hoveredActivity === activity.id
                      //     ? 'border-2 border-blue-300 shadow-md'
                      //     : 'border border-gray-200'
                      // }`}
                      className="hover:border border-gray-200"
                      onMouseEnter={() => setHoveredActivity(activity.id)}
                      onMouseLeave={() => setHoveredActivity(null)}
                      onClick={() => handleActivitySelect(activity.id)}
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Time and Icon */}
                          <div className="flex flex-col items-center gap-2 min-w-[60px]">
                            <div className="text-sm text-gray-500 font-medium">
                              {activity.time}
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                              {activity.icon}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex w-full justify-between items-center gap-3">
                            <div className="flex items-start justify-between mb-3 w-1/3">
                              <div className="flex-1">
                                <Tag
                                  style={{
                                    backgroundColor: activity.priorityColor,
                                    color: 'white',
                                    border: 'none',
                                  }}
                                  className="text-xs h-6 px-2 font-medium mb-2"
                                >
                                  {activity.priority}
                                </Tag>
                                <h3 className="font-semibold text-gray-900 text-base mb-1">
                                  {activity.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">
                                  {activity.person}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {activity.dealTitle}
                                </p>
                              </div>
                            </div>

                            {/* Notes and Actions */}
                            <div className="flex items-start gap-3">
                              <div className="flex-1">
                                <Input
                                  placeholder="Notes"
                                  value={notes[activity.id] || ''}
                                  onChange={(e) =>
                                    handleNotesChange(
                                      activity.id,
                                      e.target.value,
                                    )
                                  }
                                  className="rounded-lg w-[550px] h-10"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  type="text"
                                  icon={<PaperClipOutlined />}
                                  className="text-gray-500 hover:text-gray-700"
                                  size="small"
                                />
                                {hoveredActivity === activity.id && (
                                  <>
                                    <Button
                                      type="primary"
                                      icon={<CheckOutlined />}
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCompleteActivity(activity.id);
                                      }}
                                    />
                                    <Button
                                      type="primary"
                                      icon={<CloseOutlined />}
                                      className="bg-red-600 hover:bg-red-700 text-white"
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteActivity(activity.id);
                                      }}
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
          <Button
            key="submit"
            type="primary"
            onClick={() => setIsCreateModalOpen(false)}
          >
            Create Activity
          </Button>,
        ]}
        width={600}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type
            </label>
            <Select placeholder="Select activity type" className="w-full">
              <Option value="email">Email</Option>
              <Option value="call">Call</Option>
              <Option value="meeting">Meeting</Option>
              <Option value="document">Document</Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input placeholder="Enter activity title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <Select placeholder="Select priority" className="w-full">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date & Time
            </label>
            <DatePicker showTime className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
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
