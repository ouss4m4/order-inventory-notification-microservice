import { PrismaClient } from "../prismadb";

const db = new PrismaClient();

export { db };
