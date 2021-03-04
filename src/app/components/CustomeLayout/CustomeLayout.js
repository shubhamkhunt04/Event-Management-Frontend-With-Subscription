import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';

import NavBar from './NavBar/NavBar';
import './CustomLayout.css';

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
                <a href='/' rel='noopener noreferrer'>
                  Home
                </a>
              </Breadcrumb.Item>
              {pathSnippets?.map((item, index) => {
                return (
                  <Breadcrumb.Item key={index}>
                    <a
                      href={`/${item}`}
                      rel='noopener noreferrer'
                      id='breadcrumItemStyle'
                    >
                      {`${item.replace(/\b\w/g, (c) => c.toUpperCase())}`}
                    </a>
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
