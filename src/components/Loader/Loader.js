import React from "react";
import { Space, Spin } from "antd";

const Loader = () => {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        display: "flex",
      }}
    >
      <Space>
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loader;
