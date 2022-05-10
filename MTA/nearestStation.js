const {allStations} = require("./stations")

function distance(userLat, userLon, stationLat, stationLon) {
  if ((userLat === stationLat) && (userLon === stationLon))
    return 0;

  const radlat1 = Math.PI * userLat/180
  const radlat2 = Math.PI * stationLat/180
  const theta = userLon - stationLon
  const radtheta = Math.PI * theta/180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  return dist
}

const nearestStations = (userLat, userLong, maxDistance) => {
  let nearest = [];

  for (const station in allStations) {
    if (distance(userLat, userLong, station.stop_lat, station.stop_lon) <= maxDistance) {
        nearest.push(station)
    }
  }
  return nearest;
}

console.log(nearestStations(40.7748231, -73.9258586, 1.7))
console.log('irving plaza')
console.log(nearestStations(40.7331922, -73.9937395, 1.7))