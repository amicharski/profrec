import type { Prisma, League } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.LeagueCreateArgs>({
  league: {
    one: { data: { name: 'String', description: 'String', sport: 'String' } },
    two: { data: { name: 'String', description: 'String', sport: 'String' } },
  },
})

export type StandardScenario = ScenarioData<League, 'league'>
