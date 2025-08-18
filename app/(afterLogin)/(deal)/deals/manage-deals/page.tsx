'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  PlusOutlined, 
  PhoneOutlined, 
  MailOutlined,
  MoreOutlined,
  EditOutlined,
  UserOutlined,
  DragOutlined
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import KanbanBoard from './_components/kanbanBoard';
import DealSideBar from './_components/sideBar';
import FilterModal from './_components/filter';

const { Title, Text } = Typography;




const ManageDealsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const moreActions: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true
    }
  ];

 

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className='flex justify-between mb-6'>
        <div>
        <Title level={3} style={{ margin: 0 }}>Deals</Title>
        <Text style={{ color: '#8c8c8c' }}>Manage your deals</Text>
        </div>
        <Button 
        type="primary" 
        icon={<PlusOutlined />}
        className='h-10'
        onClick={()=>{
          setIsSideBarOpen(true);
        }}
        >
          Create Deal
        </Button>
      </div>

      {/* Actions Bar */}
      <div  className='flex justify-between items-center mb-6 flex-wrap gap-3' >
          <Input
            placeholder="Search Deals"
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 300 }}
            className='h-10'
          />
          <div className="flex gap-2">
          <Button icon={<FilterOutlined />} className='h-10' onClick={()=>{
            setIsFilterOpen(true);
          }}>Filter</Button>
          <Button className='h-10'>Action</Button>
          </div> 
      </div>

      {/* Kanban Board */}
      <KanbanBoard />
      <DealSideBar open={isSideBarOpen} onClose={()=>{
        setIsSideBarOpen(false);
      }} />
      <FilterModal open={isFilterOpen} onClose={()=>{
        setIsFilterOpen(false);
      }} onFilter={()=>{}} onRemoveAll={()=>{}} />
    </div>
  );
};

export default ManageDealsPage;
