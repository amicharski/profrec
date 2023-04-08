import type { League } from 'types/graphql'

interface Props {
  league: League
}

const LeagueInfo = ({ league }: Props) => {
  return <>{JSON.stringify(league)}</>
}

export default LeagueInfo
