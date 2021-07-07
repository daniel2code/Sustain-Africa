import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

import "./Login.scss";

export default function Login() {
  const onFinish = async (values) => {
    console.log(values);
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
