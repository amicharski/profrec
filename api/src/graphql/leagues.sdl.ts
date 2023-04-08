export const schema = gql`
  type League {
    id: Int!
    name: String!
    description: String!
    sport: String!
  }

  type Query {
    leagues: [League!]! @requireAuth
    league(id: Int!): League @requireAuth
  }

  input CreateLeagueInput {
    name: String!
    description: String!
    sport: String!
  }

  input UpdateLeagueInput {
    name: String
    description: String
    sport: String
  }

  type Mutation {
    createLeague(input: CreateLeagueInput!): League! @requireAuth
    updateLeague(id: Int!, input: UpdateLeagueInput!): League! @requireAuth
    deleteLeague(id: Int!): League! @requireAuth
  }
`
