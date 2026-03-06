const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Client } = require('pg');
require('dotenv').config();

async function main() {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });
    await client.connect();
    const adapter = new PrismaPg(client);
    const prisma = new PrismaClient({ adapter });

    console.log('Fetching tasks from database...');
    const tasks = await prisma.task.findMany();
    console.log(JSON.stringify(tasks, null, 2));

    await prisma.$disconnect();
    await client.end();
}

main().catch(console.error);
