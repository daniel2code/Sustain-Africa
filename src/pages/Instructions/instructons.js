import React from "react";
import { Alert, Button } from "antd";
import { ExclamationCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import "../Discussion/discussion.scss";

const Instructons = () => {
  const history = useHistory();

  const location = useLocation();

  const { discussionDetails, checkMerchant, discussionData } = location.state;

  console.log(discussionDetails);

  const paid = false;
  return (
    <div className="message-wrapper">
      <div className="instructions-box-two">
        <div>
          {!checkMerchant && (
            <div>
              {discussionDetails?.dealer_paid !== 0 ? (
                <Alert
                  message="Notice"
                  description={`waiting for ${discussionData?.merchant_data[0]?.user_name} to confirm your payment...`}
                  type="success"
                  style={{
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                  closable
                  showIcon
                />
              ) : (
                <Alert
                  message="Notice"
                  description="you haven’t paid yet"
                  type="success"
                  style={{ marginBottom: "20px" }}
                  closable
                  showIcon
                />
              )}
            </div>
          )}

          <h2 className="instruction-title">instructions</h2>
          {checkMerchant ? (
            <>
              <p>
                <b className="bold-text">
                  {`Stage 1: to sell $${discussionDetails?.source_value} worth of btc to ${discussionData?.dealer_data[0]?.user_name} using ${discussionDetails?.source} as a payment method.`}
                </b>
              </p>
              <p>Please follow the steps below:</p>
              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  {` provide your ${discussionDetails?.source} details to ${discussionData?.dealer_data[0]?.user_name} and stay active`}
                </p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  {` wait for ${discussionData?.dealer_data[0]?.user_name} to send the $${discussionDetails?.source_value} to your ${discussionDetails?.source}`}
                </p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  once you have received the complete amount, click on "seen
                  payment" button
                </p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  only click on "seen payment" when you are sure you have
                  received the full amount. DO NOT CLICK ON IT IF YOU HAVEN'T
                  RECEIVED THE FULL PAYMENT. if you have any issues, you can
                  raise a dispute after 2 hours.
                </p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  click on the chat button below to continue your transaction.
                </p>
              </div>
            </>
          ) : (
            <>
              <p>
                <b className="bold-text">
                  {`Stage 1: to buy $${discussionDetails?.source_value} worth of btc from ${discussionData?.merchant_data[0]?.user_name} using ${discussionDetails?.source} as a payment method.`}
                </b>
              </p>
              <p>Please follow the steps below:</p>
              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  {` provide your ${discussionDetails?.source} details to ${discussionData?.merchant_data[0]?.user_name} and stay active`}
                </p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  {` send the exact amount of $${discussionDetails?.source_value} to his provided ${discussionDetails?.source} details`}
                </p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  once sent, click on "i have paid" button to confirm you have
                  sent it.
                </p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">upload a payment slip if required.</p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  {`wait for ${discussionData?.merchant_data[0]?.user_name} to confirm that they have received the payment.`}
                </p>
              </div>

              <div className="instructions-wrap">
                <ExclamationCircleOutlined
                  style={{ color: "#14a014" }}
                  spin={true}
                />
                <p className="list-text">
                  click on the chat button below to continue your transaction.
                </p>
              </div>
            </>
          )}

          {/* <p style={{ margin: "30px 0px" }}>
            <b className="bold-text">
              Stage 2: You are now buying $500 worth of btc with Cashapp.
            </b>
          </p>

          <div className="instructions-wrap">
            <ExclamationCircleOutlined
              style={{ color: "#14a014" }}
              spin={true}
            />
            <p className="list-text">Click on I Have Paid when done.</p>
          </div>

          <div className="instructions-wrap">
            <ExclamationCircleOutlined
              style={{ color: "#14a014" }}
              spin={true}
            />
            <p className="list-text">Click on I Have Paid when done.</p>
          </div> */}
        </div>

        <div className="actions-wrapper-section">
          <div
            style={{ opacity: "1", width: "47%" }}
            onClick={() => history.goBack()}
          >
            <Button
              icon={<MessageOutlined />}
              // color="success"
              style={{
                fontSize: "14px",
                backgroundColor: "white",
                color: "#fb4570",
                padding: "3px 5px",
                width: "100%",
                height: "40px",
                textAlign: "center",
              }}
            >
              chats
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 14,
              opacity: "1",
              width: "46%",
            }}
          >
            <Button
              icon={<ExclamationCircleOutlined />}
              style={{
                fontSize: "14px",
                backgroundColor: "#fb4570",
                color: "white",
                padding: "3px 5px",
                width: "100%",
                height: "40px",
                textAlign: "center",
              }}
            >
              instructions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructons;
