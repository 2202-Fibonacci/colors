
module.exports = {
    Query: {
        info: () => 'This is JML group MTA app',
        station: (root, {id}, {dataSources}) => dataSources.tripFeed.getStationById(id),
        arrivalTimes: async (_, {stationId, train, direction}, { dataSources}) => await dataSources.tripFeed.getArrivalTimes(stationId, train, direction),
        serviceAlert: async (_, {train}, {dataSources}) => await dataSources.alertFeed.getServiceAlert(train),
        elevatorAlert: async (_, {stationId}, {dataSources}) => await dataSources.elevatorFeed.getElevatorAlerts(stationId)
    }
}