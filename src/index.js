const IS_PROD = process.env.NODE_ENV === "production";
const _process = require("child_process");

// mute logs on prod
let log = () => {};
//  process handle for tor
let tor;

if (!IS_PROD) {
  const { buildLogger } = require("./logger.js");
  log = buildLogger("tor");
}

function killTor() {
  try {
    if (tor) {
      tor.kill("SIGINT");
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

    tor = _process.spawn("tor");
    const onData = data => {
      const msg = data.toString();
      log(msg);

      if (/Bootstrapped 100%|Is Tor already running\?/.test(msg)) {
        resolve();

        //  tidying up listener
        tor.stdout.removeListener("data", onData);
      }
    };

    tor.stdout.on("data", onData);
  });
}

module.exports = {
  kill: killTor,
  killTor,
  restart: restartTor,
  restartTor,
  start: startTor,
  startTor,
};

