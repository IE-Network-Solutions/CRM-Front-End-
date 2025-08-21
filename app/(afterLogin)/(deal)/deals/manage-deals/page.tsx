'use client';
import React, { useState } from 'react';
import { Input, Button, Typography, Dropdown } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { RiExchange2Line } from 'react-icons/ri';

import KanbanBoard from './_components/kanbanBoard';
import DealSideBar from './_components/sideBar';
import FilterModal from './_components/filter';
import { LuSettings2 } from 'react-icons/lu';

const { Title, Text } = Typography;

const ManageDealsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilter = () => {
    setIsFilterOpen(true);
  };

  return (
    <div
      style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh' }}
    >
      {/* Header Section */}
      <div className="flex justify-between mb-6">
        <div>
          <Title level={3} style={{ margin: 0 }}>
            Deals
          </Title>
          <Text style={{ color: '#8c8c8c' }}>Manage your deals</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="h-10 bg-[#4080f0]"
          onClick={() => {
            setIsSideBarOpen(true);
          }}
        >
          Create Deal
        </Button>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <Input
          placeholder="Search Deals"
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 400 }}
          className="h-10"
        />
        <div className="flex gap-2">
          {/* <Button
            icon={<LuSettings2 className="text-[#4080f0]" />}
            className="h-10 border border-[#4080f0] text-[#4080f0]"
            onClick={() => {
              setIsFilterOpen(true);
            }}
          >
            Filter
          </Button> */}
          <Dropdown
            overlay={<FilterModal onFilter={handleFilter} />}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              icon={<LuSettings2 />}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{
                color: '#3b82f6',
                borderColor: '#93c5fd',
                borderWidth: '1px',
                height: '50px',
              }}
              className="flex items-center hover:bg-blue-50 h-10"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1d4ed8';
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.borderColor = '#93c5fd';
              }}
            >
              Filter
            </Button>
          </Dropdown>
          <Button
            icon={<RiExchange2Line className="text-[#4080f0]" />}
            className="h-10 text-[#4080f0] border border-[#4080f0]"
          >
            Action
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        onClick={() => {
          setIsSideBarOpen(true);
        }}
      />
      <DealSideBar
        open={isSideBarOpen}
        onClose={() => {
          setIsSideBarOpen(false);
        }}
      />
    </div>
  );
};

export default ManageDealsPage;
