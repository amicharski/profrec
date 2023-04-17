import type {
  QueryResolvers,
  MutationResolvers,
  LeagueRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const leagues: QueryResolvers['leagues'] = () => {
  return db.league.findMany({ include: { user: true } })
}

export const league: QueryResolvers['league'] = ({ id }) => {
  return db.league.findUnique({
    where: { id },
    include: { user: true },
  })
}

export const league: LeagueRelationResolvers = {
  user: (_obj, { root }) =>
    db.league.findUnique({ where: { id: root?.id } }).user() as Promise<User>,
}

export const createLeague: MutationResolvers['createLeague'] = ({ input }) => {
  return db.league.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updateLeague: MutationResolvers['updateLeague'] = ({
  id,
  input,
}) => {
  return db.league.update({
    data: input,
    where: { id },
  })
}

export const deleteLeague: MutationResolvers['deleteLeague'] = ({ id }) => {
  return db.league.delete({
    where: { id },
  })
}

// export const League: any = {
//   user: (_obj, { root }) => db.league.findFirst({ where: { id: root.userId } }),
// }
