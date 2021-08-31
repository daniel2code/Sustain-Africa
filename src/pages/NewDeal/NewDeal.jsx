import React, { useState } from "react";
import { Divider } from "antd";
import { Form, Input, InputNumber, Select } from "antd";
import { Link } from "react-router-dom";

import {
  wallet_types,
  exchanges,
  countries,
  us_states,
  uk_states,
  ng_states,
  us_banks,
  uk_banks,
  ng_banks,
  account_types,
  account_age,
  wallet_age,
  card_types,
  card_brands,
} from "./../../utils/datasource";

import "./NewDeal.scss";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 28,
    },
  },
};

const { Option } = Select;
const { TextArea } = Input;

export default function NewDeal() {
  const [form] = Form.useForm();
  const [selectedSource, setSelectedSource] = useState("");
  const [sourceStatesToRender, setSourceStatesToRender] = useState([]);
  const [sourceBanksToRender, setSourceBanksToRender] = useState([]);
  const [sourceStateInput, setSourceStateInput] = useState(null);
  const [sourceBankInput, setSourceBankInput] = useState(null);
  const [sourceAccountInput, setSourceAccountInput] = useState(null);
  const [sourceAccountAgeInput, setSourceAccountAgeInput] = useState(null);

  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinationStatesToRender, setDestinationStatesToRender] = useState(
    []
  );
  const [destinationBanksToRender, setDestinationBanksToRender] = useState([]);
  const [destinationStateInput, setDestinationStateInput] = useState(null);
  const [destinationBankInput, setDestinationBankInput] = useState(null);
  const [destinationAccountInput, setDestinationAccountInput] = useState(null);
  const [destinationAccountAgeInput, setDestinationAccountAgeInput] =
    useState(null);

  const onFinish = async (values) => {
    console.log(values);
  };

  const handleSourceSelect = async (value) => {
    setSelectedSource(value);
  };

  const onSourceBankCountryChange = async (value) => {
    setSourceStateInput(null);
    setSourceBankInput(null);
    setSourceAccountInput(null);
    setSourceAccountAgeInput(null);

    if (value === "United States") {
      setSourceStatesToRender(us_states);
      setSourceBanksToRender(us_banks);
    } else if (value === "United Kingdom") {
      setSourceStatesToRender(uk_states);
      setSourceBanksToRender(uk_banks);
    } else if (value === "Nigeria") {
      setSourceStatesToRender(ng_states);
      setSourceBanksToRender(ng_banks);
    }
  };

  const handleDestinationSelect = async (value) => {
    setSelectedDestination(value);
  };

  const onDestinationBankCountryChange = async (value) => {
    setDestinationStateInput(null);
    setDestinationBankInput(null);
    setDestinationAccountInput(null);
    setDestinationAccountAgeInput(null);

    if (value === "United States") {
      setDestinationStatesToRender(us_states);
      setDestinationBanksToRender(us_banks);
    } else if (value === "United Kingdom") {
      setDestinationStatesToRender(uk_states);
      setDestinationBanksToRender(uk_banks);
    } else if (value === "Nigeria") {
      setDestinationStatesToRender(ng_states);
      setDestinationBanksToRender(ng_banks);
    }
  };

  return (
    <div className="new-deal-container">
      <div className="new-deal-wrapper">
        <div className="deal-form-container">
          <div className="top-bar">
            <div className="left">
              <Link to="#">new deal</Link>
            </div>

            <div className="right">
              <Link to="#">history</Link>
            </div>
          </div>
          <Form
            {...formItemLayout}
            form={form}
            name="create_deal"
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="source"
              label="i am picking"
              rules={[
                {
                  required: true,
                  message: "Please select deal source!",
                },
              ]}
            >
              <Select
                placeholder="select source"
                onChange={(value) => {
                  handleSourceSelect(value);
                }}
              >
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
            </Form.Item>
            {(selectedSource === "bitcoin" ||
              selectedSource === "ethereum" ||
              selectedSource === "litecoin" ||
              selectedSource === "dogecoin") && (
              <>
                <Form.Item
                  name="source_wallet_type"
                  rules={[
                    {
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="wallet type">
                    {wallet_types &&
                      wallet_types.map((wallet) => (
                        <Option key={wallet} value={wallet}>
                          {wallet}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="source_exchange"
                  rules={[
                    {
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="exchange">
                    {exchanges &&
                      exchanges.map((exchange) => (
                        <Option key={exchange} value={exchange}>
                          {exchange}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="source_wallet_age"
                  rules={[
                    {
                      required: true,
                      message: "Please select wallet age!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="wallet age">
                    {wallet_age &&
                      wallet_age.map((age) => (
                        <Option key={age} value={age}>
                          {age}
                        </Option>
                      ))}
                    <Option key="above 10" value="above 10">
                      above 10
                    </Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {selectedSource === "bank fund" && (
              <>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="source_country"
                    style={{ display: "inline-block", width: "34%" }}
                    rules={[
                      {
                        required: true,
                        message: "select bank country!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="country"
                      onChange={onSourceBankCountryChange}
                    >
                      {countries &&
                        countries.map((country) => (
                          <Option key={country} value={country}>
                            {country}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "34%",
                      marginLeft: "2%",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "select bank state!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="state"
                      value={sourceStateInput}
                      onChange={(value) => {
                        setSourceStateInput(value);
                      }}
                    >
                      {sourceStatesToRender &&
                        sourceStatesToRender.map((state) => (
                          <Option key={state} value={state}>
                            {state}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select bank name!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select
                    placeholder="bank name"
                    value={sourceBankInput}
                    onChange={(value) => {
                      setSourceBankInput(value);
                    }}
                  >
                    {sourceBanksToRender &&
                      sourceBanksToRender.map((bank) => (
                        <Option key={bank} value={bank}>
                          {bank}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select account type!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select
                    placeholder="account type"
                    value={sourceAccountInput}
                    onChange={(value) => {
                      setSourceAccountInput(value);
                    }}
                  >
                    {account_types &&
                      account_types.map((account) => (
                        <Option key={account} value={account}>
                          {account}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select account age!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select
                    placeholder="account age"
                    value={sourceAccountAgeInput}
                    onChange={(value) => {
                      setSourceAccountAgeInput(value);
                    }}
                  >
                    {account_age &&
                      account_age.map((age) => (
                        <Option key={age} value={age}>
                          {age}
                        </Option>
                      ))}
                    <Option key="above 10" value="above 10">
                      above 10
                    </Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {selectedSource === "giftcard" && (
              <>
                <Form.Item
                  name="source_card_type"
                  rules={[
                    {
                      required: true,
                      message: "Please select giftcard type!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="giftcard type">
                    {card_types &&
                      card_types.map((card) => (
                        <Option key={card} value={card}>
                          {card}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="source_card_brand"
                  rules={[
                    {
                      required: true,
                      message: "Please select giftcard brand!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="giftcard brand">
                    {card_brands &&
                      card_brands.map((brand) => (
                        <Option key={brand} value={brand}>
                          {brand}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </>
            )}

            <Form.Item
              name="destination"
              label="will deposit to"
              rules={[
                {
                  required: true,
                  message: "Please select deal destination!",
                },
              ]}
            >
              <Select
                placeholder="select destination"
                onChange={(value) => {
                  handleDestinationSelect(value);
                }}
              >
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
            </Form.Item>
            {(selectedDestination === "bitcoin" ||
              selectedDestination === "ethereum" ||
              selectedDestination === "dogecoin" ||
              selectedDestination === "litecoin") && (
              <>
                <Form.Item
                  name="destination_wallet_type"
                  rules={[
                    {
                      required: true,
                      message: "Please select wallet type!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="wallet type">
                    {wallet_types &&
                      wallet_types.map((wallet) => (
                        <Option key={wallet} value={wallet}>
                          {wallet}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="destination_exchange"
                  rules={[
                    {
                      required: true,
                      message: "Please select exchange!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="exchange">
                    {exchanges &&
                      exchanges.map((exchange) => (
                        <Option key={exchange} value={exchange}>
                          {exchange}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="destination_wallet_age"
                  rules={[
                    {
                      required: true,
                      message: "Please select wallet age!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="wallet age">
                    {wallet_age &&
                      wallet_age.map((age) => (
                        <Option key={age} value={age}>
                          {age}
                        </Option>
                      ))}
                    <Option key="above 10" value="above 10">
                      above 10
                    </Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {selectedDestination === "bank fund" && (
              <>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="destination_country"
                    style={{ display: "inline-block", width: "34%" }}
                    rules={[
                      {
                        required: true,
                        message: "select bank country!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="country"
                      onChange={onDestinationBankCountryChange}
                    >
                      {countries &&
                        countries.map((country) => (
                          <Option key={country} value={country}>
                            {country}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "34%",
                      marginLeft: "2%",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "select bank state!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="state"
                      value={destinationStateInput}
                      onChange={(value) => {
                        setDestinationStateInput(value);
                      }}
                    >
                      {destinationStatesToRender &&
                        destinationStatesToRender.map((state) => (
                          <Option key={state} value={state}>
                            {state}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select bank name!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select
                    placeholder="bank name"
                    value={destinationBankInput}
                    onChange={(value) => {
                      setDestinationBankInput(value);
                    }}
                  >
                    {destinationBanksToRender &&
                      destinationBanksToRender.map((bank) => (
                        <Option key={bank} value={bank}>
                          {bank}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select account type!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select
                    placeholder="account type"
                    value={destinationAccountInput}
                    onChange={(value) => {
                      setDestinationAccountInput(value);
                    }}
                  >
                    {account_types &&
                      account_types.map((account) => (
                        <Option key={account} value={account}>
                          {account}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select account age!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select
                    placeholder="account age"
                    value={destinationAccountAgeInput}
                    onChange={(value) => {
                      setDestinationAccountAgeInput(value);
                    }}
                  >
                    {account_age &&
                      account_age.map((age) => (
                        <Option key={age} value={age}>
                          {age}
                        </Option>
                      ))}
                    <Option key="above 10" value="above 10">
                      above 10
                    </Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {selectedDestination === "giftcard" && (
              <>
                <Form.Item
                  name="destination_card_type"
                  rules={[
                    {
                      required: true,
                      message: "Please select giftcard type!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="giftcard type">
                    {card_types &&
                      card_types.map((card) => (
                        <Option key={card} value={card}>
                          {card}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="destination_card_brand"
                  rules={[
                    {
                      required: true,
                      message: "Please select giftcard brand!",
                      whitespace: true,
                    },
                  ]}
                  style={{ width: "70%" }}
                >
                  <Select placeholder="giftcard brand">
                    {card_brands &&
                      card_brands.map((brand) => (
                        <Option key={brand} value={brand}>
                          {brand}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </>
            )}

            <Divider style={{ fontSize: "14px", color: "#999" }}>
              range & remittance
            </Divider>

            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="min."
                name="min"
                rules={[
                  {
                    required: true,
                    message: "input min!",
                  },
                ]}
                style={{ display: "inline-block", width: "49%" }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  defaultValue={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  // onChange={onChange}
                />
              </Form.Item>
              {/* <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  lineHeight: "32px",
                  textAlign: "center",
                }}
              >
                -
              </span> */}
              <Form.Item
                label="max."
                name="max"
                rules={[
                  {
                    required: true,
                    message: "input max!",
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "49%",
                  marginLeft: "2%",
                }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  defaultValue={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  // onChange={onChange}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="currency"
                name="currency"
                style={{ display: "inline-block", width: "49%" }}
                rules={[
                  {
                    required: true,
                    message: "Please specify currency!",
                  },
                ]}
              >
                <Select
                  placeholder="select"
                  // value={destination}
                  // onChange={(value) => {
                  //   onInstrumentChange("destination", value);
                  // }}
                >
                  <Option value="usd">USD</Option>
                  <Option value="ngn">NGN</Option>
                  <Option value="cad">CAD</Option>
                  <Option value="gbp">GBP</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="rate"
                label="remittance rate"
                style={{
                  display: "inline-block",
                  width: "49%",
                  marginLeft: "2%",
                }}
                rules={[
                  {
                    required: true,
                    message: "input rate!",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  defaultValue={0}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  // onChange={onChange}
                />
              </Form.Item>
            </Form.Item>
            <Divider style={{ fontSize: "14px", color: "#999" }}>
              discussion & linkup
            </Divider>

            <Form.Item
              name="discussion"
              label="medium"
              style={{
                display: "inline-block",
                width: "100%",
              }}
              rules={[
                {
                  required: true,
                  message: "input rate!",
                },
              ]}
            >
              <Select
                placeholder="select discussion medium"
                // value={destination}
                // onChange={(value) => {
                //   onInstrumentChange("destination", value);
                // }}
              >
                <Option value="any">any</Option>
                <Option value="whatsapp">whatsapp</Option>
                <Option value="telegram">telegram</Option>
                <Option value="zoom">zoom</Option>
                <Option value="ICQ">ICQ</Option>
                <Option value="google meet">google meet</Option>
                <Option value="meet in person">meet in person</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="deal summary"
              name="summary"
              rules={[
                {
                  required: true,
                  message: "please provide deal summary!",
                },
              ]}
            >
              <TextArea
                placeholder="please provide more information regarding this deal, like the range, remittance rate and details on how discussions will happen."
                autoSize={{ minRows: 4, maxRows: 7 }}
              />
            </Form.Item>
            <Form.Item
              label="min. relevance score"
              name="score"
              rules={[
                {
                  required: true,
                  message: "input min score!",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={5}
                placeholder="minimum relevance score to accept"
                // onChange={onChange}
              />
            </Form.Item>
            <Form.Item>
              <button htmlType="submit" className="green-button">
                post deal
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
