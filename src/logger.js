const chalk = require("chalk");

let i = 0;
const colors = 'cyan magenta red green yellow blue'.split(' ');

function getLogger(tag) {
  const colorIndex = i++ % colors.length;
  const chalkFn = chalk[colors[colorIndex]];

  return function(...args) {
    console.log(chalkFn(`=== ${tag} ===`), ...args);
  };
};

module.exports = {
  buildLogger: getLogger,
};

