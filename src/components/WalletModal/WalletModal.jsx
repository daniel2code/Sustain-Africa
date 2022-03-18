import './WalletModal.scss';
import { createPortal } from 'react-dom';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactComponent as Send } from '../../assets/send.svg';
import { Alert, Button, Form, Input } from 'antd';
import { useState } from 'react';

const WalletModal = ({ send, close }) => {
  const [proceed, setProceed] = useState(false);

  const submit = values => {
    setProceed(true);
  };

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
            <div className="walletModal-send walletModal-box-left">
              <h3>send bitcoin</h3>

              {proceed ? (
                <></>
              ) : (
                <>
                  <h4>
                    available{' '}
                    <span style={{ color: '#ed1450' }}>0.00093434</span> btc
                  </h4>

                  <Form onFinish={submit}>
                    <Form.Item
                      name="btc_amount"
                      label="btc amount"
                      style={{
                        display: 'inline-block',
                        width: 'calc(100%)',
                        // marginLeft: '2%',
                      }}
                      rules={[
                        {
                          // required: true,
                          message: 'input rate!',
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        style={{
                          width: '100%',
                          paddingTop: '0',
                          paddingBottom: '0',
                        }}
                        placeholder="0.00000"
                        suffix={
                          <span style={{ fontSize: '10px', color: '#999' }}>
                            ~ 0 usd
                          </span>
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      name="btc_address"
                      label="to address"
                      style={{
                        display: 'inline-block',
                        width: 'calc(100%)',
                        marginBottom: '10px',
                      }}
                      rules={[
                        {
                          // required: true,
                          message: 'input rate!',
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        style={{
                          width: '100%',
                          paddingTop: '0',
                          paddingBottom: '0',
                        }}
                        placeholder="enter bitcoin address"
                      />
                    </Form.Item>
                    <p style={{ marginBottom: '0px', fontSize: '10px' }}>
                      a bitcoin address looks like this
                    </p>
                    <p
                      style={{
                        marginBottom: '0px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      3MBWkUkFSiWRNrpCxcTjnhT4rt23qk1wWz{' '}
                      <span style={{ fontWeight: 400 }}>(sample only)</span>
                    </p>

                    <Button
                      type="primary"
                      style={{
                        marginLeft: 'auto',
                        display: 'block',
                        marginTop: '30px',
                      }}
                    >
                      continue
                    </Button>
                  </Form>
                </>
              )}
            </div>
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
