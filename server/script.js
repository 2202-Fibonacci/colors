const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main(){
    // const newUser = await prisma.create()
    
    const newComment = await prisma.comment.create({
        data: {
            text: 'stinky train',
        },
    })


    const allComments = await prisma.comment.findMany()
    // const allUsers = await prisma.comment.findMany()
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