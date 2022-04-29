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

        <h2>{Number(data.value)}</h2>
        <p>~ {data.native_value} usd</p>

        <p className="txmodal-hash">hash :</p>
        <p>{data.network_hash}</p>

        <a target="_blank" rel="noreferrer" href={data.transaction_url}>
          view on blockchain&#8599;
        </a>
      </div>
    </Modal>
  );
};

export default TxModal;
