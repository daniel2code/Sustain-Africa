// import '';
import { Form, Select, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  wallet_types,
  exchanges,
  countries,
  us_states,
  uk_states,
  ng_states,
  us_banks,
  uk_banks,
  ng_banks,
  account_types,
  account_age,
  wallet_age,
  card_types,
  card_brands,
} from '../../utils/datasource';
import { useState } from 'react';

const { Option } = Select;

const DealHeader = ({ title, mainName, tooltipText }) => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [destinationStatesToRender, setDestinationStatesToRender] = useState(
    []
  );
  const [destinationBanksToRender, setDestinationBanksToRender] = useState([]);
  const [destinationStateInput, setDestinationStateInput] = useState(null);
  const [destinationBankInput, setDestinationBankInput] = useState(null);
  const [destinationAccountInput, setDestinationAccountInput] = useState(null);
  const [destinationAccountAgeInput, setDestinationAccountAgeInput] =
    useState(null);

  const handleDestinationSelect = value => {
    setSelectedDestination(value);
  };

  const onDestinationBankCountryChange = value => {
    setDestinationStateInput(null);
    setDestinationBankInput(null);
    setDestinationAccountInput(null);
    setDestinationAccountAgeInput(null);

    if (value === 'United States') {
      setDestinationStatesToRender(us_states);
      setDestinationBanksToRender(us_banks);
    } else if (value === 'United Kingdom') {
      setDestinationStatesToRender(uk_states);
      setDestinationBanksToRender(uk_banks);
    } else if (value === 'Nigeria') {
      setDestinationStatesToRender(ng_states);
      setDestinationBanksToRender(ng_banks);
    }
  };

  return (
    <>
      <div className="form-row">
        <Form.Item
          name={mainName}
          label={title}
          rules={[
            {
              required: true,
              message: `please select deal ${mainName}!`,
            },
          ]}
        >
          <Select
            style={{
              width: 'calc(100% - 30px)',
            }}
            suffixIcon={
              <DownOutlined
                style={{
                  strokeWidth: '50',
                  color: '#ed1450',
                }}
              />
            }
            placeholder={`select ${mainName}`}
            onChange={value => {
              handleDestinationSelect(value);
            }}
          >
            <Option value="bank fund">bank fund</Option>
            <Option value="paypal">paypal</Option>
            <Option value="cash">cash</Option>
            <Option value="skrill">skrill</Option>
            <Option value="venmo">venmo</Option>
            <Option value="bitcoin">bitcoin</Option>
            <Option value="giftcard">giftcard</Option>
            <Option value="cashapp">cashapp</Option>
            <Option value="moneygram">moneygram</Option>
            <Option value="greendot">greendot</Option>
            <Option value="ethereum">ethereum</Option>
            <Option value="litecoin">litecoin</Option>
            <Option value="dogecoin">dogecoin</Option>
          </Select>
        </Form.Item>
        <div className="tooltip-container">
          <Tooltip placement="left" title={tooltipText}>
            <div className="question-tooltip">?</div>
          </Tooltip>
        </div>
      </div>

      {(selectedDestination === 'bitcoin' ||
        selectedDestination === 'ethereum' ||
        selectedDestination === 'dogecoin' ||
        selectedDestination === 'litecoin') && (
        <>
          <Form.Item
            name="destination_wallet_type"
            rules={[
              {
                required: true,
                message: 'please select wallet type!',
                whitespace: true,
              },
            ]}
            style={{ width: '80%' }}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              placeholder="wallet type"
            >
              {wallet_types &&
                wallet_types.map(wallet => (
                  <Option key={wallet} value={wallet}>
                    {wallet}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="destination_exchange"
            rules={[
              {
                required: true,
                message: 'please select exchange!',
                whitespace: true,
              },
            ]}
            style={{ width: '80%' }}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              placeholder="exchange"
            >
              {exchanges &&
                exchanges.map(exchange => (
                  <Option key={exchange} value={exchange}>
                    {exchange}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="destination_wallet_age"
            rules={[
              {
                required: true,
                message: 'please select wallet age!',
                whitespace: true,
              },
            ]}
            style={{ width: '80%' }}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              placeholder="wallet age"
            >
              {wallet_age &&
                wallet_age.map(age => (
                  <Option key={age} value={age}>
                    {age}
                  </Option>
                ))}
              <Option key="above 10" value="above 10">
                above 10
              </Option>
            </Select>
          </Form.Item>
        </>
      )}

      {selectedDestination === 'bank fund' && (
        <>
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              name="destination_country"
              style={{ display: 'inline-block', width: '39%' }}
              rules={[
                {
                  required: true,
                  message: 'select bank country!',
                },
              ]}
            >
              <Select
                suffixIcon={
                  <DownOutlined
                    style={{
                      strokeWidth: '50',
                      color: '#ed1450',
                    }}
                  />
                }
                placeholder="country"
                onChange={onDestinationBankCountryChange}
              >
                {countries &&
                  countries.map(country => (
                    <Option key={country} value={country}>
                      {country}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{
                display: 'inline-block',
                width: '39%',
                marginLeft: '2%',
              }}
              rules={[
                {
                  required: true,
                  message: 'select bank state!',
                },
              ]}
            >
              <Select
                suffixIcon={
                  <DownOutlined
                    style={{
                      strokeWidth: '50',
                      color: '#ed1450',
                    }}
                  />
                }
                placeholder="state"
                value={destinationStateInput}
                onChange={value => {
                  setDestinationStateInput(value);
                }}
              >
                {destinationStatesToRender &&
                  destinationStatesToRender.map(state => (
                    <Option key={state} value={state}>
                      {state}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'please select bank name!',
                whitespace: true,
              },
            ]}
            style={{ width: '80%' }}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              placeholder="bank name"
              value={destinationBankInput}
              onChange={value => {
                setDestinationBankInput(value);
              }}
            >
              {destinationBanksToRender &&
                destinationBanksToRender.map(bank => (
                  <Option key={bank} value={bank}>
                    {bank}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: 'please select account type!',
                whitespace: true,
              },
            ]}
            style={{ width: '80%' }}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              placeholder="account type"
              value={destinationAccountInput}
              onChange={value => {
                setDestinationAccountInput(value);
              }}
            >
              {account_types &&
                account_types.map(account => (
                  <Option key={account} value={account}>
                    {account}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'please select account age!',
                whitespace: true,
              },
            ]}
            style={{ width: '80%' }}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              placeholder="account age"
              value={destinationAccountAgeInput}
              onChange={value => {
                setDestinationAccountAgeInput(value);
              }}
            >
              {account_age &&
                account_age.map(age => (
                  <Option key={age} value={age}>
                    {age}
                  </Option>
                ))}
              <Option key="above 10" value="above 10">
                above 10
              </Option>
            </Select>
          </Form.Item>
        </>
      )}

      {selectedDestination === 'giftcard' && (
        <>
          <Form.Item
            name="destination_card_type"
            rules={[
              {
                required: true,
                message: 'please select giftcard type!',
                whitespace: true,
              },
            ]}
            style={{ width: '80%' }}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              placeholder="giftcard type"
            >
              {card_types &&
                card_types.map(card => (
                  <Option key={card} value={card}>
                    {card}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="destination_card_brand"
            rules={[
              {
                required: true,
                message: 'please select giftcard brand!',
                whitespace: true,
              },
            ]}
            style={{ width: '80%' }}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              placeholder="giftcard brand"
            >
              {card_brands &&
                card_brands.map(brand => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </>
      )}

      {selectedDestination !== '' && (
        <>
          <Form.Item
            name="destination_currency"
            style={{ width: '80%' }}
            rules={[
              {
                required: true,
                message: 'please specify currency!',
              },
            ]}
          >
            <Select
              suffixIcon={
                <DownOutlined
                  style={{
                    strokeWidth: '50',
                    color: '#ed1450',
                  }}
                />
              }
              // value={destCur}
              // initialValue={destCur}
              // onChange={e => setDestCur(e)}
              placeholder="currency"
              // disabled={rate}
            >
              <Option value="usd">USD ($)</Option>
              <Option value="ngn">NGN (₦)</Option>
              <Option value="cad">CAD ($)</Option>
              <Option value="gbp">GBP (£)</Option>
            </Select>
          </Form.Item>
        </>
      )}
    </>
  );
};

export default DealHeader;
