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
// import { format } from 'timeago.js';

// import Loader from './../../components/Loader/Loader';
import axios from 'axios';
import {
  Channel,
  // ChannelHeader,
  Chat,
  LoadingIndicator,
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
    if (param.id)
      bearerInstance
        .get(`/fetch_discussion?discussion_id=${param.id}`)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
  }, [param.id]);

  return (
    <div className="message">
      <div className="message-wrapper">
        {!channel || !client ? (
          <LoadingIndicator />
        ) : (
          <Chat client={client} theme="messaging light">
            <Channel channel={channel}>
              <Window>
                {/* <ChannelHeader /> */}
                <ChatHeader username={'0'} />
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

// const MessageItem = ({ message, username }) => {
//   return (
//     <div className="message-item-container">
//       <div
//         className={`message-item-wrapper ${
//           message?.user?.id === username ? 'right' : ''
//         }`}
//       >
//         {message.text}
//       </div>
//       <div
//         className={`message-item-info ${
//           message?.user?.id === username ? 'right' : ''
//         }`}
//       >
//         {message?.user?.name} &#9679; {format(message?.created_at)}
//       </div>
//     </div>
//   );
// };

//  <div className="message-page-container">
//       {messages && !loading && chatChannel ? (
//         <div className="header-container">

//         </div>
//       ) : (
//         <Loader />
//       )}

//       {messages && !loading && chatChannel ? (
//         <div className="message-content">
//           <div className="message-content-container">
//             <>
//               {messages.map(message => (
//                 <MessageItem
//                   key={message?.id}
//                   message={message}
//                   username={username}
//                 />
//               ))}
//               <div ref={messagesEndRef} />
//             </>
//           </div>
//         </div>
//       ) : null}

//       <div className="message-footer">
//         <div className="wrapper">
//           <div className="row-one">
//             <TextArea
//               //autoSize={{minRows: 1, maxRows: 2}}
//               placeholder="type a message..."
//               value={messageInput}
//               onChange={e => {
//                 setMessageInput(e.target.value);
//               }}
//               style={{
//                 borderRadius: '30px',
//                 marginRight: '10px',
//                 borderColor: '#ed1450',
//                 padding: '7px 30px',
//               }}
//             />
//             <Button
//               type="primary"
//               size="normal"
//               onClick={() => {
//                 handleSendMessage();
//               }}
//               style={{
//                 borderRadius: '50%',
//                 height: '60px',
//                 marginRight: '10px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <SendOutlined
//                 style={{
//                   fontSize: '30px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               />
//             </Button>
//           </div>

//           <div className="row-two">
//             <div className="left">
//               <div className="end">
//                 end chat <RightOutlined />
//               </div>
//               <div className="issue">
//                 raise an issue <RightOutlined />
//               </div>
//             </div>
//             <div className="right">
//               <FieldTimeOutlined
//                 style={{ fontSize: '20px', marginRight: '4px' }}
//               />
//               5 mins
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
