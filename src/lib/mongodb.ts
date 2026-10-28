import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "linknamu";

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local");
  }

  if (!clientPromise) {
    // Reuse the client across hot-reloads in dev and across invocations
    // in serverless environments to avoid exhausting connections.
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (process.env.NODE_ENV === "development") {
      if (!globalWithMongo._mongoClientPromise) {
        globalWithMongo._mongoClientPromise = new MongoClient(uri).connect();
      }
      clientPromise = globalWithMongo._mongoClientPromise;
    } else {
      clientPromise = new MongoClient(uri).connect();
    }
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
