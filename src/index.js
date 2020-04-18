const process = require('child_process');
const { buildLogger } = require('./logger.js');
const log = buildLogger("tor");

let tor;

function killTor() {
  try {
    if (tor) {
      tor.kill('SIGINT');
    }
  } catch (killError) {
    log("Failed to kill tor process");
    console.error(killError);
    throw new Error("failed to kill tor process");
  }
}

function restartTor() {
  return new Promise((resolve, reject) => {
    log("Restarting tor");

    //  clean up and close
    tor.on("close", () => {
      tor = null;
      startTor()
        .then(resolve).catch(reject);
    });

    killTor();
  });
}

function startTor() {
  log("starting up tor");
  return new Promise((resolve, reject) => {
    if (tor) {
      log("can't start up if tor is already running");
      reject(new Error("tor is still running"));
    }

    tor = process.spawn('tor');
    tor.stdout.on('data', data => {
      const msg = data.toString();
      log(msg);

      if (/Bootstrapped 100%|Is Tor already running\?/.test(msg)) {
        resolve();
      }
    });
  });
}

module.exports = {
  startTor,
  restartTor,
  killTor,
};

