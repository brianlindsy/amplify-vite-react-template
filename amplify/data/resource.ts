import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Server: a
    .model({
      configuration: a.json(),
      baseUrl: a.string(), // name = Test FHIR Server baseUrl = chinotechnologies.com/test-fhir-server
      publicIP: a.string(), // ECS Task Public IP
      encoding: a.string().required(), // XML or JSON
      version: a.string().required(), // R4 (4.0.1)
      implementationGuide: a.string(), // US CORE 4.0.0
      implementationGuideVersion: a.string(), // 4.0.0
      userEmail: a.email(),
      name: a.string().required(), // Test FHIR Server
      description: a.string(),
      ecsTaskName: a.string(), // ECS Task Name
      serverStatus: a.string(),
      insertTestPatients: a.string(),
    })
  .authorization(allow => [allow.owner()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});