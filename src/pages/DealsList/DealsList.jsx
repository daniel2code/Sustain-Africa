import React, { useState } from "react";
import { Select, Button, Modal, Input } from "antd";
import { Divider } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";

import DealItem from "./../../components/DealItem/DealItem";
import Footer from "./../../components/Footer/Footer.jsx";
import "./DealsList.scss";

const { Option } = Select;

export default function DealsList() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function onChange(value) {
    console.log(`${value}`);
    if (value === "location") {
      showModal();
    }
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="deals-container">
        <Modal
          title="filter by location"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="ok"
          cancelText="cancel"
        >
          <Input placeholder="enter location" />
        </Modal>
        <div className="deals-wrapper">
          <div className="switch-bar">
            <div className="top-bar">
              <div className="left">deals</div>
              <div className="right">
                <div className="filter-by">
                  <Select
                    suffixIcon={<DownOutlined />}
                    placeholder="filter by..."
                    optionFilterProp="children"
                    onChange={onChange}
                  >
                    <Option value="newest">newest</Option>
                    <Option value="lowToHigh">score: low to high</Option>
                    <Option value="highToLow">score: high to low</Option>
                    <Option value="location">location</Option>
                  </Select>
                </div>
              </div>
            </div>

            <Divider>select instruments</Divider>

            <div className="instrument-select">
              <Select
                showSearch
                suffixIcon={
                  <DownOutlined
                    style={{
                      strokeWidth: "50",
                      stroke: "#ed1450",
                    }}
                  />
                }
                placeholder="select instruments"
                defaultValue="paypal"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="bank">bank</Option>
                <Option value="paypal">paypal</Option>
                <Option value="cash">cash</Option>
                <Option value="skrill">skrill</Option>
                <Option value="venmo">venmo</Option>
                <Option value="bitcoin">bitcoin</Option>
                <Option value="cashapp">cashapp</Option>
                <Option value="moneygram">moneygram</Option>
                <Option value="greendot">greendot</Option>
                <Option value="ethereum">ethereum</Option>
              </Select>

              <div className="arrows">
                <SwapOutlined
                  style={{
                    fontSize: "18px",
                    strokeWidth: "15",
                    stroke: "#ed1450",
                  }}
                />
              </div>

              <Select
                showSearch
                suffixIcon={
                  <DownOutlined
                    style={{
                      stroke: "#ed1450",
                      strokeWidth: "50",
                    }}
                  />
                }
                placeholder="select instruments"
                defaultValue="bitcoin"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="bitcoin">bitcoin</Option>
                <Option value="paypal">paypal</Option>
                <Option value="cash">cash</Option>
                <Option value="skrill">skrill</Option>
                <Option value="venmo">venmo</Option>
                <Option value="bank">bank</Option>
                <Option value="cashapp">cashapp</Option>
                <Option value="moneygram">moneygram</Option>
                <Option value="greendot">greendot</Option>
                <Option value="ethereum">ethereum</Option>
              </Select>
            </div>
          </div>

          <div className="deals-list">
            <DealItem />
            <DealItem />
            <DealItem />
            <DealItem />
            <DealItem />
          </div>
          <div className="load-more">
            <Button
              loading={buttonLoading}
              type="default"
              className="login-form-button short"
              onClick={() => {
                setButtonLoading(true);
              }}
              style={{ fontWeight: "500" }}
            >
              load more
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
