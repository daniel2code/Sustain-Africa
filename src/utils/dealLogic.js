import { curType } from './datasource';

const generateDealText = item => {
  /* senario bank to bank*/
  if (item?.source === 'bank fund' && item?.destination === 'bank fund') {
    /* all parameter specified */
    if (
      item?.s_country !== 'Any Country' &&
      item?.s_state !== 'Any State' &&
      item?.s_bank_name !== 'Any Bank' &&
      item?.s_account_type !== 'Any Type' &&
      item?.d_country !== 'Any Country' &&
      item?.d_state !== 'Any State' &&
      item?.d_bank_name !== 'Any Bank' &&
      item?.d_account_type !== 'Any Type'
    )
      return `${item?.s_bank_name} ${item?.s_account_type} account
              available in ${item?.s_state}, ${item?.s_country} (
              ${item?.source_currency}), to remit to ${item?.d_bank_name} 
              ${item?.d_account_type} bank account in ${item?.d_country} (
              ${item?.destination_currency}) at 
              ${curType(item?.source_currency)}${item?.rate}/
              ${curType(item?.destination_currency)}.`;
    else if (
      /*s&d country and state= Any*/
      (item?.s_country === 'Any Country' || item?.s_state === 'Any State') &&
      item?.s_bank_name !== 'Any Bank' &&
      item?.s_account_type !== 'Any Type' &&
      (item?.d_country === 'Any Country' || item?.d_state === 'Any State') &&
      item?.d_bank_name !== 'Any Bank' &&
      item?.d_account_type !== 'Any Type'
    )
      return `${item?.s_bank_name} ${item?.s_account_type} account
              available (${item?.source_currency}), to remit to 
              ${item?.d_bank_name} ${item?.d_account_type} bank account (
              ${item?.destination_currency}) at 
              ${curType(item?.source_currency)}${item?.rate}/
              ${curType(item?.destination_currency)}.`;
    else if (
      /*s&d country and state and bank= Any, */
      (item?.s_country === 'Any Country' || item?.s_state === 'Any State') &&
      item?.s_bank_name === 'Any Bank' &&
      item?.s_account_type !== 'Any Type' &&
      (item?.d_country === 'Any Country' || item?.d_state === 'Any State') &&
      item?.d_bank_name === 'Any Bank' &&
      item?.d_account_type !== 'Any Type'
    )
      return `${item?.s_account_type} account
              available (${item?.source_currency}), to remit to 
              ${item?.d_account_type} bank account (
              ${item?.destination_currency}) at 
              ${curType(item?.source_currency)}${item?.rate}/
              ${curType(item?.destination_currency)}.`;
    else if (
      /*s&d country and state and bank= Any, */
      (item?.s_country === 'Any Country' || item?.s_state === 'Any State') &&
      item?.s_bank_name === 'Any Bank' &&
      item?.s_account_type === 'Any Type' &&
      (item?.d_country === 'Any Country' || item?.d_state === 'Any State') &&
      item?.d_bank_name === 'Any Bank' &&
      item?.d_account_type === 'Any Type'
    )
      return ` account available 
              (${item?.source_currency}), to remit to bank account 
              (${item?.destination_currency}) at 
              ${curType(item?.source_currency)}${item?.rate}/
              ${curType(item?.destination_currency)}.`;
  }
};

export default generateDealText;
