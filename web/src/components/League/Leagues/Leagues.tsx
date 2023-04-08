import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/League/LeaguesCell'
import { truncate } from 'src/lib/formatters'

import type { DeleteLeagueMutationVariables, FindLeagues } from 'types/graphql'

const DELETE_LEAGUE_MUTATION = gql`
  mutation DeleteLeagueMutation($id: Int!) {
    deleteLeague(id: $id) {
      id
    }
  }
`

const LeaguesList = ({ leagues }: FindLeagues) => {
  const [deleteLeague] = useMutation(DELETE_LEAGUE_MUTATION, {
    onCompleted: () => {
      toast.success('League deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteLeagueMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete league ' + id + '?')) {
      deleteLeague({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Sport</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => (
            <tr key={league.id}>
              <td>{truncate(league.id)}</td>
              <td>{truncate(league.name)}</td>
              <td>{truncate(league.description)}</td>
              <td>{truncate(league.sport)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.league({ id: league.id })}
                    title={'Show league ' + league.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editLeague({ id: league.id })}
                    title={'Edit league ' + league.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete league ' + league.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(league.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaguesList
