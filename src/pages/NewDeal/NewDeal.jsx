import React, { useState, useEffect } from "react";
import {
  Form,
  Divider,
  Input,
  InputNumber,
  message,
  Button,
  Tooltip,
  Breadcrumb,
  Radio,
  Alert,
} from "antd";
import { Link, useHistory } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useSelector } from "react-redux";
import { bearerInstance } from "./../../utils/API";
import { curType } from "./../../utils/datasource";
import "./NewDeal.scss";
import useDeals from "../../hooks/useDeals";
import DealHeader from "../../components/DealHeader/DealHeader";

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

const { TextArea } = Input;

export default function NewDeal() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!userState?.userData) {
      history.push("/login");
      message.warning("please login to continue");
    }
    //eslint-disable-next-line
  }, []);
  const { fetchDeals } = useDeals();
  const [form] = Form.useForm();
  const history = useHistory();
  const userState = useSelector((state) => state.user);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [sourceCur, setSourceCur] = useState("usd");
  const [destCur, setDestCur] = useState("usd");

  // const [showDiscussionDetail, setShowDiscussionDetail] = useState(false);
  const [minmax, setMinmax] = useState(false);
  const [rate, setRate] = useState(1);
  const [receipt, setReceipt] = useState(true);
  // const [curr, setCurr] = useState('usd');

  const handleChangeReceipt = (e) => {
    setReceipt(e.target.checked);
  };

  const onFinish = (values) => {
    // console.log(values);
    // console.log(curr);
    setButtonLoading(true);
    setMinmax(false);

    if (+values?.min >= +values?.max) {
      setButtonLoading(false);
      setMinmax(true);
      return;
    }

    const data = new FormData();
    data.append("source", values?.source);
    data.append("source_currency", values?.source_currency);
    data.append("destination", values?.destination);
    data.append("destination_currency", values?.destination_currency);
    data.append("range_min", values?.min);
    data.append("range_max", values?.max);
    data.append("remit_rate", values?.rate);
    data.append("receipt_required", receipt ? 1 : 0);
    // data.append('currency', values?.currency);
    data.append("remit_rate_structure", rate ? "percentage" : "currency");
    // data.append('discussion_title', values?.discussion);
    // data.append('discussion_details', values?.discussion_detail);
    data.append("discussion_title", "any");
    data.append("discussion_details", "any");
    data.append("deal_summary", values?.summary);
    data.append("min_score_to_accept", values?.score);
    data.append(
      "s_bank_name",
      values?.source_bank_name ? values?.source_bank_name : ""
    );
    data.append(
      "s_account_type",
      values?.source_account_type ? values?.source_account_type : ""
    );
    data.append(
      "s_account_age",
      values?.source_account_age ? values?.source_account_age : ""
    );
    data.append(
      "s_account_country",
      values?.source_country ? values?.source_country : ""
    );
    data.append(
      "s_account_state",
      values?.source_state_name ? values?.source_state_name : ""
    );
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
      values?.destination_bank_name ? values?.destination_bank_name : ""
    );
    data.append(
      "d_account_type",
      values?.destination_account_type ? values?.destination_account_type : ""
    );
    data.append(
      "d_account_age",
      values?.destination_account_age ? values?.destination_account_age : ""
    );
    data.append(
      "d_account_country",
      values?.destination_country ? values?.destination_country : ""
    );
    data.append(
      "d_account_state",
      values?.destination_state_name ? values?.destination_state_name : ""
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

    bearerInstance
      .post("/new_deal", data)
      .then(function (response) {
        setButtonLoading(false);
        if (response?.data?.status) {
          fetchDeals();
          message.success(response?.data?.message);
          history.push("/");
        } else {
          message.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
        setButtonLoading(false);
      });
  };

  return (
    <div className="new-deal-container">
      <div className="new-deal-wrapper">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/profile">profile</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>new deal</Breadcrumb.Item>
        </Breadcrumb>
        <div className="deal-form-container">
          <div className="top-bar">
            <div className="left">create new deal</div>

            {/* <div className="right">
              <Button type="primary" size="normal" style={{marginLeft: "10px"}}>
                <Link to="#">view history</Link>
              </Button>
            </div> */}
          </div>
          <Form
            {...formItemLayout}
            form={form}
            name="create_deal"
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
          >
            {/* source */}
            <DealHeader
              title="i am picking"
              mainName="source"
              tooltipText="select the source instrument. 
              this is where the fund being bought, 
              sold or swapped originates from. you can
               select from over 100 instruments"
              cur={sourceCur}
              setCur={(val) => setSourceCur(val)}
              // rate={rate}
            />

            {/* dest */}
            <DealHeader
              title="will remit to"
              mainName="destination"
              tooltipText="select the destination instrument.
               this is where the fund being bought,
                sold or swapped will be remitted to.
                 you can select from over 100 instruments."
              cur={destCur}
              setCur={(val) => setDestCur(val)}
              rate={rate}
            />

            <Divider style={{ fontSize: "14px", color: "#999" }}>
              rate structure
            </Divider>

            <Form.Item>
              <Radio.Group name="remit_rate_structure" defaultValue={rate}>
                <Radio
                  className="ant-radio"
                  onChange={(e) => {
                    if (e.target.checked) setRate(1);
                  }}
                  value={1}
                >
                  by percentage
                </Radio>

                <Radio
                  className="ant-radio"
                  onChange={(e) => {
                    if (e.target.checked) setRate(0);
                  }}
                  value={0}
                >
                  by currency
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Divider style={{ fontSize: "14px", color: "#999" }}>
              range & rate
            </Divider>

            <div className="form-row">
              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  name="rate"
                  label={`rate (${rate ? "%" : "per " + curType(sourceCur)})`}
                  style={{
                    display: "inline-block",
                    width: "calc(100% - 30px)",
                    // marginLeft: '2%',
                  }}
                  rules={[
                    {
                      required: true,
                      message: "input rate!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      paddingTop: "0",
                      paddingBottom: "0",
                    }}
                    placeholder="0"
                    suffix={
                      <span style={{ fontSize: "14px", color: "#999" }}>
                        {rate ? "%" : "/" + curType(sourceCur)}
                      </span>
                    }
                    prefix={
                      <span style={{ fontSize: "14px", color: "#999" }}>
                        {rate ? "" : curType(destCur)}
                      </span>
                    }
                  />
                </Form.Item>
              </Form.Item>
              <div className="tooltip-container  origin">
                <Tooltip
                  placement="left"
                  title="specify your cut or remittance rate in %"
                >
                  <div
                    className="question-tooltip"
                    style={{ marginTop: "40px" }}
                  >
                    ?
                  </div>
                </Tooltip>
              </div>
            </div>

            <Form.Item style={{ marginBottom: 0, width: "calc(100% - 30px)" }}>
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
              {minmax && (
                <Alert
                  message="error"
                  description="min amount must be less than max amount"
                  type="error"
                  showIcon
                  closable
                />
              )}
            </Form.Item>

            <Divider style={{ fontSize: "14px", color: "#999" }}>
              discussion & linkup
            </Divider>

            {/* <div className="form-row">
              <Form.Item
                name="discussion"
                label="medium"
                rules={[
                  {
                    required: true,
                    message: 'please specify discussion medium!',
                  },
                ]}
              >
                <Select
                  style={{
                    width: 'calc(100% - 30px)',
                  }}
                  suffixIcon={
                    <DownOutlined
                      style={{
                        strokeWidth: '50',
                        color: '#ed1450',
                      }}
                    />
                  }
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
              <div className="tooltip-container">
                <Tooltip
                  placement="left"
                  title="discussions will first happen here via the live chat. discussions can be moved off the platform if both parties wish, but the live chat must be ended here to the satisfaction of both parties with no issues raised, reviews dropped, before the chat window can close and the user can continue to deal on sustain. both user accounts will be temporarily deactivated together with the accounts of anyone they are connected with, until deal is completed to the satisfaction of both parties."
                >
                  <div className="question-tooltip">?</div>
                </Tooltip>
              </div>
            </div>

            {showDiscussionDetail && (
              <Form.Item
                label="discussion detail"
                name="discussion_detail"
                rules={[
                  {
                    required: true,
                    message: 'please provide discussion detail!',
                  },
                ]}
              >
                <TextArea
                  style={{
                    width: 'calc(100% - 30px)',
                  }}
                  placeholder="kindly share details on how discussion will be done."
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            )} */}

            <Form.Item
              label="notes"
              name="summary"
              rules={[
                {
                  required: true,
                  message: "please provide notes!",
                },
              ]}
            >
              <TextArea
                style={{
                  width: "calc(100% - 30px)",
                }}
                placeholder="please provide more information regarding this deal, like the range and remittance rate. summarise the details of your offer in simple terms. please try to be as concise as possible."
                autoSize={{ minRows: 4, maxRows: 7 }}
              />
            </Form.Item>

            <div className="form-row">
              <Form.Item
                label="min. profile score (0 - 100)"
                name="score"
                rules={[
                  {
                    required: true,
                    message: "input min score!",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "calc(100% - 30px)",
                  }}
                  min={1}
                  max={5}
                  placeholder="minimum profile score to accept"
                  // onChange={onChange}
                />
              </Form.Item>
              <div className="tooltip-container">
                <Tooltip
                  placement="left"
                  title="users on sustain are ranked based on profile score metric. the algorithm is biased to the users with higher score scores. choose the minimum score score that a user should have to be eligible to open a discussion with you."
                >
                  <div className="question-tooltip">?</div>
                </Tooltip>
              </div>
            </div>

            <Form.Item style={{ marginTop: "20px" }}>
              <div className="form-row-sec">
                <Checkbox
                  checked={receipt}
                  name="receipt_required"
                  onChange={handleChangeReceipt}
                >
                  receipt required
                </Checkbox>

                <div className="tooltip-container">
                  <Tooltip
                    placement="left"
                    title="check the box to make uploading payment slips mandatory for this deal. Uncheck to remove this requirement"
                  >
                    <div className="question-tooltip">?</div>
                  </Tooltip>
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                style={{ marginTop: "10px" }}
                loading={buttonLoading}
                type="primary"
                htmlType="submit"
              >
                post deal
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
