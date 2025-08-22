import {Card, Badge, Button} from 'antd'
import { Mail, Phone, Edit, Check, X } from "lucide-react"

interface TimelineItem {
  id: string
  time: string
  date: string
  title: string
  assignee: string
  category: string
  priority: "Low" | "Medium" | "High"
  type: "email" | "phone"
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    time: "12:00AM",
    title: "Send Emails to clients",
    assignee: "Robel Kebede",
    category: "Deal title",
    priority: "Low",
    type: "email",
    date: "24 May 2025",
  },
  {
    id: "2",
    time: "12:00AM",
    title: "Send Emails to clients",
    assignee: "Robel Kebede",
    category: "Deal title",
    priority: "Low",
    type: "phone",
    date: "24 May 2025",
  },
  {
    id: "3",
    time: "12:00AM",
    title: "Send Emails to clients",
    assignee: "Robel Kebede",
    category: "Deal title",
    priority: "Low",
    type: "phone",
    date: "24 May 2025",
  },
]
const DatePill: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className="inline-flex rounded-full bg-white shadow-md border border-slate-200 text-slate-500 text-xs px-3 py-1">
      {children}
    </div>
  );

export function Timeline() {
  return (
    <div className="relative max-w-4xl mx-auto py-8">
      <div className="absolute left-28 top-0 bottom-0 w-0.5 bg-gray-300"></div>

      <div className="space-y-8">
        {timelineData.map((item, index) => (
          <div key={item.id} className="relative">
            <div className="">
            <DatePill>{item.date}</DatePill>
          </div>
            <div className="absolute left-28 top-4 transform -translate-x-1/2 z-20">
              <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-sm">
                {item.type === "email" ? (
                  <Mail className="w-4 h-4 text-blue-500" />
                ) : (
                  <Phone className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>

            <Card className="relative bg-transparent backdrop-blur-none shadow-sm border border-gray-200/30">
              <div className="flex items-start p-4">
                <div className="w-20 flex-shrink-0">
                  <div className="text-sm font-medium text-gray-600">{item.time}</div>
                </div>

                <div className="flex-1 min-w-0 pl-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                    color="green"
                      className="bg-green-100 text-green-700 hover:bg-green-100 text-xs px-2 py-1"
                    >
                      {item.priority}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{item.assignee}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>

                <div className="ml-6 flex-shrink-0">
                  <div className="bg-transparent backdrop-blur-none rounded-lg p-3 w-48">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Notes</span>
                      <Button variant="text" size="small" className="h-6 w-6 p-0">
                        <Edit className="w-3 h-3 text-gray-400" />
                      </Button>
                    </div>

                    <div className="flex gap-1 justify-end">
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
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
