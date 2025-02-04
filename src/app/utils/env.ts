
import {z} from "zod";

const envSchema = z.object({
  DATABASE_URL : z.string().url(),
  // NEXT_PUBLIC_Twitch_API_ID : z.string(),
  // TWITCH_SECRET_API_KEY : z.string(),
  NEXT_PUBLIC_RAWG_API_KEY : z.string(),
  SESSION_SECRET_KEY : z.string(),
});

export const env = envSchema.parse(process.env);