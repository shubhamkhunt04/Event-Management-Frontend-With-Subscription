import React, { useContext } from "react";
import { Form, message } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT_MUTATION } from "./graphql/Mutations";
import CustomeLayout from "../../CustomeLayout/CustomeLayout";
import { useHistory } from "react-router-dom";
import EventForm from "../../EventForm/EventForm";
import { AuthContext } from "../../context/auth";
import NotFoundPage from "../../common/NotFoundPage";

const CreateEvent = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const { user } = useContext(AuthContext);

  const [createEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION, {
    onCompleted(data) {
      console.log(data);
      form.resetFields();
      message.success("Event Successfully Created");
      history.push("/");
    },
    onError(err) {
      message.error(err.message);
    },
  });

  const onFinish = (values) => {
    console.log(values);

    createEvent({
      variables: {
        eventName: "shubham",
        description: "This desc",
        time: "2020-02-02",
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
