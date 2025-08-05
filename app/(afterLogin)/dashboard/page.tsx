'use client';
import { useGetActiveFiscalYears } from '@/store/server/features/organizationStructure/fiscalYear/queries';
import { Skeleton } from 'antd';
import { Permissions } from '@/types/commons/permissionEnum';
import { useFiscalYearRedirect } from '@/hooks/useFiscalYearRedirect';
import AccessGuard from '@/utils/permissionGuard';

export default function Home() {
  useFiscalYearRedirect(); // 👈 Activate fiscal year redirect logic

  const { data: activeCalender, isLoading: isResponseLoading } =
    useGetActiveFiscalYears({
      refetchInterval: 30000, // Keep polling for banner display
    });

  const hasEndedFiscalYear =
    activeCalender?.isActive &&
    activeCalender?.endDate &&
    new Date(activeCalender?.endDate) < new Date();

  return (
    <div>
      {isResponseLoading && <Skeleton active paragraph={{ rows: 0 }} />}
      {hasEndedFiscalYear && (
        <AccessGuard permissions={[Permissions.CreateCalendar]}>
          <div
            className="bg-[#323B49] p-2 rounded-lg h-12 flex items-center justify-start text-md gap-2 cursor-pointer hover:bg-[#3a4354] transition"
            onClick={() => {
              window.location.href =
                '/organization/settings/fiscalYear/fiscalYearCard';
            }}
            title="Go to Fiscal Year Settings"
          >
            <span className="text-[#FFDE65] px-2">
              Your fiscal year has ended
            </span>
            <span className="text-white">
              Please contact your system admin for more information
            </span>
          </div>
        </AccessGuard>
      )}
      {/* If user does not have permission, show non-clickable banner */}
      {hasEndedFiscalYear && (
        <AccessGuard permissions={[]}>
          <div className="bg-[#323B49] p-2 rounded-lg h-12 flex items-center justify-start text-md gap-2">
            <span className="text-[#FFDE65] px-2">
              Your fiscal year has ended
            </span>
            <span className="text-white">
              Please contact your system admin for more information
            </span>
          </div>
        </AccessGuard>
      )}
      <div className="flex flex-col gap-4">Dashboard</div>
    </div>
  );
}
