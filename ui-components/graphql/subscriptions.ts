/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateServer = /* GraphQL */ `
  subscription OnCreateServer(
    $filter: ModelSubscriptionServerFilterInput
    $owner: String
  ) {
    onCreateServer(filter: $filter, owner: $owner) {
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
      serverStatus
      updatedAt
      userEmail
      version
      __typename
    }
  }
`;
export const onDeleteServer = /* GraphQL */ `
  subscription OnDeleteServer(
    $filter: ModelSubscriptionServerFilterInput
    $owner: String
  ) {
    onDeleteServer(filter: $filter, owner: $owner) {
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
      serverStatus
      updatedAt
      userEmail
      version
      __typename
    }
  }
`;
export const onUpdateServer = /* GraphQL */ `
  subscription OnUpdateServer(
    $filter: ModelSubscriptionServerFilterInput
    $owner: String
  ) {
    onUpdateServer(filter: $filter, owner: $owner) {
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
      serverStatus
      updatedAt
      userEmail
      version
      __typename
    }
  }
`;
