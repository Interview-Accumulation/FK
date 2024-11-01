import React, {useEffect, useState} from 'react'
import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Input } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import {IItemProps, IMenuProps} from './type.ts'
import './index.css'

const { Header, Sider, Content } = Layout;




function getItem({label, path, key , children, icon = <UserOutlined />}: IItemProps) {
    return {
      key,
      icon,
      children,
      label: (
        <Link to={path} state={{state1: 'Test State'}}>
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
              title: 'home',
              key: 'home',
              path: '/home',
            },
            {
                title: 'swiper',
                key: 'swiper',
                path: '/swiper',
            },
            {
              title: 'about',
              key: 'about',
              path: '/about',
            },
            {
              title: 'threelevel',
              key: 'threelevel',
              path: '/threelevel',
            },
            {
              title: 'useparams',
              key: 'useparams',
              path: '/useparams/id/name/content',
            },
            {
              title: 'usenavigate',
              key: 'usenavigate',
              path: '/usenavigate',
            },
            {
              title: 'echarts',
              key: 'echarts',
              path: '/echarts',
            }
        ]
    }
]
function generateItems (items: IMenuProps[]): any[] {
    return items.map((item: IMenuProps) => {
        if (item.children) {
            return getItem({
                label:item.title, 
                path: item.key,
                key:item.path, 
                children:generateItems(item.children)
            });
        }
        return getItem({
            label: item.title,
            key: item.key,
            path: item.path,
        });
    });
}

export default function Index() {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const location = useLocation();
    const [menuKey, setMenuKey] = useState('/home');

    useEffect(() => {
        // console.log('location', location.pathname.split('/'));
        setMenuKey(location.pathname.split('/')[1]);
    }, [location]);

    return (
        <Layout className="layout_wrap" style={{height: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[menuKey]}
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
