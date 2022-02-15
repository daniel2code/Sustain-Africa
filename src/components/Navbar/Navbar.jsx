import React from 'react';
import { Button, Dropdown, Menu, Avatar, Badge } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LeftOutlined, BellOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import './Navbar.scss';

export default function Navbar() {
  const userState = useSelector(state => state.user);
  const notificationCount = useSelector(state => state.user.notificationCount);
  // const notificationCount = 3;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="row-one">
          <div className="left">
            <div
              className="nav"
              onClick={() => {
                history.goBack();
              }}
            >
              {location.pathname !== '/' && (
                <span>
                  <LeftOutlined style={{ marginRight: '0px' }} /> back
                </span>
              )}

              {location.pathname === '/' && (
                <div className="app-name">
                  <Link to="/">sustain.africa</Link>
                  <div className="bottom">buy, sell & swap funds.</div>
                </div>
              )}
            </div>
          </div>

          <div className="right">
            {userState?.userData ? (
              <>
                <div
                  style={{
                    marginRight: '15px',
                  }}
                  className="notifications name"
                >
                  <Link to="/notifications">
                    {notificationCount ? (
                      <Badge
                        style={{ backgroundColor: '#ed1450' }}
                        count={notificationCount}
                      >
                        <BellOutlined
                          style={{
                            fontSize: '20px',
                            color: '#ed1450',
                          }}
                        />
                      </Badge>
                    ) : (
                      <BellOutlined
                        style={{
                          fontSize: '20px',
                        }}
                      />
                    )}
                  </Link>
                </div>

                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="1"
                        disabled={location.pathname === '/profile'}
                      >
                        <Link to="/profile">profile</Link>
                      </Menu.Item>
                      <Menu.Item key="2">wallet</Menu.Item>
                      <Menu.Item key="3">settings</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        key="4"
                        onClick={() => {
                          dispatch({ type: 'DESTROY_SESSION' });
                          localStorage.clear();
                          sessionStorage.clear();
                          setTimeout(() => {
                            window.location.assign('/');
                          }, 500);
                        }}
                        style={{ color: '#ed1450' }}
                      >
                        logout
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <div className="name">
                    {userState?.userData?.user_name}{' '}
                    <Avatar
                      style={{
                        color: '#14a014',
                        backgroundColor: '#a9fca9',
                      }}
                    >
                      {userState?.userData?.user_name.charAt(0).toUpperCase()}
                    </Avatar>
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <Button size="normal" type="link">
                  <Link to="/login">login</Link>
                </Button>
                <Button type="primary" size="normal">
                  <Link to="/register">register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
