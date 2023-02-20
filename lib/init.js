import { fileURLToPath } from 'url'
import cp from 'child_process'
import * as path from 'path'
import chalk from 'chalk'
import fse from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function init() {
  console.log(chalk.bold.white('Initializing a new mantis site...'))

  const templatePath = path.resolve(__dirname, '../templates/default')

  fse.copySync(templatePath, './src')

  console.log('PROCESS', process.env.NODE_ENV)
  cp.execSync('npm init -y')

  // add scripts to package.json
  const packageJsonPath = path
    .relative(__dirname, 'package.json')
    .replace(/\\/g, '/')

  let packageJSON = await import(packageJsonPath, {
    assert: { type: 'json' },
  })
  packageJSON = packageJSON.default

  packageJSON.scripts.start = 'mantis start'
  packageJSON.scripts.build = 'mantis build'
  fse.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2))
}
