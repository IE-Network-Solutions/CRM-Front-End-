import React from 'react';

interface IssuedReprimandProps {
  kpi: number;
  engagement: number;
}

const IssuedReprimand: React.FC<IssuedReprimandProps> = ({
  kpi,
  engagement,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-600">Issued Reprimands</div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500">KPI</div>
          <div className="text-lg font-semibold text-red-600">{kpi}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Engagement</div>
          <div className="text-lg font-semibold text-red-600">{engagement}</div>
        </div>
      </div>
    </div>
  );
};

export default IssuedReprimand;
