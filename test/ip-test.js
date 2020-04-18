const axios = require("axios");
const SocksProxyAgent = require("socks-proxy-agent");
const tor = require("../src");
const { buildLogger } = require('../src/logger.js');
const log = buildLogger("ip-test");

//  build axios client with socks proxying tor
const httpsAgent = new SocksProxyAgent("socks5://localhost:9050");
const client = axios.create({httpsAgent});

async function main() {
  log("hello there");

  await tor.startTor();
  log("tor assumes it's ready");
  await checkIp();
  await tor.killTor();
  log("goodbye");
}

async function checkIp() {
  const hLog = buildLogger("ip-check");
  const response = await client.get("https://bot.whatismyipaddress.com");
  hLog(response.data);
  return response.data;
}

main();
