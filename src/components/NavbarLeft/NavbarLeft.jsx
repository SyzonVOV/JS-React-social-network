import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  SoundOutlined,
  WechatOutlined,
} from '@ant-design/icons';
//todo Create enum for pages names and create effect to synchronise uri and selected menu
function NavbarLeft() {
  const [activeMenu, setActiveMenu]=useState('1')
  return (
    <Layout.Sider className="site-layout-background" width={ 200 }>
      <Menu
        mode="inline"
        selectedKeys={ [activeMenu] }
        style={ { height: '100%' } }
      >
        <Menu.Item key="1" icon={<PieChartOutlined />} onClick={ () => {setActiveMenu("1")}}>
          <NavLink to="/profile">Profile</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<MailOutlined />} onClick={ () => {setActiveMenu("2")}}>
          <NavLink to="/dialogs">Messages</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined /> } onClick={ () => {setActiveMenu("3")}}>
          <NavLink to="/users">Users</NavLink>
        </Menu.Item>
        <Menu.Item key="7" icon={<WechatOutlined />} onClick={ () => {setActiveMenu("7")}}>
          <NavLink to="/chat">Chat</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreOutlined />} onClick={ () => {setActiveMenu("4")}}>
          <NavLink to="/news">News</NavLink>
        </Menu.Item>
        <Menu.Item key="5" icon={<SoundOutlined />} onClick={ () => {setActiveMenu("5")}}>
          <NavLink to="/music">Music</NavLink>
        </Menu.Item>
        <Menu.Item key="6" icon={<DesktopOutlined />} onClick={ () => {setActiveMenu("6")}}>
          <NavLink to="/settings">Settings</NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

export default NavbarLeft;