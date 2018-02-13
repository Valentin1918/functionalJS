// imperative code VS functional examples
// import { fs } from 'node-libs-browser'; // fs there is null
// import readFileSync from 'readFileSync'; // tried to use externals
// import fs from 'fs';
// const readFileSync = READ_FILE_SYNC; // possible take from plugin
// There is no fs in the browser!!!
import { Right, Left, fromNullable } from './lesson3';
import { tryCatch } from './lesson4';
import { confStr } from './lesson4';

//----------------------------------------------------------------------------//
const showLogin = () => 'showLogin';
const renderPage = () => 'renderPage';

const openSite = currentUser => {
  if (currentUser) {
    return renderPage(currentUser)
  } else {
    return showLogin();
  }
};

const openSite1 = currentUser =>
  fromNullable(currentUser)
    .fold(showLogin, renderPage);

//----------------------------------------------------------------------------//
const user = {
  preferences: 'userPreferences',
  premium: false,
  address: {
    street: {
      name: 'Preobrajenska',
    }
  }
};
const defaultPrefs = 'defaultPrefs';
const loadPrefs = e => e;

const getPrefs = user => {
  if (user.premium) {
    return loadPrefs(user.preferences)
  } else {
    return defaultPrefs;
  }
};

const getPrefs1 = user =>
  (user.premium ? Right(user) : Left('not premium'))
    .map(u => u.preferences)
    .fold(() => defaultPrefs, prefs => loadPrefs(prefs));

//----------------------------------------------------------------------------//
const streetName = user => {
  const address = user.address;
  if (address) {
    const street = address.street;
    if (street) {
      return street.name;
    }
  }
  return 'no street';
};

const streetName1 = user =>
  fromNullable(user.address)
    .chain(a => fromNullable(a.street))
    .map(s => s.name)
    .fold(e => 'no street', n => n);

// ----------------------------------------------------------------------------//
const x = 5;
const ys = [ 1, 2, 3, 4 ];

const concatUnit = (x, ys) => {
  const found = ys.filter(y => y === x)[0];
  return found ? ys : ys.concat(x);
};

const concatUnit1 = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0])
    .fold(() => ys.concat(x), y => ys);

// ----------------------------------------------------------------------------//
const example = {
  previewFileName: 'config',
  previewFile: confStr,
};

const importFunction = example => {
  if (example.previewFileName) {
    import(
      /* webpackMode: "lazy-once" */
      `../${example.previewFileName}.json`
      ).then(
        config => example.preview = config.preview
      ).catch(
        err => console.error('Chunk loading failed', err)
    )
  }
  return example;
};

const wrapExamples = example => {
  if (example.previewFile) {
    try {
      example.preview1 = JSON.parse(example.previewFile);
    } catch(e) { console.warn(`catch an exception ${e}`)}
  }
  return example;
};

const readFile = x => tryCatch(() => JSON.parse(x));

const wrapExamples1 = example =>
  fromNullable(example.previewFile)
    .chain(readFile)
    .fold(() => example,
        ex => Object.assign(example, {preview2: ex}));

// ----------------------------------------------------------------------------//
const parseDbUrl = cfg => {
  try {
    const c = JSON.parse(cfg);
    if (c.url) return c.url.match(/postgres/)
  } catch(e) {
    return null;
  }
};

const parseDbUrl1 = cfg =>
  tryCatch(() => JSON.parse(cfg))
    .chain(c => fromNullable(c.url))
    .fold(e => null,
        u => u.match(/postgres/));

// ----------------------------------------------------------------------------//

/** running area */
const call = consoleStyle => {
  console.log(`%c openSite ${openSite()}`, consoleStyle);
  console.log(`%c openSite1 ${openSite1(true)}`, consoleStyle);
  console.log(`%c getPrefs ${getPrefs(user)}`, consoleStyle);
  console.log(`%c getPrefs1 ${getPrefs1(user)}`, consoleStyle);
  console.log(`%c streetName ${streetName(user)}`, consoleStyle);
  console.log(`%c streetName1 ${streetName1(user)}`, consoleStyle);
  console.log(`%c concatUnit ${concatUnit(x, ys)}`, consoleStyle);
  console.log(`%c concatUnit1 ${concatUnit1(x, ys)}`, consoleStyle);
  console.log(
    `%c this is not linked with functionalJs lesson (---import()---) ${importFunction(example).preview}`,
    consoleStyle); // during this console.log then inside importFunction wasn't yes called

  console.log(`%c wrapExamples ${JSON.stringify(wrapExamples(example).preview1)}`, consoleStyle);
  console.log(`%c wrapExamples1 ${JSON.stringify(wrapExamples1(example).preview2)}`, consoleStyle);
  console.log(`%c parseDbUrl ${JSON.stringify(parseDbUrl(confStr))}`, consoleStyle);
  console.log(`%c parseDbUrl1 ${JSON.stringify(parseDbUrl1(confStr))}`, consoleStyle);
};
/** ------------ */

export default call;
