'use client';
import React from 'react';
import { ArrowLeftOutlined, EditOutlined, WarningOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Avatar } from 'antd';
import PageHeader from '@/components/common/pageHeader/pageHeader';
import CustomButton from '@/components/common/buttons/customButton';

const DealDetails = () => {
  const handleBack = () => {
    // Handle back navigation
    window.history.back();
  };

  const handleActivity = () => {
    // Handle activity button click
    console.log('Activity clicked');
  };

  const handleEdit = (section: string) => {
    // Handle edit for different sections
    console.log(`Edit ${section}`);
  };

  const handleRemoveDeal = () => {
    // Handle remove deal
    console.log('Remove deal clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="text-[#4080f0] border-[#4080f0] h-10 w-10"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deal Name</h1>
              <p className="text-gray-600">View and manage your lead.</p>
            </div>
          </div>
          <CustomButton
            title="Activity"
            onClick={handleActivity}
            className="bg-blue-600 hover:bg-blue-700"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Contact Information Card */}
          <Card className="shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit('contact')}
                className="text-gray-500 hover:text-gray-700"
              />
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-green-600 mb-4">$400,000</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-900">Nahom Esrael</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-900">companymail@mail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Phone:</span>
                <span className="text-gray-900">0914534543</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Company:</span>
                <span className="text-gray-900">XYZ Tech</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Source:</span>
                <span className="text-gray-900">Internal Source</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button
                type="primary"
                danger
                icon={<WarningOutlined />}
                onClick={handleRemoveDeal}
                className="w-full"
              >
                Remove Deal
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Business Information Card */}
          <Card className="shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit('business')}
                className="text-gray-500 hover:text-gray-700"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Deal name:</span>
                <span className="text-gray-900">XYZ tech account</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Website:</span>
                <span className="text-gray-900">xyztech.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Company:</span>
                <span className="text-gray-900">xyztech@mail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Industry:</span>
                <span className="text-gray-900">Medical</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Roles:</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <Tag key={index} className="bg-gray-100 text-gray-600 border-gray-200">
                      F
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Account Owner:</span>
                <span className="text-gray-900">Robel Zeleke</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Phone:</span>
                <span className="text-gray-900">0115985437</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Created By:</span>
                <span className="text-gray-900">Robel Zelek</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Deal Status:</span>
                <Tag color="green" className="font-medium">Qualified</Tag>
              </div>
            </div>
          </Card>

          {/* Address Information Card */}
          <Card className="shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit('address')}
                className="text-gray-500 hover:text-gray-700"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Billing State:</span>
                <span className="text-gray-900">State Name</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Billing City:</span>
                <span className="text-gray-900">Billing City Name</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Billing Code:</span>
                <span className="text-gray-900">Billing Code Number</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Shipping Address:</span>
                <span className="text-gray-900">Shipping Address Name</span>
              </div>
            </div>
          </Card>

          {/* Timeline Information Card */}
          <Card className="shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Timeline Information</h3>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit('timeline')}
                className="text-gray-500 hover:text-gray-700"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Created:</span>
                <span className="text-gray-900">Jan 5, 2025, 12:00PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Last Update:</span>
                <span className="text-gray-900">Jan 5, 2025, 12:00PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Total Activities:</span>
                <span className="text-gray-900">2 activities</span>
              </div>
            </div>
          </Card>

          {/* Attached Files Card */}
          <Card className="shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Attached Files</h3>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit('files')}
                className="text-gray-500 hover:text-gray-700"
              />
            </div>

            <div className="space-y-3">
              {[1, 2].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <FileTextOutlined className="text-gray-500 text-lg" />
                  <span className="text-gray-600">Uploaded File Name</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DealDetails;