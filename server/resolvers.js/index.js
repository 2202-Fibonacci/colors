module.exports = {
    Query: {
        info: () => 'This is JML group MTA app',
        // feed: async (_, __, { dataSource}) => {
        //     dataSource.tripFeed.checkURL()
        // }
        feed: (_, __, { dataSources}) => dataSources.tripFeed.checkURL(),
        trainFeed:(_, {train}, { dataSources}) => dataSources.tripFeed.getStatusFeed(train),
        arrivalTimes: (_, {stationId, train, direction}, { dataSources}) => dataSources.tripFeed.getArrivalTimes(stationId, train, direction),
        stationInfo:(_, {stationId}, {dataSources}) => dataSources.tripFeed.getStationById(stationId)
    }
    
}

//

// movie: async (_, { id }, { dataSources }) => {
//     return dataSources.moviesAPI.getMovie(id);
//   },

//wrap all resolver in a middleware (function) that checks authorization