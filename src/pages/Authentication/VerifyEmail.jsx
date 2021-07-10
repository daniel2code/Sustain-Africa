import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

import "./style.scss";

export default function VerifyEmail({ history }) {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);

  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);

  const onFinish = async () => {
    console.log(inputValues);
    history.push("/verify-phone");
  };

  const handleInputChange = (value, item) => {
    console.log(value);

    if (value !== "" && value.length === 1) {
      const dataCopy = inputValues;
      if (item === 1) {
        dataCopy[0] = value;
        input2.current.focus();
      } else if (item === 2) {
        dataCopy[1] = value;
        input3.current.focus();
      } else if (item === 3) {
        dataCopy[2] = value;
        input4.current.focus();
      } else if (item === 4) {
        dataCopy[3] = value;
        input5.current.focus();
      } else if (item === 5) {
        dataCopy[4] = value;
      }
      setInputValues(dataCopy);
      console.log(inputValues);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <div className="title">verify your email</div>
          <div className="desc">
            we’ve sent a verification code to{" "}
            <span className="desc-link">test@gmail.com</span>. please enter that
            code below to verify your email address.
          </div>
          <div className="desc custom">enter code:</div>
          <div className="verify-form">
            <Form.Item name="1">
              <Input
                placeholder=""
                ref={input1}
                value={inputValues[0]}
                type="number"
                onChange={(event) => {
                  handleInputChange(event.target.value, 1);
                }}
              />
            </Form.Item>
            <Form.Item name="2">
              <Input
                placeholder=""
                ref={input2}
                type="number"
                onChange={(event) => {
                  handleInputChange(event.target.value, 2);
                }}
              />
            </Form.Item>
            <Form.Item name="3">
              <Input
                placeholder=""
                ref={input3}
                type="number"
                onChange={(event) => {
                  handleInputChange(event.target.value, 3);
                }}
              />
            </Form.Item>
            <Form.Item name="4">
              <Input
                placeholder=""
                ref={input4}
                type="number"
                onChange={(event) => {
                  handleInputChange(event.target.value, 4);
                }}
              />
            </Form.Item>
            <Form.Item name="5">
              <Input
                placeholder=""
                ref={input5}
                type="number"
                onChange={(event) => {
                  handleInputChange(event.target.value, 5);
                }}
              />
            </Form.Item>
          </div>
          <div className="desc custom">code valid for 30 mins</div>

          <div className="referral" onClick={() => {}}>
            resend code
          </div>
          <Button
            type="primary"
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
