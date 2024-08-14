/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createServer = /* GraphQL */ `
  mutation CreateServer(
    $condition: ModelServerConditionInput
    $input: CreateServerInput!
  ) {
    createServer(condition: $condition, input: $input) {
      baseUrl
      configuration
      createdAt
      description
      ecsTaskName
      encoding
      id
      implementationGuide
      implementationGuideVersion
      name
      owner
      publicIP
      status
      updatedAt
      userEmail
      version
      __typename
    }
  }
`;
export const deleteServer = /* GraphQL */ `
  mutation DeleteServer(
    $condition: ModelServerConditionInput
    $input: DeleteServerInput!
  ) {
    deleteServer(condition: $condition, input: $input) {
      baseUrl
      configuration
      createdAt
      description
      ecsTaskName
      encoding
      id
      implementationGuide
      implementationGuideVersion
      name
      owner
      publicIP
      status
      updatedAt
      userEmail
      version
      __typename
    }
  }
`;
export const updateServer = /* GraphQL */ `
  mutation UpdateServer(
    $condition: ModelServerConditionInput
    $input: UpdateServerInput!
  ) {
    updateServer(condition: $condition, input: $input) {
      baseUrl
      configuration
      createdAt
      description
      ecsTaskName
      encoding
      id
      implementationGuide
      implementationGuideVersion
      name
      owner
      publicIP
      status
      updatedAt
      userEmail
      version
      __typename
    }
  }
`;
