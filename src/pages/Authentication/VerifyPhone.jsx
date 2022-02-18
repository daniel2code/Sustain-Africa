import React, { useState, useEffect } from 'react';
import { Form, Button, message } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUserData } from './../../redux/user/user.actions';

import './style-Auth.scss';
import { instance } from './../../utils/API';

export default function VerifyPhone() {
  const history = useHistory();
  // useEffect(() => {
  //   if (!registerInfo?.userInfo?.email) {
  //     history.push('register');
  //   }
  //   //eslint-disable-next-line
  // }, []);

  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userState?.userData) {
      history.push('/register');
    } else if (
      userState?.userData?.is_phone_no_verification_skipped === '1' ||
      userState?.userData?.is_phone_no_verified === '1'
    ) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  const [input, setInput] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const registerInfo = useSelector(state => state.register);

  const handleInputChange = value => {
    setInput(value);
  };

  const onFinish = () => {
    setButtonLoading(true);

    const data = new FormData();
    data.append('user_name', registerInfo?.userInfo?.user_name);
    data.append('user_phone_no', input);

    instance
      .post('/register', data)
      .then(function (response) {
        if (response?.data?.status) {
          setButtonLoading(false);
          message.success(response?.data?.message);

          const userData = {
            ...response?.data?.data,
            token: response?.data?.token,
          };
          console.log(userData);
          dispatch(setUserData(userData));
          history.push('/');
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

  const skipPhoneVerification = () => {
    setButtonLoading(true);

    const data = new FormData();
    data.append('user_name', registerInfo?.userInfo?.user_name);
    data.append('skip_phone_no_verification', 1);

    instance
      .post('/register', data)
      .then(function (response) {
        if (response?.data?.status) {
          setButtonLoading(false);
          message.success(response?.data?.message);
          history.push('/');
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
          <div className="title">add your phone number</div>
          <div className="desc">
            add a phone number to complete the setup of your new Sustain
            account. you will be required to verify this number later.
          </div>
          <div className="desc custom">enter phone number:</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ marginBottom: '25px' }}
              name="email"
              rules={[{ required: true, message: 'phone number required!' }]}
            >
              <PhoneInput
                country={'ng'}
                onChange={phone => {
                  handleInputChange(phone);
                }}
              />
            </Form.Item>

            <div
              style={{ marginTop: '-10px' }}
              className="referral"
              onClick={() => {
                skipPhoneVerification();
              }}
            >
              skip
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={buttonLoading}
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
