import dotenv from 'dotenv';
dotenv.config();



const env = {
   PORT : process.env.PORT || 8000,
   DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/100xcode"
}

export default env;