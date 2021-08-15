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
import { ReactComponent as EmptyImage } from "./../../assets/empty.svg";

const { Option } = Select;

export default function DealsList() {
  const [loadingMore, setLoadingMore] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dealsData, setDealsData] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

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
    source = "bank fund",
    destination = "bitcoin",
    loadMore = null
  ) => {
    instance
      .get(
        `/deals?page=${page}&newest=${newest}&low2high=${low2high}&high2low=${high2low}&location=${location}&source=${source}&destination=${destination}`
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
      setLocationInput("");
      setDealsData(null);
      fetchDeals(1, 1, 0, 0, "");
    } else if (value === "highToLow") {
      setLocationInput("");
      setDealsData(null);
      fetchDeals(1, 0, 0, 1, "");
    } else if (value === "lowToHigh") {
      setLocationInput("");
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
    fetchDeals(
      1,
      0,
      0,
      0,
      locationInput,
      source ? source : "bank fund",
      destination ? destination : "bitcoin"
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onInstrumentChange = (type, value) => {
    if (type === "source") {
      setSource(value);
      fetchDeals(
        1,
        1,
        0,
        0,
        locationInput,
        value,
        destination ? destination : "bitcoin"
      );
    } else {
      fetchDeals(
        1,
        1,
        0,
        0,
        locationInput,
        source ? source : "bank fund",
        value
      );
      setDestination(value);
    }
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
                defaultValue="bank fund"
                onChange={(value) => {
                  onInstrumentChange("source", value);
                }}
              >
                <Option value="bank fund">bank</Option>
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
                onChange={(value) => {
                  onInstrumentChange("destination", value);
                }}
              >
                <Option value="bank fund">bank</Option>
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
            </div>
          </div>

          {!dealsData && <Loader />}

          {dealsData && dealsData?.data.length === 0 && (
            <div className="no-result">
              <div className="svg-container">
                <EmptyImage />
              </div>

              <div className="no-result-text">no deal found</div>
            </div>
          )}

          {dealsData && dealsData?.data.length !== 0 && (
            <div className="deals-list">
              {dealsData &&
                dealsData?.data.map((item) => (
                  <DealItem item={item} key={`${item.id}${Math.random()}`} />
                ))}
            </div>
          )}

          {dealsData && dealsData?.data.length !== 0 && (
            <div className="load-more">
              <div>
                {dealsData && dealsData?.meta?.hasNext && (
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
                )}
              </div>

              <div className="results-count">
                showing {dealsData?.meta?.start} - {dealsData?.meta?.end} of{" "}
                {dealsData?.meta?.total} deals.
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
