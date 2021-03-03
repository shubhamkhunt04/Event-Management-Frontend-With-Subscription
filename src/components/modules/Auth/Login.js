import React, { useContext } from 'react';
import './Login.css';
import { Form, Input, Button, message } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from './graphql/Mutations';
import CustomeLayout from '../../CustomeLayout/CustomeLayout';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const context = useContext(AuthContext);

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      const { login } = data;
      context.login(login);
      localStorage.setItem('auth_token', login.token);
      form.resetFields();
      message.success('Login Successfully');
      history.push('/');
    },
    onError(err) {
      message.error('Something Went Wrong !');
    },
  });

  const onFinish = (values) => {
    const { email, password } = values;
    login({
      variables: {
        email,
        password,
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    throw new Error(errorInfo);
  };

  return (
    <CustomeLayout current='login'>
      <div>
        <h1>Login </h1>
      </div>

      <Form
        id='loginFormStyle'
        labelAlign='left'
        form={form}
        labelCol={{ span: 3, offset: 2 }}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ margin: 'auto', maxWidth: '50px' }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </CustomeLayout>
  );
};

export default Login;
