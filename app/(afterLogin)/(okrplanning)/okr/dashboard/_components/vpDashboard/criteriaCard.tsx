'use client';
import React from 'react';

const CriteriaCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Criteria Card</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Criteria 1</span>
          <span className="text-sm text-gray-500">Value</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Criteria 2</span>
          <span className="text-sm text-gray-500">Value</span>
        </div>
      </div>
    </div>
  );
};

export default CriteriaCard;
