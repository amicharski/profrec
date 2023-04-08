import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LeagueForm from 'src/components/League/LeagueForm'

import type { CreateLeagueInput } from 'types/graphql'

const CREATE_LEAGUE_MUTATION = gql`
  mutation CreateLeagueMutation($input: CreateLeagueInput!) {
    createLeague(input: $input) {
      id
    }
  }
`

const NewLeague = () => {
  const [createLeague, { loading, error }] = useMutation(
    CREATE_LEAGUE_MUTATION,
    {
      onCompleted: () => {
        toast.success('League created')
        navigate(routes.leagues())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateLeagueInput) => {
    createLeague({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New League</h2>
      </header>
      <div className="rw-segment-main">
        <LeagueForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewLeague
