const { gql } = require('apollo-server');

const typeDefs = gql`
  directive @auth(permission: String) on FIELD | FIELD_DEFINITION

  type Permission {
    id: ID!
    name: String!
    roles: [ID!]
  }

  type Role {
    id: ID!
    name: String!
    permissions: [ID]
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    surname: String!
    roles: [String]
  }

  input UserInput {
    email: String!
    firstName: String!
    surname: String!
    password: String!
    roles: [ID]
  }

  type Query {
    GET_PERMISSIONS: [Permission] @auth(permission: "PERMISSIONS_ADMIN")
    GET_ROLES: [Role]
    GET_USER(id: String!): User
    GET_USERS: [User]
  }

  type Mutation {
    CREATE_PERMISSION(name: String!, roles: [ID]): Permission @auth(permission: "PERMISSIONS_ADMIN")
    CREATE_ROLE(name: String!, permissions: [ID]): Role
    CREATE_USER(data: UserInput!): User
    LOGIN(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
