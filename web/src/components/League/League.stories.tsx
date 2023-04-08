// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof League> = (args) => {
//   return <League {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import League from './League'

export const generated = () => {
  return <League />
}

export default {
  title: 'Components/League',
  component: League,
} as ComponentMeta<typeof League>
