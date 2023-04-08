import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const leagues: QueryResolvers['leagues'] = () => {
  return db.league.findMany()
}

export const league: QueryResolvers['league'] = ({ id }) => {
  return db.league.findUnique({
    where: { id },
  })
}

export const createLeague: MutationResolvers['createLeague'] = ({ input }) => {
  return db.league.create({
    data: input,
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
