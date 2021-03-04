import React from 'react';

import { Menu } from 'antd';
import { commonRoutes } from 'common/constants';

const AuthMenu = () => {
  return (
    <Menu>
      <Menu.Item key='0'>
        <a href={commonRoutes.SignUp}>SignUp</a>
      </Menu.Item>
      <Menu.Item key='1'>
        <a href={commonRoutes.Login}>Login</a>
      </Menu.Item>
    </Menu>
  );
};

export default AuthMenu;
