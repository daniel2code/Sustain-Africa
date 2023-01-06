import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <div className="app-name">
            <Link to="/">sustain.africa</Link>
            <div className="bottom">buy, sell & swap funds.</div>
          </div>
          <div className="title">login to admin</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
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
                // loading={buttonLoading}
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
};

export default AdminLogin;
