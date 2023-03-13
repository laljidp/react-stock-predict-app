import moment from 'moment';

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0)}`,
  };
}

export function debounce(func) {
  let timer;
  // eslint-disable-next-line func-names
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
}

export function calculateStopLoss(data) {
  // data = { target, percentage, stockPrice }
  if (data.target && data.percentage) {
    const target = Number(data.target);
    const price = Number(data?.stockPrice);
    const percentage = Number(data?.percentage);
    const percentageValue = (price / 100) * percentage;
    let afterPercentageTarget = 0;
    if (target > price) {
      afterPercentageTarget = price - percentageValue;
    } else {
      afterPercentageTarget = price + percentageValue;
    }
    return { afterPercentageTarget, percentage };
  }
  return { afterPercentageTarget: '', percentage: data.percentage };
}

export const calculateStopLossPercentageByPrice = (data) => {
  // { stockPrice, targetPrice }
  const stockPrice = Number(data.stockPrice);
  const targetPrice = Number(data.targetPrice);
  const percentage = ((targetPrice - stockPrice) / ((stockPrice + targetPrice) / 2)) * 100;
  return percentage.toFixed(2);
};

export const validatePredictionData = (payload) => {
  const errors = [];
  if (!payload.target) errors.push('Target field required!');
  if (!payload.predictionDateTime) errors.push('Please select prediction date.');
  if (!payload.afterPercentageTarget || !payload.percentage)
    errors.push('Please set the Stoploss field');

  return errors;
};

export const getFormattedChallengePayload = (prediction, currentUser, newTarget) => {
  const formattedPrediction = { ...prediction };

  formattedPrediction.challenge = {
    userId: formattedPrediction.userId,
    userName: formattedPrediction.userName,
    predictionID: formattedPrediction.id,
  };
  formattedPrediction.userId = currentUser.id;
  formattedPrediction.userName = currentUser.name;
  formattedPrediction.target = newTarget;
  // For the challenge we need to calculte stop loss on opposite direction.
  const { afterPercentageTarget, percentage } = calculateStopLoss({
    target: newTarget,
    stockPrice: prediction?.stock.price.c,
    percentage: formattedPrediction.percentage,
  });
  formattedPrediction.afterPercentageTarget = afterPercentageTarget;
  formattedPrediction.percentage = percentage;

  return formattedPrediction;
};

export const calculateDaysLeft = (date) => {
  const predictionDate = moment(date);
  const currentDate = moment();
  return predictionDate.diff(currentDate, 'days');
};

export const getCallType = (stockPrice, targetPrice) => (targetPrice > stockPrice ? 'buy' : 'sell');

export const filterCommonStock = (data = []) => {
  if (!data || data.length === 0) return [];

  return data.filter(
    (r) => r.type?.toLowerCase() === 'Common Stock'.toLowerCase() && !r?.symbol.includes('.'),
  );
};
