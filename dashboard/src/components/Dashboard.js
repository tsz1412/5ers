import React from 'react';
import { Layout, Flex } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Layout>
        <Flex direction="column" style={{ width: '100%' }}>
        <Sidebar />
        <Layout>
            <Content style={{ padding: '20px' }}>
            <Outlet style={{ display: 'flex' }} /> {/* This will render the nested routes */}
            </Content>
        </Layout>
        </Flex>
    </Layout>
  );
};

export default Dashboard;
