import { Box } from './lesson1';

const price = '$5.00';
const discount = '20%';
const pursRatio = 0.01;

const moneyToFloat = str =>
  parseFloat(str.replace(/\$/g, ''));

const parseToFloat = str => {
  const replaced = str.replace(/\%/g, '');
  const number = parseFloat(replaced);
  return number * pursRatio;
};

const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price);
  const savings = parseToFloat(discount);
  return cost - cost * savings;
};

const moneyToFloat1 = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r)); // don't need to exit from Box now, because will exit in last chaim function applyDiscount1

const parseToFloat1 = str =>
  Box(str.replace(/\%/g, ''))
    .map(r => parseFloat(r))
    .map(n => n * pursRatio); // don't need to exit from Box now, because will exit in last chaim function applyDiscount1

const applyDiscount1 = (price, discount) =>
  moneyToFloat1(price)
    .fold(cost =>
      parseToFloat1(discount)
        .fold(savings =>
          cost - cost * savings
        )
    );
// because of double nesting we need to exit from Box twice using fold method


/** running area */
const call = consoleStyle => {
  console.log(`%c applyDiscount ${applyDiscount(price, discount)}`, consoleStyle);
  console.log(`%c applyDiscount ${applyDiscount1(price, discount)}`, consoleStyle);
};
/** ------------ */

export default call;
