import "./Chat.scss";
// import { useChatContext } from 'stream-chat-react';
import { useSelector } from "react-redux";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

const ChatHeader = ({
  username,
  likes,
  dislikes,
  status,
  discussionData,
  profileData,
  channel,
}) => {
  // const { channel } = useChatContext();
  const user = useSelector((state) => state?.user?.userData);

  return (
    <div className="chatheader">
      <div className="chatheader-title">
        <span className="ant-tag ant-tag-success">
          stage {discussionData?.stage}
        </span>
        {profileData?.dealer_user_name === user.user_name
          ? "selling"
          : "buying "}
        {discussionData?.source_currency === "usd"
          ? "$"
          : discussionData?.source_currency === "ngn"
          ? "₦"
          : "$"}
        {discussionData?.source_value} of {discussionData.source}
        {profileData?.dealer_user_name === user.user_name
          ? ` to ${username}`
          : ` from ${username} `}
      </div>

      <div className="chatheader-main">
        <div className="left">
          <div className="name">
            @{username} {}
            <span
              style={{
                color:
                  Object.keys(channel.state.members).length === 2
                    ? "#14a014"
                    : "gray",
              }}
            >
              &#9679;
            </span>
          </div>

          <div className="like-dislike-chat no-margin-top">
            <span className="like">
              <LikeOutlined /> {likes}
            </span>

            <span className="dislike no-margin-right">
              <DislikeOutlined /> {dislikes}
            </span>
          </div>
        </div>

        <div className="right">
          {/* <div className="chat-summary">waiting to accept..</div>  */}

          {/* <div className="chat-summary">no issues raised</div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
