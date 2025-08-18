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
  columns
}) => {
  return (
    <Card title={title}>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={false}
        size="small"
      />
    </Card>
  );
};

export default PerformanceTable;
