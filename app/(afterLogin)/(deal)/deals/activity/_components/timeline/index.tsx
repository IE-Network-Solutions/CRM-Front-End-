import { Card, Badge, Button, Tooltip, Space, Input } from 'antd';
import { Mail, Phone } from 'lucide-react';
import {
  CheckOutlined,
  CloseOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

interface TimelineItem {
  id: string;
  time: string;
  date: string;
  title: string;
  assignee: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  type: 'email' | 'phone';
  attachments: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    time: '12:00AM',
    title: 'Send Emails to clients',
    assignee: 'Robel Kebede',
    category: 'Deal title',
    priority: 'Low',
    type: 'email',
    date: '24 May 2025',
    attachments: [],
  },
  {
    id: '2',
    time: '12:00AM',
    title: 'Send Emails to clients',
    assignee: 'Robel Kebede',
    category: 'Deal title',
    priority: 'Low',
    type: 'phone',
    date: '24 May 2025',
    attachments: ['Attachment 1', 'Attachment 2'],
  },
  {
    id: '3',
    time: '12:00AM',
    title: 'Send Emails to clients',
    assignee: 'Robel Kebede',
    category: 'Deal title',
    priority: 'Low',
    type: 'phone',
    date: '24 May 2025',
    attachments: ['Attachment 1', 'Attachment 2'],
  },
];
const DatePill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="inline-flex rounded-md bg-white text-[#94dcf7] shadow-md border border-[#94dcf7] text-xs pl-2 pr-10 py-2">
    {children}
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

export function Timeline() {
  const [text, setText] = useState('');
  const notePlaceholder = 'Note';

  return (
    <div className="relative mx-6 mb-6">
      <div className="absolute left-28 top-0 bottom-0 w-0.5 bg-gray-300"></div>

      <div className="space-y-8">
        {timelineData.map((item) => (
          <div key={item.id} className="relative">
            <div className="pl-10 mb-8">
              <DatePill>{item.date}</DatePill>
            </div>
            {/* icon */}
            <div className="absolute left-28 top-4 transform -translate-x-1/2 z-20">
              <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-sm my-16">
                {item.type === 'email' ? (
                  <Mail className="w-4 h-4 text-blue-500" />
                ) : (
                  <Phone className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>

            <div
              className={`group relative rounded-2xl bg-transparent hover:border hover:border-slate-200 hover:shadow-lg hover:bg-slate-50/30 transition-all duration-300`}
            >
              <Card
                bordered={false}
                className="relative bg-transparent backdrop-blur-none shadow-none hover:border hover:border-gray-200 h-32"
              >
                <div className="flex ">
                  <div className="w-20 flex-shrink-0 pr-3">
                    <div className="text-sm font-medium text-gray-600">
                      {item.time}
                    </div>
                  </div>

                  {/* priority, title, assignee, category */}
                  <div className="flex-1 min-w-0 pl-10">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        color="green"
                        className="bg-[#eaf7ed] text-green-700 hover:bg-green-100 text-xs font-semibold px-3 rounded-md border  border-[#358648]"
                      >
                        {item.priority}
                      </Badge>
                    </div>

                    <p className="font-semibold text-gray-900 ">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.assignee}
                    </p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>

                  <div className="bg-transparent backdrop-blur-none rounded-lg p-3 w-[600px]">
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex-1">
                        <div className="mt-3 ">
                          <div className="relative">
                            <div className="border border-slate-200 hover:border-slate-300 rounded-xl transition-all p-2 h-14">
                              <div className="flex items-start gap-2">
                                {item.attachments.length > 0 && (
                          <div className="flex flex-nowrap gap-1 h-[18px]">
                            {item.attachments.map((attachment, index) => (
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLTextAreaElement>,
                                ) => setText(e.target.value)}
                                placeholder={notePlaceholder}
                                autoSize={{ minRows: 1, maxRows: 2 }}
                                className="border-none shadow-none p-1 resize-none focus:shadow-none"
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
                            <Button
                              shape="circle"
                              danger
                              icon={<CloseOutlined />}
                            />
                          </Tooltip>
                        </Space>
                      </div>
                    </div>

                    {/* <div className="flex gap-1 justify-end">
                      <Button
                        variant="text"
                        size="small"
                        className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="text" size="small" className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white">
                        <X className="w-4 h-4" />
                      </Button>
                    </div> */}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
