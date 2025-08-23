'use client';
import React, { useEffect, useState } from 'react';
import useStepStore from '@/store/uistate/features/organizationStructure/steper/useStore';
import { Button, Card, Typography } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function getBrowserGMTOffset(): string {
  const offsetMinutes = new Date().getTimezoneOffset();
  const totalMinutes = -offsetMinutes;

  const sign = totalMinutes >= 0 ? '+' : '-';
  const absMinutes = Math.abs(totalMinutes);
  const hours = Math.floor(absMinutes / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (absMinutes % 60).toString().padStart(2, '0');

  return `${sign}${hours}:${minutes}`;
}

function TimeZone() {
  const { nextStep } = useStepStore();
  const [detectedTimeZone, setDetectedTimeZone] = useState<string>('');

  useEffect(() => {
    setDetectedTimeZone(getBrowserGMTOffset());
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 p-4 md:p-6 lg:p-8 rounded-lg my-4 md:my-6 lg:my-8 w-full h-full">
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg w-full h-full">
        <div className="flex flex-col md:flex-row justify-start items-center gap-2 md:gap-4 font-bold text-xl md:text-2xl text-black mt-4 md:mt-8">
          Set up your Timezone
        </div>

        {/* Simple Timezone Display */}
        <Card className="mt-6" style={{ maxWidth: 400 }}>
          <div className="flex items-center gap-3">
            <GlobalOutlined className="text-blue-500 text-xl" />
            <div>
              <Title level={5} className="mb-1">
                Detected Timezone
              </Title>
              <Text className="text-lg font-mono bg-gray-100 px-3 py-2 rounded">
                GMT {detectedTimeZone}
              </Text>
            </div>
          </div>
          <Text className="text-gray-600 mt-3 block">
            Your timezone has been automatically detected. You can change this
            later in your account settings.
          </Text>
        </Card>

        <br />
        <div className="text-center">
          <Button
            onClick={() => nextStep()}
            name="skipButton"
            type="link"
            htmlType="button"
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TimeZone;
