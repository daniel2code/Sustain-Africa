import React from "react";
import {Avatar, Modal, Tooltip} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";

export default function StartDiscussion({
                                            isVisible,
                                            handleOk,
                                            handleCancel,
                                            item,
                                        }) {
    return (
        <Modal
            title='start discussion'
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="yes"
            cancelText="no"
        >
            <div>
                <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                    <Tooltip
                        placement="top"
                        title={`they are picking ${item?.source} and will remit to ${item?.destination} at ${item?.rate}% rate`}
                    >
                        <div
                            className="source-destination"
                            style={{
                                marginRight: "0px",
                            }}
                        >
                            {item?.source}{" "}
                            <ArrowRightOutlined
                                style={{
                                    strokeWidth: "50",
                                    stroke: "white",
                                }}
                            />{" "}
                            {item?.destination}
                        </div>
                    </Tooltip>

                </div>

                <div className="source-destination-rate">this deal is going at {item?.rate}% rate. <br />would you like to
                    start a discussion with{" "}
                    <span className="username-green">@{item?.user_name_front}</span>?
                </div>
            </div>
        </Modal>
    );
}
