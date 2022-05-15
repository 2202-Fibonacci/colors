//may or may not create a stations data source
function getStationById(stationId) {
  return {
    id: stationId,
    name: allStations[stationId].stop_name,
    lat: allStations[stationId].stop_lat,
    lon: allStations[stationId].stop_lon,
    borough: allStations[stationId].borough,
    accessible: allStations[stationId].accessible,
    trainLines: JSON.stringify(allStations[stationId].lines_at),
  };
}
// getTrainsByStation(stationId){
//   return {
//     trainLines: allStations[stationId].lines_at
//   }
// }
function getStationByName(stationName) {
  for (let station in allStations) {
    let stationInfo = allStations[station];
    for (let info in stationInfo) {
      let datapoint = stationInfo[info];
      if (datapoint === stationName) {
        let id = stationInfo.stop_id;
        return this.getStationById(id);
      }
    }
  }
}
function getStationByLatAndLong(lat, long) {
  for (let station in allStations) {
    let stationInfo = allStations[station];
    for (let info in stationInfo) {
      let datapoint = stationInfo[info];
      if (datapoint === String(lat)) {
        if (stationInfo.stop_lon === String(long)) {
          let id = stationInfo.stop_id;
          return this.getStationById(id);
        }
      }
    }
  }
}
