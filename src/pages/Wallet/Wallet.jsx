// import { useEffect, useState } from 'react';
import { /* Tabs, Button, message, Divider, */ Breadcrumb } from 'antd';
import { Link /* useHistory */ } from 'react-router-dom';

// import { useSelector } from 'react-redux';
import {
  // LikeOutlined,
  // DislikeOutlined,
  // EllipsisOutlined,
  HomeOutlined,
} from '@ant-design/icons';
// import Loader from '../../components/Loader/Loader';

import './Wallet.scss';

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
      </div>
    </div>
  );
};

export default Wallet;
