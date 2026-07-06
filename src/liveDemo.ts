import {
  getDemoModel,
  initialDemoState,
  themeTokens,
  type DemoDensity,
  type DemoTool,
} from './demoModel'

function queryInput(root: ParentNode, selector: string) {
  return root.querySelector<HTMLInputElement>(selector)
}

function queryText(root: ParentNode, selector: string) {
  return root.querySelector<HTMLElement>(selector)
}

function setStackActive(element: HTMLElement | null, active: boolean) {
  if (element === null) {
    return
  }

  element.style.borderStyle = active ? 'solid' : 'dashed'
  element.style.borderLeftWidth = active ? '6px' : '1px'
  element.style.borderLeftColor = active ? 'var(--accent)' : 'var(--line-strong)'
  element.style.color = active ? 'var(--ink)' : 'var(--muted)'
  element.style.backgroundColor = active ? 'var(--surface)' : 'rgba(255, 253, 248, 0.58)'
}

export function attachLiveDemo() {
  const demo = document.querySelector<HTMLElement>('[data-live-demo]')

  if (demo === null) {
    return
  }

  const demoRoot = demo
  let brandColor =
    queryInput(demoRoot, '[data-demo-brand-color]')?.value ?? initialDemoState.brandColor

  function readState() {
    const selectedTool = queryInput(demoRoot, '[data-demo-tool]:checked')?.dataset
      .demoTool as DemoTool | undefined
    const selectedDensity = queryInput(demoRoot, '[data-demo-density]:checked')?.dataset
      .demoDensity as DemoDensity | undefined
    const selectedToken = demoRoot.querySelector<HTMLSelectElement>('[data-demo-token-color]')
      ?.value

    return {
      demoTool: selectedTool ?? initialDemoState.demoTool,
      isDanger: queryInput(demoRoot, '[data-demo-danger]')?.checked ?? initialDemoState.isDanger,
      callerOverride:
        queryInput(demoRoot, '[data-demo-caller-override]')?.checked ??
        initialDemoState.callerOverride,
      density: selectedDensity ?? initialDemoState.density,
      brandColor,
      tokenColor: selectedToken ?? initialDemoState.tokenColor,
    }
  }

  function render() {
    const state = readState()
    const model = getDemoModel(state)

    for (const input of demoRoot.querySelectorAll<HTMLInputElement>('[data-demo-brand-color]')) {
      if (input.value !== state.brandColor) {
        input.value = state.brandColor
      }
    }

    const winner = queryText(demoRoot, '[data-demo-winner]')
    if (winner !== null) {
      winner.textContent = model.demoWinner
    }

    const note = queryText(demoRoot, '[data-demo-note]')
    if (note !== null) {
      note.textContent = model.demoNote
    }

    const card = queryText(demoRoot, '[data-demo-card]')
    if (card !== null) {
      card.style.setProperty('--demo-bg', model.demoBackground)
      card.style.setProperty('--demo-border', model.demoBorder)
      card.style.setProperty('--demo-padding', `${model.demoPadding}px`)
    }

    setStackActive(queryText(demoRoot, '[data-stack-item="danger"]'), state.isDanger)
    setStackActive(
      queryText(demoRoot, '[data-stack-item="density"]'),
      state.density === 'compact',
    )
    setStackActive(
      queryText(demoRoot, '[data-stack-item="caller-override"]'),
      state.callerOverride,
    )

    const tokenLabel = queryText(demoRoot, '[data-token-name]')
    if (tokenLabel !== null) {
      tokenLabel.textContent =
        themeTokens.find((token) => token.color === state.tokenColor)?.name ?? 'Custom token'
    }

    const tokenPreview = queryText(demoRoot, '[data-token-preview]')
    if (tokenPreview !== null) {
      tokenPreview.style.setProperty('--demo-border', state.tokenColor)
    }

    for (const preview of demoRoot.querySelectorAll<HTMLElement>('[data-brand-preview]')) {
      preview.style.setProperty('--demo-border', state.brandColor)
    }
  }

  demoRoot.addEventListener('input', (event) => {
    const target = event.target
    if (target instanceof HTMLInputElement && target.matches('[data-demo-brand-color]')) {
      brandColor = target.value
    }
    render()
  })

  demoRoot.addEventListener('change', (event) => {
    const target = event.target
    if (target instanceof HTMLInputElement && target.matches('[data-demo-brand-color]')) {
      brandColor = target.value
    }
    render()
  })

  render()
}
