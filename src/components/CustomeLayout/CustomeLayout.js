import React from 'react';
import './CustomLayout.css';
import { Layout, Breadcrumb } from 'antd';
import NavBar from './NavBar/NavBar';
import { useHistory } from 'react-router-dom';

const { Header, Content } = Layout;

const CustomeLayout = (props) => {
  const { children, current } = props;

  const history = useHistory();

  const pathSnippets = history.location.pathname.split('/').filter((i) => i);

  return (
    <div>
      <Header id='mainRootHeader'>
        <NavBar current={current} />
      </Header>
      <Content className='site-layout' id='contentStyle'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href='/' rel='noopener noreferrer'>
              Home
            </a>
          </Breadcrumb.Item>
          {pathSnippets.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                <a
                  href={`/${item}`}
                  rel='noopener noreferrer'
                  id='breadcrumItemStyle'
                >
                  {`${item}`}
                </a>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <div className='site-layout-background' id='siteLayoutStyle'>
          {children}
        </div>
      </Content>
    </div>
  );
};

export default CustomeLayout;
