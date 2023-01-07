import "./Chat.scss";
// import { useChatContext } from 'stream-chat-react';
import { useSelector } from "react-redux";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const ChatHeader = ({
  username,
  likes,
  dislikes,
  status,
  discussionData,
  profileData,
  channel,
  location,
}) => {
  // const { channel } = useChatContext();
  const user = useSelector((state) => state?.user?.userData);

  let obj = Object.values(channel.state.members);

  console.log(user);

  // function formats numbers
  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <div className="chatheader">
      {discussionData?.stage === "1" && (
        <div className="chatheader-title">
          <span className="ant-tag ant-tag-success">
            stage {discussionData?.stage}
          </span>
          {profileData?.dealer_user_name === user.user_name
            ? " selling "
            : "buying "}
          {discussionData?.source_currency === "usd"
            ? "$"
            : discussionData?.source_currency === "ngn"
            ? "₦"
            : "$"}
          {discussionData?.source_value} with {discussionData.source}
          {profileData?.dealer_user_name === user.user_name ? ` to` : ` from`}
        </div>
      )}

      {discussionData?.stage === "2" && (
        <div className="chatheader-title">
          <span className="ant-tag ant-tag-success">
            stage {discussionData?.stage}
          </span>
          {profileData?.dealer_user_name === user.user_name
            ? "buying "
            : "selling "}
          {discussionData?.destination_currency === "usd"
            ? "₦"
            : discussionData?.destination_currency === "ngn"
            ? "₦"
            : "₦"}
          {currencyFormat(discussionData?.destination_value)} with{" "}
          {discussionData.destination}
          {profileData?.dealer_user_name === user.user_name ? ` from` : ` to`}
        </div>
      )}

      <div className="chatheader-main">
        <div className="left">
          <div>
            <div className="name">
              {user.id === location?.discussion_data[0]?.dealer
                ? location?.merchant_data[0]?.user_name
                : location?.dealer_data[0]?.user_name}
              {/* @{obj[1]?.user?.name || username} {} */}
            </div>

            <Tooltip
              placement="topRight"
              title={
                obj[1] && obj[1]?.user?.online === true ? "online" : "away"
              }
              style={{margin: "0px"}}
            >
              <span
                style={{
                  color:
                    obj[1] && obj[1]?.user?.online === true
                      ? "#14a014"
                      : "#dedede",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                {obj[1] && obj[1]?.user?.online === true ? "online" : "away"}
              </span>
            </Tooltip>
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
