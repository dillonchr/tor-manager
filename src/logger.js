const IS_PROD = process.env.NODE_ENV === 'production';
const chalk = IS_PROD ? {} : require("chalk");

let i = 0;
const colors = 'cyan magenta red green yellow blue'.split(' ');

function getLogger(tag) {
  if (IS_PROD) {
    return () => {};
  }

  //  only log when in dev
  const colorIndex = i++ % colors.length;
  const chalkFn = chalk[colors[colorIndex]];

  return function(...args) {
    console.log(chalkFn(`=== ${tag} ===`), ...args);
  };
};

module.exports = {
  buildLogger: getLogger,
};

