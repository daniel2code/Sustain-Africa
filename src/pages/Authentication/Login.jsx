import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";

import "./style-Auth.scss";
import { instance } from "./../../utils/API";
import { setProfileInfo } from "./../../redux/user/user.actions";

export default function Login({ history }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setButtonLoading(true);

    const { email, password } = values;

    const data = new FormData();

    data.append("user_field", email);
    data.append("user_password", password);

    instance
      .post("/login", data)
      .then(function (response) {
        if (response?.data?.status) {
          dispatch(setProfileInfo(response?.data?.data));
          if (response?.data?.data?.is_email_verified === "0") {
            requestVerificationCode(
              response?.data?.data?.email,
              response?.data?.data?.user_name
            );
          } else {
            history.push("/");
          }
          setButtonLoading(false);
        } else {
          message.error(response?.data?.message);
          setButtonLoading(false);
        }
      })
      .catch(function (error) {
        message.error(error?.response?.data?.message);
        setButtonLoading(false);
      });
  };

  const requestVerificationCode = async (email, username) => {
    const data = new FormData();
    data.append("send_verification", 1);
    data.append("verify_email", email);
    data.append("verify_username", username);

    instance
      .post("/register", data)
      .then(function (response) {
        if (response?.data?.status) {
          message.success(response?.data?.message);
          setButtonLoading(false);
          history.push("/verify-email");
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
          <div className="title">login to account</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ marginBottom: "25px" }}
              name="email"
              rules={[
                { required: true, message: "email or username required!" },
              ]}
            >
              <Input placeholder="username or email" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "25px" }}
              name="password"
              rules={[
                { required: true, message: "password required!" },
                { min: 6, message: "minimum: 6 characters." },
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
