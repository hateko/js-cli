
const inquirer = require('inquirer');
const { consoleColors, inquirerQ } = require('../lib/utils');
const { green } = consoleColors;
const { create } = inquirerQ;

function revisePackageJson(res,sourcePath){
  return new Promise((resolve)=>{
  /* 读取文件 */
    fs.readFile(sourcePath+'/package.json',(err,data)=>{
      if(err) throw err
      const { author , name  } = res
      let json = data.toString()
      /* 替换模版 */
      json = json.replace(/demoName/g,name.trim())
      json = json.replace(/demoAuthor/g,author.trim())
      const path = process.cwd()+ '/package.json'
      /* 写入文件 */
      fs.writeFile(path, new Buffer(json) ,()=>{
          utils.green( '创建文件：'+ path )
          resolve()
      })
    })
  })
}

async function cTemplate() {
  green('--------运行项目-------')
  inquirer.prompt(create).then(answer=>{
    console.log('answer=', answer )
  })
}

module.exports = cTemplate;