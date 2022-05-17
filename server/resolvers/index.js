const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

module.exports = {
  Query: {
    info: () => "This is JML group MTA app",
    station: (root, { id }, { dataSources }) =>
      dataSources.tripFeed.getStationById(id),
    arrivalTimes: async (_, { stationId, train, direction }, { dataSources }) =>
      await dataSources.tripFeed.getArrivalTimes(stationId, train, direction),
    serviceAlert: async (_, { train, onlyActive }, { dataSources }) =>
      await dataSources.alertFeed.getServiceAlert(train, onlyActive),
    elevatorAlert: async (_, { stationId }, { dataSources }) =>
      await dataSources.elevatorFeed.getElevatorAlerts(stationId),
    stationUpdate: async (_, { stationId }, { dataSources }) =>
      await dataSources.tripFeed.getStationUpdate(stationId),
    commentFeed: async (root, args, context) =>   
      await context.prisma.comment.findMany(),
  },
  Mutation: {
    signup: async (parent, args, context) => {
      console.log(args.username)
      const password = await bcrypt.hash(args.password, 10)
      const user = await context.prisma.user.create({ data: { ...args, password } })
      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      return {
        token,
        user,
      }
    },
    login: async (parent, args, context) => {
      const user = await context.prisma.user.findUnique({ where: { email: args.email } })
      if (!user) {
        throw new Error('No such user found')
      }
      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }
      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      return {
        token,
        user,
      }
    },
    post: async (root, args, context) => {
      const { userId } = context;
      return await context.prisma.comment.create({
          data: {
              text: args.text,
              postedBy: { connect: { id: userId }}
          }
      })
    }
  }
}




// const Query = require('./Query')
// const Mutation = require('./Mutation')
// const User = require('./User')
// const Comment = require('./Comment')


// module.exports = {
//   Query,
//   Mutation,
//   User,
//   Comment
// }