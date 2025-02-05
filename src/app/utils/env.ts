
import {z} from "zod";

const envSchema = z.object({
  DATABASE_URL : z.string(),
  DATABASE_PROVIDER : z.string(),
  NODE_ENV : z.string(),
  NEXT_PUBLIC_RAWG_API_KEY : z.string(),
  SESSION_SECRET_KEY : z.string(),
});

export const env = envSchema.parse(process.env);