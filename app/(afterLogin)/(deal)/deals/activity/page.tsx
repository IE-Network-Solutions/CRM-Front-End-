'use client';

import React, { useState } from 'react';
import {
  Button,
  Tag,
  Input,
  Tooltip,
  Space,
  ConfigProvider,
} from 'antd';
import {
  ArrowLeftOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckOutlined,
  CloseOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { LuSettings2 } from 'react-icons/lu';
import { RiExchange2Line } from 'react-icons/ri';
import { Timeline } from './_components/timeline';

const DatePill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="inline-flex rounded-full bg-white shadow-md border border-slate-200 text-slate-500 text-xs px-3 py-1">
    {children}
  </div>
);

const PriorityTag: React.FC<{ level: 'Low' | 'High' }> = ({ level }) => (
  <Tag color={level === 'High' ? 'red' : 'green'} className="rounded-full px-2">
    {level}
  </Tag>
);

const PersonMeta: React.FC<{ name: string; deal: string }> = ({
  name,
  deal,
}) => (
  <div className="text-xs text-slate-500 leading-tight">
    <div>{name}</div>
    <div className="text-slate-400">{deal}</div>
  </div>
);

// const Attachments: React.FC<{ items: string[] }> = ({ items }) => (
//   <div className="flex flex-wrap gap-2">
//     {items.map((t, i) => (
//       <Tag key={i} className="rounded-full px-3 bg-slate-50">
//         {t}
//       </Tag>
//     ))}
//   </div>
// );

const TimeStamp: React.FC<{ time: string }> = ({ time }) => (
  <div className="w-24 text-right pr-4 text-slate-400 text-sm shrink-0">
    {time}
  </div>
);

type ActivityCardProps = {
  icon?: 'mail' | 'phone' | 'clock';
  title: string;
  person?: string;
  deal?: string;
  priority?: 'Low' | 'High';
  notes?: boolean;
  attachments?: string[];
  notePlaceholder?: string;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  icon = 'mail',
  title,
  person = 'Robel Kebede',
  deal = 'Deal title',
  priority = 'Low',
  attachments = [],
  notePlaceholder = 'Notes',
}) => {
  const [text, setText] = useState('');
  const Icon =
    icon === 'mail'
      ? MailOutlined
      : icon === 'phone'
        ? PhoneOutlined
        : ClockCircleOutlined;
  const leftStripe =
    priority === 'High'
      ? 'border-l-4 border-l-rose-400'
      : 'border-l-4 border-l-emerald-400';

  return (
    <div
      className={`group relative rounded-2xl bg-white border ${leftStripe} border-slate-200 shadow-md hover:shadow-lg hover:bg-slate-50/30 transition-all duration-300`}
    >
      <div className="p-4 sm:p-5">
        <div>
          <div className="flex justify-self-auto items-center gap-2">
            <div className="flex items-center gap-2">
              <TimeStamp time={'12:00AM'} />

              <div className="h-8 w-8 rounded-full bg-sky-50 flex items-center justify-center ring-1 ring-sky-200">
                <Icon className="text-sky-500" />
              </div>
            </div>
            <div className="mt-1">
              <PriorityTag level={priority} />
              <div className="font-semibold text-slate-800">{title}</div>
              <PersonMeta name={person} deal={deal} />
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex-1">
                <div className="mt-3">
                  <div className="relative">
                    <div className="border border-slate-200 hover:border-slate-300 rounded-xl transition-all min-h-[80px] p-3 bg-white">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-slate-500 text-sm font-medium">
                          Notes:
                        </span>
                        {attachments.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-xs"
                              >
                                <span className="text-slate-700">
                                  {attachment}
                                </span>
                                <CloseOutlined className="text-slate-400 hover:text-slate-600 cursor-pointer" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <Input.TextArea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={notePlaceholder}
                        autoSize={{ minRows: 1, maxRows: 2 }}
                        className="border-none shadow-none p-0 resize-none focus:shadow-none"
                        style={{ background: 'transparent' }}
                      />
                      <div className="absolute top-2 right-2">
                        <PaperClipOutlined className="text-slate-400 hover:text-slate-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Hover actions */}
              <div className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <Space>
                  <Tooltip title="Save">
                    <Button
                      shape="circle"
                      type="primary"
                      icon={<CheckOutlined />}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button shape="circle" danger icon={<CloseOutlined />} />
                  </Tooltip>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-2 sm:gap-4">
    <div className="flex-1">{children}</div>
  </div>
);

export default function DealActivityPage() {
  return (
    <ConfigProvider
      theme={{ token: { borderRadius: 12, colorPrimary: '#2563eb' } }}
    >
      <div>
        {/* Header */}
        <div className="mb-6 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="text-[#4080f0] border-[#4080f0] h-10 w-10"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Deal Activity
                </h1>
                <p className="text-gray-600">
                  View and manage your deal activity
                </p>
              </div>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-[#4080f0] hover:bg-[#4080f0] text-white h-10"
            >
              Create Activity
            </Button>
          </div>
          <div className="flex justify-end mt-5">
            <div className="flex gap-2">
              <Button
                icon={<LuSettings2 className="text-[#4080f0]" size={20} />}
                className="h-10 border-[#4080f0] text-[#4080f0]"
              >
                Filter
              </Button>
              <Button
                icon={<RiExchange2Line className="text-[#4080f0]" size={20} />}
                className="h-10 border-[#4080f0] text-[#4080f0]"
              >
                Action
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {/* <div className="mt-8">
          <div className="ml-28 sm:ml-32 mb-3">
            <DatePill>24 May 2025</DatePill>
          </div>
          <Timeline
            className="ml-28 sm:ml-32"
            items={[
              {
                dot: <ClockCircleOutlined className="text-sky-500" />,
                children: (
                  <Row>
                    <ActivityCard
                      icon="mail"
                      title="Send Emails to clients"
                      priority="Low"
                      notes
                    />
                  </Row>
                ),
              },
              {
                dot: <PhoneOutlined className="text-emerald-500" />,
                children: (
                  <Row>
                    <ActivityCard
                      icon="phone"
                      title="Send Emails to clients"
                      priority="Low"
                      notes
                    />
                  </Row>
                ),
              },
            ]}
          />

          <div className="ml-28 sm:ml-32 mt-2 mb-3">
            <DatePill>24 May 2025</DatePill>
          </div>
          <Timeline
            className="ml-28 sm:ml-32"
            items={[
              {
                dot: <MailOutlined className="text-emerald-500" />,
                children: (
                  <Row>
                    <ActivityCard
                      icon="mail"
                      title="Share Document with Client"
                      priority="Low"
                      attachments={[
                        'File Name',
                        'File Name',
                        'File Name',
                        'File Name',
                      ]}
                    />
                  </Row>
                ),
              },
              {
                dot: <MailOutlined className="text-rose-500" />,
                children: (
                  <Row>
                    <ActivityCard
                      icon="mail"
                      title="Send Emails to clients"
                      priority="High"
                      notes
                      notePlaceholder="Lorem ipsum dolor sit amet consectetur. Dolor tristique consectetur odio tempus."
                      attachments={[
                        'File Name',
                        'File Name',
                        'File Name',
                        'File Name',
                      ]}
                    />
                  </Row>
                ),
              },
            ]}
          />
        </div> */}
         <div className="min-h-screen bg-white">
    <div className="">
      <Timeline />
    </div>
  </div>
      </div>
    </ConfigProvider>
   
  );
}
