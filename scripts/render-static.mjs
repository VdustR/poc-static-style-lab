import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(projectRoot, 'dist', 'index.html')

const server = await createServer({
  appType: 'custom',
  mode: 'production',
  root: projectRoot,
  server: {
    middlewareMode: true,
  },
})

let exitCode = 0

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const appHtml = renderToStaticMarkup(React.createElement(App))
  const indexHtml = await fs.readFile(indexPath, 'utf8')
  const staticHtml = indexHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )

  if (staticHtml === indexHtml) {
    throw new Error('Could not find the root placeholder in dist/index.html')
  }

  await fs.writeFile(indexPath, staticHtml)
} catch (error) {
  console.error(error)
  exitCode = 1
}

void server.close()
process.exit(exitCode)
