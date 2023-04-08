import type { ComponentMeta } from '@storybook/react'

import NewLeaguePage from './NewLeaguePage'

export const generated = () => {
  return <NewLeaguePage />
}

export default {
  title: 'Pages/NewLeaguePage',
  component: NewLeaguePage,
} as ComponentMeta<typeof NewLeaguePage>
