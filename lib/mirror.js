const symbols = require('log-symbols');

const fse = require('fs-extra');

const path = require('path');

const defConfig = require('./config');
const chalk = require('chalk');

const cfgPath = path.resolve(__dirname, '../config.json')

async function setMirror(link) {
  const exists = await fse.pathExists(cfgPath)
  if (exists) {
    mirrorAction(link)
  } else {
    await defConfig()
    mirrorAction(link)
  }
}

async function mirrorAction(link) {
  try{
    const jsonConfig = await fse.readJson(cfgPath)
    jsonConfig.mirror = link
    await fse.writeJSON(cfgPath, jsonConfig)
    console.log(symbols.success, 'Set the mirror successfull.')
  } catch(err) {
    console.log(symbols.error, chalk.red(`Set the mirror failed. ${err}`))
    process.exit()
  }
}

module.exports = setMirror;