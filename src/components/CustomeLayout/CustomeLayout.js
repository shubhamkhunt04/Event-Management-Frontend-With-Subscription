import React from "react";
import { Layout, Breadcrumb } from "antd";
import NavBar from "./NavBar/NavBar";
import { useHistory } from "react-router-dom";

const { Header, Content } = Layout;

const CustomeLayout = (props) => {
  const { children, current } = props;

  const history = useHistory();

  const pathSnippets = history.location.pathname.split("/").filter((i) => i);

  return (
    <div>
      <Header
        style={{
          height: "50px",
        }}
      >
        <NavBar current={current} />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/" rel="noopener noreferrer">
              Home
            </a>
          </Breadcrumb.Item>
          {pathSnippets.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                <a
                  href={`/${item}`}
                  rel="noopener noreferrer"
                  style={{ fontWeight: "500" }}
                >
                  {`${item}`}
                </a>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
    </div>
  );
};

export default CustomeLayout;
