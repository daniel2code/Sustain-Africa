import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Form, Button } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "./style.scss";

export default function VerifyPhone() {
  const [input, setInput] = useState("");

  const handleInputChange = (value) => {
    setInput(value);
    console.log(value);
  };

  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <div className="title">verify your phone number</div>
          <div className="desc">
            we’ve sent a verification code to please provide your phone number
            to complete the setup of your new Sustain account. We will send a
            6-digit code via SMS to verify your phone number.
          </div>
          <div className="desc custom">enter phone number:</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ marginBottom: "25px" }}
              name="email"
              rules={[{ required: true, message: "phone number required!" }]}
            >
              <PhoneInput
                country={"ng"}
                onChange={(phone) => {
                  handleInputChange(phone);
                }}
              />
            </Form.Item>
            {input.length > 8 ? (
              <div style={{ marginTop: "-10px" }} className="referral">
                send code
              </div>
            ) : (
              <div style={{ marginTop: "-10px" }} className="referral">
                skip
              </div>
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
        </div>
      </div>
    </div>
  );
}
