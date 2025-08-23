import {
  useEmployeeAllFilter,
  useEmployeeBranches,
} from '@/store/server/features/employees/employeeManagment/queries';
import { useEmployeeManagementStore } from '@/store/uistate/features/employees/employeeManagment';
import { useDebounce } from '@/utils/useDebounce';
import { Button, Col, Input, Row, Select, DatePicker, Radio } from 'antd';
import { Modal } from 'antd';

const { Option } = Select;

const EmployeeSearch: React.FC = () => {
  const {
    searchParams,
    setSearchParams,
    pageSize,
    userCurrentPage,
    setJoinedDateType,
  } = useEmployeeManagementStore();

  const { data: allFilterData } = useEmployeeAllFilter(
    pageSize,
    userCurrentPage,
    searchParams.employee_name ? searchParams.employee_name : '',
    searchParams.allOffices ? searchParams.allOffices : '',
    searchParams.allStatus ? searchParams.allStatus : '',
    '', // department parameter (empty string since we removed department filtering)
    searchParams.gender ? searchParams.gender : '',
    searchParams.joinedDate ? searchParams.joinedDate : '',
    searchParams.joinedDateType || 'after',
  );

  const { data: EmployeeBranches } = useEmployeeBranches();
  const { isMobileFilterVisible, setIsMobileFilterVisible } =
    useEmployeeManagementStore();

  const handleSearchEmployee = async (
    value: string | boolean,
    keyValue: keyof typeof searchParams,
  ) => {
    setSearchParams(keyValue, value);
  };

  const onSelectChange = handleSearchEmployee;
  const onSearchChange = useDebounce(handleSearchEmployee, 2000);

  const handleSearchInput = (
    value: string,
    keyValue: keyof typeof searchParams,
  ) => {
    const trimmedValue = value.trim();

    // Only search if there's actual content or if clearing
    if (trimmedValue || value === '') {
      onSearchChange(trimmedValue, keyValue);
    }
  };

  // Handle search clearing
  const handleSearchClear = (keyValue: keyof typeof searchParams) => {
    onSelectChange('', keyValue);
  };
  const handleBranchChange = (value: string) => {
    onSelectChange(value, 'allOffices');
  };

  const handleStatusChange = (value: string) => {
    onSelectChange(value, 'allStatus');
  };

  const handleGenderChange = (value: string) => {
    onSelectChange(value, 'gender');
  };

  const handleJoinedDateChange = (date: any, dateString: string | string[]) => {
    const dateValue = Array.isArray(dateString) ? dateString[0] : dateString;
    onSelectChange(dateValue, 'joinedDate');
  };

  const activeStatusValue =
    allFilterData?.items?.find((item: any) => item.deletedAt === null)
      ?.deletedAt || 'null';
  const inactiveStatusValue = allFilterData?.items?.some(
    (item: any) => item.deletedAt !== null,
  )
    ? 'notNull'
    : 'notNull';

  return (
    <div>
      <Row
        gutter={[16, 24]}
        justify="space-between"
        align="middle"
        className="mb-5"
      >
        <Col xs={24} sm={24} lg={6}>
          <Input
            id={`inputEmployeeNames${searchParams.employee_name}`}
            placeholder="Search employee"
            value={searchParams.employee_name}
            onChange={(e) => handleSearchInput(e.target.value, 'employee_name')}
            onClear={() => handleSearchClear('employee_name')}
            allowClear
            className="w-full h-10 rounded-lg"
            suffix={
              searchParams.employee_name && (
                <div className="text-xs text-gray-400">
                  {searchParams.employee_name.length} chars
                </div>
              )
            }
          />
        </Col>
        <Col xs={24} sm={24} lg={18}>
          <div className="flex flex-row gap-2 justify-end items-center">
            <Select
              id={`selectBranches${searchParams.allOffices}`}
              placeholder="Office"
              onChange={handleBranchChange}
              allowClear
              className="h-10 min-w-[120px]"
            >
              {EmployeeBranches?.items?.map((item: any) => (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              ))}
            </Select>
            <Select
              id={`selectGender${searchParams.gender}`}
              placeholder="Gender"
              onChange={handleGenderChange}
              allowClear
              className="h-10 min-w-[100px]"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
            <Select
              id={`selectStatus${searchParams.allStatus}`}
              placeholder="Status"
              onChange={handleStatusChange}
              allowClear
              className="h-10 min-w-[100px]"
            >
              <Option value={activeStatusValue}>Active</Option>
              <Option value={inactiveStatusValue}>Inactive</Option>
            </Select>
            <div className="flex flex-row items-center gap-1">
              <DatePicker
                id={`datePickerJoinedDate${searchParams.joinedDate}`}
                placeholder="Joined Date"
                onChange={handleJoinedDateChange}
                className="h-10 min-w-[130px]"
                format="YYYY-MM-DD"
                allowClear
                renderExtraFooter={() => (
                  <div className="flex items-center justify-between w-full px-2">
                    <span className="font-semibold text-sm">Set Date</span>
                    <Radio.Group
                      value={searchParams.joinedDateType || 'after'}
                      onChange={(e) => setJoinedDateType(e.target.value)}
                      size="small"
                    >
                      <Radio value="before">Before</Radio>
                      <Radio value="after">After</Radio>
                    </Radio.Group>
                  </div>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        centered
        title="Filter Employees"
        open={isMobileFilterVisible}
        onCancel={() => setIsMobileFilterVisible(false)}
        width="85%"
        footer={
          <div className="flex justify-center items-center space-x-4">
            <Button
              type="default"
              className="px-3"
              onClick={() => setIsMobileFilterVisible(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsMobileFilterVisible(false)}
              type="primary"
              className="px-3"
            >
              Filter
            </Button>
          </div>
        }
      >
        <Select
          id={`selectBranches${searchParams.allOffices}`}
          placeholder="Office"
          onChange={handleBranchChange}
          allowClear
          className="w-full mb-4"
        >
          {EmployeeBranches?.items?.map((item: any) => (
            <Option key={item?.id} value={item?.id}>
              {item?.name}
            </Option>
          ))}
        </Select>

        <Select
          id={`selectGender${searchParams.gender}`}
          placeholder="Gender"
          onChange={handleGenderChange}
          allowClear
          className="w-full mb-4"
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
        <Select
          id={`selectStatus${searchParams.allStatus}`}
          placeholder="Status"
          onChange={handleStatusChange}
          allowClear
          className="w-full mb-4"
        >
          <Option value={activeStatusValue}>Active</Option>
          <Option value={inactiveStatusValue}>Inactive</Option>
        </Select>

        <div className="flex flex-row items-center gap-1">
          <DatePicker
            id={`datePickerJoinedDate${searchParams.joinedDate}`}
            placeholder="Joined Date"
            onChange={handleJoinedDateChange}
            className="w-full"
            format="YYYY-MM-DD"
            allowClear
            renderExtraFooter={() => (
              <div className="flex items-center justify-between w-full px-2">
                <span className="font-semibold text-sm">Set Date</span>
                <Radio.Group
                  value={searchParams.joinedDateType || 'after'}
                  onChange={(e) => setJoinedDateType(e.target.value)}
                  size="small"
                >
                  <Radio value="before">Before</Radio>
                  <Radio value="after">After</Radio>
                </Radio.Group>
              </div>
            )}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeSearch;
