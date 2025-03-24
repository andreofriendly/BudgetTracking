import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';

config({path:".env"})

const db = drizzle(process.env.DATABASE_URL!);
