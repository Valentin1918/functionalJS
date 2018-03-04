// Enforce a null check with composable code branching using Either
export const Right = x =>
  ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`,
  });

export const Left = x =>
  ({
    chain: f => Left(x),
    map: f => Left(x), // Left inside map doesn't call a passed function --> by using it allow to go through all chain in the end till fold method by passing always the same argument
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`,
  });

export const fromNullable = x =>
  x != null ? Right(x) : Left(null);

const findColor = name =>
  fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name]);

const result = () =>
  Right(2)
    .map(x => x + 1)
    .map(x => x / 2)
    .fold(x => 'error', x => x);

const result1 = () =>
  Left(2)
    .map(x => x + 1)
    .map(x => x / 2)
    .fold(x => 'error',
        x => x);

const result2 = colorStr =>
  findColor(colorStr)
    .map(c => c.slice(1))
    .fold(e => 'no color',
        c => c.toUpperCase());

/** running area */
const call = consoleStyle => {
  console.log(`%c result ${result()}`, consoleStyle);
  console.log(`%c result1 ${result1()}`, consoleStyle);
  console.log(`%c result2 ${result2('red')}`, consoleStyle);
  console.log(`%c result3 ${result2('green')}`, consoleStyle);
};
/** ------------ */

export default call;
