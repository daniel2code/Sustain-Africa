import React, { useState, useEffect } from "react";
import { Select, Button, Modal, Input, message } from "antd";
import { Divider } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";

import Loader from "./../../components/Loader/Loader";
import { instance } from "./../../utils/API";
import DealItem from "./../../components/DealItem/DealItem";
import Footer from "./../../components/Footer/Footer.jsx";
import "./DealsList.scss";

const { Option } = Select;

export default function DealsList() {
  const [loadingMore, setLoadingMore] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dealsData, setDealsData] = useState(null);
  const [locationInput, setLocationInput] = useState("");

  useEffect(() => {
    fetchDeals();
    //eslint-disable-next-line
  }, []);

  const fetchDeals = async (
    page = 1,
    newest = 1,
    low2high = 0,
    high2low = 0,
    location = "",
    loadMore = null
  ) => {
    instance
      .get(
        `/deals?page=${page}&newest=${newest}&low2high=${low2high}&high2low=${high2low}&location=${location}`
      )
      .then(function (response) {
        if (response?.data?.status) {
          if (loadMore) {
            handleLoadMore(response.data);
          } else {
            setDealsData(response?.data);
          }
        } else {
          message.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        message.error(error?.response?.data?.message);
        setLoadingMore(false);
      });
  };

  const handleLoadMore = (fetchedData) => {
    let fetchedDataCopy = fetchedData;

    const oldDataArray = dealsData?.data;
    const fetchedDataArray = fetchedData?.data;

    const updatedArray = oldDataArray.concat(fetchedDataArray);

    fetchedDataCopy.data = updatedArray;

    setDealsData(fetchedDataCopy);
    setLoadingMore(false);
  };

  const onFilterChange = (value) => {
    if (value === "newest") {
      setDealsData(null);
      fetchDeals(1, 1, 0, 0, "");
    } else if (value === "highToLow") {
      setDealsData(null);
      fetchDeals(1, 0, 0, 1, "");
    } else if (value === "lowToHigh") {
      setDealsData(null);
      fetchDeals(1, 0, 1, 0, "");
    } else if (value === "location") {
      showModal();
    } else {
    }
  };

  const onLocationInputChange = (value) => {
    setLocationInput(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setDealsData(null);
    fetchDeals(1, 1, 0, 0, locationInput);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="filter by location"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="ok"
        cancelText="cancel"
      >
        <Input
          placeholder="enter location"
          onChange={(event) => {
            onLocationInputChange(event.target.value);
          }}
        />
      </Modal>
      <div className="deals-container">
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
                    onChange={onFilterChange}
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
                // onChange={onChange}
              >
                <Option value="bank">bank</Option>
                <Option value="paypal">paypal</Option>
                <Option value="cash">cash</Option>
                <Option value="skrill">skrill</Option>
                <Option value="venmo">venmo</Option>
                <Option value="bitcoin">bitcoin</Option>
                <Option value="giftcard">giftcard</Option>
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
                // onChange={onChange}
              >
                <Option value="bitcoin">bitcoin</Option>
                <Option value="paypal">paypal</Option>
                <Option value="cash">cash</Option>
                <Option value="skrill">skrill</Option>
                <Option value="venmo">venmo</Option>
                <Option value="bank">bank</Option>
                <Option value="giftcard">giftcard</Option>
                <Option value="cashapp">cashapp</Option>
                <Option value="moneygram">moneygram</Option>
                <Option value="greendot">greendot</Option>
                <Option value="ethereum">ethereum</Option>
              </Select>
            </div>
          </div>

          {dealsData ? (
            <div className="deals-list">
              {dealsData &&
                dealsData?.data.map((item) => (
                  <DealItem item={item} key={`${item.id}${Math.random()}`} />
                ))}
            </div>
          ) : (
            <Loader />
          )}

          {dealsData && dealsData?.meta?.hasNext && (
            <div className="load-more">
              <Button
                loading={loadingMore}
                type="default"
                className="login-form-button short"
                onClick={() => {
                  setLoadingMore(true);
                  fetchDeals(dealsData?.meta?.page + 1, 1, 0, 0, "", true);
                }}
                style={{ fontWeight: "500" }}
              >
                load more
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
