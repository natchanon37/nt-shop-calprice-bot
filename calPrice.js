
const sizeChart = {
  '100': 1220,
  '120': 1590,
  '140': 1830,
  '160': 2070,
  '180': 2510,
  '200': 2950,
}

const priceBySize = (size) => {
  return sizeChart[size];
}

const smallSize = {
  jpToThaiFee: 150,
}

const mediumSize = {
  jpToThaiFee: 1200,
}

const calPrice = (price, type, rate, size, thaiShippingFee) => {
  let priceInFloat = parseFloat(price)
  let cost = 0;
  let jpFee = 0;
  switch (type) {
    case '400':
      jpFee = (priceInFloat + priceBySize(size)) * rate
      cost = jpFee + smallSize.jpToThaiFee + thaiShippingFee;
      return cost;
    case '1000':
      jpFee = (priceInFloat + priceBySize(size)) * rate;
      cost = jpFee + mediumSize.jpToThaiFee + thaiShippingFee;
      return cost;
  }
}

module.exports = calPrice;