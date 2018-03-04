// Create types with Semigroups
const resStr = 'a'.concat('b').concat('c');
const resArr = [1,2].concat([3,4].concat([5,6]));

export const Sum = x =>
  ({
    x,
    concat: ({x: y}) =>
      Sum(x + y),
    inspect: () =>
      `Sum(${x})`
  });

const resSum = Sum(1).concat(Sum(2));
const resSum1 = resSum.concat(Sum(3));

export const All = x =>
  ({
    x,
    concat: ({x: y}) =>
      All(x && y),
    inspect: () =>
      `All(${x})`
  });

const resAll = All(true).concat(All(false)); // All(false)

export const First = x =>
  ({
    x,
    concat: _ =>
      First(x),
    inspect: () =>
      `First(${x})`
  });

const resFirst = First('bla').concat(First('ice cream'));

/** running area */
const call = consoleStyle => {
  console.log(`%c resStr ${resStr}`, consoleStyle);
  console.log(`%c resArr ${resArr}`, consoleStyle);
  console.log(`%c resSum ${JSON.stringify(resSum)}`, consoleStyle);
  // console.log(`%c resSum1.concat ${resSum1.concat}`, consoleStyle);
  console.log(`%c resSum1 ${resSum1.inspect()}`, consoleStyle);
  console.log(`%c resAll ${resAll.inspect()}`, consoleStyle);
  console.log(`%c resFirst ${resFirst.inspect()}`, consoleStyle);
};
/** ------------ */

export default call;
