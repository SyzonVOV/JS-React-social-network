import React from "react";
import { Menu, Layout } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,SoundOutlined } from '@ant-design/icons';

function NavbarRight() {
  return (
    <Layout.Sider className="site-layout-background" width={ 200 }>
      <Menu
        mode="inline"
        defaultSelectedKeys={ ['1'] }
        defaultOpenKeys={ ['sub1'] }
        style={ { height: '100%' } }
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <a href="#">Profile</a>
        </Menu.Item>
        <Menu.Item key="2" icon={<MailOutlined />}>
          <a href="#">Messages</a>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          <a href="#">News</a>
        </Menu.Item>
        <Menu.Item key="4" icon={<SoundOutlined />}>
          <a href="#">Music</a>
        </Menu.Item>
        <Menu.Item key="5" icon={<DesktopOutlined />}>
          <a href="#">Settings</a>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

export default NavbarRight;