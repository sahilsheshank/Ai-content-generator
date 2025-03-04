/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://codeGen_owner:nM31LtqDzHJQ@ep-aged-voice-a5twwtd7.us-east-2.aws.neon.tech/codeGen?sslmode=require',
    }
  };