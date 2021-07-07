import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

import "./../Login/Login.scss";

export default function Register() {
  const [hasReferral, setHasReferral] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <div className="title">create an account</div>
          <div className="desc">
            a sustain account is the ticket to a global network of trusted
            merchants around the world who want to help you move your funds
            anonymously via <span className="desc-link">over 100 methods</span>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ marginBottom: "25px" }}
              name="email"
              rules={[{ required: true, message: "email required!" }]}
            >
              <Input placeholder="email address" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "25px" }}
              name="password"
              rules={[
                { required: true, message: "password required!" },
                { min: 6, message: "Minimum: 6 characters." },
              ]}
            >
              <Input type="password" placeholder="create a password" />
            </Form.Item>

            <div
              className="referral"
              onClick={() => {
                setHasReferral(!hasReferral);
              }}
            >
              {!hasReferral ? "I have a referral code" : "cancel referral code"}
            </div>

            {hasReferral && (
              <Form.Item
                style={{ marginBottom: "25px" }}
                name="referral"
                rules={[{ required: true, message: "referral code required!" }]}
              >
                <Input placeholder="enter referral code" />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Continue
              </Button>
            </Form.Item>
          </Form>

          <div className="already">
            already on Sustain?
            <span>
              <Link to="/login"> Login</Link>
            </span>
          </div>

          <div className="already">
            by continuing, you agree to Sustain’s
            <span>
              <Link to="/"> Terms of Service</Link>
            </span>
            ,
            <span>
              <Link to="/"> Privacy Policy</Link>
            </span>{" "}
            and
            <span>
              <Link to="/"> Legal Notice</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
