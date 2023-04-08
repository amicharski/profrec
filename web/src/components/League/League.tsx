import type { League } from 'types/graphql'

interface Props {
  league: League
}

const League = ({ league }: Props) => {
  return <>{JSON.stringify(league)}</>
}

export { League }
