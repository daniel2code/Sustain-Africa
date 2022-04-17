import { useState } from 'react';
import './DealModal.scss';
import { Modal, Form, Input, Row, Col, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { bearerInstance } from './../../utils/API';
import { useSelector } from 'react-redux';
import { curType } from '../../utils/datasource';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const DealModal = ({ modal, close, deal, dealerData }) => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(state => state?.user?.userData?.id);
  const history = useHistory();

  const submit = values => {
    setLoading(true);
    const data = new FormData();

    // console.log(dealerData);
    // console.log(userIdState);
    // console.log(deal);

    data.append('sender', userId);
    data.append('receiver', deal.dealer_id);
    data.append('type', 'd_r');
    data.append('deal_id', deal.d_id);

    // data.forEach(cur => console.log(cur));

    bearerInstance
      .post(`/new_notification`, data)
      .then(res => {
        console.log(res);
        history.push(`/discussion/${deal.d_id}`);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  };

  const dealAmount = (amt, structure, rate) => {
    let prc;

    if (structure === 'percentage') {
      const ratePercent = rate / 100;
      prc = amt * ratePercent;
    } else {
      prc = amt * rate;
    }

    const escr = prc * 0.03;
    return { price: (prc - escr).toFixed(2), escrow: escr.toFixed(2) };
  };

  return (
    <Modal visible={modal} onCancel={close} cancelText="cancel" width={400}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div
          style={{
            fontSize: '25px',
            color: '#faad14',
            marginRight: '15px',
            marginLeft: '5px',
          }}
        >
          <ExclamationCircleOutlined />
        </div>
        <div style={{ flex: '1' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            start a discussion with{' '}
            <span
              style={{
                marginLeft: '5px',
              }}
              className="username-green"
            >
              @{dealerData?.user_name_front}
            </span>
            ?
          </div>
          <div className="deal-details">
            <Row>
              <Col span={9}>source</Col>
              <Col span={9}>
                {deal?.source} ({curType(deal?.source_currency)})
              </Col>
            </Row>
            <Row>
              <Col span={9}>destination</Col>
              <Col span={9}>
                {deal?.destination} ({curType(deal?.destination_currency)})
              </Col>
            </Row>
            <Row>
              <Col span={9}>rate</Col>
              <Col span={9}>
                {deal?.rate_structure !== 'percentage' &&
                  `/${curType(deal?.source_currency)}`}
                {deal?.rate}
                {deal?.rate_structure === 'percentage'
                  ? '%'
                  : `/${curType(deal?.destination_currency)}`}
              </Col>
            </Row>

            <Form onFinish={submit}>
              <Form.Item
                label={`amount (${curType(deal?.destination_currency)})`}
                name="amount"
                labelCol={{ span: 9 }}
                labelAlign="left"
                wrapperCol={{ span: 12 }}
                rules={[
                  {
                    validator: (_, val) => {
                      if (val === '')
                        return Promise.reject('please input amount');

                      if (+val <= 0)
                        return Promise.reject('please input a valid amount');

                      if (+val < deal.min)
                        return Promise.reject(`minmum is ${deal.min}`);

                      if (+val > deal.max)
                        return Promise.reject(`maximum is ${deal.max}`);

                      return Promise.resolve();
                    },
                  },
                ]}
                style={{
                  textAlign: 'left',
                  marginTop: '5px',
                  flexWrap: 'unset',
                }}
              >
                <Input
                  type="number"
                  style={{ borderColor: '#ed1450', display: 'inline-block' }}
                  placeholder="enter amount..."
                  onChange={e => setAmount(e.target.value)}
                />
              </Form.Item>

              <Row>
                <Col span={9}>to receive</Col>{' '}
                <Col span={12}>
                  <strong>
                    {curType(deal?.source_currency.toLowerCase())}
                    {dealAmount(amount, deal?.rate_structure, deal?.rate).price}
                  </strong>
                  <span
                    style={{
                      fontSize: '12px',
                      marginTop: '5px',
                    }}
                  >
                    {' '}
                    (-
                    {curType(deal?.source_currency.toLowerCase())}
                    {
                      dealAmount(amount, deal?.rate_structure, deal?.rate)
                        .escrow
                    }{' '}
                    escrow fee)
                  </span>
                </Col>
              </Row>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '10px',
                }}
              >
                <Button style={{ marginRight: '10px' }} onClick={close}>
                  cancel
                </Button>

                <Button htmlType="submit" type="primary" loading={loading}>
                  ok
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DealModal;
