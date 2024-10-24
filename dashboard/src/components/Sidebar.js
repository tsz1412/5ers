import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  return (
    <Menu
      style={{ width: 256 }}
      mode="inline"
      defaultSelectedKeys={['/dashboard']}
      items={[
        {
          label: 'Your Stocks',
          key: '/dashboard',
          onClick: () => navigate('/dashboard'),
        },
        {
          label: 'Logout',
          key: 'logout',
          onClick: () => {
            authStore.logout();
            navigate('/');
          },
        },
      ]}
    />
  );
};

export default Sidebar;
