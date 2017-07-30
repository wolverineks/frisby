import { Box } from './utils.js'

export const moneyToFloat = (moneyString) =>
  Box(moneyString)
    .map(stripDollarSign)
    .map(parseFloat)

export const percentToFloat = (percentString) =>
  Box(percentString)
    .map(stripPercentSign)
    .map(parseFloat)
    .map(percentToPercentDecimal)

export const stripDollarSign = (moneyString) => moneyString.replace(/\$/g, '')
export const stripPercentSign = (percentString) => percentString.replace(/%/g, '')
export const percentToPercentDecimal = (float) => float / 100

export const applyDiscount = (priceString, discountString) =>
  moneyToFloat(priceString)
    .fold(priceFloat =>
      percentToFloat(discountString)
        .fold(discountFloat =>
          priceFloat - (priceFloat * discountFloat)))
