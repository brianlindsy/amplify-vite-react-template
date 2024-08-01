/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getServer = /* GraphQL */ `
  query GetServer($id: ID!) {
    getServer(id: $id) {
      baseUrl
      configuration
      createdAt
      description
      ec2Id
      encoding
      id
      name
      owner
      status
      updatedAt
      userEmail
      version
      __typename
    }
  }
`;
export const listServers = /* GraphQL */ `
  query ListServers(
    $filter: ModelServerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        baseUrl
        configuration
        createdAt
        description
        ec2Id
        encoding
        id
        name
        owner
        status
        updatedAt
        userEmail
        version
        __typename
      }
      nextToken
      __typename
    }
  }
`;
