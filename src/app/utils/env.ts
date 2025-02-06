import { z, ZodError } from "zod";

const envSchema = z.object({
  DIRECT_URL: z.string().min(1, "DIRECT_URL is missing"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is missing"),
  DATABASE_PROVIDER: z.string().min(1, "DATABASE_PROVIDER is missing"),
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_RAWG_API_KEY: z.string().min(1, "RAWG API Key is missing"),
  SESSION_SECRET_KEY: z.string().min(1, "SESSION_SECRET_KEY is missing"),
});

let env: z.infer<typeof envSchema>; 

try {
  env = envSchema.parse(process.env); 
} catch (error: unknown) {  
  if (error instanceof ZodError) {  
    console.error("❌ Invalid environment variables:", error.format());
  } else {
    console.error("❌ Unexpected error during env validation:", error);
  }
  throw new Error("Environment validation failed. Fix your .env file."); 
}

export { env };
