import React, { useState, useEffect } from "react";
import { Select, Button, Modal, Input, message } from "antd";
import { Divider } from "antd";
import { SwapOutlined, DownOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import Loader from "./../../components/Loader/Loader";
import { instance } from "./../../utils/API";
import DealItem from "./../../components/DealItem/DealItem";
import Footer from "./../../components/Footer/Footer.jsx";
import "./DealsList.scss";
import { ReactComponent as EmptyImage } from "./../../assets/empty.svg";
import { setDealsList } from "./../../redux/data/data.actions";

const { Option } = Select;

export default function DealsList() {
  const [loadingMore, setLoadingMore] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const [filterText, setFilterText] = useState("newest first");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [source, setSource] = useState("all");
  const [destination, setDestination] = useState("all");
  const dispatch = useDispatch();
  const dealsList = useSelector((state) => state.data.dealsList);

  useEffect(() => {
    if (!dealsList) {
      fetchDeals();
    }
    //eslint-disable-next-line
  }, []);

  const fetchDeals = async (
    page = 1,
    newest = 1,
    low2high = 0,
    high2low = 0,
    location = "",
    source = "all",
    destination = "all",
    loadMore = null
  ) => {
    instance
      .get(
        `/deals?page=${page}&newest=${newest}&low2high=${low2high}&high2low=${high2low}&location=${location}&source=${source}&destination=${destination}`
      )
      .then(function (response) {
        if (loadMore) {
          handleLoadMore(response.data);
        } else {
          dispatch(setDealsList(response?.data));
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
        setLoadingMore(false);
      });
  };

  const handleLoadMore = (fetchedData) => {
    let fetchedDataCopy = fetchedData;

    const oldDataArray = dealsList?.data;
    const fetchedDataArray = fetchedData?.data;

    const updatedArray = oldDataArray.concat(fetchedDataArray);

    fetchedDataCopy.data = updatedArray;

    dispatch(setDealsList(fetchedDataCopy));
    setLoadingMore(false);
  };

  const onFilterChange = (value) => {
    setFilterValue(null);
    if (value === "newest") {
      setLocationInput("");
      setFilterText("newest first");
      dispatch(setDealsList(null));
      fetchDeals(
        1,
        1,
        0,
        0,
        locationInput,
        source ? source : "all",
        destination ? destination : "all"
      );
    } else if (value === "highToLow") {
      setLocationInput("");
      setFilterText("score: high to low");
      dispatch(setDealsList(null));
      fetchDeals(
        1,
        0,
        0,
        1,
        locationInput,
        source ? source : "all",
        destination ? destination : "all"
      );
    } else if (value === "lowToHigh") {
      setLocationInput("");
      setFilterText("score: low to high");
      dispatch(setDealsList(null));
      fetchDeals(
        1,
        0,
        1,
        0,
        locationInput,
        source ? source : "all",
        destination ? destination : "all"
      );
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
    dispatch(setDealsList(null));
    setFilterText(`location: ${locationInput}`);
    fetchDeals(
      1,
      0,
      0,
      0,
      locationInput,
      source ? source : "all",
      destination ? destination : "all"
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onInstrumentChange = (type, value) => {
    dispatch(setDealsList(null));
    if (value === "all") {
      fetchDeals();
      setSource("all");
      setDestination("all");
    } else if (type === "source") {
      setSource(value);
      fetchDeals(
        1,
        1,
        0,
        0,
        locationInput,
        value,
        destination ? destination : "all"
      );
    } else {
      fetchDeals(1, 1, 0, 0, locationInput, source ? source : "all", value);
      setDestination(value);
    }
  };

  return (
    <>
      <Modal
        title="input location"
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
                    value={filterValue}
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
                <div className="filter-text">{filterText}</div>

              </div>
            </div>

            <Divider>select instruments</Divider>

            <div className="instrument-select">
              <Select
                suffixIcon={
                  <DownOutlined
                    style={{
                      strokeWidth: "50",
                      stroke: "#ed1450",
                    }}
                  />
                }
                placeholder="select instruments"
                defaultValue="all"
                value={source}
                onChange={(value) => {
                  onInstrumentChange("source", value);
                }}
              >
                <Option value="all">all</Option>
                <Option value="bank fund">bank fund</Option>
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
                <Option value="litecoin">litecoin</Option>
                <Option value="dogecoin">dogecoin</Option>
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
                suffixIcon={
                  <DownOutlined
                    style={{
                      stroke: "#ed1450",
                      strokeWidth: "50",
                    }}
                  />
                }
                placeholder="select instruments"
                defaultValue="all"
                value={destination}
                onChange={(value) => {
                  onInstrumentChange("destination", value);
                }}
              >
                <Option value="all">all</Option>
                <Option value="bank fund">bank fund</Option>
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
                <Option value="litecoin">litecoin</Option>
                <Option value="dogecoin">dogecoin</Option>
              </Select>
            </div>
          </div>

          {!dealsList ? <Loader /> : null}

          {dealsList && dealsList?.data.length === 0 ? (
            <div className="no-result">
              <div className="svg-container">
                <EmptyImage />
              </div>

              <div className="no-result-text">no deal found</div>
              <div className="no-result-text-bottom">
                try another combination
              </div>
            </div>
          ) : null}

          {dealsList && dealsList?.data.length !== 0 ? (
            <div className="deals-list">
              {dealsList &&
                dealsList?.data.map((item) => (
                  <DealItem item={item} key={`${item.id}${Math.random()}`} />
                ))}
            </div>
          ) : null}

          {dealsList &&
            dealsList?.data.length !== 0 &&
            dealsList?.meta?.hasNext && (
              <div className="load-more">
                <div>
                  {dealsList && dealsList?.meta?.hasNext && (
                    <Button
                      loading={loadingMore}
                      type="default"
                      className="login-form-button short"
                      onClick={() => {
                        setLoadingMore(true);
                        fetchDeals(
                          dealsList?.meta?.page + 1,
                          1,
                          0,
                          0,
                          locationInput,
                          source ? source : "all",
                          destination ? destination : "all",
                          true
                        );
                      }}
                      style={{ fontWeight: "500" }}
                    >
                      load more
                    </Button>
                  )}
                </div>

                <div className="results-count">
                  {`showing 1 - ${dealsList?.meta?.end} of 
                ${dealsList?.meta?.total} deals.`}
                </div>
              </div>
            )}

          {dealsList &&
            dealsList?.data.length !== 0 &&
            !dealsList?.meta?.hasNext && (
              <div className="list-end">looks like you've reached the end</div>
            )}
        </div>
      </div>
      <Footer />
    </>
  );
}
