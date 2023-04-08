import type { EditLeagueById, UpdateLeagueInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LeagueForm from 'src/components/League/LeagueForm'

export const QUERY = gql`
  query EditLeagueById($id: Int!) {
    league: league(id: $id) {
      id
      name
      description
      sport
    }
  }
`
const UPDATE_LEAGUE_MUTATION = gql`
  mutation UpdateLeagueMutation($id: Int!, $input: UpdateLeagueInput!) {
    updateLeague(id: $id, input: $input) {
      id
      name
      description
      sport
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ league }: CellSuccessProps<EditLeagueById>) => {
  const [updateLeague, { loading, error }] = useMutation(
    UPDATE_LEAGUE_MUTATION,
    {
      onCompleted: () => {
        toast.success('League updated')
        navigate(routes.leagues())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateLeagueInput,
    id: EditLeagueById['league']['id']
  ) => {
    updateLeague({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit League {league?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <LeagueForm
          league={league}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
