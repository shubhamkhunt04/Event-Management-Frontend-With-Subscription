import React, { useContext } from 'react';
import './NavBar.css';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { commonRoutes } from '../../common/constants';

const AuthMenu = () => {
  return (
    <Menu>
      <Menu.Item key='signup'>
        <Link to={commonRoutes.SignUp}>SignUp</Link>
      </Menu.Item>
      <Menu.Item key='login'>
        <Link to={commonRoutes.Login}>Login</Link>
      </Menu.Item>
    </Menu>
  );
};

const NavBar = ({ current }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <Menu
        theme='dark'
        mode='horizontal'
        selectedKeys={current}
        id='menuHeight'
      >
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
              AuthMenu
            )
          }
          trigger={['click']}
        >
          <a href='#0' onClick={(e) => e.preventDefault()}>
            <UserOutlined className='userOutlined' /> <DownOutlined />
          </a>
        </Dropdown>
      </Menu>
    </div>
  );
};

export default NavBar;
