// Semigroup examples
import { Map } from 'immutable-ext';
import { Sum, All, First } from './lesson6';

const acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] });
const acct2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] });

const acctsRes = acct1.concat(acct2);

/** running area */
const call = consoleStyle => {
  console.log(`%c acctsRes ${JSON.stringify(acctsRes.toJS())}`, consoleStyle);

};
/** ------------ */

export default call;
