const fse = require('fs-extra');
const ora = require('ora');

const symbols = require('log-symbols');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const path = require('path');

const dlTemplate = require('./download');
const { consoleColors, inquirerQ } = require('./utils');
const { red, yellow, cyan } = consoleColors;
const { init } = inquirerQ;

async function initProject(projectName) {
  try{
    const exists = await fse.pathExists(projectName)
    if (exists) {
      console.log(symbols.error, red('The project already exists.'))
    } else {
      inquirer
        .prompt([init])
        .then(async answers => {
          const initSpinner = ora(cyan('Initializing project...'))
          initSpinner.start()
          const templatePath = path.resolve(__dirname, '../template')
          const processPath = process.cwd()
          const LCProjectName = projectName.toLowerCase()
          const targetPath = `${processPath}/${LCProjectName}`
          const exists = await fse.pathExists(templatePath)
          if(!exists) {
            await dlTemplate()
          }
          try {
            await fse.copy(templatePath, targetPath)
          }catch(err) {
            console.log(symbols.error, red(`Copy template failed. ${err}`))
            process.exit()
          }

          const multiMeta = {
            project_name: LCProjectName,
            global_name: answers.name
          }

          const multiFiles = [
            `${targetPath}/package.json`,
            `${targetPath}/gulpfile.js`,
            `${targetPath}/test/index.html`,
            `${targetPath}/src/index.js`
          ]

          for(var i=0; i<multiFiles.length; i++) {
            try {
              const multiFliesContent = await fse.readFile(multiFiles[i], 'utf8')
              const multiFilesResult = await handlebars.compile(multiFliesContent)(multiMeta)
              await fse.outputFile(multiFiles[i], multiFilesResult)
              revisePackageJson()
            } catch(err) {
              initSpinner.text = red(`Initialize project failed. ${err}`)
              initSpinner.fail()
              process.exit()
            }
          }

          initSpinner.text = 'Initizalize project successfull.'
          initSpinner.succeed();
          console.log(`
            To get started:
              cd ${yellow(LCProjectName)}
              ${yellow('npm install')} or ${yellow('yarn install')}
              ${yellow('npm run dev')} or ${yellow('yarn run dev')}
          `)
        })
        .catch((error) => {
          if(error.isTtyError) {
            console.log(symbols.error, red("Prompt couldn't be rendered in the current enviroment."))
          }else {
            console.log(symbols.error, red(error))
          }
        })
    }
  } catch(err) {
    console.log(err)
    process.exit()
  }
}
module.exports = initProject