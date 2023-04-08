import EditLeagueCell from 'src/components/League/EditLeagueCell'

type LeaguePageProps = {
  id: number
}

const EditLeaguePage = ({ id }: LeaguePageProps) => {
  return <EditLeagueCell id={id} />
}

export default EditLeaguePage
