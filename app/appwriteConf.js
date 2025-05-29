import { Client, Databases, ID } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !project) {
  throw new Error('Missing Appwrite environment variables!');
}

const client = new Client();

client.setEndpoint(endpoint).setProject(project);

const databases = new Databases(client);

export { databases, ID };
