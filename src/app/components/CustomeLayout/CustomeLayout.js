import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';

import NavBar from './NavBar/NavBar';
import './CustomLayout.css';
import { commonRoutes } from 'common/constants';

const { Header, Content } = Layout;

const CustomeLayout = (props) => {
  const { children, current } = props;

  const history = useHistory();

  const pathSnippets = history.location.pathname.split('/').filter((i) => i);

  return (
    <>
      <Layout>
        <Header id='mainRootHeader'>
          <NavBar current={current} />
        </Header>
        <Layout>
          <Content id='contentStyle'>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={commonRoutes.Home} rel='noopener noreferrer'>
                  Home
                </Link>
              </Breadcrumb.Item>
              {pathSnippets?.map((item, index) => {
                return (
                  <Breadcrumb.Item key={index}>
                    <Link to={`${item}`}>
                      {`${item.replace(/\b\w/g, (c) => c.toUpperCase())}`}
                    </Link>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CustomeLayout;
