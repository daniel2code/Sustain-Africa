import './ChatHeader.scss';
// import { useChatContext } from 'stream-chat-react';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

const ChatHeader = ({ username, channel }) => {
  // const { channel } = useChatContext();

  // const { data } = channel;

  return (
    <div className="chatheader">
      <div className="chatheader-title">buying $50 bank funds from</div>

      <div className="chatheader-main">
        <div className="left">
          <div className="username-green">
            {username} <span style={{ color: '#14a014' }}>&#9679;</span>
          </div>

          <div className="like-dislike no-margin-top">
            <span className="like">
              <LikeOutlined /> 21
            </span>

            <span className="dislike no-margin-right">
              <DislikeOutlined /> 4
            </span>
          </div>
        </div>

        <div className="right">
          <div className="chat-summary">waiting to accept..</div>

          <div className="chat-summary">
            direct chat &#9679; no issues raised
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
