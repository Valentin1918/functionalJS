// Create linear data flow with container style types (Box)
const expStr = ' 64 ';

const nextCharForNumberString = str =>
  [str]
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i));

export const Box = x =>
  ({
    map: f => Box(f(x)),
    fold: f => f(x), // allow to exit from a Box
    inspect: () => `Box(${x})`, // takes x from closure
  });

const nextCharForNumberString1 = str =>
  Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .map(c => c.toLowerCase());
// Box(expStr) -> Box(expStr.trim()) -> Box(parseInt(expStr.trim())) ->
// Box(parseInt(expStr.trim()) + 1) -> Box(String.fromCharCode(parseInt(expStr.trim()) + 1))
const nextCharForNumberString2 = str =>
  Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase());

/** running area */
const call = consoleStyle => {
  console.log(`%c nextCharForNumberString ${nextCharForNumberString(expStr)}`, consoleStyle);
  console.log(`%c nextCharForNumberString1 ${nextCharForNumberString1(expStr).inspect()}`, consoleStyle);
  console.log(`%c nextCharForNumberString2 ${nextCharForNumberString2(expStr)}`, consoleStyle);
};
/** ------------ */

export default call;
