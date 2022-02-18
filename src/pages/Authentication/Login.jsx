import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import './style-Auth.scss';
import { instance /* bearerInstance */ } from './../../utils/API';
import { setUserData } from './../../redux/user/user.actions';

export default function Login() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const userState = useSelector(state => state.user);

  useEffect(() => {
    if (userState?.userData) {
      history.replace('/');
    }
  }, [history, userState?.userData]);

  // useEffect(() => {
  //   bearerInstance
  //     .get('/check_token')
  //     .then(res => {
  //       console.log(res.data);
  //       if (res.data.message === 'token valid') history.replace('/');
  //     })
  //     .catch(err => {
  //       console.log('not authenticated');
  //     });
  // }, [history]);

  const onFinish = values => {
    setButtonLoading(true);
    let userData = {};

    const { email, password } = values;

    const data = new FormData();
    data.append('user_field', email);
    data.append('user_password', password);

    instance
      .post('/login', data)
      .then(function (response) {
        if (response?.data?.status) {
          userData = { ...response?.data?.data, token: response?.data?.token };
          dispatch(setUserData(userData));
          if (response?.data?.data?.is_email_verified === '0') {
            requestVerificationCode(
              response?.data?.data?.email,
              response?.data?.data?.user_name
            );
          } else {
            message.success('login successful');
            history.push('/');
          }
        } else {
          message.error(response?.data?.message);
          setButtonLoading(false);
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
        setButtonLoading(false);
      });
  };

  const requestVerificationCode = (email, username) => {
    const data = new FormData();
    data.append('send_verification', 1);
    data.append('verify_email', email);
    data.append('verify_username', username);

    instance
      .post('/register', data)
      .then(function (response) {
        if (response?.data?.status) {
          message.success(response?.data?.message);
          setButtonLoading(false);
          history.push('/verify-email');
        } else {
          message.error(response?.data?.message);
          setButtonLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setButtonLoading(false);
      });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <div className="app-name">
            <Link to="/">sustain.africa</Link>
            <div className="bottom">buy, sell & swap funds.</div>
          </div>
          <div className="title">login to account</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ marginBottom: '25px' }}
              name="email"
              rules={[
                { required: true, message: 'email or username required!' },
              ]}
            >
              <Input placeholder="username or email" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: '25px' }}
              name="password"
              rules={[
                { required: true, message: 'password required!' },
                { min: 6, message: 'minimum: 6 characters.' },
              ]}
            >
              <Input type="password" placeholder="password" />
            </Form.Item>
            <div className="forgot">
              <Link to="/forgot-password"> forgot password?</Link>
            </div>

            <Form.Item>
              <Button
                loading={buttonLoading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                login
              </Button>
            </Form.Item>
          </Form>
          <div className="already">
            new to Sustain?
            <span>
              <Link to="/register"> register</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
