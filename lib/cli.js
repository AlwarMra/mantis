#!/usr/bin/env node
import meow from 'meow'
import chalk from 'chalk'
import init from './init.js'

// const cliProcess = require('./modules/cli-process');

const cli = meow(
  `
    ${chalk.yellow('Initialize a new site:')}

      ${chalk.cyan('nanogen init')}

    ${chalk.underline.yellow('Options')}

      ${chalk.cyan(
        '-c, --config <file-path>',
      )}        Path to the config file (default: site.config.js)
      ${chalk.cyan(
        '-p, --port <port-number>',
      )}        Port to use for local server (default: 3000)
      ${chalk.cyan(
        '-t, --template <template-name>',
      )}  Static site template to start your project

      
      ${chalk.cyan(' -h, --help')}                Display this help text
      ${chalk.cyan(' -v, --version')}             Display Nanogen version

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
    },
  },
)
cliProcess(cli.input, cli.flags)

function cliProcess(input, flags) {
  const prompt = input[0]

  if (prompt === 'init') {
    init()
  } else {
    console.log(chalk.gray('mantis'), chalk.red('Unknown command'))
  }
  // console.log(input, flags)
}
