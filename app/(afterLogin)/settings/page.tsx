'use client';

import React, { useState } from 'react';
import { Card, Button, Typography } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import SetDefaultModal from './_components/set-default-modal';
import RemoveModal from './_components/remove-modal';
import EditDrawer from './_components/edit-drawer';
import CompanySupplierDrawer from './_components/company-supplier-drawer';
import CustomFieldDrawer from './_components/custom-field-drawer';
import CreateDrawer from './_components/create-drawer';
import CreateCompanySupplierDrawer from './_components/create-company-supplier-drawer';
import CreateCustomFieldDrawer from './_components/create-custom-field-drawer';

const { Title, Text } = Typography;

const SettingsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Create Role');
  const [isCurrencySelectorExpanded, setIsCurrencySelectorExpanded] =
    useState(false);
  const [isSetDefaultModalOpen, setIsSetDefaultModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [isRemoveRoleModalOpen, setIsRemoveRoleModalOpen] = useState(false);

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedItemToDelete, setSelectedItemToDelete] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('');
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState('');
  const [selectedItemTypeToEdit, setSelectedItemTypeToEdit] = useState('');
  const [isCompanySupplierDrawerOpen, setIsCompanySupplierDrawerOpen] =
    useState(false);
  const [isCustomFieldDrawerOpen, setIsCustomFieldDrawerOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [
    isCreateCompanySupplierDrawerOpen,
    setIsCreateCompanySupplierDrawerOpen,
  ] = useState(false);
  const [isCreateCustomFieldDrawerOpen, setIsCreateCustomFieldDrawerOpen] =
    useState(false);

  const settingsCategories = [
    'Create Role',
    'Solutions',
    'Company',
    'Supplier',
    'Default Currency',
    'Sales Vertical',
    'Custom field',
  ];

  const roles = [
    { id: 1, name: 'ISR' },
    { id: 2, name: 'PSE' },
    { id: 3, name: 'Sales Manager' },
  ];

  const solutions = [
    { id: 1, name: 'Solution 1' },
    { id: 2, name: 'Solution 2' },
  ];

  const companies = [
    { id: 1, name: 'Company 1' },
    { id: 2, name: 'Company 2' },
    { id: 3, name: 'Company 3' },
    { id: 4, name: 'Company 4' },
  ];

  const suppliers = [
    { id: 1, name: 'Supplier 1' },
    { id: 2, name: 'Supplier 2' },
  ];

  const salesVerticals = [
    { id: 1, name: 'Sales Vertical 1' },
    { id: 2, name: 'Sales Vertical 2' },
  ];

  const customFields = [
    { id: 1, name: 'Custom Field 1' },
    { id: 2, name: 'Custom Field 2' },
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'Create Role':
        return (
          <>
            <div className="space-y-3">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex justify-between items-center">
                    <Text className="text-gray-700 font-medium">
                      {role.name}
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => {
                          setSelectedItemToEdit(role.name);
                          setSelectedItemTypeToEdit('Role');
                          setIsEditDrawerOpen(true);
                        }}
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="text-gray-600 hover:text-red-600"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setModalPosition({
                            x: rect.left,
                            y: rect.bottom + 5,
                          });
                          setSelectedItemToDelete(role.name);
                          setSelectedItemType('role');
                          setIsRemoveRoleModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        );
      case 'Solutions':
        return (
          <>
            <div className="space-y-3">
              {solutions.map((solution) => (
                <Card
                  key={solution.id}
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex justify-between items-center">
                    <Text className="text-gray-700 font-medium">
                      {solution.name}
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => {
                          setSelectedItemToEdit(solution.name);
                          setSelectedItemTypeToEdit('Solution');
                          setIsEditDrawerOpen(true);
                        }}
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="text-gray-600 hover:text-red-600"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setModalPosition({
                            x: rect.left,
                            y: rect.bottom + 5,
                          });
                          setSelectedItemToDelete(solution.name);
                          setSelectedItemType('Solution');
                          setIsRemoveRoleModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        );

      case 'Company':
        return (
          <>
            <div className="space-y-3">
              {companies.map((company) => (
                <Card
                  key={company.id}
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex justify-between items-center">
                    <Text className="text-gray-700 font-medium">
                      {company.name}
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => {
                          setSelectedItemToEdit(company.name);
                          setSelectedItemTypeToEdit('Company');
                          setIsCompanySupplierDrawerOpen(true);
                        }}
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="text-gray-600 hover:text-red-600"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setModalPosition({
                            x: rect.left,
                            y: rect.bottom + 5,
                          });
                          setSelectedItemToDelete(company.name);
                          setSelectedItemType('Company');
                          setIsRemoveRoleModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        );

      case 'Supplier':
        return (
          <>
            <div className="space-y-3">
              {suppliers.map((supplier) => (
                <Card
                  key={supplier.id}
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex justify-between items-center">
                    <Text className="text-gray-700 font-medium">
                      {supplier.name}
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => {
                          setSelectedItemToEdit(supplier.name);
                          setSelectedItemTypeToEdit('Supplier');
                          setIsCompanySupplierDrawerOpen(true);
                        }}
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="text-gray-600 hover:text-red-600"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setModalPosition({
                            x: rect.left,
                            y: rect.bottom + 5,
                          });
                          setSelectedItemToDelete(supplier.name);
                          setSelectedItemType('Supplier');
                          setIsRemoveRoleModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        );

      case 'Default Currency':
        return (
          <>
            <div className="space-y-6">
              {/* Currency Selector */}
              <div className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <Text className="text-gray-900 font-semibold">
                    Currency Selector
                  </Text>
                  <div
                    className="text-gray-900 cursor-pointer transition-transform duration-200"
                    onClick={() =>
                      setIsCurrencySelectorExpanded(!isCurrencySelectorExpanded)
                    }
                  >
                    {isCurrencySelectorExpanded ? (
                      <UpOutlined />
                    ) : (
                      <DownOutlined />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isCurrencySelectorExpanded && (
                  <>
                    {/* Search Bar */}
                    <div className="relative my-4">
                      <input
                        type="text"
                        placeholder="Search Currency"
                        className="w-full p-3 border border-gray-200 rounded-lg pr-10 focus:outline-none focus:border-blue-500"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <SearchOutlined />
                      </div>
                    </div>

                    {/* Currency List */}
                    <div className="space-y-2">
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <Text className="text-gray-900 font-semibold text-center">
                          USD
                        </Text>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <Text className="text-gray-900 font-semibold text-center">
                          ETB
                        </Text>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg">
                        <Text className="text-gray-900 font-semibold text-center">
                          AED
                        </Text>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Default Currency */}
              <div className="p-4 border border-[#2563eb] rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <Text className="text-[#2563eb] font-medium">
                    Default Currency
                  </Text>
                  <Button className="bg-[#dbeafe] text-[#2563eb] border-[#bfdbfe] hover:bg-[#bfdbfe] hover:text-[#1d4ed8] hover:border-[#93c5fd]">
                    USD
                  </Button>
                </div>
              </div>

              {/* Currency Options */}
              <div className="space-y-3">
                <Text className="text-gray-700 font-medium block">
                  Available Currencies
                </Text>

                {/* USD - Active */}
                <Card
                  className="shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  bodyStyle={{ padding: '16px' }}
                  onClick={() => {
                    setSelectedCurrency('USD');
                    setIsSetDefaultModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-700">USD</Text>
                    <div className="w-12 h-6 bg-[#2563eb] rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                    </div>
                  </div>
                </Card>

                {/* ETB - Inactive */}
                <Card
                  className="shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  bodyStyle={{ padding: '16px' }}
                  onClick={() => {
                    setSelectedCurrency('ETB');
                    setIsSetDefaultModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-700">ETB</Text>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                    </div>
                  </div>
                </Card>

                {/* EUR - Inactive */}
                <Card
                  className="shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  bodyStyle={{ padding: '16px' }}
                  onClick={() => {
                    setSelectedCurrency('EUR');
                    setIsSetDefaultModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-700">EUR</Text>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                    </div>
                  </div>
                </Card>

                {/* AED - Inactive */}
                <Card
                  className="shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  bodyStyle={{ padding: '16px' }}
                  onClick={() => {
                    setSelectedCurrency('AED');
                    setIsSetDefaultModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-700">AED</Text>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        );

      case 'Sales Vertical':
        return (
          <>
            <div className="space-y-3">
              {salesVerticals.map((vertical) => (
                <Card
                  key={vertical.id}
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex justify-between items-center">
                    <Text className="text-gray-700 font-medium">
                      {vertical.name}
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => {
                          setSelectedItemToEdit(vertical.name);
                          setSelectedItemTypeToEdit('Sales Vertical');
                          setIsEditDrawerOpen(true);
                        }}
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="text-gray-600 hover:text-red-600"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setModalPosition({
                            x: rect.left,
                            y: rect.bottom + 5,
                          });
                          setSelectedItemToDelete(vertical.name);
                          setSelectedItemType('Sales Vertical');
                          setIsRemoveRoleModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        );

      case 'Custom field':
        return (
          <>
            <div className="space-y-3">
              {customFields.map((field) => (
                <Card
                  key={field.id}
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex justify-between items-center">
                    <Text className="text-gray-700 font-medium">
                      {field.name}
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-gray-600 hover:text-blue-600"
                        onClick={() => {
                          setSelectedItemToEdit(field.name);
                          setSelectedItemTypeToEdit('Custom Field');
                          setIsCustomFieldDrawerOpen(true);
                        }}
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="text-gray-600 hover:text-red-600"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setModalPosition({
                            x: rect.left,
                            y: rect.bottom + 5,
                          });
                          setSelectedItemToDelete(field.name);
                          setSelectedItemType('Custom Field');
                          setIsRemoveRoleModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="space-y-3">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className="shadow-md hover:shadow-lg transition-shadow duration-200"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex justify-between items-center">
                    <Text className="text-gray-700 font-medium">
                      {role.name}
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-gray-600 hover:text-blue-600"
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="text-gray-600 hover:text-red-600"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        );
    }
  };

  const getButtonText = () => {
    switch (selectedCategory) {
      case 'Create Role':
        return 'Create Role';
      case 'Solutions':
        return 'Create Solution';
      case 'Company':
        return 'Create Company';
      case 'Supplier':
        return 'Create Supplier';
      case 'Sales Vertical':
        return 'Create Sales Vertical';
      case 'Custom field':
        return 'Create Custom Field';

      default:
        return 'Create a Role';
    }
  };

  const shouldShowButton = () => {
    return selectedCategory !== 'Default Currency';
  };

  const handleCreateClick = () => {
    switch (selectedCategory) {
      case 'Create Role':
        setIsCreateDrawerOpen(true);
        break;
      case 'Solutions':
        setIsCreateDrawerOpen(true);
        break;
      case 'Company':
        setIsCreateCompanySupplierDrawerOpen(true);
        break;
      case 'Supplier':
        setIsCreateCompanySupplierDrawerOpen(true);
        break;
      case 'Sales Vertical':
        setIsCreateDrawerOpen(true);
        break;
      case 'Custom field':
        setIsCreateCustomFieldDrawerOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <Title level={3} className="mb-1">
          Global Settings
        </Title>
        <Text className="text-gray-600">Manage Your Lead Settings</Text>
      </div>

      {/* Dynamic Create Button - Outside main layout */}
      {shouldShowButton() && (
        <div className="flex justify-end mb-6">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
            onClick={handleCreateClick}
          >
            {getButtonText()}
          </Button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-80">
          <Card>
            <Title level={5} className="mb-4 font-bold">
              Global Settings
            </Title>

            {/* Settings Categories */}
            <div className="space-y-2">
              {settingsCategories.map((category, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left rounded-md ${
                    selectedCategory === category
                      ? 'bg-[#2563eb] text-white border-[#2563eb] hover:bg-[#1d4ed8] hover:border-[#1d4ed8]'
                      : 'text-[#2563eb] border-[#2563eb] hover:border-[#1d4ed8] hover:text-[#1d4ed8] hover:bg-[#eff6ff]'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">{renderContent()}</div>
      </div>

      {/* Set Default Currency Confirmation Modal */}
      <SetDefaultModal
        isOpen={isSetDefaultModalOpen}
        onClose={() => {
          setIsSetDefaultModalOpen(false);
          setSelectedCurrency('');
        }}
        onConfirm={() => {
          setIsSetDefaultModalOpen(false);
          setSelectedCurrency('');
        }}
        selectedCurrency={selectedCurrency}
      />

      <RemoveModal
        isOpen={isRemoveRoleModalOpen}
        onClose={() => {
          setIsRemoveRoleModalOpen(false);
          setSelectedItemToDelete('');
          setSelectedItemType('');
        }}
        onConfirm={() => {
          setIsRemoveRoleModalOpen(false);
          setSelectedItemToDelete('');
          setSelectedItemType('');
        }}
        selectedItem={selectedItemToDelete}
        itemType={selectedItemType}
        position={modalPosition}
      />

      <EditDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => {
          setIsEditDrawerOpen(false);
          setSelectedItemToEdit('');
          setSelectedItemTypeToEdit('');
        }}
        onSave={() => {
          setIsEditDrawerOpen(false);
          setSelectedItemToEdit('');
          setSelectedItemTypeToEdit('');
        }}
        itemType={selectedItemTypeToEdit}
        itemName={selectedItemToEdit}
      />

      <CompanySupplierDrawer
        isOpen={isCompanySupplierDrawerOpen}
        onClose={() => setIsCompanySupplierDrawerOpen(false)}
        onSave={() => {
          setIsCompanySupplierDrawerOpen(false);
        }}
        itemType={selectedItemTypeToEdit}
        itemData={{}}
      />

      <CustomFieldDrawer
        isOpen={isCustomFieldDrawerOpen}
        onClose={() => setIsCustomFieldDrawerOpen(false)}
        onSave={() => {
          setIsCustomFieldDrawerOpen(false);
        }}
        itemData={{}}
      />

      {/* Create Drawers */}
      <CreateDrawer
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
        onSave={() => {
          setIsCreateDrawerOpen(false);
        }}
        itemType={selectedCategory}
      />

      <CreateCompanySupplierDrawer
        isOpen={isCreateCompanySupplierDrawerOpen}
        onClose={() => setIsCreateCompanySupplierDrawerOpen(false)}
        onSave={() => {
          setIsCreateCompanySupplierDrawerOpen(false);
        }}
        itemType={selectedCategory}
      />

      <CreateCustomFieldDrawer
        isOpen={isCreateCustomFieldDrawerOpen}
        onClose={() => setIsCreateCustomFieldDrawerOpen(false)}
        onSave={() => {
          setIsCreateCustomFieldDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default SettingsPage;
