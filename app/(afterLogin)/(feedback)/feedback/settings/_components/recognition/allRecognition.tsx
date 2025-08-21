import React from 'react';

interface AllRecognitionProps {
  data: any[];
  all?: boolean;
}

const AllRecognition: React.FC<AllRecognitionProps> = ({
  data,
  all = false,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-600">
        {all ? 'All Recognitions' : 'Recognition Details'}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {data?.length || 0} recognition(s) found
      </div>
      {data?.length === 0 && (
        <div className="mt-4 text-center text-gray-400">
          No recognition data available
        </div>
      )}
    </div>
  );
};

export default AllRecognition;
