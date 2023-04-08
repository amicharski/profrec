import type { FindLeagues } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Leagues from 'src/components/League/Leagues'

export const QUERY = gql`
  query FindLeagues {
    leagues {
      id
      name
      description
      sport
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No leagues yet. '}
      <Link to={routes.newLeague()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ leagues }: CellSuccessProps<FindLeagues>) => {
  return <Leagues leagues={leagues} />
}
