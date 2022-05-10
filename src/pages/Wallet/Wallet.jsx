import { useEffect, useState } from 'react';
import { Alert, Button, Divider, Breadcrumb, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {
  UpOutlined,
  DownOutlined,
  HomeOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import Loader from '../../components/Loader/Loader';
import Bitcoin from '../../assets/Bitcoin.svg';
import WalletModal from '../../components/WalletModal/WalletModal';
import { bearerInstance } from '../../utils/API';
import './Wallet.scss';
import moment from 'moment';
import TxModal from '../../components/TxModal/TxModal';

const columns = [
  {
    title: 'transaction',
    dataIndex: 'transaction',
    key: 'transaction',
    render: (_, record) => (
      <div
        className="wallet-table-transaction"
        // style={{ opacity: record.confirmations === 0 ? '0.5' : '1' }}
      >
        {record.type === 'receive' ? (
          <DownOutlined style={{ color: '#999', marginRight: '5px' }} />
        ) : (
          <UpOutlined style={{ color: '#999', marginRight: '5px' }} />
        )}
        <div
          style={{
            height: '16px',
            width: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '5px',
          }}
        >
          <img
            alt="bitcoin"
            src={Bitcoin}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </div>
        <div>
          <p style={{ marginBottom: 0, fontSize: '13px', fontWeight: 400 }}>
            <span style={{ color: '#14a014' }}>
              {record.type === 'receive' ? 'received' : 'sent'}
            </span>
            <br />
            {record.mode}
          </p>
          <p
            style={{ marginBottom: '10px', fontSize: '11px', fontWeight: 400 }}
          >
            {moment(record.tx_created_at).format('LL')}
            <br />
            {moment(record.tx_created_at).format('LT')}
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => (
      <Tag
        className="clicker"
        style={{
          fontSize: '11px',
          marginBottom: 0,
          marginRight: 0,
          cursor: 'pointer',
          // opacity: record.confirmations === 0 ? '0.5' : '1',
        }}
        color={
          record.confirmations === 0
            ? 'default'
            : record.confirmations < 3 && record.confirmations > 0
            ? 'yellow'
            : 'green'
        }
      >
        {record.confirmations === 0
          ? 'detected'
          : record.confirmations < 3 && record.confirmations > 0
          ? 'pending'
          : 'successful'}
      </Tag>
      // </Tooltip>
    ),
  },
  {
    title: 'amount',
    key: 'amount',
    dataIndex: 'amount',
    render: (text, record) => (
      <>
        <p
          style={{
            marginBottom: 0,
            fontSize: '13px',
            textAlign: 'right',
            // opacity: record.confirmations === 0 ? '0.5' : '1',
          }}
        >
          {Number(record.value)} BTC
        </p>
        <p
          style={{
            marginBottom: 0,
            fontSize: '11px',
            textAlign: 'right',
            // opacity: record.confirmations === 0 ? '0.5' : '1',
          }}
        >
          {record.native_value} USD
        </p>
      </>
    ),
  },
];

const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [loadingTx, setLoadingTx] = useState(true);
  const [reload, setReload] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [txModal, setTxModal] = useState(false);
  const [txData, setTxData] = useState(null);
  const [send, setSend] = useState(false);
  const [sent, setSent] = useState(null);
  const [btcPrice, setBtcPrice] = useState('');
  const [data, setData] = useState();
  const [view, setView] = useState(6);
  const [userBalance, setUserBalance] = useState();

  const fetchData = () => {
    setReload(true);

    bearerInstance
      .get(`/wallet?view_wallet=1`)
      .then(res => {
        setUserBalance(res.data.wallet_data[0]);

        return bearerInstance.get('/wallet?prices=1');
      })
      .then(res => {
        setBtcPrice(res.data.message.USD['15m']);

        setLoading(false);
        setReload(false);
      })
      .catch(err => {
        console.log('something went wrong');
      });
  };

  const loadTransactions = () => {
    setLoadingTx(true);

    bearerInstance
      .get(`/wallet?list_transactions=1`)
      .then(res => {
        const data = res.data.transaction_data
          .map((cur, i) => {
            return {
              key: i,
              ...cur,
            };
          })
          .sort((a, b) => moment(b.tx_created_at) - moment(a.tx_created_at));
        setData(data);

        console.log(data);
      })
      .catch(err => {
        console.log(err.response.data);
        console.log('something went wrong');
      })
      .finally(() => {
        setLoadingTx(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {walletModal && (
        <WalletModal
          open={walletModal}
          send={send}
          sent={val => {
            setSent(val);
          }}
          close={() => setWalletModal(false)}
          btcPrice={+btcPrice}
          curBal={+userBalance.balance}
        />
      )}

      {txModal && txData && (
        <TxModal open={txModal} close={() => setTxModal(false)} data={txData} />
      )}

      <div className="wallet">
        <div className="wallet-wrapper">
          {loading && <Loader />}
          {!loading && (
            <>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">
                    <HomeOutlined />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>wallet</Breadcrumb.Item>
              </Breadcrumb>

              {sent && (
                <Alert
                  message={sent.message}
                  className={`wallet-alert ${
                    sent.type === 'error' ? 'wallet-alert-err' : ''
                  }`}
                  description={sent.description}
                  type={sent.type}
                  style={{ marginBottom: '20px' }}
                  showIcon
                  closable
                />
              )}

              {/* bitcoin price in usd */}
              <div className="wallet-price">
                <div>
                  <div style={{ marginRight: '5px' }}>
                    <img
                      alt="bitcoin"
                      src={Bitcoin}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                  <p className="wallet-p">Bitcoin</p>
                </div>

                <div>
                  <p className="wallet-p">
                    <SyncOutlined
                      spin={reload}
                      onClick={() => {
                        fetchData();
                        loadTransactions();
                      }}
                      style={{
                        color: '#ed1450',
                        marginRight: '12px',
                      }}
                    />
                    price: {new Intl.NumberFormat('en-us').format(btcPrice)} usd
                  </p>
                </div>
              </div>

              <Divider style={{ fontSize: '14px' }}>current balance</Divider>

              {/*wallet + send and receive bitcoin */}
              <div className="wallet-coin">
                <h2>
                  {+userBalance.balance}
                  {+userBalance.balance === 0 && '.00'} BTC
                </h2>
                <p
                  className="wallet-p"
                  style={{ marginBottom: '20px', marginTop: '-5px' }}
                >
                  approx{' '}
                  {new Intl.NumberFormat('en-us').format(
                    userBalance.balance_usd
                  )}
                  {userBalance.balance_usd === 0 && '.00'} usd
                  {userBalance.balance_usd === 0 && (
                    <Button
                      type="text"
                      style={{
                        color: '#ed1450',
                        padding: 0,
                        marginLeft: '5px',
                      }}
                      onClick={() => {
                        setWalletModal(true);
                        setSend(false);
                      }}
                    >
                      deposit some coins
                    </Button>
                  )}
                </p>

                <div className="wallet-coin-btn">
                  <Button
                    type="primary"
                    block
                    onClick={() => {
                      setSent(null);
                      setWalletModal(true);
                      setSend(true);
                    }}
                  >
                    send coin
                  </Button>

                  <Button
                    type="primary"
                    block
                    onClick={() => {
                      setWalletModal(true);
                      setSend(false);
                    }}
                  >
                    receive coin
                  </Button>
                </div>

                <div className="wallet-coin-btn">
                  <Button className="wallet-coin-btn-1" block>
                    <UpOutlined />
                    buy coin
                  </Button>

                  <Button className="wallet-coin-btn-1" block>
                    <DownOutlined />
                    sell coin
                  </Button>
                </div>
              </div>

              <Divider style={{ fontSize: '14px' }}>recent activity</Divider>

              <Table
                className="wallet-table"
                pagination={false}
                columns={columns.map((cur, i) => ({
                  ...cur,
                  onCell: (data, index) => {
                    return {
                      onClick: event => {
                        // if (event.target.className.includes('clicker')) {
                        setTxData(data);
                        setTxModal(true);
                        // }
                      },
                    };
                  },
                }))}
                dataSource={data?.slice(0, view)}
                loading={loadingTx}
              />

              <Button
                onClick={() => {
                  if (data.length - view > 6) setView(view + 6);
                  else setView(data?.length);
                }}
                type="text"
                style={{
                  color: '#ed1450',
                  display: 'block',
                  margin: '0 auto',
                  marginTop: '8px',
                }}
              >
                load more
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;
