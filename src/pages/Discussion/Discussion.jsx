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
import { Alert, Button, Checkbox, Tag } from 'antd';
import {
  RightOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  QuestionOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { confirmModal } from '../../utils/confirm';

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
        name: user.user_name_front,
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
    confirmModal(
      <h3 style={{ fontSize: '16px' }}>
        have you sent the money to{' '}
        <span className="username-green">@9a2fo9ns</span>?
      </h3>,
      <>
        <p>make sure you have sent exactly $50 to @9a2fo9ns’s PayPal Wallet.</p>
        <p>If you are sure, click “ok” below.</p>
      </>,
      () => {
        return new Promise(async (resolve, reject) => {
          await channel.sendEvent({
            type: 'paid',
          });
          resolve();
        }).catch(() => console.log('Oops errors!'));
      }
    );
  };

  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  const endChat = () => {
    confirmModal(
      <h3 style={{ fontSize: '16px' }}>are you sure?</h3>,
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
          style={{ marginTop: '10px' }}
        >
          I confirm that I have not paid and I wish to end chat now
        </Checkbox>
      </>,
      () => {
        return new Promise(async (resolve, reject) => {
          await channel.sendEvent({
            type: 'end-chat',
          });
          resolve();
        }).catch(() => console.log('Oops errors!'));
      }
    );
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
                        type="text"
                        style={{
                          color: '#999',
                          display: 'flex',
                          gap: '5px',
                          alignItems: 'center',
                          fontSize: 12,
                          marginRight: 10,
                        }}
                      >
                        <ClockCircleOutlined />
                        30 mins
                      </div>
                    </div>

                    <div style={{ opacity: '.5', padding: '0 30px 10px' }}>
                      {paid ? (
                        <Tag
                          icon={<ExclamationCircleOutlined />}
                          color="default"
                        >
                          waiting for 9a2fo9ns to confirm your payment...
                        </Tag>
                      ) : (
                        <Tag
                          icon={<ExclamationCircleOutlined />}
                          color="default"
                        >
                          ! you haven’t paid yet
                        </Tag>
                      )}
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
