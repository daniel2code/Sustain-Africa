import './WalletModal.scss';
import { createPortal } from 'react-dom';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactComponent as Send } from '../../assets/send.svg';
import { Alert, Button } from 'antd';

const WalletModal = ({ send, close }) => {
  return createPortal(
    <div className="walletModal">
      <div className="walletModal-container" onClick={close} />

      <div className="walletModal-modal">
        <button className="walletModal-close" onClick={close}>
          <CloseOutlined />
        </button>

        <div className="walletModal-box">
          <div
            className={send ? '' : 'walletModal-recieve-icon'}
            style={{
              color: 'rgb(255,213,0)',
              marginRight: '5px',
            }}
          >
            <Send style={{ height: '25px', width: '25px' }} />
          </div>

          {send ? (
            <div className="walletModal-send walletModal-box-left"></div>
          ) : (
            <div className="walletModal-recieve walletModal-box-left">
              <h3>receive bitcoin</h3>

              <h4>your bitcoin address</h4>

              <p>use this address to deposit bitcoin (btc) tokens:</p>

              <p className="walletModal-address">
                38p1GxDgz9GMqA4t9oe5Cpe1SmwhsSj
              </p>

              <div style={{ marginBottom: '20px' }}>
                <Button type="primary">copy address </Button>

                <Button type="text" style={{ color: '#ed1450' }}>
                  get new
                </Button>
              </div>

              <Alert
                message="note: make sure you only send btc tokens on the bitcoin network to avoid fund loss!"
                type="error"
                showIcon
                icon={
                  <ExclamationCircleOutlined
                    style={{ color: '#ed1450', marginTop: '5px' }}
                  />
                }
                style={{
                  color: '#ed1450',
                  alignItems: 'flex-start',
                  border: '2px solid #ed1450',
                  borderRadius: '10px',
                  backgroundColor: '#ed145040',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('wallet-modal')
  );
};

export default WalletModal;
