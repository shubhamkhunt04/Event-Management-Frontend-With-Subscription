import React from 'react';
import { Space, Spin } from 'antd';

import './Loader.css';

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
