import './index.css'
import './pageStyles.stylex'
import { attachLiveDemo } from './liveDemo'

async function renderDevFallback() {
  const root = document.getElementById('root')

  if (root === null || root.childElementCount > 0) {
    return
  }

  const [{ StrictMode, createElement }, { createRoot }, { default: App }] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('./App.tsx'),
  ])

  createRoot(root).render(createElement(StrictMode, null, createElement(App)))
}

async function waitForLiveDemo() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (document.querySelector('[data-live-demo]') !== null) {
      return
    }

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve())
    })
  }
}

async function start() {
  if (import.meta.env.DEV) {
    void import('virtual:stylex:runtime')
    await renderDevFallback()
    await waitForLiveDemo()
  }

  attachLiveDemo()
}

void start()
