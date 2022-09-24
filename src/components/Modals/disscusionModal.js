import React from "react";
import "./modals.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Modal = () => {
  return (
    <div className="container">
      <div className="modalbox">
        <div className="modalHeader">
          <ExclamationCircleOutlined
            size={30}
            color="yellow"
            className="icon"
          />
          <div className="modalBody">
            <p className="modalTitle">
              start a discussion with
              <b> @9a2fo9ns?</b>
            </p>

            <div className="modalContent">
              <p>Source:</p>
              <p>paypal wallet ($)</p>
              <p>destination:</p>
              <p> bank account (N)</p>
              <p>rate:</p>
              <p>N425/$</p>
              <p>amount ($):</p>
              <input placeholder="Enter amount" className="input" />
              <p>to remit (N):</p>
              <p>N20,845.00</p>
            </div>
          </div>
        </div>

        <div className="btn-box">
          <button>cancel</button>
          <button className="ok-btn" >Ok</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
