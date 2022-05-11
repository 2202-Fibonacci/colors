// const allStations = require("../../MTA/stations_test")

module.exports = {
  Query: {
    info: () => "This is JML group MTA app",
    station: (root, { id }, { dataSources }) =>
      dataSources.tripFeed.getStationById(id),
    arrivalTimes: async (_, { stationId, train, direction }, { dataSources }) =>
      await dataSources.tripFeed.getArrivalTimes(stationId, train, direction),
    // stations: (root, _, {allStations}) => allStations
  },
  Station: {
    // name: (root) => root.name,
    lat: (root) => root.lat,
    long: (root) => root.long,
    accessible: (root) => root.accessible,
    trainLines: (root) => root.trainLines,
    // trainLines: ({id}, _, {dataSources}) => dataSources.tripFeed.getTrainsbyStation(id),
    name: async ({ id }, _, { dataSources }) => {
      const { name } = await dataSources.tripFeed.getStationById(id);
      return name;
    },
    // trainLines: async({ id }) => {
    //     const { trainLines } = await dataSources.tripFeed.getStationTrains(id);
    // },
    // lat: async({ id }) => {
    //     const { trainLines } = await dataSources.tripFeed.getStation(id);
    //     return trainLines;
    // },
    // long: async({ id }) => {
    //     const { trainLines } = await dataSources.tripFeed.getStation(id);
    //     return trainLines;
    // },
    // borough: async({ id }) => {
    //     const { trainLines } = await dataSources.tripFeed.getStation(id);
    //     return trainLines;
    // },
    // accessible: async({ id }) => {
    //     const { trainLines } = await dataSources.tripFeed.getStation(id);
    //     return trainLines;
    // }
  },

  // Train: {
  //     name: (_, {id}, {dataSources}) => dataSources.tripFeed.getTrainsbyStation(id),
  //     }
};

//

// movie: async (_, { id }, { dataSources }) => {
//     return dataSources.moviesAPI.getMovie(id);
//   },

//wrap all resolver in a middleware (function) that checks authorization

// feed: async (_, __, { dataSource}) => {
//     dataSource.tripFeed.checkURL()
// }

// feed: (_, __, { dataSources}) => dataSources.tripFeed.checkURL(),
// trainFeed:(_, {train}, { dataSources}) => dataSources.tripFeed.getStatusFeed(train),
// arrivalTimes: (_, {stationId, train, direction}, { dataSources}) => dataSources.tripFeed.getArrivalTimes(stationId, train, direction),
// stationInfoById:(_, {stationId}, {dataSources}) => dataSources.tripFeed.getStationById(stationId),
// stationInfoByName:(_, {stationName}, {dataSources}) => dataSources.tripFeed.getStationByName(stationName),
// stationInfoByLatAndLong:(_, {lat, long}, {dataSources}) => dataSources.tripFeed.getStationByLatAndLong(lat, long),
