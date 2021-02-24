import React from "react";
import { Form, Input, Button, DatePicker } from "antd";

const EventForm = ({ onFinish, onFinishFailed, form, loading }) => {
  return (
    <Form
      form={form}
      labelAlign="left"
      labelCol={{ span: 3, offset: 2 }}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: "70%", margin: "auto" }}
    >
      <Form.Item
        label="Event Name"
        name="eventName"
        rules={[
          {
            required: true,
            message: "Event Name Is Required !",
          },
        ]}
      >
        <Input type="text" placeholder="Enter Event Name" />
      </Form.Item>
      <Form.Item
        label="Event Desceription"
        name="description"
        rules={[
          {
            required: true,
            message: "Event Description Is Required !",
          },
        ]}
      >
        <Input type="text" placeholder="Enter Event Description" />
      </Form.Item>{" "}
      <Form.Item
        label="Event Time"
        name="time"
        rules={[
          {
            required: true,
            message: "Event Time Is Required !",
          },
        ]}
      >
        {/* <Input type="text" placeholder="Enter Hotel Name" /> */}
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
