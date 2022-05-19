import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
// import { format } from 'timeago.js';
import axios from 'axios';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './discussion.scss';
import { sendNotification } from '../../utils/notification';
import ChatHeader from '../../components/Chat/ChatHeader';
import { bearerInstance } from '../../utils/API';
import { Button, Modal } from 'antd';
import {
  RightOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  QuestionOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

export default function Discussion() {
  const user = useSelector(state => state?.user?.userData);
  const param = useParams();

  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const [chatting, setChatting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const init = async () => {
    const res = await axios.get(
      `https://sustain.africa/chat/server.php?create-token=${user.id}`
    );
    const { token } = res.data;

    const chatClient = StreamChat.getInstance('2shvqv4hcrbh');
    /* const clientlog = */ await chatClient.connectUser(
      {
        id: user.id,
        name: user.user_name,
      },
      token
    );

    // console.log(clientlog);

    const chatChannel = chatClient.channel('messaging', param.id, {
      name: param.id,
    });

    await chatChannel.watch();

    // console.log(ch);

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
      channel.on(event => {
        if (event.type === 'paid') setPaid(true);
      });
    }
  }, [channel]);

  useEffect(() => {
    if (channel) {
      channel.on('message.new', event => {
        if (event.user.id !== user.id)
          sendNotification('user', event.message.text, `/chat/${param.id}`);
      });
    }
  }, [channel, user.id, param.id]);

  useEffect(() => {
    if (param.id) {
      console.log(user.id);
      setLoading(true);
      bearerInstance
        .get(`/fetch_discussion?discussion_id=${param.id}`)
        .then(res => {
          console.log(res.data);

          console.log(res.data.deal_data[0].dealer_id, user.id);

          if (res.data.deal_data[0].dealer_id === user.id)
            setChatting(res.data.merchant_data[0]);
          else setChatting(res.data.dealer_data[0]);

          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [param.id, user.id]);

  const handlePaid = () => {
    confirm({
      title: (
        <h3 style={{ fontSize: '16px' }}>
          have you sent the money to{' '}
          <span className="username-green">@9a2fo9ns</span>?
        </h3>
      ),
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>
            make sure you have sent exactly $50 to @9a2fo9ns’s PayPal Wallet.
          </p>
          <p>If you are sure, click “ok” below.</p>
        </>
      ),
      onOk() {
        return new Promise(async (resolve, reject) => {
          await channel.sendEvent({
            type: 'paid',
            text: 'Hey there, long time no see!',
          });
          resolve();
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };

  return (
    <>
      <div className="message">
        <div className="message-wrapper">
          {!channel || !client || loading ? (
            <Loader />
          ) : (
            <Chat client={client} theme="messaging light">
              <Channel channel={channel}>
                <Window>
                  <ChatHeader username={chatting?.user_name_front} />
                  <MessageList
                    hideDeletedMessages={true}
                    messageActions={['reply', 'quote']}
                  />
                  <div className="message-wrapper-box">
                    <MessageInput
                      grow={true}
                      additionalTextareaProps={{
                        placeholder: 'type a message...',
                      }}
                    />

                    <div className="message-wrapper-action">
                      <div>
                        <Button disabled={paid} type="text">
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
                        type="text"
                        style={{
                          color: '#999',
                          display: 'flex',
                          gap: '5px',
                          alignItems: 'center',
                        }}
                      >
                        <ClockCircleOutlined />
                        30 mins
                      </div>
                    </div>

                    {paid && (
                      <p
                        style={{
                          color: '#ed1450',
                          fontWeight: 700,
                          paddingLeft: '20px',
                        }}
                      >
                        waiting for 9a2fo9ns to confirm your payment...
                      </p>
                    )}
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
