import { defineFunction } from '@aws-amplify/backend';

export const handleEc2 = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'handle-ec2',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts'
});