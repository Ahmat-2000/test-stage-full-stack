/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
require("dotenv").config();

const schemaPath = "prisma/schema.prisma";
let schema = fs.readFileSync(schemaPath, "utf8");
const provider = process.env.DATABASE_PROVIDER;
schema = schema.replace(/provider = ".*"/, `provider = "${provider}"`);
schema = schema.replace(/url = ".*"/, `url = "${process.env.DATABASE_URL}"`);
fs.writeFileSync(schemaPath, schema);
console.log(`✅ Prisma schema updated with provider: ${provider}`);

