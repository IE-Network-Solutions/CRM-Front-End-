'use client';

import { FC, ReactNode } from 'react';
import { IoMdSettings } from 'react-icons/io';
import PageHeader from '@/components/common/pageHeader/pageHeader';
import BlockWrapper from '@/components/common/blockWrapper/blockWrapper';
import { SidebarMenuItem } from '@/types/sidebarMenu';
import SidebarMenu from '@/components/sidebarMenu';
import { usePathname } from 'next/navigation';

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout: FC<SettingsLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  // Sidebar Menu Items
  const menuItems = new SidebarMenuItem([
    {
      item: {
        key: 'rolePermission',
        icon: (
          <div
            className={`lg:flex items-center gap-2 ${pathname.includes('/employees/settings/rolePermission') ? 'lg:ml-4' : ''}`}
          >
            <IoMdSettings
              className={`hidden lg:block ${pathname.includes('/employees/settings/rolePermission') ? 'text-[#1677FF]' : ''}`}
            />
            <p>Role Permission</p>
          </div>
        ),
      },
      link: '/employees/settings/rolePermission',
    },
  ]);

  // Handle Menu Clicks
  // const handleMenuClick: MenuProps['onClick'] = (e) => {
  //   setSelectedKey(e.key);
  // };

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 ">
      <div className="h-auto w-auto">
        <PageHeader
          title="Settings"
          description="Manage your system settings here"
        />

        <div className="flex  flex-col lg:flex-row gap-6  mt-1 sm:mt-3">
          <SidebarMenu menuItems={menuItems} />
          <BlockWrapper
            padding="0px"
            className="bg-[#fafafa] flex-1 h-max overflow-x-auto p-0"
          >
            {children}
          </BlockWrapper>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
