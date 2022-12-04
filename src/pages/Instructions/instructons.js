import React from "react";
import { Alert, Button } from "antd";
import { ExclamationCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "../Discussion/discussion.scss";

const Instructons = () => {
  const history = useHistory();

  const paid = false;
  return (
    <div className="message-wrapper">
      <div className="instructions-box-two">
        <div>
          <div>
            {paid ? (
              <Alert
                message="Notice"
                description="waiting for 9a2fo9ns to confirm your payment..."
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

          <h2 className="instruction-title">instructions</h2>
          <p>
            <b className="bold-text">
              Stage 1: You are now buying $500 worth of btc with Cashapp.
            </b>
          </p>
          <div className="instructions-wrap">
            <ExclamationCircleOutlined
              style={{ color: "#14a014" }}
              spin={true}
            />
            <p className="list-text">
              Wait for the user to provide his Cashapp wallet.
            </p>
          </div>

          <div className="instructions-wrap">
            <ExclamationCircleOutlined
              style={{ color: "#14a014" }}
              spin={true}
            />
            <p className="list-text">
              Wait for the user to provide his Cashapp wallet.
            </p>
          </div>

          <div className="instructions-wrap">
            <ExclamationCircleOutlined
              style={{ color: "#14a014" }}
              spin={true}
            />
            <p className="list-text">
              Make a payment of $500 into the user‘s Cashapp wallet
            </p>
          </div>

          <div className="instructions-wrap">
            <ExclamationCircleOutlined
              style={{ color: "#14a014" }}
              spin={true}
            />
            <p className="list-text">Click on I Have Paid when done.</p>
          </div>

          <p style={{ margin: "30px 0px" }}>
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
          </div>
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
