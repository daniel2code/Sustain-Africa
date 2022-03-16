import './WalletModal.scss';
import { createPortal } from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import { ReactComponent as Send } from '../../assets/send.svg';

const WalletModal = ({ send, close }) => {
  return createPortal(
    <div className="walletModal">
      <div className="walletModal-container" onClick={close} />

      <div className="walletModal-modal">
        <button className="walletModal-close" onClick={close}>
          <CloseOutlined />
        </button>

        {send ? null : (
          <div>
            <div style={{ color: '#000' }}>
              <Send />
            </div>
            <div></div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('wallet-modal')
  );
};

export default WalletModal;
