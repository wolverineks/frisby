// @flow
import { Box } from './types/index.js'

export const moneyToFloat = (moneyString: string) =>
  Box(moneyString)
    .map(stripDollarSign)
    .map(parseFloat)

export const percentToFloat = (percentString: string) =>
  Box(percentString)
    .map(stripPercentSign)
    .map(parseFloat)
    .map(percentToPercentDecimal)

export const stripDollarSign = (moneyString: string) => moneyString.replace(/\$/g, '')
export const stripPercentSign = (percentString: string) => percentString.replace(/%/g, '')
export const percentToPercentDecimal = (float: number) => float / 100

export const applyDiscount = (priceString: string, discountString: string) =>
  moneyToFloat(priceString)
    .fold(priceFloat =>
      percentToFloat(discountString)
        .fold(discountFloat =>
          priceFloat - (priceFloat * discountFloat)))
