// A curated collection of Monoids and their uses
import { List } from 'immutable-ext';
import { fromNullable } from "./lesson3";

const compose = (...fns) =>
  fns.reverse().reduce((prevFn, nextFn) =>
      value => nextFn(prevFn(value)),
    value => value
  );

export const Sum = x =>
  ({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
  });
Sum.empty = () => Sum(0);

export const Product = x =>
  ({
    x,
    concat: ({x: y}) => Product(x * y),
    inspect: () => `Product(${x})`
  });
Product.empty = () => Product(1);

export const Any = x =>
  ({
    x,
    concat: ({x: y}) => Any(x || y),
    inspect: () => `Any(${x})`
  });
Any.empty = () => Any(false);

export const All = x =>
  ({
    x,
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`
  });
All.empty = () => All(true);

export const Max = x =>
  ({
    x,
    concat: ({x: y}) => Max(x > y ? x : y),
    inspect: () => `Max(${x})`
  });
Max.empty = () => Max(-Infinity);

export const Min = x =>
  ({
    x,
    concat: ({x: y}) => Min(x < y ? x : y),
    inspect: () => `Min(${x})`
  });
Min.empty = () => Min(Infinity);

const Right = x =>
  ({
    chain: f => f(x),
    ap: other => other.map(x),
    traverse: (of, f) => f(x).map(Right),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    concat: o =>
      o.fold(e => Left(e),
        r => Right(x.concat(r))),
    isRight: true,
    isLeft: false,
    inspect: () => `Right(${x.inspect ? x.inspect() : x})`
  });

const Left = x =>
  ({
    chain: f => Left(x),
    ap: other => Left(x),
    traverse: (of, f) => of(Left(x)),
    map: f => Left(x),
    fold: (f, g) => f(x),
    concat: o => Left(x),
    isRight: false,
    isLeft: true,
    inspect: () => `Left(${x})`
  });

const stats = List.of(
  { page: 'Home', views: 40 },
  { page: 'About', views: 10 },
  { page: 'Blog', views: 4 });

const stats1 = List.of(
  { page: 'Home', views: 40 },
  { page: 'About', views: 10 },
  { page: 'Blog', views: null });

const resRight = stats.foldMap(x =>
  fromNullable(x.views).map(Sum), Right(Sum(0)));

const resRight1 = stats1.foldMap(x =>
  fromNullable(x.views).map(Sum), Right(Sum(0)));

const First = either =>
  ({
    fold: f => f(either),
    concat: o =>
      either.isLeft ? o : First(either),
    inspect: () =>
      `First(${x})`
  });
First.empty = () => First(Left());

const find = (xs, f) =>
  List(xs)
    .foldMap(x =>
    First(f(x) ? Right(x) : Left()), First.empty())
    .fold(x => x);

const resFind = find([3,4,5,6,7], x => x > 4);

const Fn = f =>
  ({
    fold: f,
    concat: o =>
      Fn(x => f(x).concat(o.fold(x)))
  });

const hasVowels = x =>!!x.match(/[aeiou]/ig);
const longWord = x => x.length >= 5;

const both = Fn(compose(All, hasVowels))
  .concat(Fn(compose(All, longWord)));

const both1 = Fn(compose(Any, hasVowels))
  .concat(Fn(compose(Any, longWord)));

const resBoth = ['gym', 'bird', 'lilac'].filter(x => both.fold(x).x);
const resBoth1 = ['gym', 'bird', 'lilac'].filter(x => both1.fold(x).x);

const Pair = (x, y) =>
  ({
    x,
    y,
    concat: ({x: x1, y: y1}) =>
      Pair(x.concat(x1), y.concat(y1))
  });

/** running area */
const call = consoleStyle => {
  console.log(`%c resRight ${resRight.inspect()}`, consoleStyle); // Right(Sum(54));
  console.log(`%c resRight1 ${resRight1.inspect()}`, consoleStyle); // Left(null);
  console.log(`%c resFind ${resFind.inspect()}`, consoleStyle); // Right(5);
  console.log(`%c resBoth ${resBoth}`, consoleStyle); // ['lilac']
  console.log(`%c resBoth1 ${resBoth1}`, consoleStyle); // ['bird', 'lilac']
};
/** ------------ */

export default call;
