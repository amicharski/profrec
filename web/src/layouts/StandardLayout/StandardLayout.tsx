/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import { NavLink, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type StandardLayoutProps = {
  children?: React.ReactNode
}

const StandardLayout = ({ children }: StandardLayoutProps) => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <div className="h-screen w-screen bg-slate-800 p-9 text-slate-300">
      <header className="p-4 dark:bg-slate-800 dark:text-slate-100">
        <div className="container mx-auto flex h-16 justify-between">
          <ul className="hidden items-stretch space-x-3 lg:flex">
            <li className="flex">
              <NavLink
                rel="noopener noreferrer"
                className="-mb-1 flex items-center border-b-2 px-4 dark:border-transparent"
                to={routes.home()}
                activeClassName="dark:text-primary"
              >
                Home
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                rel="noopener noreferrer"
                href="/"
                className="-mb-1 flex items-center border-b-2 px-4 dark:border-transparent"
                to={routes.leagues()}
                activeClassName="dark:text-primary"
              >
                Leagues
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center md:space-x-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  title="Search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="h-4 w-4 dark:text-gray-100"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="Search"
                placeholder="Search..."
                className="w-32 rounded-md py-2 pl-10 text-sm focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 sm:w-auto"
              />
            </div>
            {isAuthenticated ? (
              <>
                <a href="/leagues/new">
                  <button
                    type="button"
                    className="dark:bg-primary hidden rounded px-6 py-2 font-semibold dark:text-gray-900 lg:block"
                  >
                    Create new league
                  </button>
                </a>
              </>
            ) : (
              <a href="/login">
                <button
                  type="button"
                  className="dark:bg-primary hidden rounded px-6 py-2 font-semibold dark:text-gray-900 lg:block"
                >
                  Log in
                </button>
              </a>
            )}
          </div>
          <button title="Open menu" type="button" className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
      {children}
    </div>
  )
}

export default StandardLayout
