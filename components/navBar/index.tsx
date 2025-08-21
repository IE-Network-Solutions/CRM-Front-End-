'use client';
import React, { ReactNode, useState, useEffect } from 'react';
import '../../app/globals.css';
import { useRouter, usePathname } from 'next/navigation';
import {
  MenuOutlined,
  BarChartOutlined,
  SettingOutlined,
  DashboardOutlined,
  AimOutlined,
  SwapOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { Layout, Button, theme, Tree, Skeleton, Dropdown } from 'antd';

const { Header, Content, Sider } = Layout;
import NavBar from './topNavBar';

import { removeCookie } from '@/helpers/storageHelper';
import { useAuthenticationStore } from '@/store/uistate/features/authentication';
import Logo from '../common/logo';
import SimpleLogo from '../common/logo/simpleLogo';
import AccessGuard from '@/utils/permissionGuard';

interface CustomMenuItem {
  key: string;
  icon?: React.ReactNode;
  title: React.ReactNode; // Changed from `label` to `title`
  className?: string;
  permissions?: string[];
  children?: CustomMenuItem[];
  disabled?: boolean;
}

interface MyComponentProps {
  children: ReactNode;
}

const Nav: React.FC<MyComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { userData } = useAuthenticationStore();
  const isLoading = false;
  const isAdminPage = pathname.startsWith('/admin');

  const [expandedKeys, setExpandedKeys] = useState<
    (string | number | bigint)[]
  >([]);
  const [selectedKeys, setSelectedKeys] = useState<
    (string | number | bigint)[]
  >([pathname]);

  // ===========> Fiscal Year Ended Section <=================

  const { token } = useAuthenticationStore();
  const refetch = () => {};

  useEffect(() => {
    refetch();
  }, [token]);

  // ===========> Fiscal Year Ended Section <=================

  // Separate array for routes that should be accessible but not shown in navigation
  const hiddenRoutes: { key: string; permissions: string[] }[] = [
    {
      key: '/dashboard',
      permissions: [], // No permissions required
    },
    {
      key: '/',
      permissions: [], // No permissions required
    },
    {
      key: '/leads',
      permissions: [],
    },
    {
      key: '/deals',
      permissions: [],
    },
    {
      key: '/activity',
      permissions: [],
    },

    {
      key: '/settings',
      permissions: [], // No permissions required
    },
    {
      key: '/reports',
      permissions: [], // No permissions required
    },
  ];

  const getRoutesAndPermissions = (
    menuItems: CustomMenuItem[],
  ): { route: string; permissions: string[] }[] => {
    const routes: { route: string; permissions: string[] }[] = [];

    const traverse = (items: CustomMenuItem[]) => {
      items.forEach((item) => {
        if (item.key) {
          routes.push({
            route: item.key,
            permissions: item.permissions || [],
          });
        }

        if (item.children) {
          traverse(item.children);
        }
      });
    };

    // First add hidden routes
    hiddenRoutes.forEach((route) => {
      if (route.key) {
        routes.push({
          route: route.key,
          permissions: route.permissions || [],
        });
      }
    });

    // Then add visible menu routes
    traverse(menuItems);
    return routes;
  };

  const textClass = (route: string) =>
    pathname.startsWith(route) ? 'text-[#2563eb] font-semibold' : '';

  const treeData: CustomMenuItem[] = [
    {
      title: (
        <div
          className="flex items-center gap-2 h-12 cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          <DashboardOutlined
            size={18}
            className={
              pathname.startsWith('/dashboard') ? 'text-[#2563eb]' : ''
            }
          />
          <span className={textClass('/dashboard')}>Dashboard</span>
        </div>
      ),
      key: '/dashboard',
      className: 'font-bold',
      permissions: [],
    },
    {
      title: (
        <div
          className="flex items-center gap-2 h-12 cursor-pointer"
          onClick={() => router.push('/leads')}
        >
          <AimOutlined
            size={18}
            className={pathname.startsWith('/leads') ? 'text-[#2563eb]' : ''}
          />
          <span className={textClass('/leads')}>Leads</span>
        </div>
      ),
      key: '/leads',
      className: 'font-bold',
      permissions: [],
    },
    {
      title: (
        <div
          className="flex items-center gap-2 h-12 cursor-pointer"
          onClick={() => router.push('/deals')}
        >
          <SwapOutlined
            size={18}
            className={pathname.startsWith('/deals') ? 'text-[#2563eb]' : ''}
          />
          <span className={textClass('/deals')}>Deals</span>
        </div>
      ),
      key: '/deals',
      className: 'font-bold',
      permissions: [],
    },
    {
      title: (
        <div
          className="flex items-center gap-2 h-12 cursor-pointer"
          onClick={() => router.push('/activity')}
        >
          <ProfileOutlined
            size={18}
            className={pathname.startsWith('/activity') ? 'text-[#2563eb]' : ''}
          />
          <span className={textClass('/activity')}>Activity</span>
        </div>
      ),
      key: '/activity',
      className: 'font-bold',
      permissions: [],
    },
    {
      title: (
        <div
          className="flex items-center gap-2 h-12 cursor-pointer"
          onClick={() => router.push('/reports')}
        >
          <BarChartOutlined
            size={18}
            className={pathname.startsWith('/reports') ? 'text-[#2563eb]' : ''}
          />
          <span className={textClass('/reports')}>Report</span>
        </div>
      ),
      key: '/reports',
      className: 'font-bold',
      permissions: [],
    },
    {
      title: (
        <div
          className="flex items-center gap-2 h-12 cursor-pointer"
          onClick={() => router.push('/settings')}
        >
          <SettingOutlined
            size={18}
            className={pathname.startsWith('/settings') ? 'text-[#2563eb]' : ''}
          />
          <span className={textClass('/settings')}>Settings</span>
        </div>
      ),
      key: '/settings',
      className: 'font-bold',
      permissions: [],
    },
  ];

  // Helper function to match dynamic routes like [id] to UUIDs or any non-slash segment
  const isRouteMatch = (routePattern: string, pathname: string) => {
    // Match [id] to UUIDs (or any non-slash segment)
    if (routePattern.includes('[id]')) {
      // UUID regex: [0-9a-fA-F-]{36} (simple version)
      const regexPattern = routePattern.replace('[id]', '[0-9a-fA-F-]{36}');
      const regex = new RegExp('^' + regexPattern + '$');
      return regex.test(pathname);
    }
    // Generic dynamic segment: [something] => [^/]+
    if (routePattern.match(/\[.*?\]/g)) {
      const regexPattern = routePattern.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp('^' + regexPattern + '$');
      return regex.test(pathname);
    }
    return routePattern === pathname;
  };

  const checkPathnamePermissions = (pathname: string): boolean => {
    // Get all routes and their permissions
    const routesWithPermissions = getRoutesAndPermissions(treeData);

    // Check if user is owner - owners have access to all routes
    const isOwner = userData?.role?.slug?.toLowerCase() === 'owner';
    if (isOwner) {
      return true;
    }

    // First check if the pathname matches any defined route (supporting dynamic segments)
    const matchingRoute = routesWithPermissions.find((route) => {
      if (isRouteMatch(route.route, pathname)) {
        return true;
      }
      // Check for parent-child relationship - allow any level of nesting
      if (pathname.startsWith(route.route + '/')) {
        return true;
      }
      return false;
    });

    // If no matching route found, check if it's a deeply nested route
    if (!matchingRoute) {
      // For deeply nested routes without explicit permissions,
      // check if any parent route exists and has permissions
      const pathParts = pathname.split('/').filter(Boolean);

      // Try to find a parent route that has permissions
      for (let i = pathParts.length - 1; i > 0; i--) {
        const parentPath = '/' + pathParts.slice(0, i).join('/');
        const parentRoute = routesWithPermissions.find((route) =>
          isRouteMatch(route.route, parentPath),
        );

        if (parentRoute) {
          // Check if user has permissions for parent route
          const userPermissions = userData?.userPermissions || [];
          const hasParentPermissions = parentRoute.permissions.every(
            (requiredPermission: any) => {
              const found = userPermissions?.find(
                (permission: any) =>
                  permission.permission.slug === requiredPermission,
              );
              return found;
            },
          );

          if (hasParentPermissions) {
            return true;
          }
        }
      }

      // If no parent route found or no permissions, deny access
      return false;
    }

    // If route exists but has no permissions, allow access
    if (!matchingRoute.permissions || matchingRoute.permissions.length === 0) {
      return true;
    }

    // Get user's permissions from the authentication store
    const userPermissions = userData?.userPermissions || [];

    // Check if user has ALL required permissions for this route
    const hasAllPermissions = matchingRoute.permissions.every(
      (requiredPermission: any) => {
        const found = userPermissions?.find(
          (permission: any) =>
            permission.permission.slug === requiredPermission,
        );
        return found;
      },
    );
    return hasAllPermissions;
  };

  // ✅ Check permission on pathname change
  useEffect(() => {
    const checkPermissions = async () => {
      // setIsCheckingPermissions(true); // This line was removed as per the edit hint

      if (pathname === '/') {
        router.push('/dashboard');
      } else if (!checkPathnamePermissions(pathname)) {
        router.push('/unauthorized');
      }

      // setIsCheckingPermissions(false); // This line was removed as per the edit hint
    };

    checkPermissions();
  }, [pathname, router]);

  const handleSelect = (keys: (string | number | bigint)[], info: any) => {
    const selectedKey = info?.node?.key;
    if (!selectedKey) return;

    if (info.node.children) {
      setExpandedKeys((prev) =>
        prev.includes(selectedKey)
          ? prev.filter((key) => key !== selectedKey)
          : [...prev, selectedKey],
      );
      return;
    }

    const path = String(selectedKey);
    if (pathname !== path) {
      router.push(path);
      setSelectedKeys([selectedKey]);
    }
  };

  const handleDoubleClick = (event: React.MouseEvent, node: any) => {
    const key = node?.key;
    if (!node.children && key) {
      router.push(String(key));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileCollapsed = () => {
    setMobileCollapsed(!mobileCollapsed);
  };

  const handleLogout = async () => {
    try {
      // setUserData({}); // This line was removed as per the edit hint
      // setLoggedUserRole(''); // This line was removed as per the edit hint
      // setActiveCalendar(''); // This line was removed as per the edit hint
      // setUserId(''); // This line was removed as per the edit hint
      // setError(''); // This line was removed as per the edit hint
      // setIs2FA(false); // This line was removed as per the edit hint
      // setTwoFactorAuthEmail(''); // This line was removed as per the edit hint
      // setLocalId(''); // This line was removed as per the edit hint
      // setTenantId(''); // This line was removed as per the edit hint
      // setToken(''); // This line was removed as per the edit hint
      // setUser2FA({ email: '', pass: '' }); // This line was removed as per the edit hint

      // Then remove cookies
      removeCookie('token');
      removeCookie('tenantId');
      removeCookie('activeCalendar');
      removeCookie('loggedUserRole');

      // Finally clear the remaining state
      // setToken(''); // This line was removed as per the edit hint
      // setTenantId(''); // This line was removed as per the edit hint
      // setLocalId(''); // This line was removed as per the edit hint

      router.push('/authentication/login');
    } catch (error) {}
  };

  const filteredMenuItems = treeData
    .map((item) => {
      const hasAccess = AccessGuard.checkAccess({
        permissions: item.permissions,
      });

      if (!hasAccess) return null;

      return {
        ...item,
        children: item.children
          ? item.children.filter((child) =>
              AccessGuard.checkAccess({
                permissions: child.permissions,
              }),
            )
          : [],
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const getResponsiveTreeData = (
    data: CustomMenuItem[],
    collapsed: boolean,
  ): CustomMenuItem[] => {
    return data.map((item) => {
      const renderSubMenu = (children: CustomMenuItem[]) => {
        return (
          <div className="bg-white rounded-lg shadow-lg p-2 min-w-[200px] ml-12">
            {children.map((child) => (
              <div
                key={child.key}
                className={`px-4 py-2 hover:bg-gray-100 rounded cursor-pointer ${
                  selectedKeys.includes(child.key) ? 'bg-gray-100' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  const path = String(child.key);
                  if (pathname !== path) {
                    router.push(path);
                  }
                  setSelectedKeys([child.key]);
                }}
              >
                {child.title}
              </div>
            ))}
          </div>
        );
      };

      const renderTitle = () => {
        if (React.isValidElement(item.title)) {
          const icon = (item.title.props as { children?: React.ReactNode[] })
            ?.children?.[0];
          return (
            <div className="flex items-center justify-center w-full">
              {icon}
            </div>
          );
        }
        return null;
      };

      return {
        ...item,
        title: collapsed ? (
          item.children ? (
            <Dropdown
              overlay={renderSubMenu(item.children)}
              trigger={['click']}
              placement="bottomRight"
            >
              <div
                className="flex items-center justify-center w-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedKeys((prev) =>
                    prev.includes(item.key)
                      ? prev.filter((key) => key !== item.key)
                      : [...prev, item.key],
                  );
                }}
              >
                {renderTitle()}
              </div>
            </Dropdown>
          ) : (
            renderTitle()
          )
        ) : (
          item.title
        ),
        children: collapsed ? undefined : item.children,
        className: `${item.className} ${collapsed ? 'mobile-item' : ''}`,
      };
    });
  };

  // Render the component with the layout and navigation on the left

  return (
    <Layout>
      <Sider
        theme="light"
        width={280}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          transform: isMobile && mobileCollapsed ? 'translateX(-100%)' : 'none',
          transition: 'transform 0.3s ease',
          overflowX: 'hidden',
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          if (broken) {
            setMobileCollapsed(true);
          }
        }}
        collapsedWidth={isMobile ? 80 : 80}
      >
        <div className="my-2">{collapsed && <SimpleLogo />}</div>

        <div className="flex justify-between px-4 my-4">
          <div className=" flex items-center gap-2">
            {!collapsed && <Logo type="selamnew" />}
          </div>

          <div onClick={toggleCollapsed} className="text-black text-xl">
            {collapsed ? (
              <MdOutlineKeyboardDoubleArrowRight />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft />
            )}
          </div>
        </div>
        {/* Dashboard quick button removed to match simplified sidebar */}

        <div className="relative">
          <div className="absolute left-4 top-0 w-[10px] h-full bg-white z-10"></div>
          {isLoading ? (
            <div className="px-5 w-full h-full flex justify-center items-center my-5">
              <Skeleton active />{' '}
            </div>
          ) : (
            <Tree
              treeData={getResponsiveTreeData(filteredMenuItems, collapsed)}
              showLine={{ showLeafIcon: false }}
              defaultExpandAll={false}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              onSelect={handleSelect}
              onDoubleClick={handleDoubleClick}
              className="my-5 [&_.ant-tree-node-selected]:!text-black h-full w-full [&_.ant-tree-list-holder-inner]:!bg-white [&_.ant-tree-list-holder-inner]:!rounded-lg [&_.ant-tree-list-holder-inner]: [&_.ant-tree-list-holder-inner]:!p-2 [&_.ant-tree-list-holder-inner]:!mt-2"
              switcherIcon={null}
            />
          )}
        </div>
      </Sider>
      <Layout
        style={{
          marginLeft: isMobile ? 2 : collapsed ? 10 : 20,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header
          style={{
            padding: 4,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            width: isMobile
              ? '100%'
              : collapsed
                ? 'calc(100% - 80px)'
                : 'calc(100% - 280px)',
            zIndex: 1000,
            top: 0,
            left: isMobile && mobileCollapsed ? 0 : collapsed ? 80 : 280,
            transition: 'left 0.3s ease, width 0.3s ease',
            boxShadow: isMobile ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.15)', // Adjust shadow as needed
          }}
        >
          {isMobile && (
            <div className="w-full h-full p-[10px] flex justify-center items-center">
              <Button
                className="w-full h-full"
                onClick={toggleMobileCollapsed}
                icon={
                  !mobileCollapsed ? (
                    <IoCloseOutline
                      size={24}
                      className="text-gray-500 border-none"
                    />
                  ) : (
                    <MenuOutlined
                      size={24}
                      className="text-gray-500 border-none"
                    />
                  )
                }
              />
            </div>
          )}

          <NavBar page="" handleLogout={handleLogout} />
        </Header>
        <Content
          className="overflow-y-hidden min-h-screen"
          style={{
            paddingInline: isMobile ? 8 : 24,
            paddingLeft: isMobile ? 0 : collapsed ? 5 : 280,
            transition: 'padding-left 0.3s ease',
          }}
        >
          {/* isCheckingPermissions ? ( // This line was removed as per the edit hint
            <div className="flex justify-center items-center h-screen">
              <Skeleton active />
            </div>
          ) : ( */}
          <div
            className={`overflow-auto ${!isAdminPage ? 'bg-white' : ''}`}
            style={{
              borderRadius: borderRadiusLG,
              marginTop: '94px',
              marginRight: `${isMobile ? 0 : !isAdminPage ? '0px' : ''}`,
            }}
          >
            {children}
          </div>
          {/* ) */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Nav;
