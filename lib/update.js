// 引用 update-notifer 库，用于检查更新

const updateNotifier = require('update-notifier');

// 引用 chalk 库，用于控制台字符样式

const chalk = require('chalk');

// 引入 package.json 文件，用于 update-notifier 库读取相关信息

const pkg = require('../package.json');
const UpdateNotifier = require('update-notifier');

// updateNotifier 是 update-notifier 的方法，其他方法可到 npmjs 查看

const notifer = updateNotifier({
  // 从 package.json 获取 name 和 version 进行查询
  pkg,
  // 设定检查更新周期，默认为1000*60*60*24 （1天）
  // 这里设定为 1秒
  updateCheckInterval: 1000,
})

function updateChk() {
  // 当检测到版本时，notifier.update 会返回Object
  // 此时可以用 notifier.update.latest 获取最新版本号
  if (notifer.update) {
    console.log(`New version available: ${chalk.cyan(notifier.update.lastest)}, it is recommended that you update before using.`)
    notifer.notify()
  } else {
    console.log('No new version is available.')
  }
}

// 将上面的updateChk() 方法导出
module.exports = updateChk;