const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const { consoleColors } = require('./utils');
const { cyan } = consoleColors;

const notifer = updateNotifier({
  pkg,
  updateCheckInterval: 1000,
})

function updateChk() {
  if (notifer.update) {
    console.log(`New version available: ${cyan(notifier.update.lastest)}, it is recommended that you update before using.`)
    notifer.notify()
  } else {
    console.log('No new version is available.')
  }
}

module.exports = updateChk;