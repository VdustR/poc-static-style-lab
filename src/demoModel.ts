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

  return {
    dynamicTokenName,
    canCallerWin,
    demoPadding,
    demoBorder,
    demoBackground,
    demoWinner,
    demoNote,
  }
}
