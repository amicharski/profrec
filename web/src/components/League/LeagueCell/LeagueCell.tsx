import type { FindLeagueById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import League from 'src/components/League/League'

export const QUERY = gql`
  query FindLeagueById($id: Int!) {
    league: league(id: $id) {
      id
      name
      description
      sport
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>League not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ league }: CellSuccessProps<FindLeagueById>) => {
  return <League league={league} />
}
