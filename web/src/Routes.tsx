// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import StandardLayout from './layouts/StandardLayout/StandardLayout'
import LeaguePage from './pages/League/LeaguePage/LeaguePage'
import LeaguesPage from './pages/League/LeaguesPage/LeaguesPage'

const Routes = () => {
  return (
    <Router>
      <Route path="/new-league" page={NewLeaguePage} name="newLeague" />
      <Set wrap={ScaffoldLayout} title="Leagues" titleTo="leagues" buttonLabel="New League" buttonTo="newLeague">
        {/* <Route path="/leagues/new" page={LeagueNewLeaguePage} name="newLeague" /> */}
        <Route path="/leagues/{id:Int}/edit" page={LeagueEditLeaguePage} name="editLeague" />
        {/* <Route path="/leagues/{id:Int}" page={LeagueLeaguePage} name="league" />
        <Route path="/leagues" page={LeagueLeaguesPage} name="leagues" /> */}
      </Set>
      <Set wrap={StandardLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/leagues" page={LeaguesPage} name="leagues" />
        <Route path="/leagues/new" page={NewLeaguePage} name="newLeague" />
        <Route path="/league/{id:Int}" page={LeaguePage} name="league" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
