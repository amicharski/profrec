export const schema = gql`
  type User {
    username: String!
    id: Int!
  }

  type League {
    id: Int!
    name: String!
    description: String!
    sport: String!
    user: User!
  }

  type Query {
    leagues: [League!]! @skipAuth
    league(id: Int!): League @skipAuth
  }

  input CreateLeagueInput {
    name: String!
    description: String!
    sport: String!
    # userId: Int!
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
