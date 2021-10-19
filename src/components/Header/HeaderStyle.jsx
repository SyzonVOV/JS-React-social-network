import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Col, Layout, Row, Space, Typography } from 'antd';

//TODO: make a separate component for logout

function HeaderStyle(props) {
  const { isAuth, login, handleLogout } = props;
  return (
    <Layout.Header className={ 'header' }>
      <Row>
        <Col span={ 8 }>
          <Avatar size={56}
            src="https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png"/>
        </Col>
        <Col span={ 6 } offset={ 10 }>
          { isAuth
            ? <div>
              <Space direction="vertical">
                <Typography.Title level={ 5 } type="success">{ login } - </Typography.Title>
              </Space>
              <Button type="primary" size="large" onClick={ handleLogout }>
                Logout
              </Button>
            </div>
            : <NavLink to={ '/login' }>
              <Button type="primary" size="large">
                Login
              </Button>
            </NavLink> }
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default HeaderStyle;