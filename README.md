# Mantis: Static Site Generator

# What is Mantis?

Mantis is a simple static site generator powered by [Node.js](https://nodejs.org/en/). It generates pages with [EJS](https://ejs.co/) that can be either [Markdown](https://www.markdownguide.org/), HTML or EJS themselves.

[Output example with default template](https://mantis-ssg.vercel.app/)

## Gettings Started

To install mantis run:

```
npm i mantis-ssg
```

or run the cli directly with:

```
npx mantis <command>
```

## How to create a site

To create a new site, open the folder to start your project and run:

```
mantis init
```

To build such site, run:

```
mantis build
```

If you wish to open a live server and edit the site confortably, run:

```
mantis serve
```

The just created project will have the next folder structure:

```
\site
  \assets
  \layout
  \pages
  \partials
site.config.js
```

The site.config.js should be as follows:

```
export default {
  srcPath: './site',
  destPath: './build',
  site: 'Mantis SSG',
}
```

## Commands

```
  Initialize a new site:

    mantis init

  Build site:

    mantis build

  Serve site:

    mantis build


  Options

     -p, --port <port-number>        Port to use for local server (default: 3000)
     -h, --help                      Display this help text
     -v, --version                   Display Mantis version
```
