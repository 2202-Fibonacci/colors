const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main(){
    const newUser = await prisma.create()
    const newComment = await prisma.create()
    const allComments = await prisma.user.findMany()
    console.log('connected to prisma')
    console.log(allComments)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async ()=>{
        await prisma.$disconnect()
    })