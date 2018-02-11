import functionalJS from '../src';

const lesson = LESSON;
const requestStyle = 'background: blue; color: white; display: block;';
const requestAllStyle = 'background: red; color: white; display: block;';
const resultStyle = 'color: green; font-weight: bold;';

const consoleRunLesson = n => console.log(`%c Run lesson ${n}`, requestStyle);

if (lesson) {
  consoleRunLesson(lesson);
  functionalJS[`lesson${lesson}`](resultStyle);
} else {
  console.log('%c Run all lessons', requestAllStyle);
  Object.keys(functionalJS).map(key => {
    consoleRunLesson(key);
    functionalJS[key](resultStyle)
  });
}
