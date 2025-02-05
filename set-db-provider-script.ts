// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const schemaPath = "prisma/schema.prisma";
let schema = fs.readFileSync(schemaPath, "utf8");
console.log(process.env.NODE_ENV );

const isProduction = process.env.NODE_ENV === "production";
const provider = isProduction ? "postgresql" : "sqlite";
const databaseUrl = isProduction ? process.env.POSTGRES_URL : "file:./dev.db";

schema = schema.replace(/provider = ".*"/, `provider = "${provider}"`);
schema = schema.replace(/url = ".*"/, `url = "${databaseUrl}"`);

fs.writeFileSync(schemaPath, schema);

console.log(`✅ Prisma schema updated with provider: ${provider}`);