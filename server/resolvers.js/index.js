module.exports = {
    Query: {
        info: () => 'This is JML group MTA app',
        // feed: async (_, __, { dataSource}) => {
        //     dataSource.tripFeed.checkURL()
        // }
        feed: (_, __, { dataSources}) => dataSources.tripFeed.checkURL()
    }
}

//

// movie: async (_, { id }, { dataSources }) => {
//     return dataSources.moviesAPI.getMovie(id);
//   },

//wrap all resolver in a middleware (function) that checks authorization