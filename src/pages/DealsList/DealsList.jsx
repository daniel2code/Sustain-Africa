import React from "react";
import { Select } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import DealItem from "./../../components/DealItem/DealItem";
import "./style-Deals.scss";

const { Option } = Select;

export default function DealsList() {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className="deals-container">
      <div className="deals-wrapper">
        <div className="switch-bar">
          <div className="left">deals</div>
          <div className="right">
            <div>
              <Select
                defaultValue="paypal"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="bank">bank</Option>
                <Option value="paypal">paypal</Option>
                <Option value="cash">cash</Option>
                <Option value="skrill">skrill</Option>
                <Option value="venmo">venmo</Option>
                <Option value="skrill">skrill</Option>
              </Select>
            </div>
            <div className="arrows">
              <SwapOutlined />
            </div>
            <div>
              <Select
                defaultValue="bitcoin"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="bitcoin">bitcoin</Option>
                <Option value="paypal">paypal</Option>
                <Option value="cash">cash</Option>
                <Option value="skrill">skrill</Option>
                <Option value="venmo">venmo</Option>
                <Option value="skrill">skrill</Option>
              </Select>
            </div>
          </div>
        </div>

        <div className="deals-list">
          <DealItem />
          <DealItem />
          <DealItem />
          <DealItem />
          <DealItem />
        </div>
      </div>
    </div>
  );
}
