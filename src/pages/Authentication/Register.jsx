import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import randomWords from "random-words";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import "./style-Auth.scss";
import { instance } from "./../../utils/API";
import { setUserInfo } from "./../../redux/register/register.actions";

export default function Register({ history }) {
  const [hasReferral, setHasReferral] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    if (locationInput === "") {
      return message.warning("enter location to continue");
    }

    setButtonLoading(true);

    const { username, email, password, referrer } = values;
    const randomUsername = randomWords({ exactly: 2, join: "" });

    const data = new FormData();
    data.append("user_email", email);
    data.append("user_password", password);
    data.append("user_name", username);
    data.append("user_name_front", randomUsername);
    data.append("user_location", locationInput);
    data.append("referrer", referrer ? referrer : "");

    instance
      .post("/register", data)
      .then(function (response) {
        if (response?.data?.status) {
          requestVerificationCode(
            response?.data?.data?.email,
            response?.data?.data?.user_name
          );
          dispatch(setUserInfo(response?.data?.data));
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

  const handleLocationChange = (data) => {
    setLocationInput(data?.label);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form">
          <div className="app-name">
            <Link to="/">sustain.africa</Link>
            <div className="bottom">buy, sell & swap funds.</div>
          </div>
          <div className="title">create an account</div>
          <div className="desc">
            a sustain account is a ticket to a global network of trusted
            merchants around the world who want to help you buy, sell & swap
            funds anonymously via{" "}
            <span className="desc-link">over 100 methods</span>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ marginBottom: "20px" }}
              name="username"
              rules={[{ required: true, message: "username required!" }]}
            >
              <Input placeholder="username" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "20px" }}
              name="email"
              rules={[{ required: true, message: "email required!" }]}
            >
              <Input placeholder="email address" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "20px" }}
              name="password"
              hasFeedback
              rules={[
                { required: true, message: "password required!" },
                { min: 6, message: "minimum: 6 characters." },
              ]}
            >
              <Input.Password placeholder="create a password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="confirm password" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "20px" }}
              rules={[{ required: true, message: "location required!" }]}
            >
              <GooglePlacesAutocomplete
                apiKey="AIzaSyA3geMmLIiRA_J0zUzFerPTKwkT5-9ocPM"
                apiOptions={{ language: "en", region: "ng" }}
                autocompletionRequest={{
                  types: ["(regions)"],
                  componentRestrictions: { country: "ng" },
                }}
                selectProps={{
                  placeholder: "location e.g lagos, nigeria",
                  locationInput,
                  onChange: handleLocationChange,
                  styles: {
                    input: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                    option: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                  },
                }}
              />
            </Form.Item>

            <div
              className="referral"
              onClick={() => {
                setHasReferral(!hasReferral);
              }}
            >
              {!hasReferral ? "i have a referrer" : "no referrer"}
            </div>

            {hasReferral && (
              <Form.Item
                style={{ marginBottom: "25px" }}
                name="referrer"
                rules={[{ required: true, message: "referrer required!" }]}
              >
                <Input placeholder="enter referrer username" />
              </Form.Item>
            )}

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

          <div className="already">
            already on Sustain?
            <span>
              <Link to="/login"> login</Link>
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
