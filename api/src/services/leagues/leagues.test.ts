import type { League } from '@prisma/client'

import {
  leagues,
  league,
  createLeague,
  updateLeague,
  deleteLeague,
} from './leagues'
import type { StandardScenario } from './leagues.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('leagues', () => {
  scenario('returns all leagues', async (scenario: StandardScenario) => {
    const result = await leagues()

    expect(result.length).toEqual(Object.keys(scenario.league).length)
  })

  scenario('returns a single league', async (scenario: StandardScenario) => {
    const result = await league({ id: scenario.league.one.id })

    expect(result).toEqual(scenario.league.one)
  })

  scenario('creates a league', async () => {
    const result = await createLeague({
      input: { name: 'String', description: 'String', sport: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.sport).toEqual('String')
  })

  scenario('updates a league', async (scenario: StandardScenario) => {
    const original = (await league({ id: scenario.league.one.id })) as League
    const result = await updateLeague({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a league', async (scenario: StandardScenario) => {
    const original = (await deleteLeague({
      id: scenario.league.one.id,
    })) as League
    const result = await league({ id: original.id })

    expect(result).toEqual(null)
  })
})
