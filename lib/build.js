import { fileURLToPath } from 'url'
import chalk from 'chalk'
import fse from 'fs-extra'
import path from 'path'
import fm from 'front-matter'
import { globSync } from 'glob'
import { marked } from 'marked'
import ejs from 'ejs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function build() {
  console.log(chalk.bold.white('Building site...'))

  // Get site config file
  const configPath = path
    .relative(__dirname, 'site.config.js')
    .replace(/\\/g, '/')
  let config = await import(configPath)
  config = JSON.parse(JSON.stringify(config)).default
  const srcPath = config.srcPath
  const destPath = config.destPath
  const site = config.site

  fse.emptyDirSync(destPath)

  if (fse.existsSync(`${srcPath}/assets`)) {
    fse.copySync(`${srcPath}/assets`, `${destPath}/assets`)
  }

  //Get files names, recursive
  const files = globSync('**/*.@(md|ejs|html)', { cwd: `${srcPath}/pages` })

  files.forEach(file => buildPage(file, { srcPath, destPath }))

  function buildPage(file, { srcPath, destPath }) {
    const fileData = path.parse(file)
    let fileDir = path.join(destPath, fileData.dir)

    // Create page directories, if needed
    if (fileData.name !== 'index') {
      fileDir = path.join(fileDir, fileData.name)
    }
    fse.mkdirsSync(fileDir)

    // Read page's data with front matter
    const data = fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8')
    const pageData = fm(data)

    // Render page content
    let pageContent
    const templateConfig = {
      site,
      page: pageData.attributes,
    }
    let slug = file.split(path.sep).join('-')

    switch (fileData.ext) {
      case '.md':
        pageContent = marked(pageData.body)
        break
      case '.ejs':
        pageContent = ejs.render(pageData.body, templateConfig, {
          filename: `${srcPath}/page-${slug}`,
        })
      default:
        pageContent = pageData.body
        break
    }

    // Layout with page content
    const layoutName = pageData.attributes.layout || 'default'
    const layout = buildLayout(layoutName, srcPath)

    const renderedPage = ejs.render(
      layout,
      Object.assign({}, templateConfig, {
        body: pageContent,
        filename: `${srcPath}/layout-${layoutName}`,
      }),
    )
    fse.writeFileSync(`${fileDir}/index.html`, renderedPage)
  }

  function buildLayout(layout, srcPath) {
    const file = `${srcPath}/layout/${layout}.ejs`
    const fileData = fse.readFileSync(file, 'utf-8')
    return fileData
  }
}
