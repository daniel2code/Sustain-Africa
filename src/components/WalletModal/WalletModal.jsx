import './WalletModal.scss';
import { ReactComponent as Send } from '../../assets/send.svg';
import { Modal, Alert, Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { bearerInstance } from '../../utils/API';
import { LoadingOutlined } from '@ant-design/icons';
// import { useSelector } from 'react-redux';

const WalletModal = ({ send, close, open, sent, btcPrice, curBal }) => {
  const [proceed, setProceed] = useState(false);
  const [addLoad, setAddLoad] = useState(true);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [rcAdd, setRcAdd] = useState('');
  const [copy, setCopy] = useState(false);
  const [transactionData, setTransactionData] = useState();
  const [initLoad, setInitLoad] = useState(false);
  const [initErr, setInitErr] = useState(false);

  const [otpResend, setOtpResend] = useState(false);
  const [otpView, setOtpView] = useState(false);
  const [sendLoad, setSendLoad] = useState(false);

  const [amountValidate, setAmountValidate] = useState({
    validateStatus: 'success',
    errorMsg: null,
  });

  useEffect(() => {
    if (proceed)
      setTimeout(() => {
        setOtpView(true);
      }, 10000);
  }, [proceed]);

  // const { wallet_name } = useSelector(state => state.user.userData);

  const getAddress = () => {
    if (!send) {
      setAddLoad(true);
      // console.log(wallet_name);

      var data = new FormData();
      data.append('create_address', '1');

      bearerInstance
        .post(`/wallet`, data)
        .then(res => {
          // console.log(res.data.message);
          setAddress(res.data.address);

          setAddLoad(false);
        })
        .catch(err => {
          message.error(err.response?.data?.message);
          // console.log('something went wrong');
        });
    }
  };

  useEffect(() => {
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendBtc = values => {
    // console.log(JSON.stringify(transactionData));
    setSendLoad(true);
    var data = new FormData();
    data.append('send', '1');
    data.append('tx', JSON.stringify(transactionData));
    data.append('otp_to_verify', values.otp);

    bearerInstance
      .post('/wallet', data)
      .then(res => {
        console.log(res.data);

        sent({
          type: 'success',
          message: 'bitcoin sent!',
          description: `${transactionData.value} BTC has been successfully sent to ${rcAdd}`,
        });
        close();
      })
      .catch(err => {
        // console.log(err);
        message.error(err.response?.data?.message);
      })
      .finally(() => {
        setSendLoad(false);
      });
  };

  const sendOtp = () => {
    setOtpResend(true);
    const data = new FormData();
    data.append('send_otp', '1');

    bearerInstance
      .post('/wallet', data)
      .then(res => {
        message.success('opt has been resent');
      })
      .catch(err => {
        message.error(err.response?.data?.message);
      })
      .finally(() => {
        setOtpResend(false);
      });
  };

  const initializeTransaction = values => {
    if (values.btc_amount === undefined)
      return setAmountValidate({
        validateStatus: 'error',
        errorMsg: 'Input a valid amount in btc!',
      });

    if (+values.btc_amount <= 0) return setInitErr(true);

    setInitLoad(true);
    setInitErr(false);

    const data = new FormData();
    data.append('build', '1');
    data.append('receiver', values.btc_address);
    data.append('amount', values.btc_amount);

    bearerInstance
      .post('/wallet', data)
      .then(res => {
        setTransactionData(res.data.tx);
        // console.log(res.data.tx);
        setProceed(true);
      })
      .catch(err => {
        message.error(err.response?.data?.message);
      })
      .finally(() => {
        setInitLoad(false);
      });
  };

  const validateAmount = number => {
    if (+number < curBal && +number > 0) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }

    if (+number <= 0 || number === '')
      return {
        validateStatus: 'error',
        errorMsg: 'Input a valid amount in btc!',
      };

    return {
      validateStatus: 'error',
      errorMsg: 'you don’t have enough coins',
    };
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
          <Send style={{ height: '20px', width: '20px' }} />
        </div>

        {send ? (
          <div className="walletModal-send walletModal-box-left">
            <h3>send bitcoin</h3>

            {proceed ? (
              <>
                <Alert
                  message="info"
                  description={
                    transactionData.type === 'internal'
                      ? 'you are about to send coins to another sustain user. zero fees apply'
                      : 'you are sending coins to an address that exists outside the sustain network. fees apply'
                  }
                  type="info"
                  style={{ marginBottom: '20px' }}
                  closable
                  showIcon
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    fontWeight: '600',
                    marginTop: '5px',
                  }}
                >
                  <h4 style={{ margin: '0', flex: '0 0 40%' }}>send amount</h4>

                  <h4 style={{ margin: '0' }}>
                    {Number(transactionData.value)} btc
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '400',
                      }}
                    >
                      (≈ {transactionData.final_value_usd.toFixed(2)} usd)
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
                    {Number(transactionData.estimated_fee)} btc
                    <br />
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '400',
                      }}
                    >
                      (≈ {transactionData.estimated_fee_usd.toFixed(2)} usd)
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
                  <h4 style={{ margin: '0', flex: '0 0 40%' }}>description</h4>

                  <h4
                    style={{
                      // fontSize: '12px',
                      // fontWeight: '400',
                      margin: '0',
                    }}
                  >
                    {transactionData.description}
                  </h4>
                </div>

                <p
                  style={{
                    marginBottom: '0px',
                    fontSize: '13px',
                    marginTop: '20px',
                  }}
                >
                  {Number(transactionData.value)} btc (
                  {transactionData.final_value_usd.toFixed(2)} usd) will be sent
                  to:
                </p>
                <h4
                  className="walletModal-p"
                  style={{
                    fontWeight: 700,
                    marginBottom: '20px',
                  }}
                >
                  {rcAdd}
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
                  {Number(
                    (
                      parseFloat(transactionData.value) +
                      parseFloat(transactionData.estimated_fee)
                    ).toFixed(7)
                  )}{' '}
                  BTC
                </p>
                <span
                  style={{
                    marginBottom: '20px',
                    marginTop: '-2px',
                    display: 'block',
                    fontSize: '12px',
                  }}
                >
                  approx{' '}
                  {Number(
                    transactionData.final_value_usd +
                      transactionData.estimated_fee_usd
                  ).toFixed(2)}{' '}
                  usd
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
                        required: true,
                        message: 'please enter your otp!',
                      },
                      {
                        message: 'otp must be 6 numbers',
                        len: 6,
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
                      placeholder="click send first..."
                    />
                  </Form.Item>

                  {otpView && (
                    <Button
                      onClick={sendOtp}
                      type="text"
                      loading={otpResend}
                      style={{
                        color: '#ed1450',
                        padding: '0',
                        height: 'unset',
                        display: 'block',
                        marginLeft: 'auto',
                        fontSize: '13px',
                      }}
                    >
                      resend OTP by SMS
                    </Button>
                  )}

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
                      loading={sendLoad}
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
                    {curBal}
                    {curBal === 0 && '.00'}
                  </span>{' '}
                  btc
                </h4>

                <Form onFinish={initializeTransaction}>
                  {initErr && (
                    <Alert
                      type="error"
                      showIcon
                      message="error"
                      description="enter a value greater than zero"
                      closable
                      style={{ marginBottom: '10px' }}
                    />
                  )}

                  <Form.Item
                    name="btc_amount"
                    label="btc amount"
                    style={{
                      display: 'inline-block',
                      width: 'calc(100%)',
                    }}
                    validateStatus={amountValidate.validateStatus}
                    help={amountValidate.errorMsg}
                  >
                    <Input
                      type="number"
                      style={{
                        width: '100%',
                        paddingTop: '0',
                        paddingBottom: '0',
                      }}
                      value={amount}
                      onChange={e => {
                        setAmount(e.target.value);
                        setAmountValidate(validateAmount(e.target.value));
                      }}
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
                        message: 'enter a valid BTC address',
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
                      value={rcAdd}
                      onChange={e => setRcAdd(e.target.value)}
                      autoComplete="off"
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
                    loading={initLoad}
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
