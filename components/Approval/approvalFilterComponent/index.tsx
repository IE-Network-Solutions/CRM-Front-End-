import { EntityTypeList } from '@/store/server/features/approver/interface';
// import { useAllAllowanceStore } from '@/store/uistate/features/compensation/allowance'; // Commented out due to missing module
import { Button, Col, Input, Modal, Row, Select } from 'antd';
import React from 'react';
import { LuSettings2 } from 'react-icons/lu';

const ApprovalFilterComponent = ({
  searchParams,
  handleSearchInput,
  handleDepartmentChange,
}: {
  searchParams: any;
  handleSearchInput: (value: string, keyValue: any) => void;

  handleDepartmentChange: (value: string) => void;
}) => {
  const EntityType: EntityTypeList[] = [
    {
      name: 'Department',
    },
    {
      name: 'Hierarchy',
    },
    {
      name: 'User',
    },
  ];
  const { Option } = Select;
  // const { isMobileFilterVisible, setIsMobileFilterVisible } =
  //   useAllAllowanceStore(); // Commented out due to missing module

  // Placeholder data since module is missing
  const isMobileFilterVisible = false;
  const setIsMobileFilterVisible = () => {
    // Placeholder function - no actual functionality
  };

  return (
    <Row gutter={12} justify="space-between">
      <Col xl={16} lg={16} md={16} sm={16} xs={20}>
        <Input
          id={`inputEmployeeNames${searchParams.name}`}
          placeholder="Search workflow name"
          onChange={(e) => handleSearchInput(e.target.value, 'name')}
          className="w-full h-10"
          allowClear
        />
      </Col>

      <Col xl={8} lg={8} md={8} sm={8} xs={4}>
        <Select
          id={`selectDepartment${searchParams.entityType}`}
          placeholder="Applied For"
          onChange={handleDepartmentChange}
          allowClear
          className="w-full h-10 hidden sm:block"
        >
          {EntityType?.map((item: any, index) => (
            <Option key={index} value={item?.name}>
              {item?.name}
            </Option>
          ))}
        </Select>
        <div className="sm:hidden mb-4">
          <Button
            type="default"
            icon={<LuSettings2 size={24} className="text-gray-600" />}
            onClick={() => setIsMobileFilterVisible()}
            className="flex w-10 h-10 hover:bg-gray-50 border-gray-200"
          />
        </div>
      </Col>

      {/* Mobile Filter Drawer */}
      <Modal
        title="Filter Options"
        centered
        onCancel={() => setIsMobileFilterVisible()}
        open={isMobileFilterVisible}
        width="85%"
        footer={
          <div className="flex justify-center items-center space-x-4">
            <Button
              type="default"
              className="px-10"
              onClick={() => setIsMobileFilterVisible()}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsMobileFilterVisible()}
              type="primary"
              className="px-10"
            >
              Filter
            </Button>
          </div>
        }
      >
        <Select
          id={`selectDepartment${searchParams.entityType}`}
          placeholder="Applied For"
          onChange={handleDepartmentChange}
          allowClear
          className="w-full h-10"
        >
          {EntityType?.map((item: any, index) => (
            <Option key={index} value={item?.name}>
              {item?.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </Row>
  );
};

export default ApprovalFilterComponent;
