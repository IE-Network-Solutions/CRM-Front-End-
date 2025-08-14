"use client"

import { Button } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

interface CustomPaginationProps {
  current: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

export function CustomPagination({ current, total, pageSize, onChange }: CustomPaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (current >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page)
    }
  }

  return (
    <div className="flex items-center justify-between" data-cy="pagination-container">
      <div className="text-sm text-gray-700">
        Showing {((current - 1) * pageSize) + 1} to {Math.min(current * pageSize, total)} of {total} results
      </div>
      
      <div className="flex items-center space-x-2" data-cy="pagination-controls">
        <Button
          icon={<LeftOutlined />}
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1}
          size="small"
          data-cy="pagination-prev-button"
        />
        
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-1 text-gray-500"
                data-cy={index < getPageNumbers().length / 2 ? "pagination-left-ellipsis" : "pagination-right-ellipsis"}
              >
                ...
              </span>
            )
          }
          
          return (
            <Button
              key={page}
              type={current === page ? "primary" : "default"}
              onClick={() => handlePageChange(page as number)}
              size="small"
              data-cy={`pagination-page-${page}`}
            >
              {page}
            </Button>
          )
        })}
        
        <Button
          icon={<RightOutlined />}
          onClick={() => handlePageChange(current + 1)}
          disabled={current === totalPages}
          size="small"
          data-cy="pagination-next-button"
        />
      </div>
    </div>
  )
}
