import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:1JmRqyAi8upN@ep-patient-hill-a5ufkdcg.us-east-2.aws.neon.tech/short-video-generator?sslmode=require",
    }
});