import './WalletModal.scss';
import { createPortal } from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';

const WalletModal = ({ send, close }) => {
  return createPortal(
    <div className="walletModal">
      <div className="walletModal-container" onClick={close} />

      <div className="walletModal-modal">
        <button className="walletModal-close" onClick={close}>
          <CloseOutlined />
        </button>
      </div>
    </div>,
    document.getElementById('wallet-modal')
  );
};

export default WalletModal;
