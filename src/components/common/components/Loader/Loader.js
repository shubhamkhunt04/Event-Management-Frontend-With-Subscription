import React from 'react';
import './Loader.css';
import { Space, Spin } from 'antd';

const Loader = () => {
  return (
    <div id='loaderDiv'>
      <Space>
        <Spin size='large' />
      </Space>
    </div>
  );
};

export default Loader;
