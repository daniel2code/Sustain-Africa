import React, { useState, useEffect } from "react";
import { Form, Button, message } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";

import "./style.scss";
import { instance } from "./../../utils/API";

export default function VerifyPhone({ history }) {
  useEffect(() => {
    if (!registerInfo?.userInfo?.email) {
      history.push("register");
    }
    //eslint-disable-next-line
  }, []);

  const [input, setInput] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const registerInfo = useSelector((state) => state.register);

  const handleInputChange = (value) => {
    setInput(value);
  };

  const onFinish = async () => {
    setButtonLoading(true);

    const data = new FormData();
    data.append("user_name", registerInfo?.userInfo?.user_name);
    data.append("user_phone_no", input);

    instance
      .post("/register", data)
      .then(function (response) {
        if (response?.data?.status) {
          setButtonLoading(false);
          message.success(response?.data?.message);
          history.push("/");
        } else {
          message.error(response?.data?.message);
          setButtonLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const skipPhoneVerification = async () => {
    setButtonLoading(true);

    const data = new FormData();
    data.append("user_name", registerInfo?.userInfo?.user_name);
    data.append("skip_phone_no_verification", 1);

    instance
      .post("/register", data)
      .then(function (response) {
        if (response?.data?.status) {
          setButtonLoading(false);
          message.success(response?.data?.message);
          history.push("/");
        } else {
          message.error(response?.data?.message);
          setButtonLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
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

            <div
              style={{ marginTop: "-10px" }}
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
