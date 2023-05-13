import { ClientGenericModels } from '@waoadb/contracts-client';

/**
 * Formats a currency and returns a string.
 * @param value - The value to format.
 * @param currency - The currency code.
 * @returns
 */
export const formatCurrency = (
  value: number,
  currency: ClientGenericModels.CurrencyCode['code']
) => {
  return Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  }).format(value);
};
