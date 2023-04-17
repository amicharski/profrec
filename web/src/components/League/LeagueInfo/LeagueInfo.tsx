import type { League } from 'types/graphql'

import { Link } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
interface Props {
  league: League
}

const LeagueInfo = ({ league }: Props) => {
  const { currentUser } = useAuth()
  console.log(`currentUser: ${JSON.stringify(currentUser)}`)
  console.log(`league.user: ${JSON.stringify(league)}`)
  return (
    <div className="mx-auto max-w-2xl space-y-12 px-6 py-24 dark:text-gray-50">
      <div className="mx-auto w-full space-y-4 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          {league.name}
        </h1>
        {currentUser === league.user ? (
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
        <Link
          rel="noopener noreferrer"
          to="/"
          className="flex flex-shrink-0 items-center space-x-2 rounded-t-lg border border-b-0 px-5 py-3 dark:border-gray-400 dark:text-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <span>Staff</span>
        </Link>
        <Link
          rel="noopener noreferrer"
          to="/"
          className="flex flex-shrink-0 items-center space-x-2 rounded-t-lg border border-b-0 px-5 py-3 dark:border-gray-400 dark:text-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>

          <span>Teams</span>
        </Link>
      </div>
      <div>
        <p>{league.description}</p>
      </div>
    </div>
  )
}

export default LeagueInfo
