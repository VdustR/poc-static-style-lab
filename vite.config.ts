import react from '@vitejs/plugin-react'
import * as stylexVite from '@stylexjs/unplugin/vite'
import { createHighlighter } from 'shiki'
import { defineConfig, type Plugin } from 'vite'
import { compositionPanels, cookbookExamples } from './src/content.ts'

type StylexVitePlugin = (options?: {
  dev?: boolean
  devMode?: 'full' | 'css-only' | 'off'
  useCSSLayers?: boolean
}) => Plugin

const stylex = stylexVite.default as unknown as StylexVitePlugin
const highlightedCodeVirtualModuleId = 'virtual:highlighted-code'
const resolvedHighlightedCodeVirtualModuleId = `\0${highlightedCodeVirtualModuleId}`

function highlightedCodePlugin(): Plugin {
  let highlightedCodeModule: Promise<string> | undefined

  async function buildHighlightedCodeModule() {
    const highlighter = await createHighlighter({
      themes: ['github-dark'],
      langs: ['tsx'],
    })
    const snippets = new Set([
      ...compositionPanels.map((panel) => panel.snippet),
      ...cookbookExamples.flatMap((entry) => entry.examples.map((example) => example.code)),
    ])
    const highlightedCode = Object.fromEntries(
      Array.from(snippets, (code) => [
        code,
        highlighter.codeToHtml(code, {
          lang: 'tsx',
          theme: 'github-dark',
        }),
      ]),
    )

    return `export const highlightedCode = ${JSON.stringify(highlightedCode)};`
  }

  return {
    name: 'highlighted-code',
    resolveId(id) {
      if (id === highlightedCodeVirtualModuleId) {
        return resolvedHighlightedCodeVirtualModuleId
      }
    },
    load(id) {
      if (id !== resolvedHighlightedCodeVirtualModuleId) {
        return
      }

      highlightedCodeModule ??= buildHighlightedCodeModule()
      return highlightedCodeModule
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/poc-static-style-lab/',
  plugins: [
    highlightedCodePlugin(),
    stylex({
      dev: process.env.NODE_ENV === 'development',
      devMode: 'full',
      useCSSLayers: true,
    }),
    react(),
  ],
})
