const isTextValidate = (text) => {
  const lineInput = text.trim().split(' ')

  if (lineInput.length !== 5) return false
  const price = Number(lineInput[0]);
  const type = lineInput[1].toString();
  const rate = Number(lineInput[2]);
  const size = lineInput[3].toString();
  const thaiShippingFee = Number(lineInput[4]);

  if (isNaN(price) || isNaN(rate) || isNaN(thaiShippingFee)) {
    return false;
  }

  return true;
}

module.exports = isTextValidate;