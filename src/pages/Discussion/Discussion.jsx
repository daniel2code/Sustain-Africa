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
  ChannelHeader,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  // Thread,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './discussion.scss';

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
    const clientlog = await chatClient.connectUser(
      {
        id: user.id,
        name: user.user_name,
      },
      token
    );

    console.log(clientlog);

    const chatChannel = chatClient.channel('messaging', param.id, {
      name: param.id,
    });

    await chatChannel.watch();

    chatChannel.addMembers([user.id]);

    setChannel(chatChannel);
    setClient(chatClient);
  };

  useEffect(() => {
    init();

    if (client) return () => client.disconnectUser();
    // eslint-disable-next-line
  }, [user.id]);

  return (
    <div className="message">
      <div className="message-wrapper">
        {!channel || !client ? (
          <LoadingIndicator />
        ) : (
          <Chat client={client} theme="messaging light">
            <Channel channel={channel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              {/* <Thread /> */}
            </Channel>
          </Chat>
        )}
      </div>
    </div>

    // <div className="message-page-container">
    //   {messages && !loading && chatChannel ? (
    //     <div className="header-container">
    //       <div className="header-wrapper">
    //         <div className="header-title">Buying $50 bank funds from</div>
    //         <div className="header-main">
    //           <div className="left" onClick={() => {}}>
    //             <div className="avatar">
    //               <Avatar
    //                 style={{
    //                   color: '#14a014',
    //                   backgroundColor: '#a9fca9',
    //                   fontWeight: '500',
    //                 }}
    //               >
    //                 O
    //               </Avatar>
    //             </div>
    //             <div>
    //               <div className="username-green">
    //                 {username} <span style={{ color: '#14a014' }}>&#9679;</span>
    //               </div>
    //               <div className="status">waiting to accept..</div>
    //             </div>
    //           </div>

    //           <div className="right">
    //             <div className="like-dislike no-margin-top">
    //               <span className="like">
    //                 <LikeOutlined /> 21
    //               </span>
    //               <span className="dislike no-margin-right">
    //                 <DislikeOutlined /> 4
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="chat-summary">
    //           direct chat &#9679; no issues raised
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <Loader />
    //   )}

    //   {messages && !loading && chatChannel ? (
    //     <div className="message-content">
    //       <div className="message-content-container">
    //         <>
    //           {messages.map(message => (
    //             <MessageItem
    //               key={message?.id}
    //               message={message}
    //               username={username}
    //             />
    //           ))}
    //           <div ref={messagesEndRef} />
    //         </>
    //       </div>
    //     </div>
    //   ) : null}

    //   <div className="message-footer">
    //     <div className="wrapper">
    //       <div className="row-one">
    //         <TextArea
    //           //autoSize={{minRows: 1, maxRows: 2}}
    //           placeholder="type a message..."
    //           value={messageInput}
    //           onChange={e => {
    //             setMessageInput(e.target.value);
    //           }}
    //           style={{
    //             borderRadius: '30px',
    //             marginRight: '10px',
    //             borderColor: '#ed1450',
    //             padding: '7px 30px',
    //           }}
    //         />
    //         <Button
    //           type="primary"
    //           size="normal"
    //           onClick={() => {
    //             handleSendMessage();
    //           }}
    //           style={{
    //             borderRadius: '50%',
    //             height: '60px',
    //             marginRight: '10px',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //           }}
    //         >
    //           <SendOutlined
    //             style={{
    //               fontSize: '30px',
    //               display: 'flex',
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //             }}
    //           />
    //         </Button>
    //       </div>

    //       <div className="row-two">
    //         <div className="left">
    //           <div className="end">
    //             end chat <RightOutlined />
    //           </div>
    //           <div className="issue">
    //             raise an issue <RightOutlined />
    //           </div>
    //         </div>
    //         <div className="right">
    //           <FieldTimeOutlined
    //             style={{ fontSize: '20px', marginRight: '4px' }}
    //           />
    //           5 mins
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
