import chalk from 'chalk'
import liveServer from 'live-server'
import chokidar from 'chokidar'
import build from './build.js'
import path from 'path'
import debounce from 'lodash.debounce'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function serve(options) {
  console.log(
    chalk(`Starting local server at http://localhost:${options.port}`),
  )

  build()

  // Get site config file
  const configPath = path
    .relative(__dirname, 'site.config.js')
    .replace(/\\/g, '/')
  let config = await import(configPath)
  config = JSON.parse(JSON.stringify(config)).default

  liveServer.start({
    port: options.port,
    root: config.destPath,
    open: true,
    logLevel: 0,
  })

  chokidar.watch(config.srcPath, { ignoreInitial: true }).on(
    'all',
    debounce(() => {
      build()
      console.log('Waiting for changes...')
    }, 750),
  )
}
