import { useState } from 'react';
import { Button, Divider, Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { UpOutlined, DownOutlined, HomeOutlined } from '@ant-design/icons';
// import Loader from '../../components/Loader/Loader';
import Bitcoin from '../../assets/Bitcoin.svg';
import WalletModal from '../../components/WalletModal/WalletModal';
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
    transaction: 'sent out',
    time: '2022-04-24',
    status: 'successful',
    amount: 0.005,
  },
  {
    transaction: 'recieved',
    time: '2022-04-24',
    status: 'successful',
    amount: 0.005,
  },
];

const Wallet = () => {
  const [walletModal, setWalletModal] = useState(false);
  const [send, setSend] = useState(false);

  return (
    <div className="wallet">
      {walletModal && (
        <WalletModal send={send} close={() => setWalletModal(false)} />
      )}

      <div className="wallet-wrapper">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>wallet</Breadcrumb.Item>
        </Breadcrumb>

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
            <p className="wallet-p">price: 38,371.17 usd</p>
          </div>
        </div>

        <Divider style={{ fontSize: '14px' }}>current balance</Divider>

        {/*wallet + send and receive bitcoin */}
        <div className="wallet-coin">
          <h2>0.00317642 BTC</h2>
          <p className="wallet-p" style={{ marginBottom: '20px', marginTop: '-5px' }}>
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
          style={{ textAlign: 'center', display: 'block', marginTop: '8px' }}
        >
          view full history
        </Link>
      </div>
    </div>
  );
};

export default Wallet;
