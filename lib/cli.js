#!/usr/bin/env node
// import { buildConfig } from '../templates/site.config.js'
import mantis from './index.js'
import meow from 'meow'
import chalk from 'chalk'
import path from 'path'

const cli = meow(
  `
    ${chalk.green('Initialize a new site:')}

      ${chalk.yellow('mantis init')}

    ${chalk.green('Build site:')}

      ${chalk.yellow('mantis build')}

      ${chalk.underline.green('Build options:')}
        ${chalk.yellow(
          '-c, --config <file-path>',
        )}        Path to the config file (default: site.config.js)

    ${chalk.underline.green('Options')}
      ${chalk.yellow(
        '-p, --port <port-number>',
      )}        Port to use for local server (default: 3000)
      ${chalk.yellow(
        '-t, --template <template-name>',
      )}  Static site template to start your project

      
      ${chalk.yellow(' -h, --help')}                Display this help text
      ${chalk.yellow(' -v, --version')}             Display Nanogen version

      `,
  {
    importMeta: import.meta,
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
      },
      version: {
        type: 'boolean',
        alias: 'v',
      },
      port: {
        type: 'string',
        alias: 'p',
        default: '3000',
      },
    },
  },
)
cliProcess(cli.input, cli.flags)

async function cliProcess(input, flags) {
  const prompt = input[0]

  if (prompt === 'init') {
    mantis.init()
  } else if (prompt === 'build') {
    mantis.build()
  } else if (prompt === 'serve') {
    mantis.serve(flags)
  } else {
    console.log(chalk.gray('mantis'), chalk.red('Unknown command'))
  }
  // console.log(input, flags)
}
