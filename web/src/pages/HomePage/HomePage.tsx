import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import LeaguesCell from 'src/components/LeaguesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <LeaguesCell />
    </>
  )
}

export default HomePage
