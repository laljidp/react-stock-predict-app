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
