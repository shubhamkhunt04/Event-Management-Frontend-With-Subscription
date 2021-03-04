import React from 'react';
import { Form, message } from 'antd';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { commonRoutes } from 'common/constants';
import EventForm from 'components/EventForm/EventForm';
import { CREATE_EVENT_MUTATION } from './graphql/Mutations';
import { GET_ALL_EVENTS } from './graphql/Queries';
import CustomeLayout from 'app/components/CustomeLayout/CustomeLayout';

const CreateEvent = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [createEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION, {
    onCompleted(data) {
      form.resetFields();
      message.success('Event Successfully Created');
      history.push(commonRoutes.Events);
    },
    onError(err) {
      message.error(err.message);
    },
    refetchQueries: [
      {
        query: GET_ALL_EVENTS,
      },
    ],
  });

  const onFinish = (values) => {
    const { eventName, description, time } = values;

    createEvent({
      variables: {
        eventName,
        description,
        time,
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    throw new Error(errorInfo);
  };

  return (
    <>
      <CustomeLayout current='hotels'>
        <div id='createEventRootDiv'>
          <center>
            <h1>Create Event</h1>
            <EventForm
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              form={form}
              loading={loading}
            />
          </center>
        </div>
      </CustomeLayout>
    </>
  );
};

export default CreateEvent;
