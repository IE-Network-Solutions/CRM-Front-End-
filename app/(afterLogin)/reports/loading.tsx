'use client';

import React from 'react';
import { Card, Skeleton, Row, Col } from 'antd';

const ReportsLoading: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section Skeleton */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Skeleton.Input active size="large" style={{ width: 200 }} />
          <Skeleton.Input active size="small" style={{ width: 150, marginTop: 8 }} />
        </div>
        <div className="flex gap-3">
          <Skeleton.Button active size="large" style={{ width: 80 }} />
          <Skeleton.Button active size="large" style={{ width: 80 }} />
        </div>
      </div>

      {/* Key Metrics Section Skeleton */}
      <Row gutter={[16, 16]} className="mb-6">
        {[1, 2, 3, 4].map((item) => (
          <Col xs={24} sm={12} lg={6} key={item}>
            <Card className="shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Skeleton.Input active size="small" style={{ width: 120, marginBottom: 8 }} />
                  <Skeleton.Input active size="large" style={{ width: 80, marginBottom: 8 }} />
                  <Skeleton.Input active size="small" style={{ width: 100 }} />
                </div>
                <Skeleton.Avatar active size={40} shape="circle" />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Performance Tables Section Skeleton */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title={<Skeleton.Input active size="small" style={{ width: 150 }} />} className="shadow-sm">
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<Skeleton.Input active size="small" style={{ width: 150 }} />} className="shadow-sm">
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </Col>
      </Row>

      {/* Sector Performance Table Skeleton */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title={<Skeleton.Input active size="small" style={{ width: 200 }} />} className="shadow-sm">
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportsLoading;
