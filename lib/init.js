import { fileURLToPath } from 'url'
import cp from 'child_process'
import * as path from 'path'
import chalk from 'chalk'
import fse from 'fs-extra'
import ora from 'ora'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function init() {
  console.log(chalk.bold.white('Initializing a new mantis site...'))

  // Copy template and config
  const templatePath = path.resolve(__dirname, '../templates/default')
  const configFile = path.resolve(__dirname, '../templates/site.config.js')
  fse.copySync(templatePath, './site')
  fse.copyFileSync(configFile, 'site.config.js')

  cp.execSync('npm init -y')

  // add scripts to package.json
  const packageJsonPath = path
    .relative(__dirname, 'package.json')
    .replace(/\\/g, '/')

  let packageJSON = await import(packageJsonPath, {
    assert: { type: 'json' },
  })
  packageJSON = packageJSON.default
  packageJSON.type = 'module'
  packageJSON.scripts.start = 'mantis start'
  packageJSON.scripts.build = 'mantis build'
  fse.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2))

  const spinner = ora('Installing dependencies...').start()
  cp.exec('npm i -D mantis', () => {
    spinner.succeed()
    console.log(chalk.bold.green('Mantis site succesfully initialized'))
  })

  // console.log(chalk)
}
