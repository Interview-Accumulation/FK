import React, { useState } from "react";
import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Input } from "antd";
import './index.less';
import { Outlet, Link } from "react-router-dom";



const { Header, Sider, Content } = Layout;

function getItem(label, key, children, icon = <UserOutlined />) {
    return {
      key,
      icon,
      children,
      label: (
        <Link to={key}>
            {label}
        </Link>
      ),
    };
}
const menuList = [
    {
        title: '首页',
        key: '/',
        path: '/',
        children: [
            {
                title: 'state',
                key: '/state',
                path: '/state',
            
            },
            {
                title: 'usecallback',
                key: '/usecallback',
                path: '/usecallback',
            },
            {
                title: 'class',
                key: '/class',
                path: '/class',
            },
            {
                title: 'useState',
                key: '/usestate',
                path: '/usestate',
            }
        ]

    }
]
function generateItems (items) {
    return items.map((item) => {
        if (item.children) {
            return getItem(item.title, item.path, generateItems(item.children));
        }
        return getItem(item.title, item.path);
    });
}

const LayoutCom = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log('render');


  return (
    <Layout className="layout_wrap" style={{height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={generateItems(menuList[0].children)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
            <Outlet />
            {/* <Input /> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutCom;
