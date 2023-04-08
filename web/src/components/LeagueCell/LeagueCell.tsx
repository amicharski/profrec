import type { FindLeagueQuery, FindLeagueQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LeagueInfo from 'src/components/League/LeagueInfo'

export const QUERY = gql`
  query FindLeagueQuery($id: Int!) {
    league: league(id: $id) {
      id
      name
      description
      sport
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindLeagueQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  league,
}: CellSuccessProps<FindLeagueQuery, FindLeagueQueryVariables>) => {
  return <LeagueInfo league={league} />
}
