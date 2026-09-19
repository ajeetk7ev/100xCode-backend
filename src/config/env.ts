import dotenv from 'dotenv';
dotenv.config();



const env = {
   PORT : process.env.PORT || 8000
}

export default env;