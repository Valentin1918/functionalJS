import config from '../config';
import { Right, Left } from './lesson3';

const confStr = JSON.stringify(config); // unnecessary operations -- only for remarkable example

const defaultPort = 3000;

const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
};

const getPort = () => {
    try {
      const obj = JSON.parse(confStr);
      return obj.port;
    } catch(e) {
      return defaultPort;
    }
};

const getPort1 = str =>
  tryCatch(() => str) // Right('')
    .chain(s => tryCatch(() => JSON.parse(s))) // Right(Right(''))
    .fold(e => defaultPort,
      c => c.port);

/** running area */
const call = consoleStyle => {
  console.log(`%c result ${getPort()}`, consoleStyle);
  console.log(`%c result1 ${getPort1(confStr)}`, consoleStyle);
  console.log(`%c result2 ${getPort1()}`, consoleStyle);
};
/** ------------ */

export default call;
