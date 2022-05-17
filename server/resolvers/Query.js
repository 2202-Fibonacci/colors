function  commentFeed (root, args, context)  {
    return context.prisma.comment.findMany()
}

function arrivalTimes (_, { stationId, train, direction }, { dataSources }) {
     return dataSources.tripFeed.getArrivalTimes(stationId, train, direction)
}
module.exports = {
    commentFeed,
    arrivalTimes,
}