import React from 'react';

import { Menu } from 'antd';
import { commonRoutes } from 'common/constants';
import { Link } from 'react-router-dom';

const AuthMenu = () => {
  return (
    <Menu>
      <Menu.Item key='0'>
        <Link to={commonRoutes.SignUp}>SignUp</Link>
      </Menu.Item>
      <Menu.Item key='1'>
        <Link to={commonRoutes.Login}>Login</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AuthMenu;
