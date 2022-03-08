// import { useEffect, useState } from 'react';
import { /* Tabs, */ Button, Divider, Breadcrumb, Table } from 'antd';
import { Link /* useHistory */ } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { UpOutlined, DownOutlined, HomeOutlined } from '@ant-design/icons';
// import Loader from '../../components/Loader/Loader';
import Bitcoin from '../../assets/Bitcoin.svg';

import './Wallet.scss';

const columns = [
  {
    title: 'Transaction',
    dataIndex: 'transaction',
    key: 'transaction',
    render: (text, record) => (
      <div>
        {text === 'send' ? <UpOutlined /> : <DownOutlined />}
        <div style={{ height: '16px', width: '16px' }}>
          <img
            alt="bitcoin"
            src={Bitcoin}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        <p>{text}</p>
        <p>{record.time}</p>
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
    render: text => (
      <>
        <p>{text}BTC</p>
        <p>{text * 450}USD</p>
      </>
    ),
  },
];

const data = [
  {
    transaction: 'send',
    time: '2022-04-04',
    status: 'successful',
    amount: 0.005,
  },
];

const Wallet = () => {
  return (
    <div className="wallet">
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
            <div>
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
          <p className="wallet-p" style={{ marginBottom: '20px' }}>
            approx 121.88 usd
          </p>

          <div className="wallet-coin-btn">
            <Button type="primary" block>
              send coin
            </Button>

            <Button type="primary" block>
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

        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Wallet;
