'use client';

import React from 'react';
import { Card, Table } from 'antd';

interface PerformanceTableProps {
  title: string;
  dataSource: any[];
  columns: any[];
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({
  title,
  dataSource,
  columns,
}) => {
  return (
    <Card title={title}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
        rowClassName={(record, index) =>
          index !== undefined && index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
        }
      />
    </Card>
  );
};

export default PerformanceTable;
