import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
// import { format } from 'timeago.js';
import axios from "axios";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import "./discussion.scss";
import { sendNotification } from "../../utils/notification";
import ChatHeader from "../../components/Chat/ChatHeader";
import { bearerInstance, bearerInstanceWithToken } from "../../utils/API";
import { Alert, Button, Checkbox, Tag, Space } from "antd";
import {
  RightOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  QuestionOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  confirmModal,
  successMessage,
  errorMessage,
} from "../../utils/confirm";
import Countdown from "react-countdown";
import storage from "redux-persist/lib/storage";

export default function Discussion() {
  const user = useSelector((state) => state?.user?.userData);
  const param = useParams();
  const [tab, setTab] = useState("chats");

  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const [chatting, setChatting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [merchant, setMerchantId] = useState(null);
  const [merchantDetails, setMerchantDetails] = useState(null);
  const [paid, setPaid] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "An error occured, please try again"
  );

  const successRef = useRef();
  const errorRef = useRef();

  const init = async () => {
    const res = await axios.get(
      `https://sustain.africa/chat/server.php?create-token=${user.id}`
    );
    const { token } = res.data;

    const userData = {
      id: user?.id,
      name: user?.user_name_front,
    };

    const chatClient = StreamChat.getInstance("2shvqv4hcrbh");
    const clientlog = await chatClient.connectUser(userData, token);

    console.log(clientlog);

    const chatChannel = chatClient.channel("messaging", param.id, {
      name: param.id,
      // members: [user?.id, `${merchantDetails?.profile_data[0]?.user_name}`],
      // color: "green",
    });

    await chatChannel.watch({ presence: true });

    // const channels = client.channel("messaging", param.id, {
    //   members: [merchantDetails?.profile_data[0]?.user_name],
    //   color: "green",
    // });

    // const state = await channels.watch({ presence: true });

    console.log(chatChannel.data);

    chatChannel.addMembers([user.id]);

    setChannel(chatChannel);
    setClient(chatClient);
  };

  useEffect(() => {
    init();

    if (client) return () => client.disconnectUser();
    // eslint-disable-next-line
  }, [user.id]);

  useEffect(() => {
    if (channel) {
      channel.on((event) => {
        if (event.type === "paid") setPaid(true);
      });
    }
  }, [channel]);

  useEffect(() => {
    if (channel) {
      channel.on("message.new", (event) => {
        if (event.user.id !== user.id)
          sendNotification("user", event.message.text, `/chat/${param.id}`);
      });
    }
  }, [channel, user.id, param.id]);

  useEffect(() => {
    if (param.id) {
      setLoading(true);
      bearerInstance
        .get(`/fetch_discussion?discussion_id=${param.id}`)
        .then((res) => {
          console.log(res.data?.merchant_data[0]?.id);
          setMerchantId(res.data?.merchant_data[0]?.id);

          console.log(res.data.deal_data[0].dealer_id, user.id);

          if (res.data.deal_data[0].dealer_id === user.id)
            setChatting(res.data.merchant_data[0]);
          else setChatting(res.data.dealer_data[0]);

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [param.id, user.id]);

  useEffect(() => {
    if (merchant) {
      bearerInstance
        .get(`/profile?id=${merchant}`)
        .then((res) => {
          console.log(res.data);
          setMerchantDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [merchant]);

  const handlePaid = () => {
    confirmModal(
      <h3 style={{ fontSize: "16px" }}>
        have you sent the money to{" "}
        <span className="username-green">
          @{merchantDetails?.profile_data[0]?.user_name}
        </span>
        ?
      </h3>,
      <>
        <p>make sure you have sent exactly $50 to @9a2fo9ns’s PayPal Wallet.</p>
        <p>If you are sure, click “ok” below.</p>
      </>,
      () => {
        return new Promise(async (resolve) => {
          await channel.sendEvent({
            type: "paid",
          });
          resolve();
        }).catch(() => console.log("Oops errors!"));
      }
    );
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    e && setDisableBtn(e.target.checked);
  };

  console.log(param.id);

  const endChat = () => {
    confirmModal(
      <h3 style={{ fontSize: "16px" }}>are you sure?</h3>,
      <>
        <Alert
          type="error"
          showIcon
          description="do not end chat if you've already made
          this payment. for any other issues,
          click on back and start a dispute."
        />
        <Checkbox
          className="message-check"
          onChange={onChange}
          style={{ marginTop: "10px" }}
        >
          i confirm that I have not paid and I wish to end chat now
        </Checkbox>
      </>,
      async () => {
        try {
          await channel.sendEvent({
            type: "end-chat",
          });
          let data = await bearerInstanceWithToken(user.token).post(
            "/end_discussion",
            {
              discussion_id: param.id,
            }
          );
          successRef.current.click();
        } catch (err) {
          setErrorMsg(err.response.data.message);
          errorRef.current.click();
          console.log("error", err.response.data.message);
        }
      },
      disableBtn
    );
  };

  const Completionist = () => <span>Time up, trade cancelled</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          0{hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <>
      <div className="message">
        <button
          onClick={() =>
            successMessage(merchantDetails?.profile_data[0]?.user_name)
          }
          ref={successRef}
          style={{ display: "none" }}
        />
        <button
          onClick={() => errorMessage(errorMsg)}
          ref={errorRef}
          style={{ display: "none" }}
        />
        <div className="message-wrapper">
          {!channel || !client || loading ? (
            <Loader />
          ) : (
            <Chat client={client} theme="messaging light">
              <Channel channel={channel}>
                <Window>
                  {tab === "chats" && (
                    <>
                      <ChatHeader
                        username={merchantDetails?.profile_data[0]?.user_name}
                        dislikes={
                          merchantDetails?.profile_data[0]
                            ?.total_negative_reviews
                        }
                        likes={
                          merchantDetails?.profile_data[0]
                            ?.total_positive_reviews
                        }
                        status={merchantDetails?.status}
                      />
                      <MessageList
                        hideDeletedMessages={true}
                        messageActions={["reply", "quote"]}
                        additionalMessageInputProps={{}}
                      />
                    </>
                  )}

                  {tab === "instructions" && (
                    <div className="instuctions-box">
                      {tab === "instructions" && (
                        <div onClick={() => setTab("chats")}>
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
                      )}

                      <h2 className="instruction-title">instructions</h2>

                      <div className="instructions-wrap">
                        <p>
                          <b className="bold-text">
                            Stage 1: You are now buying $500 worth of btc with
                            Cashapp.
                          </b>
                        </p>
                        <p></p>
                        <ul>
                          <li className="list-text">
                            Wait for the user to provide his Cashapp wallet.
                          </li>
                          <li className="list-text">
                            Make a payment of $500 into the user‘s Cashapp
                            wallet”
                          </li>
                          <li className="list-text">
                            Click on I Have Paid when done”.
                          </li>
                        </ul>
                      </div>
                      <div className="instructions-wrap">
                        <p>
                          <b className="bold-text">
                            Stage 2: You are now buying $500 worth of btc with
                            Cashapp.
                          </b>
                        </p>
                        <p></p>
                        <ul>
                          <li className="list-text">
                            Wait for the user to provide his Cashapp wallet.
                          </li>
                          <li className="list-text">
                            Make a payment of $500 into the user‘s Cashapp
                            wallet”
                          </li>
                          <li className="list-text">
                            Click on I Have Paid when done”.
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="message-wrapper-box">
                    {tab === "chats" && (
                      <MessageInput
                        grow={true}
                        additionalTextareaProps={{
                          placeholder: "type a message...",
                        }}
                      />
                    )}

                    {tab === "chats" && (
                      <div className="message-wrapper-action">
                        <div>
                          <Button disabled={paid} onClick={endChat} type="text">
                            end chat
                            <RightOutlined />
                          </Button>
                          {paid ? (
                            <Button type="text" onClick={() => {}}>
                              <QuestionOutlined />
                              raise issue
                            </Button>
                          ) : (
                            <Button type="text" onClick={handlePaid}>
                              <CheckOutlined />i have paid
                            </Button>
                          )}
                        </div>

                        <div
                          style={{
                            color: "#999",
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            fontSize: 14,
                          }}
                        >
                          <ClockCircleOutlined />
                          &nbsp;
                          <Countdown
                            date={Date.now() + 1800000}
                            renderer={renderer}
                          />
                        </div>
                      </div>
                    )}

                    <div className="actions-wrapper-section">
                      <div
                        style={{ opacity: "1", width: "46%" }}
                        onClick={() => setTab("chats")}
                      >
                        <Button
                          icon={<MessageOutlined />}
                          // color="success"
                          style={{
                            fontSize: "14px",
                            backgroundColor: tab === "chats" && "#fb4570",
                            color: tab === "chats" && "white",
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
                        onClick={() => setTab("instructions")}
                      >
                        <Button
                          icon={<ExclamationCircleOutlined />}
                          style={{
                            fontSize: "14px",
                            backgroundColor:
                              tab === "instructions" && "#fb4570",
                            color: tab === "instructions" && "white",
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
                </Window>
              </Channel>
            </Chat>
          )}
        </div>
      </div>
    </>
  );
}
