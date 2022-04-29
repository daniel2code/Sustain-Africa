import './TxModal.scss';
import { Modal } from 'antd';
import { useEffect } from 'react';
// import { LoadingOutlined } from '@ant-design/icons';
// import { useSelector } from 'react-redux';

const TxModal = ({ close, open, data }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Modal onCancel={close} visible={open} className="txmodal">
      <div className="txmodal-body"></div>
    </Modal>
  );
};

export default TxModal;
