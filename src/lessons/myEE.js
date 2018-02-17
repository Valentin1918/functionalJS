const eeCreator = () => ({
  ev: {},
  evo: {},
  on: function (event, cb) {
    if (!this.ev[event]) this.ev[event] = [];
    this.ev[event].push(cb);
  },
  emit: function (event, ...args) {
    if (!this.ev[event] && !this.evo[event]) return;
    const allEv = [...(this.ev[event] || []), ...(this.evo[event] || [])];
    allEv.forEach(cb => cb.apply(null, args));
    this.evo[event] = undefined;
  },
  once: function (event, cb) {
    if (!this.evo[event]) this.evo[event] = [];
    this.evo[event].push(cb);
  },
});

const myEE = new eeCreator();

myEE.on('log1', message => console.log(`${1}: ${message}`));
myEE.once('log1', message => console.log(`${1}: once: ${message}`));
myEE.on('log2', message => console.log(`${2}: ${message}`));
myEE.on('log3', (...message) => {
  message.forEach(i => console.log(`${3}: ${i}`));
});
myEE.once('log3', message => console.log(`${3}: once: ${message}`));
myEE.on('log4', message => console.log(`${4}: ${message}`));

const yourEE = new eeCreator();

yourEE.on('log1', message => console.log(`${1}: ${message}`));
yourEE.once('log1', message => console.log(`${1}: once: ${message}`));
yourEE.on('log2', message => console.log(`${2}: ${message}`));
yourEE.on('log3', (...message) => {
  message.forEach(i => console.log(`${3}: ${i}`));
});
yourEE.once('log3', message => console.log(`${3}: once: ${message}`));
yourEE.on('log4', message => console.log(`${4}: ${message}`));



/** running area */
const call = consoleStyle => {
  console.log(`%c myEE ${myEE.emit('log1', 'Vasia', 'Petia')}`, consoleStyle);
  console.log(`%c myEE ${myEE.emit('log1', 'Vasia', 'Petia')}`, consoleStyle);
  console.log(`%c myEE ${myEE.emit('log2', 'Vasia', 'Petia')}`, consoleStyle);
  console.log(`%c myEE ${myEE.emit('log3', 'Vasia', 'Petia', 'Didko')}`, consoleStyle);
  console.log(`%c myEE ${myEE.emit('log3', 'Vasia', 'Petia', 'Didko')}`, consoleStyle);
  console.log(`%c myEE ${myEE.emit('log4', 'Vasia', 'Petia', 'Didko')}`, consoleStyle);

  console.log(`%c yourEE ${yourEE.emit('log1', 'Vasia', 'Petia')}`, consoleStyle);
  console.log(`%c yourEE ${yourEE.emit('log1', 'Vasia', 'Petia')}`, consoleStyle);
  console.log(`%c yourEE ${yourEE.emit('log2', 'Vasia', 'Petia')}`, consoleStyle);
  console.log(`%c yourEE ${yourEE.emit('log3', 'Vasia', 'Petia', 'Didko')}`, consoleStyle);
  console.log(`%c yourEE ${yourEE.emit('log3', 'Vasia', 'Petia', 'Didko')}`, consoleStyle);
  console.log(`%c yourEE ${yourEE.emit('log4', 'Vasia', 'Petia', 'Didko')}`, consoleStyle);
};
/** ------------ */

export default call;
