export type DemoTool = 'vanilla-extract' | 'StyleX' | 'Pigment CSS' | 'Emotion'
export type DemoDensity = 'comfortable' | 'compact'

export type DemoState = {
  demoTool: DemoTool
  isDanger: boolean
  callerOverride: boolean
  density: DemoDensity
  brandColor: string
  tokenColor: string
}

export const demoTools: DemoTool[] = ['vanilla-extract', 'StyleX', 'Pigment CSS', 'Emotion']

export const themeTokens = [
  { name: 'Blue token', color: '#3367a6' },
  { name: 'Teal token', color: '#16816d' },
  { name: 'Orange token', color: '#b4662b' },
]

export const initialDemoState: DemoState = {
  demoTool: 'StyleX',
  isDanger: true,
  callerOverride: true,
  density: 'compact',
  brandColor: '#7c3aed',
  tokenColor: themeTokens[0].color,
}

export function getDemoModel(state: DemoState) {
  const dynamicTokenName =
    themeTokens.find((token) => token.color === state.tokenColor)?.name ?? 'Custom token'
  const canCallerWin = state.demoTool !== 'vanilla-extract' && state.callerOverride
  const demoPadding =
    state.density === 'compact' && (state.demoTool !== 'vanilla-extract' || state.callerOverride)
      ? 12
      : 20
  const demoBorder = canCallerWin
    ? state.brandColor
    : state.isDanger
      ? '#b4662b'
      : '#ded7cc'
  const demoBackground = state.isDanger ? '#fbefe0' : '#fffdf8'
  const demoWinner = canCallerWin
    ? state.demoTool === 'Pigment CSS'
      ? 'Extractable sx override wins'
      : 'Caller override wins'
    : state.isDanger
      ? 'Danger variant wins'
      : 'Base style wins'
  const demoNote =
    state.demoTool === 'vanilla-extract'
      ? 'The static variant is stable. A caller override needs a named variant, a wrapper, or a class-order convention.'
      : state.demoTool === 'StyleX'
        ? 'The component default can be applied first, then the caller style last. The callsite makes the winner visible.'
        : state.demoTool === 'Pigment CSS'
          ? 'sx and variants feel familiar to MUI teams, but runtime-dependent values must move through CSS variables or inline style wrappers.'
          : 'The array or cx order makes the winner visible, while Emotion generates and inserts styles at runtime.'
  const demoAnalogy =
    state.demoTool === 'vanilla-extract'
      ? 'Think of this like a printed uniform rulebook. It is excellent when the approved outfits are known, but a random last-minute request must become an official rule before it is safe.'
      : state.demoTool === 'StyleX'
        ? 'Think of this like transparent labels on one box. If two labels both say border color, StyleX keeps the later label for that one property without making new CSS.'
        : state.demoTool === 'Pigment CSS'
          ? 'Think of this like turning familiar MUI sx notes into printed instructions. It feels familiar, but only notes the build can understand become static CSS.'
          : 'Think of this like a chef cooking on demand. The last instruction is easy to honor, but the browser does more work while the page is running.'
  const demoMechanic = canCallerWin
    ? `The caller override is on, so the preview uses the caller color (${state.brandColor}) for the final border.`
    : state.isDanger
      ? 'The danger variant is the strongest active instruction, so the preview keeps the warning-colored border.'
      : 'No stronger instruction is active, so the preview falls back to the base card style.'
  const demoProblem =
    state.demoTool === 'vanilla-extract'
      ? 'Risk: too many one-off requests can turn into too many variants, wrappers, or CSS-order conventions.'
      : state.demoTool === 'StyleX'
        ? 'Risk: the override model is strong, but authoring must stay inside StyleX compiler rules and supported dynamic patterns.'
        : state.demoTool === 'Pigment CSS'
          ? 'Risk: MUI-like ergonomics are useful, but unsupported runtime shapes need CSS variables or wrappers, and the project status is still cautious.'
          : 'Risk: composition is flexible, but the page pays with runtime style generation, style insertion, and more client-side work.'

  return {
    dynamicTokenName,
    canCallerWin,
    demoPadding,
    demoBorder,
    demoBackground,
    demoWinner,
    demoNote,
    demoAnalogy,
    demoMechanic,
    demoProblem,
  }
}
