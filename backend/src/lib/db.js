import {PrismaClient} from "@prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config({
    path: resolve(dirname(fileURLToPath(import.meta.url)), "../../.env"),
});

const databaseUrl = new URL(process.env.DATABASE_URL);
databaseUrl.searchParams.set("sslmode", "verify-full");

const adapter=new PrismaPg({
    connectionString: databaseUrl.toString(),
})
const globalForPrisma=global
const prisma=globalForPrisma.prisma ||new PrismaClient({adapter})

if(process.env.NODE_ENV!=="production") globalForPrisma.prisma=prisma

export  {prisma}