import functionalJS from '../src';

const lesson = 4;
const requestStyle = 'background: blue; color: white; display: block;';
const resultStyle = 'color: green; font-weight: bold;';

console.log(`%c Run lesson ${lesson}`, requestStyle);

functionalJS[`lesson${lesson}`](resultStyle);
