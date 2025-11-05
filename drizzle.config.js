import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./utils/schema.jsx",   // path to your schema file
    out: "./drizzle",                  // folder where Drizzle stores migrations
    dialect: "postgresql",             // using PostgreSQL (Neon)
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL,   // reads from your .env.local file
    },
});
