import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import env from './env.ts';


const connectionString = env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is missing or undefined");
}

//1.Create a connection pool
const pool = new Pool({
  connectionString: connectionString,
});

//2.Create adapter
const adapter = new PrismaPg(pool);


//3.Create prisma client
export const prisma = new PrismaClient({ adapter });