import React from "react";
import { Form, message } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT_MUTATION } from "./graphql/Mutations";
// import { CREATE_EVENT_SUBSCRIPTION } from "./graphql/Subscriptions";
import CustomeLayout from "../../CustomeLayout/CustomeLayout";
import { useHistory } from "react-router-dom";
import EventForm from "../../EventForm/EventForm";
import { commonRoutes } from "../../common/constants";

const CreateEvent = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [createEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION, {
    onCompleted(data) {
      form.resetFields();
      message.success("Event Successfully Created");
      history.push(commonRoutes.Events);
    },
    onError(err) {
      message.error(err.message);
    },
  });

  // const { data } = useSubscription(CREATE_EVENT_SUBSCRIPTION);
  // console.log("subscription result", data);

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
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <CustomeLayout current="hotels">
        <div style={{ marginRight: "100px" }}>
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
