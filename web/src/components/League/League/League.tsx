import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteLeagueMutationVariables,
  FindLeagueById,
} from 'types/graphql'

const DELETE_LEAGUE_MUTATION = gql`
  mutation DeleteLeagueMutation($id: Int!) {
    deleteLeague(id: $id) {
      id
    }
  }
`

interface Props {
  league: NonNullable<FindLeagueById['league']>
}

const League = ({ league }: Props) => {
  const [deleteLeague] = useMutation(DELETE_LEAGUE_MUTATION, {
    onCompleted: () => {
      toast.success('League deleted')
      navigate(routes.leagues())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteLeagueMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete league ' + id + '?')) {
      deleteLeague({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            League {league.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{league.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{league.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{league.description}</td>
            </tr>
            <tr>
              <th>Sport</th>
              <td>
                {league.sport.substring(0, 1) +
                  league.sport.substring(1).toLowerCase()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editLeague({ id: league.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(league.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default League
