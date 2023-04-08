import { MetaTags } from '@redwoodjs/web'

import LeagueCell from 'src/components/LeagueCell'

interface Props {
  id: number
}

const LeaguePage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="League" description="League page" />

      <LeagueCell id={id} />
    </>
  )
}

export default LeaguePage
