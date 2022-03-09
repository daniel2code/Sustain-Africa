import React from 'react';
import {message, Tooltip, Modal, Row, Col} from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import {
  LikeOutlined,
  DislikeOutlined,
  ArrowRightOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import './DealItem.scss';
import { bearerInstance } from '../../utils/API';
import { Form, Input } from 'antd';
import { curType } from '../../utils/datasource';
// import { useEffect } from 'react';

const { confirm } = Modal;

export default function DealItem({ item }) {
  const history = useHistory();
  const userIdState = useSelector(state => state?.user?.userData?.id);

  // useEffect(() => {
  //   console.log(item);
  // }, [item]);

  const handleOk = () => {
    const data = new FormData();

    data.append('sender', userIdState);
    data.append('receiver', item.dealer_id);
    data.append('type', 'd_r');
    data.append('deal_id', item.d_id);

    // data.forEach(cur => console.log(cur));

    bearerInstance
      .post(`/new_notification`, data)
      .then(res => {
        console.log(res);
        history.push('/message');
      })
      .catch(err => {});
  };

  function showDiscussConfirm(user, source, destination, rate) {
    confirm({
      title: (
        <div>
          start a discussion with{' '}
          <span className="username-green">@{user}</span>?
        </div>
      ),
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <Row><Col span={8}>source:</Col> <Col span={8}>{source} ($)</Col></Row>
          <Row><Col span={8}>destination:</Col> <Col span={8}>{destination} (₦)</Col></Row>
          <Row><Col span={8}>rate:</Col> <Col span={8}>₦{rate}/$</Col></Row>

          <Form.Item
            label="amount $"
            labelCol={{span: 8}}
            labelAlign="left"
            wrapperCol={{span: 10}}
            name="amount"
            rules={[
              {
                message: 'enter trade amount...',
              },
            ]}
            style={{
              textAlign: 'left',
              marginTop: '3%',
              marginBottom: '3%'
            }}
          >
            <Input
              placeholder="enter amount..."
              style={{ width: '100%', borderColor: '#ed1450' }}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <div>
            <Row><Col span={8}>to receive:</Col> <Col span={12}><strong>₦{rate}.00</strong>
              <span style={{
                fontSize: '12px',
                marginTop: '-5px',
              }}> (- escrow fee)</span></Col>
            </Row>
          </div>
        </div>
      ),
      onOk() {
        handleOk();
      },
      onCancel() {},
    });
  }

  return (
    <>
      <div className="deal-item-container">
        <div
          className="left"
          onClick={() => {
            if (
              userIdState &&
              item?.dealer_id.toString() === userIdState.toString()
            ) {
              history.push(`/profile`);
            } else {
              history.push(`/user/${item?.dealer_id}/profile`);
            }
          }}
        >
          {/*<div className="avatar">
                        <Avatar
                            style={{
                                color: "#14a014",
                                backgroundColor: "#a9fca9",
                                fontWeight: "500",
                            }}
                        >
                            {item?.user_name_front.charAt(0).toUpperCase()}
                        </Avatar>
                    </div>*/}
          <div>
            <div className="username-green">@{item?.user_name_front} </div>
            <div>
              <div className="score-green">
                score <span style={{ fontWeight: 600 }}>{item?.a_score}</span>{' '}
                <EllipsisOutlined /> deals closed{' '}
                <span className="bold">{item?.total_deals_closed}</span>{' '}
                <EllipsisOutlined /> not closed{' '}
                <span className="bold">{item?.total_deals_not_closed}</span>{' '}
                <EllipsisOutlined /> reviews{' '}
                <span className="bold">{item?.total_reviews}</span>{' '}
                <EllipsisOutlined /> status{' '}
                <span className="status">online</span>
              </div>
            </div>
          </div>
        </div>
        <Tooltip
          placement="top"
          title={`i am picking ${item?.source} and will remit to ${item?.destination}`}
        >
          <div className="source-destination">
            {item?.source}{' '}
            <ArrowRightOutlined
              style={{
                strokeWidth: '50',
                stroke: 'white',
              }}
            />{' '}
            {item?.destination}{' '}
          </div>
        </Tooltip>
        <div className="deal-item-wrapper">
          <div className="deal-item-row-one">
            “{/* bank */}
            {item?.s_account_age &&
              item?.s_account_age !== 'Any Age' &&
              item?.s_bank_name &&
              `${item?.s_account_age} ${
                item?.s_account_age !== 'Any Age' ? 'year' : ''
              }${item?.s_account_age !== 1 ? 's' : ''} old `}
            {/* wallet */}
            {item?.s_wallet_age &&
              item?.s_wallet_age !== 'Any Age' &&
              item?.s_wallet_type &&
              `${item?.s_wallet_age} ${
                item?.s_wallet_age !== 'Any Age' ? 'year' : ''
              }${item?.s_wallet_age !== 1 ? 's' : ''} old `}
            {/* bank name */}
            {item?.s_bank_name &&
              `${item?.s_bank_name} ${item?.s_account_type} account available in `}
            {/* {item?.s_wallet_type && `${item?.source} wallet available`} */}
            {item?.s_state && `${item?.s_state},`}
            {item?.source !== 'bank fund' &&
            item?.source !== 'bitcoin' &&
            item?.source !== 'ethereum' &&
            item?.source !== 'litecoin' &&
            item?.source !== 'dogecoin'
              ? `${item?.source} wallet (${curType(
                  item.source_currency.toLowerCase()
                )}) available`
              : ''}{' '}
            {item?.s_country && `${item?.s_country},`} to remit to{' '}
            {item?.destination === 'bank fund'
              ? 'bank account'
              : item?.destination}
            ({curType(item.destination_currency.toLowerCase())}) at {item?.rate}
            {item?.rate_structure === 'percentage'
              ? '%'
              : '/' + curType(item.source_currency.toLowerCase())}
            ”
          </div>

          <div className="deal-item-row-two">
            {item?.s_bank_name && (
              <>
                {' '}
                bank name <span className="bold">{item?.s_bank_name}</span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.s_account_type && (
              <>
                {' '}
                account type{' '}
                <span className="bold">{item?.s_account_type}</span>{' '}
                <EllipsisOutlined /> +
              </>
            )}
            {item?.s_account_age && item?.s_account_age !== 0 ? (
              <>
                {' '}
                account age{' '}
                <span className="bold">
                  {item?.s_account_age} years old
                </span>{' '}
                <EllipsisOutlined />{' '}
              </>
            ) : null}
            {item?.s_card_brand && (
              <>
                {' '}
                card brand <span className="bold">
                  {item?.s_card_brand}
                </span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.s_card_type && (
              <>
                {' '}
                card type <span className="bold">{item?.s_card_type}</span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.s_exchange && (
              <>
                {' '}
                exchange <span className="bold">{item?.s_exchange}</span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.s_wallet_type && (
              <>
                {' '}
                wallet type <span className="bold">
                  {item?.s_wallet_type}
                </span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.min && (
              <>
                {' '}
                min{' '}
                <span className="bold">{`${item?.min?.toLocaleString()} ${item?.destination_currency?.toUpperCase()}`}</span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.max && (
              <>
                {' '}
                max{' '}
                <span className="bold">{`${item?.max?.toLocaleString()} ${item?.destination_currency?.toUpperCase()}`}</span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.rate && (
              <>
                {' '}
                rate{' '}
                <span className="bold">
                  {item?.rate}
                  {item?.rate_structure === 'percentage'
                    ? '%'
                    : '/' + curType(item.source_currency.toLowerCase())}
                </span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.s_state && (
              <>
                {' '}
                bank state <span className="bold">{item?.s_state}</span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.s_country && (
              <>
                {' '}
                bank country <span className="bold">
                  {item?.s_country}
                </span>{' '}
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.discussion && (
              <>
                {' '}
                discussion{' '}
                <Tooltip placement="top" title={item?.discussion_details}>
                  <span className="discussion">{item?.discussion}</span>{' '}
                </Tooltip>
                <EllipsisOutlined />{' '}
              </>
            )}
            {item?.deal_summary && (
              <>
                {' '}
                <Tooltip placement="top" title={item?.deal_summary}>
                  <span className="discussion">other notes</span>
                </Tooltip>
              </>
            )}

            <br />
            <br />
            <span style={{ fontSize: '11px', color: '#999' }}>
              {format(item?.d_created_at)}{' '}
              <Tooltip
                placement="top"
                title={
                  'user posted this deal from this location and will probably arrange a meetup there if necessary.'
                }
              >
                {' '}
                · <span className="location">{item?.user_location}</span>
              </Tooltip>{' '}
            </span>
          </div>

          <div className="deal-item-row-four">
            <div className="like-dislike">
              <span className="like">
                <LikeOutlined /> {item?.total_positive_reviews}
              </span>
              <span className="dislike">
                <DislikeOutlined /> {item?.total_negative_reviews}
              </span>
            </div>
            <div className="right">
              <div
                className="grey-button-nobg"
                onClick={() => {
                  history.push(`/deal/${item?.d_id}`);
                }}
              >
                view
              </div>
              {userIdState &&
              item?.dealer_id.toString() !== userIdState.toString() ? (
                <button
                  className="green-button"
                  onClick={() => {
                    if (userIdState) {
                      showDiscussConfirm(
                        item?.user_name_front,
                        item?.source,
                        item?.destination,
                        item?.rate
                      );
                    } else {
                      message.error('you must login to continue');
                      history.push('/login');
                    }
                  }}
                >
                  discuss
                </button>
              ) : (
                userIdState && (
                  <button
                    className="green-button disabled"
                    onClick={() => {
                      message.warn('you posted this deal!');
                    }}
                  >
                    discuss
                  </button>
                )
              )}

              {!userIdState && (
                <button
                  className="green-button"
                  onClick={() => {
                    message.error('you must login to continue');
                    history.push('/login');
                  }}
                >
                  discuss
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
