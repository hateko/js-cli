const symbols = require('log-symbols');

const fse = require('fs-extra');

const path = require('path');

const defConfig = require('./config');

const cfgPath = path.resolve(__dirname, '../config.json')
const { consoleColors } = require('./utils');
const { red } = consoleColors;

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
    console.log(symbols.error, red(`Set the mirror failed. ${err}`))
    process.exit()
  }
}

module.exports = setMirror;