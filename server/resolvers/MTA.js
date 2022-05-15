
// function station(root, { id }, { dataSources }){
//     return dataSources.tripFeed.getStationById(id)
// }

// function arrivalTimes(_, { stationId, train, direction }, { dataSources }) {
//     return dataSources.tripFeed.getArrivalTimes(stationId, train, direction)
// }

// function serviceAlert (_, { train, onlyActive }, { dataSources }) {
//     return dataSources.alertFeed.getServiceAlert(train, onlyActive)
// }

// function elevatorAlert (_, { stationId }, { dataSources }) {
//     return dataSources.elevatorFeed.getElevatorAlerts(stationId)
// }

// function stationUpdate (_, { stationId }, { dataSources }) {
//     return dataSources.tripFeed.getStationUpdate(stationId)
// }

// module.exports = {
//     station,
//     arrivalTimes,
//     serviceAlert,
//     elevatorAlert,
//     stationUpdate
// }