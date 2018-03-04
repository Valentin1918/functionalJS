// Ensure failsafe combination using monoids
import { Sum, All } from './lesson6';

Sum.empty = () => Sum(0);

const resSum = Sum.empty().concat(Sum(1).concat(Sum(2)));

All.empty = () => All(true);

const resAll = All.empty().concat(All(true).concat(All(false)));

// it is impossible to make failsafe method for First

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0);

const ressum = sum([1,2,3,4,5]);

const all = xs =>
  xs.reduce((acc, x) => acc && x, true);

const resall = all([true, false]);

const first = xs =>
  xs.reduce((acc, x) => acc);

const resfirst = first([1,2,3]);
// const res2first = first([]);

/** running area */
const call = consoleStyle => {
  console.log(`%c resSum ${resSum.inspect()}`, consoleStyle);
  console.log(`%c resAll ${resAll.inspect()}`, consoleStyle);
  console.log(`%c ressum ${ressum}`, consoleStyle);
  console.log(`%c resall ${resall}`, consoleStyle);
  console.log(`%c resfirst ${resfirst}`, consoleStyle);
  // console.log(`%c res2first ${res2first}`, consoleStyle);
};
/** ------------ */

export default call;
