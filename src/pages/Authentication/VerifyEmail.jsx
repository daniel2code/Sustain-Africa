import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useSelector } from "react-redux";

import "./style.scss";
import { instance } from "./../../utils/API";

export default function VerifyEmail({ history }) {
  useEffect(() => {
    if (!registerInfo?.userInfo?.email) {
      history.push("register");
    }
    //eslint-disable-next-line
  }, []);

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);

  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const [buttonLoading, setButtonLoading] = useState(false);

  const registerInfo = useSelector((state) => state.register);

  const onFinish = async () => {
    const inputValuesJoined = inputValues.join("");
    setButtonLoading(true);

    const data = new FormData();
    data.append("match_verification", 1);
    data.append("verify_email", registerInfo?.userInfo?.email);
    data.append("verify_username", registerInfo?.userInfo?.user_name);
    data.append("verification_code", inputValuesJoined);

    instance
      .post("/register", data)
      .then(function (response) {
        if (response?.data?.status) {
          setButtonLoading(false);
          message.success(response?.data?.message);
          history.push("/add-phone");
        } else {
          message.error(response?.data?.message);
          setButtonLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (value, item) => {
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
        input6.current.focus();
      } else if (item === 6) {
        dataCopy[5] = value;
      }
      setInputValues(dataCopy);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <div className="title">verify your email</div>
          <div className="desc">
            we’ve sent a verification code to{" "}
            <span className="desc-link">
              {registerInfo?.userInfo?.email
                ? registerInfo?.userInfo?.email
                : "your email"}
            </span>
            . please enter that code below to verify your email address.
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
            <Form.Item name="6">
              <Input
                placeholder=""
                ref={input6}
                type="number"
                onChange={(event) => {
                  handleInputChange(event.target.value, 6);
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
