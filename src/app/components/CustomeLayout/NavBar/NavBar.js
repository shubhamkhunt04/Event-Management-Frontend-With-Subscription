import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { AuthContext } from 'context/auth';
import { commonRoutes } from 'common/constants';
import AuthMenu from './AuthMenu';
import './NavBar.css';

const NavBar = ({ current }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Menu theme='dark' mode='horizontal' selectedKeys={current} id='menuHeight'>
      <Menu.Item key='home'>
        <Link to={commonRoutes.Home}>Home </Link>
      </Menu.Item>
      {user && (
        <Menu.Item key='event'>
          <Link to={commonRoutes.Events}>Event </Link>
        </Menu.Item>
      )}
      <Dropdown
        overlay={
          user ? (
            <Menu>
              <Menu.Item key='logout'>
                <Link to={commonRoutes.Home} onClick={logout}>
                  Logout
                </Link>
              </Menu.Item>
            </Menu>
          ) : (
            <AuthMenu />
          )
        }
        trigger={['click']}
      >
        <Link onClick={(e) => e.preventDefault()}>
          <UserOutlined className='userOutlined' /> <DownOutlined />
        </Link>
        {/* <a href='#0' onClick={(e) => e.preventDefault()}>
          <UserOutlined className='userOutlined' /> <DownOutlined />
        </a> */}
      </Dropdown>
    </Menu>
  );
};

export default NavBar;
