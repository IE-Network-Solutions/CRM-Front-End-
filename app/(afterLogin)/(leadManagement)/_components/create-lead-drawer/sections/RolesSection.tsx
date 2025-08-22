'use client';

import React from 'react';
import { Button, Flex, Form, Select, Space, Tag } from 'antd';
import { CloseOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useGetRoles } from '@/store/server/features/leads/roles/queries';
import { useGetUsers } from '@/store/server/features/leads/users/queries';

export type DynamicItem = { id: number };

interface RolesSectionProps {
  roles: DynamicItem[];
  addRoleRow: () => void;
  removeRoleRow: (id: number) => void;
}

export const RolesSection: React.FC<RolesSectionProps> = ({
  roles,
  addRoleRow,
  removeRoleRow,
}) => {
  const {
    data: rolesData = [],
    isLoading: rolesLoading,
    error: rolesError,
  } = useGetRoles();
  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useGetUsers();

  // Transform roles data
  let safeRoles: any[] = [];
  if (Array.isArray(rolesData)) {
    safeRoles = rolesData;
  } else if (rolesData && typeof rolesData === 'object') {
    const rolesObj = rolesData as any;
    safeRoles = Array.isArray(rolesObj.items)
      ? rolesObj.items
      : rolesObj.data || [];
  }

  const roleOptions = safeRoles.map((role: any) => ({
    value: role.id,
    label: role.name,
  }));

  // Transform users data
  let safeUsers: any[] = [];
  if (Array.isArray(users)) {
    safeUsers = users;
  } else if (users && typeof users === 'object') {
    const usersObj = users as any;
    safeUsers = Array.isArray(usersObj.items)
      ? usersObj.items
      : usersObj.data || [];
  }

  const userOptions = safeUsers.map((user: any) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const userTagRender = (props: any) => {
    const { label, closable, onClose } = props;
    return (
      <Tag
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          display: 'flex',
          alignItems: 'center',
          padding: '2px 6px',
          border: '1px solid #d9d9d9',
          background: '#fafafa',
        }}
        data-cy="user-tag"
      >
        <UserOutlined style={{ marginRight: 4, color: '#8c8c8c' }} />
        {label}
      </Tag>
    );
  };

  return (
    <div data-cy="roles-section">
      <Flex
        justify="space-between"
        align="center"
        className="mb-2"
        data-cy="roles-section-header"
      >
        <h3
          className="text-lg font-medium text-gray-900"
          data-cy="roles-section-title"
        >
          Lead Participants
        </h3>
        <Button
          type="text"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={addRoleRow}
          data-cy="add-role-btn"
        />
      </Flex>

      <div className="space-y-2" data-cy="roles-container">
        {roles.map((role, index) => (
          <Flex
            key={role.id}
            align="start"
            gap="small"
            data-cy={`role-row-${index}`}
          >
            <Form.Item
              name={['leadParticipants', index, 'roleId']}
              style={{ flex: '0 0 150px' }}
              rules={[{ required: true, message: 'Role is required' }]}
              data-cy={`role-select-form-item-${index}`}
            >
              <Select
                placeholder={rolesLoading ? 'Loading roles...' : 'Select Role'}
                options={roleOptions}
                loading={rolesLoading}
                showSearch
                data-cy={`role-select-${index}`}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                notFoundContent={
                  rolesLoading
                    ? 'Loading...'
                    : rolesError
                      ? 'Error loading roles'
                      : 'No roles found'
                }
                disabled={rolesLoading || !!rolesError}
              />
            </Form.Item>
            <Form.Item
              name={['leadParticipants', index, 'users']}
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Select user(s)' }]}
              data-cy={`users-select-form-item-${index}`}
            >
              <Select
                mode="multiple"
                placeholder={usersLoading ? 'Loading users...' : 'Select Users'}
                options={userOptions}
                loading={usersLoading}
                showSearch
                tagRender={userTagRender}
                data-cy={`users-select-${index}`}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionRender={(option) => (
                  <Space>
                    <UserOutlined />
                    {option.data.label}
                  </Space>
                )}
                notFoundContent={
                  usersLoading
                    ? 'Loading...'
                    : usersError
                      ? 'Error loading users'
                      : 'No users found'
                }
                disabled={usersLoading || !!usersError}
              />
            </Form.Item>
            {roles.length > 1 && (
              <Button
                type="text"
                danger
                icon={<CloseOutlined />}
                onClick={() => removeRoleRow(role.id)}
                style={{ marginTop: '5px' }}
                data-cy={`remove-role-btn-${index}`}
              />
            )}
          </Flex>
        ))}
      </div>
    </div>
  );
};
