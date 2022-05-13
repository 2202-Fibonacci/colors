const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Users = require("./user_data")

async function runSeed() {

    await Promise.all(
        Users.map(async (user) =>
            prisma.user.upsert({
                where: {id: user.id},
                update: {},
                create: user,
            })
        )
    );
}

runSeed()
    .catch((e)=>{
        console.log(e)
        process.exit(1)
    })
    .finally(async ()=>{
        console.log('Successfully seeded database')
        await prisma.$disconnect()
    })