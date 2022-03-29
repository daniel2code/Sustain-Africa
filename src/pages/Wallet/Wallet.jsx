import { useEffect, useState } from 'react';
import { Alert, Button, Divider, Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
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

const columns = [
  {
    title: 'transaction',
    dataIndex: 'transaction',
    key: 'transaction',
    render: (text, record) => (
      <div className="wallet-table-transaction">
        {text === 'sent out' ? (
          <UpOutlined style={{ color: '#999', marginRight: '5px' }} />
        ) : (
          <DownOutlined style={{ color: '#999', marginRight: '5px' }} />
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
          <p style={{ marginBottom: 0, fontSize: '13px' }}>{text}</p>
          <p style={{ marginBottom: 0, fontSize: '10px' }}>
            {new Date(record.time).toLocaleString('en-us', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: text => <p style={{ marginBottom: 0, fontSize: '13px' }}>{text}</p>,
  },
  {
    title: 'amount',
    key: 'amount',
    dataIndex: 'amount',
    render: (text, record) => (
      <>
        <p style={{ marginBottom: 0, fontSize: '13px', textAlign: 'right' }}>
          {record.transaction === 'sent out' ? '+' : '-'}
          {text}BTC
        </p>
        <p style={{ marginBottom: 0, fontSize: '10px', textAlign: 'right' }}>
          {record.transaction === 'sent out' ? '+' : '-'}
          {text * 450}USD
        </p>
      </>
    ),
  },
];

const data = [
  {
    key: '1',
    transaction: 'sent out',
    time: '2022-04-24',
    status: 'successful',
    amount: 0.005,
  },
  {
    key: '2',
    transaction: 'recieved',
    time: '2022-04-24',
    status: 'successful',
    amount: 0.005,
  },
];

const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [send, setSend] = useState(false);
  const [btcPrice, setBtcPrice] = useState('');

  useEffect(() => {
    bearerInstance
      .get('/wallet?prices=1')
      .then(res => {
        // console.log(res.data.message.USD['15m']);
        setBtcPrice(res.data.message.USD['15m']);
        setLoading(false);
      })
      .catch(err => {
        console.log('something went wrong');
      });
  }, []);

  return (
    <>
      <WalletModal
        open={walletModal}
        send={send}
        close={() => setWalletModal(false)}
      />
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

              <Alert
                message="bitcoin sent!"
                description="0.00013462 BTC has been successfully sent to bc1qkzk3ea0muwkyf292aevfqglmg0xkjwa50lg6f5"
                type="success"
                style={{ marginBottom: '20px' }}
                showIcon
                closable
              />

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
                      onClick={() => {}}
                      style={{
                        color: '#ed1450',
                        marginRight: '10px',
                      }}
                    />
                    price: {new Intl.NumberFormat('en-us').format(btcPrice)} usd
                  </p>
                </div>
              </div>

              <Divider style={{ fontSize: '14px' }}>current balance</Divider>

              {/*wallet + send and receive bitcoin */}
              <div className="wallet-coin">
                <h2>0.00317642 BTC</h2>
                <p
                  className="wallet-p"
                  style={{ marginBottom: '20px', marginTop: '-5px' }}
                >
                  approx 121.88 usd
                </p>

                <div className="wallet-coin-btn">
                  <Button
                    type="primary"
                    block
                    onClick={() => {
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
                columns={columns}
                dataSource={data}
              />

              <Link
                to="#"
                style={{
                  textAlign: 'center',
                  display: 'block',
                  marginTop: '8px',
                }}
              >
                view full history
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;
