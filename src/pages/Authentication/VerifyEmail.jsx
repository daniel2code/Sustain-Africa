import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';

import './style-Auth.scss';
import { instance } from './../../utils/API';

export default function VerifyEmail({ history }) {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');

  const [buttonLoading, setButtonLoading] = useState(false);
  const [hasPhone, setHasPhone] = useState(false);
  const [showResendCode, setShowResendCode] = useState(false);

  const userState = useSelector(state => state.user);

  useEffect(() => {
    if (!userState?.userData) {
      history.push('/register');
    } else if (
      userState?.userData?.is_phone_no_verification_skipped === '1' ||
      userState?.userData?.is_phone_no_verified === '1'
    ) {
      setHasPhone(true);
    }
    //eslint-disable-next-line
  }, []);

  const onFinish = () => {
    const inputValuesJoined = `${inputValue1}${inputValue2}${inputValue3}${inputValue4}${inputValue5}${inputValue6}`;

    setButtonLoading(true);

    const data = new FormData();
    data.append('match_verification', 1);
    data.append('verify_email', userState?.userData?.email);
    data.append('verify_username', userState?.userData?.user_name);
    data.append('verification_code', inputValuesJoined);

    instance
      .post('/register', data)
      .then(function (response) {
        if (response?.data?.status) {
          setButtonLoading(false);
          message.success(response?.data?.message);
          if (hasPhone) {
            history.push('/');
          } else {
            history.push('/add-phone');
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

  const requestVerificationCode = () => {
    const data = new FormData();
    data.append('send_verification', 1);
    data.append('verify_email', userState?.userData?.email);
    data.append('verify_username', userState?.userData?.user_name);

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

  const handleInputChange1 = value => {
    if (!(value.length > 1)) {
      setInputValue1(value);
      if (value !== '') {
        input2.current.focus();
      }
    }
  };

  const handleInputChange2 = value => {
    if (!(value.length > 1)) {
      setInputValue2(value);
      if (value !== '') {
        input3.current.focus();
      }
    }
  };

  const handleInputChange3 = value => {
    if (!(value.length > 1)) {
      setInputValue3(value);
      if (value !== '') {
        input4.current.focus();
      }
    }
  };

  const handleInputChange4 = value => {
    if (!(value.length > 1)) {
      setInputValue4(value);
      if (value !== '') {
        input5.current.focus();
      }
    }
  };

  const handleInputChange5 = value => {
    if (!(value.length > 1)) {
      setInputValue5(value);
      if (value !== '') {
        input6.current.focus();
      }
    }
  };

  const handleInputChange6 = value => {
    if (!(value.length > 1)) {
      setInputValue6(value);
      if (value !== '') {
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <div className="title">verify your email</div>
          <div className="desc">
            we’ve sent a verification code to{' '}
            <span className="desc-link">
              {userState?.userData?.email
                ? userState?.userData?.email
                : 'your email'}
            </span>
            . please enter that code below to verify your email address.
          </div>
          <div className="desc custom">enter code:</div>
          <div className="verify-form">
            <Input
              placeholder=""
              ref={input1}
              value={inputValue1}
              type="number"
              onChange={event => {
                handleInputChange1(event.target.value, 1);
              }}
            />
            <Input
              placeholder=""
              ref={input2}
              type="number"
              value={inputValue2}
              onChange={event => {
                handleInputChange2(event.target.value, 2);
              }}
            />

            <Input
              placeholder=""
              ref={input3}
              type="number"
              value={inputValue3}
              onChange={event => {
                handleInputChange3(event.target.value, 3);
              }}
            />

            <Input
              placeholder=""
              ref={input4}
              type="number"
              value={inputValue4}
              onChange={event => {
                handleInputChange4(event.target.value, 4);
              }}
            />

            <Input
              placeholder=""
              ref={input5}
              type="number"
              value={inputValue5}
              onChange={event => {
                handleInputChange5(event.target.value, 5);
              }}
            />

            <Input
              placeholder=""
              ref={input6}
              type="number"
              value={inputValue6}
              onChange={event => {
                handleInputChange6(event.target.value, 6);
              }}
            />
          </div>
          <div className="desc custom">code valid for 30 mins</div>

          {showResendCode ? (
            <div
              className="referral"
              onClick={() => {
                requestVerificationCode();
              }}
            >
              resend code
            </div>
          ) : (
            <div
              className="referral"
              onClick={() => {
                setShowResendCode(true);
              }}
            >
              i didn't receive the code
            </div>
          )}
          <Button
            type="primary"
            loading={buttonLoading}
            htmlType="submit"
            className="login-form-button"
            onClick={onFinish}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
