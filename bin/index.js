#!/usr/bin/env node

const program = require('commander');
const updateChk = require('../lib/update');
const setMirror = require('../lib/mirror');
const dlTemplate = require('../lib/download');
const cTemplate = require('../lib/create');
const initProject = require('../lib/init');
const { consoleColors } = require('../lib/utils');
const { blue, green } = consoleColors;

// 从 package.json 文件中请求 version 字段的值， -v 和 --version是参数

program.version(require('../package.json').version, '-v, --version')

program
  .command('upgrade')
  .description("Check the js-plugin-cli version.")
  .action(() => {
    updateChk()
  })

program
  .command('mirror <template_mirror>')
  .description('Set the template mirror.')
  .action(tplMirror => {
    setMirror(tplMirror)
  })

program
  .command('template')
  .description("Download template from mirror.")
  .action(() => {
    dlTemplate()
  })

program
  .command('create')
  .description('create a project ')
  .action(() => {
    cTemplate()
  })

/* mycli start 运行项目 */
program
  .command('start')
  .description('start a project')
  .action(() => {
    
  })

/* mycli build 打包项目 */
program
  .command('build')
  .description('build a project')
  .action(() => {
    green('--------构建项目-------')
  })

program
  .name('js-plugin-cli')
  .usage('<commands>[options]')
  .command('init <project_name>')
  .description('Create a javascript plugin project.')
  .action(project => {
    initProject(project)
  })

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')

// 解析命令行参数
program.parse(process.argv)
if( program.debug ){
  blue('option is debug')
}else if(program.small){
  blue('option is small')
}