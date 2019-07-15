const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    surname: String!
  }

  input UserInput {
    email: String!
    firstName: String!
    surname: String!
    password: String!
  }

  type Query {
    GET_USER(id: String!): User
  }

  type Mutation {
    CREATE_USER(data: UserInput!): User
  }
`;

module.exports = typeDefs;
