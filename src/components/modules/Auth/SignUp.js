import React, { useContext } from 'react';
import './SignUp.css';
import { Form, Input, Button, message } from 'antd';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from './graphql/Mutations';
import CustomeLayout from '../../CustomeLayout/CustomeLayout';

import { AuthContext } from '../../context/auth';

const SignUp = () => {
  const [form] = Form.useForm();

  const context = useContext(AuthContext);

  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted(data) {
      const { register } = data;
      context.login(register);
      localStorage.setItem('auth_token', register.token);
      form.resetFields();
      message.success('Register Successfully');
    },
    onError(err) {
      message.error(err.message);
    },
  });

  const onFinish = (values) => {
    const { username, email, password } = values;
    signUp({
      variables: {
        username,
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
        <h1>SignUp</h1>
      </div>

      <Form
        form={form}
        labelAlign='left'
        labelCol={{ span: 3, offset: 2 }}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        id='signUpFormStyle'
      >
        <Form.Item
          label='username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
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
            SignUp
          </Button>
        </Form.Item>
      </Form>
    </CustomeLayout>
  );
};

export default SignUp;
