import React, { useState } from "react";
import {
  AuditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Image, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import Router from "./router";

const { Header, Sider, Content } = Layout;
const logo =
  "https://media.discordapp.net/attachments/1010925967469989908/1060623513951670382/SK_Project_4.png";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <br />
        <center>
          <Avatar size={100} src={<Image src={logo} />} />
        </center>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <PieChartOutlined />,
              label: <Link to="/analytics">Analytics</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to="/cameras">Cameras</Link>,
            },
            {
              key: "3",
              icon: <AuditOutlined />,
              label: <Link to="/reports">Reports</Link>,
            },
            {
              key: "4",
              icon: <SettingOutlined />,
              label: <Link to="/settings">Settings</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          <Router />
        </Content>
      </Layout>
    </Layout>
  );
}
