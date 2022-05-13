import React, { useState, useEffect } from 'react';
// import { Avatar, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
// import { format } from 'timeago.js';

// import Loader from './../../components/Loader/Loader';
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

  // const btn = (
  //   <button className="message-button">
  //     <SendOutlined />
  //   </button>
  // );

  return (
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
                  // messages={[
                  //   {
                  //     text: 'Check this bear out https://imgur.com/r/bears/4zmGbMN',
                  //   },
                  // ]}
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

                  <div>this</div>
                </div>
              </Window>
            </Channel>
          </Chat>
        )}
      </div>
    </div>
  );
}

// <li
//   class="str-chat__li str-chat__li--bottom"
//   data-message-id="1c7ac384-2007-4950-af69-f30b1986149f-a7ececef-22cd-4001-b531-08a0b22861b2"
//   data-testid="str-chat__li str-chat__li--bottom"
// >
//   <div
//     class="str-chat__message
//             str-chat__message-simple
// 						str-chat__message--regular
// 						str-chat__message--received
// 						str-chat__message--has-text"
//   >
//     <div
//       class="str-chat__avatar str-chat__avatar--circle"
//       data-testid="avatar"
//       title="pherwerzz"
//       style="flex-basis: 32px; font-size: 16px; height: 32px; line-height: 32px; width: 32px;"
//     >
//       <div class="str-chat__avatar-fallback" data-testid="avatar-fallback">
//         p
//       </div>
//     </div>
//     <div class="str-chat__message-inner" data-testid="message-inner">
//       <div
//         class="str-chat__message-simple__actions"
//         data-testid="message-options"
//       >
//         <button
//           aria-label="Open Reaction Selector"
//           class="str-chat__message-simple__actions__action str-chat__message-simple__actions__action--reactions"
//           data-testid="message-reaction-action"
//         >
//           <svg
//             height="12"
//             viewBox="0 0 12 12"
//             width="12"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <g clip-rule="evenodd" fill-rule="evenodd">
//               <path d="M6 1.2C3.3 1.2 1.2 3.3 1.2 6c0 2.7 2.1 4.8 4.8 4.8 2.7 0 4.8-2.1 4.8-4.8 0-2.7-2.1-4.8-4.8-4.8zM0 6c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z"></path>
//               <path d="M5.4 4.5c0 .5-.4.9-.9.9s-.9-.4-.9-.9.4-.9.9-.9.9.4.9.9zM8.4 4.5c0 .5-.4.9-.9.9s-.9-.4-.9-.9.4-.9.9-.9.9.4.9.9zM3.3 6.7c.3-.2.6-.1.8.1.3.4.8.9 1.5 1 .6.2 1.4.1 2.4-1 .2-.2.6-.3.8 0 .2.2.3.6 0 .8-1.1 1.3-2.4 1.7-3.5 1.5-1-.2-1.8-.9-2.2-1.5-.2-.3-.1-.7.2-.9z"></path>
//             </g>
//           </svg>
//         </button>
//         <button
//           aria-label="Open Thread"
//           class="str-chat__message-simple__actions__action str-chat__message-simple__actions__action--thread"
//           data-testid="thread-action"
//         >
//           <svg height="10" width="14" xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M8.516 3c4.78 0 4.972 6.5 4.972 6.5-1.6-2.906-2.847-3.184-4.972-3.184v2.872L3.772 4.994 8.516.5V3zM.484 5l4.5-4.237v1.78L2.416 5l2.568 2.125v1.828L.484 5z"
//               fill-rule="evenodd"
//             ></path>
//           </svg>
//         </button>
//         <div
//           class="str-chat__message-simple__actions__action str-chat__message-simple__actions__action--options"
//           data-testid="message-actions"
//         >
//           <div
//             class="str-chat__message-actions-box

//       "
//             data-testid="message-actions-box"
//           >
//             <div
//               aria-label="Message Options"
//               class="str-chat__message-actions-list"
//               role="listbox"
//             >
//               <button
//                 aria-selected="false"
//                 class="str-chat__message-actions-list-item"
//                 role="option"
//               >
//                 Reply
//               </button>
//               <button
//                 aria-selected="false"
//                 class="str-chat__message-actions-list-item"
//                 role="option"
//               >
//                 Pin
//               </button>
//               <button
//                 aria-selected="false"
//                 class="str-chat__message-actions-list-item"
//                 role="option"
//               >
//                 Flag
//               </button>
//               <button
//                 aria-selected="false"
//                 class="str-chat__message-actions-list-item"
//                 role="option"
//               >
//                 Mute
//               </button>
//             </div>
//           </div>
//           <button
//             aria-expanded="false"
//             aria-haspopup="true"
//             aria-label="Open Message Actions Menu"
//           >
//             <svg
//               height="4"
//               viewBox="0 0 11 4"
//               width="11"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M1.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
//                 fill-rule="nonzero"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       <div class="str-chat__message-text">
//         <div
//           class="str-chat__message-text-inner str-chat__message-simple-text-inner"
//           data-testid="message-text-inner-wrapper"
//         >
//           <div>
//             <p>hi</p>
//           </div>
//         </div>
//       </div>
//       <div class="str-chat__message-data str-chat__message-simple-data">
//         <span class="str-chat__message-simple-name">pherwerzz</span>
//         <time
//           class="str-chat__message-simple-timestamp"
//           datetime="Wed Apr 27 2022 12:06:14 GMT+0100 (West Africa Standard Time)"
//           title="Wed Apr 27 2022 12:06:14 GMT+0100 (West Africa Standard Time)"
//         >
//           04/27/2022
//         </time>
//       </div>
//     </div>
//   </div>
// </li>;
