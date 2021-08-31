import React, { useState } from "react";
import { Divider } from "antd";
import { Form, Input, InputNumber, Select, message, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { instance } from "./../../utils/API";

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
  const history = useHistory();
  const userState = useSelector((state) => state.user);
  const [buttonLoading, setButtonLoading] = useState(false);
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
  const [showDiscussionDetail, setShowDiscussionDetail] = useState(false);

  const onFinish = async (values) => {
    setButtonLoading(true);

    const data = new FormData();
    data.append("dealer_id", userState?.profile?.id);
    data.append("dealer_user_name", userState?.profile?.user_name);
    data.append("source", values?.source);
    data.append("destination", values?.destination);
    data.append("range_min", values?.min);
    data.append("range_max", values?.max);
    data.append("remit_rate", values?.rate);
    data.append("currency", values?.currency);
    data.append("discussion_title", values?.discussion);
    data.append("discussion_details", values?.discussion_detail);
    data.append("deal_summary", values?.summary);
    data.append("min_score_to_accept", values?.score);
    data.append("s_bank_name", sourceBankInput ? sourceBankInput : "");
    data.append("s_account_type", sourceAccountInput ? sourceAccountInput : "");
    data.append(
      "s_account_age",
      sourceAccountAgeInput ? sourceAccountAgeInput : ""
    );
    data.append(
      "s_account_country",
      values?.source_country ? values?.source_country : ""
    );
    data.append("s_account_state", sourceStateInput ? sourceStateInput : "");
    data.append(
      "s_wallet_type",
      values?.source_wallet_type ? values?.source_wallet_type : ""
    );
    data.append(
      "s_wallet_age",
      values?.source_wallet_age ? values?.source_wallet_age : ""
    );
    data.append(
      "s_exchange",
      values?.source_exchange ? values?.source_exchange : ""
    );
    data.append(
      "s_card_type",
      values?.source_card_type ? values?.source_card_type : ""
    );
    data.append(
      "s_card_brand",
      values?.source_card_brand ? values?.source_card_brand : ""
    );
    data.append(
      "d_bank_name",
      destinationBankInput ? destinationBankInput : ""
    );
    data.append(
      "d_account_type",
      destinationAccountInput ? destinationAccountInput : ""
    );
    data.append(
      "d_account_age",
      destinationAccountAgeInput ? destinationAccountAgeInput : ""
    );
    data.append(
      "d_account_country",
      values?.destination_country ? values?.destination_country : ""
    );
    data.append(
      "d_account_state",
      destinationStateInput ? destinationStateInput : ""
    );
    data.append(
      "d_wallet_type",
      values?.destination_wallet_type ? values?.destination_wallet_type : ""
    );
    data.append(
      "d_wallet_age",
      values?.destination_wallet_age ? values?.destination_wallet_age : ""
    );
    data.append(
      "d_exchange",
      values?.destination_exchange ? values?.destination_exchange : ""
    );
    data.append(
      "d_card_type",
      values?.destination_card_type ? values?.destination_card_type : ""
    );
    data.append(
      "d_card_brand",
      values?.destination_card_brand ? values?.destination_card_brand : ""
    );

    instance
      .post("/new_deal", data)
      .then(function (response) {
        setButtonLoading(false);
        if (response?.data?.status) {
          message.success(response?.data?.message);
          history.push("/");
        } else {
          message.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        message.error(error?.response?.data?.message);
        setButtonLoading(false);
      });
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                    style={{ display: "inline-block", width: "39%" }}
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
                      width: "39%",
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                    style={{ display: "inline-block", width: "39%" }}
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
                      width: "39%",
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
                  style={{ width: "80%" }}
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
              range & rate
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
                  placeholder="min. amount"
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
                  placeholder="max. amount"
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
                <Select placeholder="select">
                  <Option value="usd">USD</Option>
                  <Option value="ngn">NGN</Option>
                  <Option value="cad">CAD</Option>
                  <Option value="gbp">GBP</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="rate"
                label="rate"
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
                onChange={() => {
                  setShowDiscussionDetail(true);
                }}
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

            {showDiscussionDetail && (
              <Form.Item
                label="discussion detail"
                name="discussion_detail"
                rules={[
                  {
                    required: true,
                    message: "please provide discussion detail!",
                  },
                ]}
              >
                <TextArea
                  placeholder="kindly share details on how discussion will be done."
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            )}

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
                placeholder="please provide more information regarding this deal, like the range and remittance rate."
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
              <Button loading={buttonLoading} type="primary" htmlType="submit">
                post deal
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
