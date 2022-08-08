import classes from "./AppLayout.module.css";

import { PieChartOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Typography } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { authFirebase } from "../../firebase";
import { signOut } from "firebase/auth";
import { authActions } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-models";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("My Tasks", "1", <PieChartOutlined />),
  getItem("Sign out", "signOut", <LogoutOutlined />),
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(state => state.auth.email);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "signOut") {
      signOut(authFirebase)
        .then(() => {
          dispatch(authActions.logout());
        })
        .catch((error) => {
          // An error happened.
        });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
          <Typography.Text className={classes.email} strong>{userEmail}</Typography.Text>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[current]}
          onClick={onClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className={
              `site-layout-background ` + classes.content_layout_background
            }
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
