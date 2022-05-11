const APIkey = require("../.env");
const { baseURI, URIs } = require("./data");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const https = require("https");

// get real time status feed for trainline passed in as parameter
async function getStatusFeed(trainLine) {
  return new Promise((resolve, reject) => {
    if (URIs[String(trainLine) === undefined]) {
      return [];
    }
    const FeedURI = baseURI + URIs[String(trainLine).toUpperCase()];
    https
      .get(FeedURI, { headers: { "x-api-key": APIkey } }, (res) => {
        let data = [];
        res.on("data", (chunk) => {
          data.push(chunk);
        });
        res.on("end", () => {
          data = Buffer.concat(data);
          const feed =
            GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
          resolve(feed);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        reject(err);
      });
  });
}

// get status for specific train and, optionally, direction
async function getStatus(train, direction = "NS") {
  const feed = await getStatusFeed(train);

  // filter trip status to updates about the specified train line
  let trips = feed.entity
    .filter((entity) => entity.tripUpdate)
    .filter((update) => train.includes(update.tripUpdate.trip.routeId))
    .map((trip) => {
      const tripId = trip.tripUpdate.trip.tripId;
      const firstStop = trip.tripUpdate.stopTimeUpdate[0];
      const direction = firstStop
        ? firstStop.stopId[firstStop.stopId.length - 1]
        : "";
      const tripObj = {
        tripId,
        direction,
        stops: trip.tripUpdate.stopTimeUpdate,
      };
      return tripObj;
    });

  // optionally filter by direction
  trips = trips.filter((trip) => direction.includes(trip.direction));

  const status = {
    routeId: train.toUpperCase(),
    trips,
  };
  return status;
}

// get arrival time for a specific train and location and, optionally, direction
async function getArrivalTimes(station, train, direction = "NS") {
  const status = await getStatus(train, direction.toUpperCase());

  // filter arrival info for specified stations and calculate time until arrival
  let nextArrivals = status.trips.map((trip) => {
    const { tripId, direction } = trip;
    const arrivalTime = trip.stops
      .filter((stop) => stop.stopId.includes(station))
      .map((stop) =>
        Math.round(
          Math.max(0, (stop.arrival.time - Math.floor(Date.now() / 1000)) / 60)
        )
      )[0];
    return { tripId, direction, arrivalTime };
  });

  nextArrivals = nextArrivals
    .filter((arrival) => arrival.arrivalTime)
    .sort((a, b) => (a.arrivalTime > b.arrivalTime ? 1 : -1));

  const arrivals = {
    routeId: train,
    stationId: station,
    nextArrivals,
  };

  return arrivals;
}

// pass in stationId, trainLine, and optionally direction 'N' or 'S'
Promise.resolve(getArrivalTimes("236", "2", "N")).then((arrivals) =>
  console.log(arrivals)
);

module.exports = { getArrivalTimes };
