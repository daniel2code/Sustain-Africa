import React, { useState, useEffect, useRef } from "react";
import { Avatar, Input, Button } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import { format } from "timeago.js";

import Loader from "./../../components/Loader/Loader";
import "./message.scss";
import axios from "axios";

const { TextArea } = Input;

export default function Message() {
  const messagesEndRef = useRef(null);
  const username = useSelector((state) => state?.user?.userData?.user_name);
  const [chatChannel, setChatChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesBackup, setMessagesBackup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    initChat();
    // eslint-disable-next-line
  }, []);

  const client = new StreamChat("twtrsx9dd48k");

  const scrollToMessagesEnd = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const initChat = async () => {
    async function generateToken() {
      const { token } = (
        await axios.get(
          `https://sustain.herogloballogistics.com/chat/server.php?create-token=${username}`
        )
      ).data;
      return token;
    }
    const token = await generateToken();

    client.connectUser(
      {
        id: username,
        name: username,
      },
      token
    );

    let channel = client.channel("messaging", "sustain-test-1", {
      name: "sustain test",
      members: [],
      created_by_id: username,
      session: 8,
    });

    setChatChannel(channel);
    await channel.watch();

    if (loading) {
      setMessages(channel.state.messages);
    }

    setLoading(false);
    scrollToMessagesEnd();

    channel.on("message.new", (event) => {
      updateMessages(event.message);
    });
  };

  const handleSendMessage = async () => {
    setMessagesBackup(messages);
    chatChannel.sendMessage({
      text: messageInput,
    });
    setMessageInput("");
  };

  const updateMessages = (newMessage) => {
    let messageCopy = messages;
    if (messages === []) {
      messageCopy = messagesBackup;
    }
    messageCopy.push(newMessage);
    setMessages(messageCopy);
    scrollToMessagesEnd();
  };

  return (
    <div className="message-page-container">
      {messages && !loading && chatChannel ? (
        <div className="header-container">
          <div className="header-wrapper">
            <div className="header-main">
              <div className="left" onClick={() => {}}>
                <div className="avatar">
                  <Avatar
                    style={{
                      color: "#14a014",
                      backgroundColor: "#a9fca9",
                      fontWeight: "500",
                    }}
                  >
                    O
                  </Avatar>
                </div>
                <div>
                  <div className="username-green">
                    officerknow{" "}
                    <span style={{ color: "#14a014" }}>&#9679;</span>
                  </div>
                  <div className="status">waiting to accept...</div>
                </div>
              </div>

              <div className="right">
                <div className="like-dislike no-margin-top">
                  <span className="like">
                    <LikeOutlined /> 21
                  </span>
                  <span className="dislike no-margin-right">
                    <DislikeOutlined /> 4
                  </span>
                </div>
              </div>
            </div>
            <div className="chat-summary">
              direct chat &#9679; no issues raised
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {messages && !loading && chatChannel ? (
        <div className="message-content">
          <div className="message-content-container">
            <>
              {messages.map((message) => (
                <MessageItem
                  key={message?.id}
                  message={message}
                  username={username}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          </div>
        </div>
      ) : null}

      <div className="message-footer">
        <div className="wrapper">
          <div className="row-one">
            <TextArea
              autoSize={{ minRows: 2, maxRows: 4 }}
              placeholder="type a message..."
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
              }}
            />
          </div>

          <div className="row-two">
            <div className="left">
              <div className="end">
                end chat <RightOutlined />
              </div>
              <div className="issue">
                raise an issue <RightOutlined />
              </div>
            </div>
            <div className="right">
              <Button
                type="primary"
                size="normal"
                onClick={() => {
                  handleSendMessage();
                }}
              >
                send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MessageItem = ({ message, username }) => {
  return (
    <div className="message-item-container">
      <div
        className={`message-item-wrapper ${
          message?.user?.id === username ? "right" : ""
        }`}
      >
        {message.text}
      </div>
      <div
        className={`message-item-info ${
          message?.user?.id === username ? "right" : ""
        }`}
      >
        {message?.user?.name} &#9679; {format(message?.created_at)}
      </div>
    </div>
  );
};
