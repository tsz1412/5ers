import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const { Content } = Layout;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authStore = useAuthStore();

  useEffect(() => {
    // Redirect to dashboard if already logged in (via JWT token in localStorage)
    const token = localStorage.getItem('token');
    if (authStore.user || token) {
      navigate('/dashboard');
    }
  }, [authStore.user, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await authStore.login(values.username, values.password);
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <Form onFinish={onFinish} className="login-form">
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} className="login-button">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginForm;
