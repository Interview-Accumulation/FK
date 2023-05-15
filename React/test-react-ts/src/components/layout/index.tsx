import React, {useState} from 'react'
import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Input } from "antd";
import { Outlet, Link } from "react-router-dom";
import {IItemProps, IMenuProps} from './type.ts'
import './index.css'

const { Header, Sider, Content } = Layout;




function getItem({label, key , children, icon = <UserOutlined />}: IItemProps) {
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

const menuList: IMenuProps[] = [
    {
        title: '首页',
        key: '/',
        path: '/',
        children: [
            {
                title: 'swiper',
                key: '/swiper',
                path: '/swiper',
            }
        ]
    }
]
function generateItems (items: IMenuProps[]): any[] {
    return items.map((item: IMenuProps) => {
        if (item.children) {
            return getItem({
                label:item.title, 
                key:item.path, 
                children:generateItems(item.children)
            });
        }
        return getItem({
            label: item.title,
            key: item.path
        });
    });
}

export default function Index() {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout_wrap" style={{height: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={generateItems(menuList[0]?.children || [])}
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
          </Content>
        </Layout>
      </Layout>
    )
}
