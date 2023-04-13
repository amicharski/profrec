import { getCurrentUser } from 'api/src/lib/auth'
import type { League } from 'types/graphql'

import { Link } from '@redwoodjs/router'

interface Props {
  league: League
}

const LeagueInfo = ({ league }: Props) => {
  return (
    <div className="mx-auto max-w-2xl space-y-12 px-6 py-24 dark:text-gray-50">
      <div className="mx-auto w-full space-y-4 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          {league.name}
        </h1>
        {getCurrentUser.id === league.user ? (
          <button className="align-center hidden rounded px-6 py-2 font-semibold dark:bg-primary dark:text-gray-900 lg:block">
            Edit League
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="-mx-4 flex flex-nowrap items-center overflow-x-auto overflow-y-hidden dark:text-gray-100 sm:justify-center">
        <Link
          rel="noopener noreferrer"
          to="/"
          className="flex flex-shrink-0 items-center space-x-2 rounded-t-lg border border-b-0 px-5 py-3 dark:border-gray-400 dark:text-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>General Information</span>
        </Link>
      </div>
      <div>
        <p>{league.description}</p>
      </div>
    </div>
  )
}

export default LeagueInfo
