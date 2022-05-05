import './TxModal.scss';
import { Modal } from 'antd';

const TxModal = ({ close, open, data }) => {
  return (
    <Modal onCancel={close} visible={open} className="txmodal">
      <div className="txmodal-body">
        <h4>details</h4>

        <h3>{data.type_short === 'send' ? 'recieved' : 'sent out'}</h3>
        <p>
          {new Date(data.tx_created_at).toLocaleString('en-us', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>

        <h2>{Number(data.value)} BTC</h2>
        <p>~ {data.native_value} usd</p>

        <p className="txmodal-hash">hash :</p>
        <p>{data.network_hash}</p>

        <a target="_blank" rel="noreferrer" href={data.transaction_url}>
          view on blockchain{' '}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.004 9.414L7.39703 18.021L5.98303 16.607L14.589 8H7.00403V6H18.004V17H16.004V9.414Z"
              fill="#ed1450"
            />
          </svg>
        </a>
      </div>
    </Modal>
  );
};

export default TxModal;
