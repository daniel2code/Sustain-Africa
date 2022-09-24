import React from "react";
import "./modals.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Modal = () => {
  return (
    <div className="container2">
      <div className="modalbox">
        <div className="modalHeader">
          <ExclamationCircleOutlined
            size={30}
            color="yellow"
            className="icon"
          />

          <p className="modalTitle">are you sure?</p>
        </div>

        <div className="content-text-box">
          <ExclamationCircleOutlined
            size={30}
            color="yellow"
            className="icon"
          />
          <p className="content_text">
            do not end chat if you've already made this payment. for any other
            issues, click on back and start a dispute.
          </p>
        </div>

        <div className="input-box">
          <input type="checkbox"  />
          <p className="check-text" >I conﬁrm that I have not paid and I wish to end chat now.</p>
        </div>

        <div className="btn-box">
          <button>Back</button>
          <button className="ok-btn">End chat</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
