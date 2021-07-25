import React from "react";
import { Select } from "antd";
import { Divider } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";

import DealItem from "./../../components/DealItem/DealItem";
import "./style-Deals.scss";

const { Option } = Select;

export default function DealsList() {
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <div className="deals-container">
      <div className="deals-wrapper">
        <div className="switch-bar">
          <div className="top-bar">
            <div className="left">deals</div>
            <div className="right">
              <div className="filter-by">
                <Select
                  suffixIcon={
                    <DownOutlined
                      style={{
                        strokeWidth: "50",
                        stroke: "#ed1450",
                      }}
                    />
                  }
                  placeholder="filter by..."
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
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
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="bank funds">bank funds</Option>
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

            <Divider>select instruments</Divider>

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
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="bitcoin">bitcoin</Option>
              <Option value="paypal">paypal</Option>
              <Option value="cash">cash</Option>
              <Option value="skrill">skrill</Option>
              <Option value="venmo">venmo</Option>
              <Option value="bank funds">bank funds</Option>
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
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
      </div>
    </div>
  );
}
