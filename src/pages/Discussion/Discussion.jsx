import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import { useParams, useHistory, useLocation } from "react-router-dom";
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
import { formatSourceText } from "../../utils/formatSourceText";
import { Alert, Button, Checkbox, Tooltip } from "antd";
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
  successPaidMessage,
  errorMessage,
  uploadModal,
  chatIntroModal,
} from "../../utils/confirm";
import Countdown from "react-countdown";
// import storage from "redux-persist/lib/storage";
// import Item from "antd/lib/list/Item";

export default function Discussion() {
  const user = useSelector((state) => state?.user?.userData);
  const param = useParams();
  const history = useHistory();
  const location = useLocation();
  const [tab, setTab] = useState("chats");

  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const [chatting, setChatting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discussionData, setDiscussionData] = useState(null);
  const [merchant, setMerchantId] = useState(null);
  const [merchantDetails, setMerchantDetails] = useState(null);
  const [discussionDetails, setDiscussionDetails] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [paid, setPaid] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "An error occured, please try again"
  );
  const [raiseTimerIssue, setTimerIssue] = useState(false);
  const [checkPaidBtn, setCheckPaidBtn] = useState(false);
  const [checkSeenFund, setCheckSeenFund] = useState(true);
  const [checkRaiseIssue, setCheckRaiseIssue] = useState(false);
  const [isReceiptUploaded, setIsReceiptUploaded] = useState(false);
  const [timer, setTimer] = useState(
    { date: Date.now(), delay: 1800000 } //60 seconds
  );
  const [secondTimer, setSecondTimer] = useState(
    { date: Date.now(), delay: 7200000 } //60 seconds
  );
  const [discussionTimer, setDiscussionTimer] = useState(null);
  const [timeStand, setTimeStand] = useState(null);
  const [timerStatus, setTimerStatus] = useState("first");
  const [stageTwo, setStageTwo] = useState(true);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [receipt] = useState(true);
  const [readInstructions, setReadInstructions] = useState(false);
  const [checked, setChecked] = useState(true);

  const successRef = useRef();
  const seenPaymentRef = useRef(null);
  const sentPaymentRef = useRef();
  const raiseIssueRef = useRef();
  const timerRef = useRef();
  const errorRef = useRef();
  const paidSuccessRef = useRef();
  const endChatRef = useRef();
  const msgRef = useRef();

  let checkMerchant = profileData?.dealer_user_name === user.user_name;

  const [checkToggleBtn, setCheckToggleBtn] = useState(false);

  // initialize ref
  useEffect(() => {
    let elem = seenPaymentRef.current;
    let elem3 = sentPaymentRef.current;
    let elem1 = endChatRef.current;
    let elem2 = raiseIssueRef.current;
    let elem4 = paidSuccessRef.current;
    let elem5 = errorRef.current;
    let elem6 = msgRef.current;
  }, []);

  useEffect(() => {
    if (param.id) {
      setLoading(true);
      bearerInstance
        .get(`/fetch_discussion?discussion_id=${param.id}`)
        .then((res) => {
          setDiscussionData(res.data);
          setMerchantId(res.data?.merchant_data[0]?.id);
          setDiscussionDetails(res.data.discussion_data[0]);
          setProfileData(res.data?.deal_data[0]);
          setDiscussionTimer(res.data?.timer);

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

  const init = async () => {
    const res = await axios.get(
      `https://sustain.africa/chat/server.php?create-token=${user.id}`
    );
    const { token } = res.data;

    const userData = {
      id: user?.id,
      name: user?.user_name,
    };

    const chatClient = StreamChat.getInstance("2shvqv4hcrbh");
    await chatClient.connectUser(userData, token);

    const chatChannel = chatClient.channel("messaging", param.id, {
      name: param.id,
      // members: [user?.id, `${merchantDetails?.profile_data[0]?.user_name}`],
      // color: "green",
    });

    chatChannel.addMembers([user.id]);

    await chatChannel.watch({ presence: true });

    // custom event that fires when a particular event occurs

    chatChannel.on((event) => {
      if (event?.type === "paid_request") {
        setCheckPaidBtn(true);
        setTimerStatus("second");
        // if (checkMerchant) {
        sentPaymentRef && sentPaymentRef.current.click();
        // }
      } else if (event?.type === "raiseIssue") {
        setCheckRaiseIssue(true);
        raiseIssueRef && raiseIssueRef.current.click();
      } else if (event?.type === "end-chat") {
        setIsChatEnded(true);
        endChatRef.current.click();
        window.location.reload(true);
      } else if (event?.type === "seen-payment") {
        if (!checkMerchant) {
          seenPaymentRef && seenPaymentRef.current.click();
          setTimeout(() => {
            // if (discussionDetails?.stage === "1") {
            window.location.reload(true);
            // } else if (discussionDetails?.stage === "2") {
            //   history.push("/chat");
            // }
          }, 4000);
        }
      } else if (event?.type === "finish_discussion") {
        setTimeout(() => {
          history.push("/chat");
        }, 3500);
      }
    });

    const message = {
      text: "this transaction is divided into two stages. this is the stage one of your transaction, please check the instructions tab below for instructions",
      user: { user_id: user?.id, id: user?.id }, // Set the user property to the user's ID
      hidden: true,
    };

    if (discussionDetails?.custom_msg === 0) {
      if (!checkMerchant) {
        chatChannel
          .sendMessage(message)
          .then((res) => {
            let formData = new FormData();
            formData.append("discussion_id", param.id);
            formData.append("custom_msg", 1);
            bearerInstanceWithToken(user.token).post(
              `/update_discussion?discussion_id=${param.id}&custom_msg=${1}`,
              formData
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    setChannel(chatChannel);
    setClient(chatClient);
  };

  console.log(discussionDetails);
  console.log(channel);

  // function formats numbers
  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function confirmReadInstructions() {
    if (discussionDetails?.custom_msg === 0) {
      // if (readInstructions === false) {
      let formData = new FormData();
      formData.append("discussion_id", param.id);
      formData.append("custom_msg", 1);
      bearerInstanceWithToken(user.token).post(
        `/update_discussion?discussion_id=${param.id}&custom_msg=${1}`,
        formData
      );
      // }
    }
  }

  const onChangeCheckbox = (e) => {
    setReadInstructions(e.target.checked);
  };

  let stage = discussionDetails?.stage === "1";

  useEffect(() => {
    // Render custom default message for stage one of the transacton

    let checkStage =
      discussionDetails?.stage === "1" ? !checkMerchant : checkMerchant;

    // if (discussionDetails?.custom_msg === 0) {
    if (
      discussionDetails?.status !== "canceled" &&
      discussionDetails?.status !== "completed"
    ) {
      if (channel) {
        chatIntroModal(
          <>
            {checkStage ? (
              <div>
                <Alert
                  message="Notice"
                  description={`${
                    stage
                      ? `$${currencyFormat(discussionDetails?.source_value)}`
                      : `???${currencyFormat(
                          discussionDetails?.destination_value
                        )}`
                  }  worth of btc is now in the escrow`}
                  type="success"
                  closable
                  showIcon
                  style={{ marginBottom: "13px" }}
                />

                <p>
                  {`to buy ${
                    stage
                      ? `$${currencyFormat(discussionDetails?.source_value)}`
                      : `???${currencyFormat(
                          discussionDetails?.destination_value
                        )}`
                  } worth of btc from ${
                    stage
                      ? merchantDetails?.profile_data[0]?.user_name
                      : discussionData?.dealer_data[0]?.user_name
                  } using ${
                    stage
                      ? discussionDetails?.source
                      : discussionDetails?.destination
                  } as a payment
                  method.`}
                </p>

                <p>
                  <b>please follow the steps below:</b>
                </p>

                <p>{`1. wait for ${
                  stage
                    ? merchantDetails?.profile_data[0]?.user_name
                    : discussionData?.dealer_data[0]?.user_name
                } to provide his ${
                  stage
                    ? discussionDetails?.source
                    : discussionDetails?.destination
                } details`}</p>
                <p>
                  {`2. send the exact amount of ${
                    stage
                      ? `$${currencyFormat(discussionDetails?.source_value)}`
                      : `???${currencyFormat(
                          discussionDetails?.destination_value
                        )}`
                  }
                 to his provided ${
                   stage
                     ? discussionDetails?.source
                     : discussionDetails?.destination
                 }
                  details`}
                </p>
                <p>
                  3. once sent, click on "i have paid" button below to confirm
                  you have sent it.
                </p>
                <p>4. upload a payment slip if required.</p>
                <p>
                  {`5. wait for ${
                    stage
                      ? merchantDetails?.profile_data[0]?.user_name
                      : discussionData?.dealer_data[0]?.user_name
                  } to confirm that they have received the
                  payment.`}
                </p>

                <Checkbox
                  className="message-check"
                  // checked={checked}
                  onChange={onChangeCheckbox}
                >
                  ensure you understand the instructions before proceeding.
                </Checkbox>
              </div>
            ) : (
              <div>
                <Alert
                  message="Notice"
                  description={`${
                    stage
                      ? `$${currencyFormat(discussionDetails?.source_value)}`
                      : `???${currencyFormat(
                          discussionDetails?.destination_value
                        )}`
                  }  worth of btc is now in the escrow`}
                  type="success"
                  closable
                  showIcon
                  style={{ marginBottom: "" }}
                />
                <p>
                  {` to sell ${
                    stage
                      ? `$${currencyFormat(discussionDetails?.source_value)}`
                      : `???${currencyFormat(
                          discussionDetails?.destination_value
                        )}`
                  }
                 worth of btc to ${
                   stage
                     ? discussionData?.dealer_data[0]?.user_name
                     : merchantDetails?.profile_data[0]?.user_name
                 } using ${discussionDetails?.source} as a payment
                  method.`}
                </p>
                <p>
                  <b>please follow the steps below:</b>
                </p>
                <p>{`1. provide your ${
                  stage
                    ? discussionDetails?.source
                    : discussionDetails?.destination
                } details to ${
                  stage
                    ? discussionData?.dealer_data[0]?.user_name
                    : merchantDetails?.profile_data[0]?.user_name
                } and stay active`}</p>
                <p>{`2. wait for ${
                  stage
                    ? discussionData?.dealer_data[0]?.user_name
                    : merchantDetails?.profile_data[0]?.user_name
                } to send the ${
                  stage
                    ? `$${currencyFormat(discussionDetails?.source_value)}`
                    : `???${currencyFormat(discussionDetails?.destination_value)}`
                }
               to your ${
                 stage
                   ? discussionDetails?.source
                   : discussionDetails?.destination
               }`}</p>
                <p>
                  3. once you have received the complete amount, click on "seen
                  payment" button below
                </p>
                <p>
                  4. only click on "seen payment" when you are sure you have
                  received the full amount. DO NOT CLICK ON IT IF YOU HAVEN'T
                  RECEIVED THE FULL PAYMENT. if you have any issues, you can
                  raise a dispute after 2 hours.
                </p>

                <Checkbox className="message-check" onChange={onChangeCheckbox}>
                  ensure you understand the instructions before proceeding.
                </Checkbox>
              </div>
            )}
          </>,
          confirmReadInstructions,
          readInstructions,
          discussionDetails?.stage
        );
      }
    } else {
      return false;
    }

    // }
  }, [channel]);

  useEffect(() => {
    if (timerStatus === "second") {
      bearerInstance
        .get(`/fetch_discussion?discussion_id=${param.id}`)
        .then((res) => {
          setMerchantId(res.data?.merchant_data[0]?.id);
          setDiscussionDetails(res.data.discussion_data[0]);
          setProfileData(res.data?.deal_data[0]);
          setDiscussionTimer(res.data?.timer);
        });

      setTimerStatus("first");
    }

    const setTimer = () => {
      if (!discussionTimer) {
        return;
      } else {
        setTimeStand(discussionTimer?.diff * 1000);
      }
    };

    setTimer();
  }, [discussionTimer, timerStatus]);

  useEffect(() => {
    init();

    // if (client) return () => client.disconnectUser();
    // eslint-disable-next-line
  }, [user.id, profileData]);

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
    const userLoggin = async () => {
      await channel?.sendEvent({
        type: "raiseIssues",
        text: "Hey there, long time no see!",
      });
    };

    userLoggin();
  }, [channel]);

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
          {discussionDetails?.stage === "1"
            ? `@${merchantDetails?.profile_data[0]?.user_name}`
            : `${discussionData?.dealer_data[0]?.user_name}`}
        </span>
        ?
      </h3>,
      // render different modal message on stage 1 and stage 2
      <>
        {discussionDetails?.stage === "1" ? (
          <p>
            make sure you have sent exactly{" "}
            {discussionDetails?.source_currency === "usd"
              ? "$"
              : discussionDetails?.source_currency === "ngn"
              ? "???"
              : "$"}
            {currencyFormat(discussionDetails?.source_value)} to{" "}
            {merchantDetails?.profile_data[0]?.user_name}
            ???s {discussionDetails?.source}.
          </p>
        ) : (
          <p>
            make sure you have sent exactly{" "}
            {discussionDetails?.destination_currency === "usd"
              ? "???"
              : discussionDetails?.destination_currency === "ngn"
              ? "???"
              : "$"}
            {currencyFormat(discussionDetails?.destination_value)} to{" "}
            {discussionData?.dealer_data[0]?.user_name}
            ???s {discussionDetails?.destination}.
          </p>
        )}
        <p>If you are sure, click ???ok??? below.</p>
      </>,
      async () => {
        let formData = new FormData();
        formData.append("discussion_id", param.id);
        try {
          // await channel.sendEvent({
          //   type: "paid",
          // });
          await bearerInstanceWithToken(user.token).post("/paid", formData);
          await handleCheckPaid();
          setTimerStatus("second");
          paidSuccessRef.current.click();
        } catch (err) {
          setErrorMsg(err.response.data.message);
          errorRef.current.click();
          console.log("error", err.response.data.message);
        }
      }
    );
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    e && setDisableBtn(e.target.checked);
  };

  const handleEndChat = async (actionRef) => {
    let formData = new FormData();
    formData.append("discussion_id", param.id);
    // const payload = { discussion_id: param.id };
    try {
      // await channel.sendEvent({
      //   type: "end-chat",
      // });
      await bearerInstanceWithToken(user.token).post(
        "/end_discussion",
        formData
      );
      actionRef && actionRef.current.click();
      localStorage.removeItem(`isMessageFired${discussionDetails?.deal_id}`);
      setTimeout(() => {
        history.push(`/chat`);
      }, 10000);
    } catch (err) {
      if (err?.response?.status === 400) {
        actionRef.current.click();
        setErrorMsg(err?.response?.data?.message);
      } else {
        setErrorMsg(err?.response?.data?.message);
        errorRef.current.click();
      }
    }
  };

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
        await handleEndChat(successRef);
      },
      disableBtn
    );
  };

  const raiseIssues = () => {
    confirmModal(
      <h3 style={{ fontSize: "16px" }}>
        you are about to enter into a dispute.
      </h3>,
      <>
        <p>
          since you have indicated an issue with this trade, we will now invite
          a sustain moderator to help resolve the issue.
        </p>

        <p>
          ensure you have all proofs of payment and ensure you have adhered
          strictly to our terms.
        </p>
      </>,
      // async () => {
      //   let formData = new FormData();
      //   formData.append("discussion_id", param.id);
      //   // const payload = { discussion_id: param.id };
      //   try {
      //     await channel.sendEvent({
      //       type: "end-chat",
      //     });
      //     await bearerInstanceWithToken(user.token).post(
      //       "/end_discussion",
      //       formData
      //     );
      //     successRef.current.click();
      //     setTimeout(() => {
      //       history.push(`/chat`);
      //     }, 10000);
      //   } catch (err) {
      //     setErrorMsg(err.response.data.message);
      //     errorRef.current.click();
      //     console.log("error", err.response.data.message);
      //   }
      // },
      disableBtn
    );
  };

  const seenPayment = () => {
    confirmModal(
      <h3 style={{ fontSize: "16px" }}>have you seen payment?</h3>,
      <>
        <p>
          ensure you have seen payment of{" "}
          {stage
            ? `$${currencyFormat(discussionDetails?.source_value)}
                    `
            : `???${currencyFormat(discussionDetails?.destination_value)}`}{" "}
          before proceeding
        </p>
        <p>
          if you haven't seen the full payment or if there's any issue, please
          go back and wait for 2 hours to start a dispute.
        </p>
      </>,
      async () => {
        let formData = new FormData();
        formData.append("discussion_id", param.id);
        // const payload = { discussion_id: param.id };
        try {
          // await channel.sendEvent({
          //   type: "end-chat",
          // });
          await bearerInstanceWithToken(user.token).post(
            discussionDetails?.stage === "1" ? "/seen" : "/finish_discussion",
            formData
          );

          // successRef.current.click();
          fireSeenPayment();

          if (discussionDetails?.stage === "2") {
            handleFinishDiscussion();
          }
          setTimeout(() => {
            history.push(`/chat`);
          }, 5000);
        } catch (err) {
          setErrorMsg(err.response.data.message);
          errorRef.current.click();
          console.log("error", err.response.data.message);
        }
      },
      disableBtn
    );
  };

  const Completionist = () => <span>00.00.00</span>;

  const raiseIssue = async () => {
    await channel.sendEvent({
      type: "raiseIssues",
      text: "Hey there, long time no see!",
    });
  };

  const fireEndChat = async () => {
    if (channel) {
      await channel.sendEvent({
        type: "end-chat",
      });
    }
  };

  // Renderer callback with condition
  const firstRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state

      if (discussionDetails?.stage === "1") {
        if (!isChatEnded) {
          handleEndChat(endChatRef);
        } else {
          fireEndChat();
        }
      } else {
        raiseIssue();
        setTimerIssue(true);
      }

      // handleEndTimer();
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

  const secondRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      if (discussionDetails?.stage === "1") {
        raiseIssue();
        setTimerIssue(true);
      } else {
        return;
      }

      // localStorage.setItem("checkIssue", true);
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

  const handleRedirect = () => {
    history.push(`/chat`);
  };

  let memsIdArr = channel && Object.keys(channel.state.members);
  let getMem =
    channel && memsIdArr.filter((item) => item != `${profileData?.dealer_id}`);

  console.log(channel && getMem[0]);

  let targetUserID = channel && `${getMem[0]}`;

  // useEffect(() => {
  //  ;
  // }, []);

  const handleCheckPaid = async () => {
    await channel.sendEvent({
      type: "paid_request",
      text: "Hey there, long time no see!",
    });
  };

  const handleFinishDiscussion = async () => {
    await channel.sendEvent({
      type: "finish_discussion",
    });

    localStorage.removeItem(`isMessageFired${discussionDetails?.deal_id}`);
  };

  // function fires event if merchant clicks on seen payment
  const fireSeenPayment = async () => {
    if (channel) {
      await channel.sendEvent({
        type: "seen-payment",
      });
    }

    setStageTwo(true);
  };

  const openFS = () => {
    setIsReceiptUploaded(true);
    document.getElementsByClassName("rfu-file-input")[0].click();
  };

  // function helps upload selected image to the chat
  const uploadImg = () => {
    // if (isReceiptUploaded) {
    // document.getElementsByClassName("rfu-file-input")[0].click();
    // setTimeout(() => {
    document.getElementsByClassName("str-chat__send-button")[0].click();
    // });
    // } else {
    //   return null;
    // }
  };

  // function fire modal, to encourage user to provide a payment slip
  const handleInitiateFileUpload = () => {
    uploadModal(openFS, uploadImg);
  };

  // function fires modal encouraging the merchant to confirm receipt before releasing funds
  const handleConfirmReceiptPayment = () => {
    successMessage(
      `Ensure  ${discussionData?.dealer_data[0]?.user_name} provides a proof of payment(receipt) before proceeding to funds release.`,
      null,
      `confirm receipt from ${
        discussionDetails?.stage === "1"
          ? discussionData?.dealer_data[0]?.user_name
          : merchantDetails?.profile_data[0]?.user_name
      }`
    );
  };

  return (
    <>
      <div className="message">
        {/* Modals triggered using useRef */}

        <button
          onClick={() =>
            successMessage(
              `You successfully ended your discussion with ${merchantDetails?.profile_data[0]?.user_name}. You can always restart a discussion on this deal at a later time.`,
              handleRedirect
            )
          }
          ref={successRef}
          style={{ display: "none" }}
        />

        <button
          onClick={() => {
            if (discussionDetails?.stage === "1") {
              return !checkMerchant
                ? successMessage(
                    `${merchantDetails?.profile_data[0]?.user_name} has seen your payment of of $${discussionDetails?.source_value}`,
                    null,
                    "payment confirmation"
                  )
                : null;
            } else {
              return checkMerchant
                ? successMessage(
                    `${discussionData?.dealer_data[0]?.user_name} has seen your payment of ???${discussionDetails?.destination_value}`,
                    null,
                    "payment confirmation"
                  )
                : null;
            }
          }}
          ref={seenPaymentRef}
          style={{ display: "none" }}
        />

        <button
          onClick={() => {
            if (discussionDetails?.stage === "1") {
              return checkMerchant
                ? successMessage(
                    // `${profileData?.dealer_user_name} has made payment, kindly confirm`,
                    `${
                      discussionData?.dealer_data[0]?.user_name
                    } just made a payment of $${currencyFormat(
                      discussionDetails?.source_value
                    )} into your ${formatSourceText(
                      discussionDetails?.source
                    )}.\ 
                    click on ???seen payment??? button below to confirm that you have seen the payment. do not click on the button if you have not seen the payment, to avoid fund loss.`,
                    () => handleConfirmReceiptPayment(),
                    "check payment"
                  )
                : null;
            } else {
              return !checkMerchant
                ? successMessage(
                    // `${profileData?.dealer_user_name} has made payment, kindly confirm`,
                    `${
                      merchantDetails?.profile_data[0]?.user_name
                    } just made a payment of ???${currencyFormat(
                      discussionDetails?.destination_value
                    )} into your ${formatSourceText(
                      discussionDetails?.destination
                    )}.\
                     click on ???seen payment??? button below to confirm that you have seen the payment. do not click on the button if you have not seen the payment, to avoid fund loss.`,
                    null,
                    `check payment from @${
                      discussionDetails?.stage === "1"
                        ? discussionData?.dealer_data[0]?.user_name
                        : merchantDetails?.profile_data[0]?.user_name
                    }`
                  )
                : null;
            }
          }}
          ref={sentPaymentRef}
          style={{ display: "none" }}
        />

        {/* Modal fires when user didn't make a payment */}
        <button
          onClick={() =>
            successMessage(
              `${
                discussionData?.dealer_data[0]?.user_name
              } failed to make a payment of $${currencyFormat(
                discussionDetails?.source_value
              )} into your ${formatSourceText(
                discussionDetails?.source
              )}. Click on ???raise an issue??? button to start a dispute. A moderator will be available to resolve this incident.[user1] or [user2] failed to make a payment of $500 into your PayPal. Click on ???raise an issue??? button to start a dispute. A moderator will be available to resolve this incident.`,
              null,
              "raise issue"
            )
          }
          ref={raiseIssueRef}
          style={{ display: "none" }}
        />

        <button
          onClick={() =>
            successMessage(
              "Your chat ended due to inactivity, you can restart the discussion",
              handleRedirect
            )
          }
          ref={endChatRef}
          style={{ display: "none" }}
        />

        <button
          onClick={() => errorMessage(errorMsg)}
          ref={errorRef}
          style={{ display: "none" }}
        />

        <button
          onClick={() =>
            successPaidMessage(
              merchantDetails?.profile_data[0]?.user_name,
              () => handleInitiateFileUpload()
            )
          }
          ref={paidSuccessRef}
          style={{ display: "none" }}
        />

        <div className="message-wrapper">
          {!channel || !client || loading ? (
            <Loader />
          ) : (
            <Chat client={client} theme="messaging light" >
              <Channel channel={channel}>
                <Window>
                  <>
                    <ChatHeader
                      username={merchantDetails?.profile_data[0]?.user_name}
                      dislikes={
                        merchantDetails?.profile_data[0]?.total_negative_reviews
                      }
                      likes={
                        merchantDetails?.profile_data[0]?.total_positive_reviews
                      }
                      status={merchantDetails?.status}
                      discussionData={discussionDetails}
                      profileData={profileData}
                      channel={channel}
                      location={discussionData}
                    />
                    <MessageList
                      hideDeletedMessages={true}
                      messageActions={["reply", "quote"]}
                      additionalMessageInputProps={{}}
                      
                    />
                  </>

                  <div className="message-wrapper-box">
                    <div className="message-box">
                      <MessageInput
                        grow={true}
                        additionalTextareaProps={{
                          placeholder: "type a message...",
                        }}
                        disabled={
                          discussionDetails?.status === "canceled" ||
                          discussionDetails?.status === "completed"
                            ? true
                            : false
                        }
                      />
                    </div>

                    <div className="message-wrapper-action">
                      {discussionDetails?.status === "canceled" ? (
                        ""
                      ) : (
                        <div
                          style={{
                            display:
                              discussionDetails?.merchant_seen === 0
                                ? "flex"
                                : "none",
                          }}
                        >
                          {/* initial button render, on stage one */}
                          {discussionDetails?.merchant_seen === 0 && (
                            <div>
                              {!checkMerchant ? (
                                <>
                                  <Button
                                    disabled={
                                      !checkPaidBtn &&
                                      discussionDetails?.dealer_paid === 0
                                        ? false
                                        : checkPaidBtn ||
                                          discussionDetails?.dealer_paid === 1
                                        ? true
                                        : null
                                    }
                                    onClick={endChat}
                                    type="text"
                                  >
                                    end chat
                                    <RightOutlined />
                                  </Button>

                                  {!checkPaidBtn &&
                                  discussionDetails?.dealer_paid === 0 ? (
                                    <Button type="text" onClick={handlePaid}>
                                      <CheckOutlined />i have paid
                                    </Button>
                                  ) : checkPaidBtn ||
                                    discussionDetails?.dealer_paid === 1 ? (
                                    <Button
                                      type="text"
                                      onClick={raiseIssues}
                                      disabled={
                                        raiseTimerIssue ||
                                        JSON.parse(
                                          localStorage.getItem("checkIssue")
                                        ) === true
                                          ? false
                                          : true
                                      }
                                    >
                                      <QuestionOutlined />
                                      raise issue
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  <Button
                                    disabled={
                                      !checkPaidBtn &&
                                      discussionDetails?.dealer_paid === 0
                                        ? false
                                        : checkPaidBtn ||
                                          discussionDetails?.dealer_paid === 1
                                        ? true
                                        : null
                                    }
                                    onClick={endChat}
                                    type="text"
                                  >
                                    end chat
                                    <RightOutlined />
                                  </Button>

                                  <Button
                                    type="text"
                                    disabled={
                                      discussionDetails?.dealer_paid === 0
                                        ? true
                                        : discussionDetails?.dealer_paid === 1
                                        ? false
                                        : null
                                    }
                                    onClick={seenPayment}
                                  >
                                    <CheckOutlined />
                                    seen payment
                                  </Button>

                                  <Button
                                    type="text"
                                    onClick={raiseIssues}
                                    disabled={
                                      raiseTimerIssue ||
                                      JSON.parse(
                                        localStorage.getItem("checkIssue")
                                      ) === true
                                        ? false
                                        : true
                                    }
                                  >
                                    <QuestionOutlined />
                                    raise issue
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {discussionDetails?.status === "canceled" ||
                      discussionDetails?.status === "completed" ? (
                        ""
                      ) : (
                        <div
                          style={{
                            display:
                              discussionDetails?.merchant_seen === 1
                                ? "flex"
                                : "none",
                          }}
                        >
                          {discussionDetails?.merchant_seen === 1 && (
                            <div>
                              {checkMerchant ? (
                                <>
                                  <Button
                                    disabled={
                                      !checkPaidBtn &&
                                      discussionDetails?.dealer_paid === 0
                                        ? false
                                        : checkPaidBtn ||
                                          discussionDetails?.dealer_paid === 1
                                        ? true
                                        : null
                                    }
                                    onClick={endChat}
                                    type="text"
                                  >
                                    end chat
                                    <RightOutlined />
                                  </Button>

                                  {!checkPaidBtn &&
                                  discussionDetails?.merchant_paid === 0 ? (
                                    <Button type="text" onClick={handlePaid}>
                                      <CheckOutlined />i have paid
                                    </Button>
                                  ) : checkPaidBtn ||
                                    discussionDetails?.merchant_paid === 1 ? (
                                    <Button
                                      type="text"
                                      onClick={raiseIssues}
                                      disabled={
                                        raiseTimerIssue ||
                                        JSON.parse(
                                          localStorage.getItem("checkIssue")
                                        ) === true
                                          ? false
                                          : true
                                      }
                                    >
                                      <QuestionOutlined />
                                      raise issue
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  <Button
                                    disabled={
                                      !checkPaidBtn &&
                                      discussionDetails?.dealer_paid === 0
                                        ? false
                                        : checkPaidBtn ||
                                          discussionDetails?.dealer_paid === 1
                                        ? true
                                        : null
                                    }
                                    onClick={endChat}
                                    type="text"
                                  >
                                    end chat
                                    <RightOutlined />
                                  </Button>

                                  <Button
                                    type="text"
                                    disabled={
                                      discussionDetails?.merchant_paid === 0
                                        ? true
                                        : checkPaidBtn ||
                                          discussionDetails?.merchant_paid === 1
                                        ? false
                                        : null
                                    }
                                    onClick={seenPayment}
                                  >
                                    <CheckOutlined />
                                    seen payment
                                  </Button>

                                  <Button
                                    type="text"
                                    onClick={raiseIssues}
                                    disabled={
                                      raiseTimerIssue ||
                                      JSON.parse(
                                        localStorage.getItem("checkIssue")
                                      ) === true
                                        ? false
                                        : true
                                    }
                                  >
                                    <QuestionOutlined />
                                    raise issue
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Hide the timer if the discussion has been cancelled */}
                      {discussionDetails.status === "canceled" ||
                      discussionDetails?.status === "completed" ? (
                        ""
                      ) : (
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
                          <Tooltip
                            placement="topRight"
                            title={
                              discussionTimer?.interval === 7200
                                ? "you will be able to raise an issue after time is up"
                                : ""
                            }
                          >
                            <>
                              <Countdown
                                date={Date.now() + timeStand}
                                renderer={
                                  discussionTimer?.interval === 1800
                                    ? firstRenderer
                                    : secondRenderer
                                }
                              />
                            </>
                          </Tooltip>
                        </div>
                      )}
                    </div>

                    {/* Hide section when the conversation gets to stage 2 */}
                    {discussionDetails?.stage === "2" ? (
                      ""
                    ) : (
                      <div>
                        {!checkMerchant && (
                          <div
                            className="instructions-wrap-two"
                            style={{ marginBottom: "15px" }}
                          >
                            <ExclamationCircleOutlined
                              style={{ color: "#14a014" }}
                            />
                            {discussionDetails.status === "canceled" ? (
                              <p className="list-text">chat ended</p>
                            ) : (
                              <p className="list-text">
                                {checkRaiseIssue
                                  ? `${merchantDetails?.profile_data[0]?.user_name} has refused to confirm your payment. you can enter into a dispute by clicking on ???raise an issue???.
                          `
                                  : !checkPaidBtn &&
                                    discussionDetails?.dealer_paid === 0
                                  ? "you have not paid yet"
                                  : checkPaidBtn ||
                                    discussionDetails?.dealer_paid === 1
                                  ? `Waiting for ${merchantDetails?.profile_data[0]?.user_name} to confirm your payment`
                                  : ""}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {discussionDetails?.status === "completed" && (
                      <div
                        className="instructions-wrap-two"
                        style={{ marginBottom: "15px" }}
                      >
                        <ExclamationCircleOutlined
                          style={{ color: "#14a014" }}
                        />

                        <p className="list-text">Discussion completed</p>
                      </div>
                    )}

                    <div className="actions-wrapper-section">
                      <div
                        style={{ opacity: "1", width: "47%" }}
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
                        onClick={() =>
                          history.push({
                            pathname: "/instructions",
                            state: {
                              discussionDetails: discussionDetails,
                              checkMerchant: checkMerchant,
                              discussionData: discussionData,
                            },
                          })
                        }
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
