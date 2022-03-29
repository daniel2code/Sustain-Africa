import './WalletModal.scss';
import { ReactComponent as Send } from '../../assets/send.svg';
import { Modal, Alert, Button, Form, Input } from 'antd';
import { useState } from 'react';

const WalletModal = ({ send, close, open }) => {
  const [proceed, setProceed] = useState(false);

  const sendBtc = values => {};

  const sendOtp = () => {};

  const submit = values => {
    setProceed(true);
  };

  return (
    <Modal onCancel={close} visible={open} className="walletModal">
      <div className="walletModal-modal">
        <div className="walletModal-box">
          <div
            className={send ? '' : 'walletModal-recieve-icon'}
            style={{
              color: 'rgb(255,213,0)',
            }}
          >
            <Send style={{ height: '25px', width: '25px' }} />
          </div>

          {send ? (
            <div className="walletModal-send walletModal-box-left">
              <h3>send bitcoin</h3>

              {proceed ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      fontWeight: '600',
                    }}
                  >
                    <h4 style={{ margin: '0', flex: '0 0 40%' }}>
                      send amount
                    </h4>

                    <h4 style={{ margin: '0' }}>
                      0.00005462 btc
                      <br />
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        (≈ 2.12 usd)
                      </span>
                    </h4>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      fontWeight: '600',
                    }}
                  >
                    <h4 style={{ margin: '0', flex: '0 0 40%' }}>
                      network fee
                    </h4>

                    <h4 style={{ margin: '0' }}>
                      0.00008 btc
                      <br />
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        (≈ 3.10 usd)
                      </span>
                    </h4>
                  </div>

                  <p
                    style={{
                      marginBottom: '0px',
                      fontSize: '13px',
                      marginTop: '20px',
                    }}
                  >
                    0.00005462 btc (2.12 usd) will be sent to:
                  </p>
                  <h4
                    className="walletModal-p"
                    style={{
                      fontWeight: 700,
                      marginBottom: '20px',
                    }}
                  >
                    bc1qkzk3ea0muwkyf292aevfqglmg0xkjwa50lg6f5
                  </h4>

                  <p
                    style={{
                      marginBottom: '0px',
                      fontSize: '13px',
                    }}
                  >
                    total deduction will be:
                  </p>
                  <p
                    style={{
                      color: '#14a014',
                      fontWeight: 700,
                      fontSize: '20px',
                      marginBottom: '0',
                    }}
                  >
                    0.00013462 BTC
                  </p>
                  <span
                    style={{
                      marginBottom: '20px',
                      marginTop: '-2px',
                      display: 'block',
                      fontSize: '12px',
                    }}
                  >
                    approx 5.22 usd
                  </span>

                  <Alert
                    message="warning"
                    description="bitcoin transactions are final! please cross check your inputs before you proceed!"
                    type="warning"
                    style={{ marginBottom: '20px' }}
                    closable
                    showIcon
                  />

                  <Form onFinish={sendBtc}>
                    <Form.Item
                      name="otp"
                      label="enter OTP"
                      style={{
                        display: 'inline-block',
                        width: 'calc(100%)',
                        marginBottom: '0',
                        fontSize: '13px',
                      }}
                      rules={[
                        {
                          // required: true,
                          message: 'input rate!',
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        style={{
                          width: '100%',
                          paddingTop: '0',
                          paddingBottom: '0',
                        }}
                        placeholder="click send first..."
                      />
                    </Form.Item>
                    <Button
                      onClick={sendOtp}
                      type="text"
                      style={{
                        color: '#ed1450',
                        padding: '0',
                        height: 'unset',
                        display: 'block',
                        marginLeft: 'auto',
                        fontSize: '13px',
                      }}
                    >
                      send OTP by SMS
                    </Button>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '30px',
                      }}
                    >
                      <Button
                        onClick={() => setProceed(false)}
                        type="text"
                        style={{ color: '#ed1450', fontSize: '16px' }}
                      >
                        back
                      </Button>

                      <Button
                        type="primary"
                        style={{
                          marginLeft: 'auto',
                          display: 'block',
                          fontSize: '16px',
                        }}
                        htmlType="submit"
                      >
                        continue
                      </Button>
                    </div>
                  </Form>
                </>
              ) : (
                <>
                  <h4>
                    available{' '}
                    <span style={{ color: '#ed1450', fontWeight: 600 }}>
                      0.00093434
                    </span>{' '}
                    btc
                  </h4>

                  <Form onFinish={submit}>
                    <Form.Item
                      name="btc_amount"
                      label="btc amount"
                      style={{
                        display: 'inline-block',
                        width: 'calc(100%)',
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
                          <span style={{ fontSize: '12px', color: '#999' }}>
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
                        type="text"
                        style={{
                          width: '100%',
                          paddingTop: '0',
                          paddingBottom: '0',
                        }}
                        placeholder="enter bitcoin address"
                      />
                    </Form.Item>
                    <p style={{ marginBottom: '0px', fontSize: '13px' }}>
                      a bitcoin address looks like this:
                    </p>
                    <p
                      className="walletModal-p"
                      style={{
                        marginBottom: '0px',
                        fontSize: '13px',
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
                        fontSize: '16px',
                      }}
                      htmlType="submit"
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
              <h4>deposit btc tokens here:</h4>

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
                message="warning"
                description="make sure you only send btc tokens on the bitcoin network to avoid fund loss!"
                type="warning"
                style={{ marginBottom: '20px' }}
                closable
                showIcon
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
