const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function dropStations(){
    await prisma.station.deleteMany()
}

dropStations()