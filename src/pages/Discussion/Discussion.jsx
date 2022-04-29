import React, { useState, useEffect } from 'react';
// import { Avatar, Input, Button } from 'antd';
// import {
//   LikeOutlined,
//   DislikeOutlined,
//   RightOutlined,
//   SendOutlined,
//   FieldTimeOutlined,
// } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
// import { format } from 'timeago.js';

// import Loader from './../../components/Loader/Loader';
import axios from 'axios';
import {
  Channel,
  // ChannelHeader,
  Chat,
  // LoadingIndicator,
  MessageInput,
  MessageList,
  // Thread,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './discussion.scss';
import { sendNotification } from '../../utils/notification';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import { bearerInstance } from '../../utils/API';

// const { TextArea } = Input;

export default function Discussion() {
  const user = useSelector(state => state?.user?.userData);
  const param = useParams();

  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const [chatting, setChatting] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="message">
      <div className="message-wrapper">
        {!channel || !client || loading ? (
          <Loader />
        ) : (
          <Chat client={client} theme="messaging light">
            <Channel channel={channel}>
              <Window>
                {/* <ChannelHeader /> */}
                <ChatHeader username={chatting?.user_name_front} />
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </Chat>
        )}
      </div>
    </div>
  );
}
