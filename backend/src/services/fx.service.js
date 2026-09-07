// Base exchange rates relative to USD
const BASE_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  SGD: 1.35
};

/**
 * Get available exchange rates
 */
const getRates = async (baseCurrency = 'USD') => {
  const base = baseCurrency.toUpperCase();
  if (!BASE_RATES[base]) {
    throw new Error(`Unsupported base currency: ${base}`);
  }

  const baseToUsd = 1 / BASE_RATES[base];
  const convertedRates = {};

  for (const [curr, rate] of Object.entries(BASE_RATES)) {
    convertedRates[curr] = parseFloat((rate * baseToUsd).toFixed(4));
  }

  return {
    base,
    timestamp: new Date().toISOString(),
    rates: convertedRates
  };
};

/**
 * Calculate converted amount between two currencies
 */
const convertCurrency = async (from, to, amount) => {
  const fromCurr = from.toUpperCase();
  const toCurr = to.toUpperCase();

  if (!BASE_RATES[fromCurr] || !BASE_RATES[toCurr]) {
    throw new Error('Unsupported currency pair');
  }

  const rateData = await getRates(fromCurr);
  const rate = rateData.rates[toCurr];
  const convertedAmount = parseFloat((amount * rate).toFixed(2));

  return {
    from: fromCurr,
    to: toCurr,
    originalAmount: Number(amount),
    rate,
    convertedAmount
  };
};

module.exports = {
  getRates,
  convertCurrency
};