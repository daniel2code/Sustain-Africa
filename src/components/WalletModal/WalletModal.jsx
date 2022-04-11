import './WalletModal.scss';
import { ReactComponent as Send } from '../../assets/send.svg';
import { Modal, Alert, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { bearerInstance } from '../../utils/API';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const WalletModal = ({ send, close, open, sent, btcPrice, curBal }) => {
  const [proceed, setProceed] = useState(false);
  const [addLoad, setAddLoad] = useState(true);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [copy, setCopy] = useState(false);

  const { wallet_name } = useSelector(state => state.user.userData);

  const getAddress = () => {
    if (!send) {
      setAddLoad(true);
      // console.log(wallet_name);

      var data = new FormData();
      data.append('new_address_in_wallet', '1');
      data.append('bech32', 'false');
      data.append('wallet_name', wallet_name);

      bearerInstance
        .post(`/wallet_cypher`, data)
        .then(res => {
          // console.log(res.data.message);
          setAddress(res.data.message.address);

          setAddLoad(false);
        })
        .catch(err => {
          console.log(err);
          console.log('something went wrong');
        });
    }
  };

  useEffect(() => {
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendBtc = values => {};

  const sendOtp = () => {};

  const initializeTransaction = values => {
    setProceed(true);
    console.log(values);
  };

  return (
    <Modal onCancel={close} visible={open} className="walletModal">
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
                  <h4 style={{ margin: '0', flex: '0 0 40%' }}>send amount</h4>

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
                  <h4 style={{ margin: '0', flex: '0 0 40%' }}>network fee</h4>

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
                      onClick={() => {
                        sent();
                        close();
                      }}
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
                    {curBal}
                  </span>{' '}
                  btc
                </h4>

                <Form onFinish={initializeTransaction}>
                  <Form.Item
                    name="btc_amount"
                    label="btc amount"
                    style={{
                      display: 'inline-block',
                      width: 'calc(100%)',
                    }}
                    rules={[
                      {
                        required: true,
                        message: 'input btc price!',
                      },
                      {
                        validator: (_, val) => {
                          if (+val < curBal) {
                            return Promise.resolve();
                          }
                          return Promise.reject('insufficient btc');
                        },
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
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="0.00000"
                      suffix={
                        <span style={{ fontSize: '12px', color: '#999' }}>
                          ~ {(btcPrice * amount).toFixed(2)} usd
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
                        required: true,
                        message: 'pleace type in a valid address',
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

            <p className="walletModal-address">{address}</p>

            <div style={{ marginBottom: '20px' }}>
              <Button
                type="primary"
                disabled={addLoad}
                onClick={() => {
                  navigator.clipboard.writeText(address).then(() => {
                    setCopy(true);

                    setTimeout(() => {
                      setCopy(false);
                    }, 3000);
                  });
                }}
              >
                {addLoad ? (
                  <LoadingOutlined spin style={{ color: '#fff' }} />
                ) : (
                  'copy address'
                )}{' '}
              </Button>

              <Button
                type="text"
                style={{ color: '#ed1450' }}
                onClick={getAddress}
              >
                get new
              </Button>
            </div>

            {copy && (
              <Alert
                message="success"
                description="copied!"
                type="success"
                style={{ marginBottom: '20px' }}
                closable
                showIcon
              />
            )}

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
    </Modal>
  );
};

export default WalletModal;
