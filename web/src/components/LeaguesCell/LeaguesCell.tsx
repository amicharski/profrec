import type { LeaguesQuery } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query LeaguesQuery {
    leagues {
      id
      name
      description
      sport
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ leagues }: CellSuccessProps<LeaguesQuery>) => {
  const details = (leagueId) => {
    navigate(routes.league({ id: leagueId }))
  }

  return (
    <div className="container mx-auto rounded-md p-2 dark:bg-gray-900 dark:text-gray-100 sm:p-4">
      <h2 className="mb-3 text-2xl font-semibold leading-tight">Leagues</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="rounded-t-lg dark:bg-gray-700">
            <tr className="text-right">
              <th title="ID" className="p-3 text-left">
                #
              </th>
              <th title="League name" className="p-3 text-left">
                Name
              </th>
              <th title="League description" className="p-3 text-left">
                Description
              </th>
              <th title="League sport" className="p-3 text-left">
                Sport
              </th>
              <th title="League details" className="p-3 text-left">
                League Details
              </th>
            </tr>
          </thead>
          <tbody>
            {leagues.map((league) => {
              return (
                <tr
                  key={league.id}
                  className="border-b border-opacity-20 text-right dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-3 py-2 text-left">{league.id}</td>
                  <td className="px-3 py-2 text-left">{league.name}</td>
                  <td className="px-3 py-2 text-left">{league.description}</td>
                  <td className="px-3 py-2 text-left">
                    {league.sport.substring(0, 1) +
                      league.sport.substring(1).toLowerCase()}
                  </td>
                  <td className="px-3 py-2 text-left">
                    {/* <Link to={routes.league({ id: league.id })}>


                    This button may do something other than navigate to another page


                    */}
                    <button
                      type="button"
                      className="hidden rounded px-6 py-2 font-semibold dark:bg-primary dark:text-gray-800 lg:block"
                      onClick={() => details(league.id)}
                    >
                      Details
                    </button>
                    {/* </Link> */}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
