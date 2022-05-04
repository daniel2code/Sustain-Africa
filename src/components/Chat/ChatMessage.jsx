import { useMessageContext } from 'stream-chat-react';
import './Chat.scss';

const ChatMessage = () => {
  const msgContext = useMessageContext();

  console.log(msgContext);

  return (
    <div>
      <span></span>
    </div>
  );
};

export default ChatMessage;
